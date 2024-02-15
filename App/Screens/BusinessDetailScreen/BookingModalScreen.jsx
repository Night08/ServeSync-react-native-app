import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from "@expo/vector-icons";

import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../components/Heading';
import { ScrollView } from 'react-native-gesture-handler';
import GlobalAPI from '../../Utils/GlobalAPI';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';


const BookingModalScreen = ({businessId, hideModal}) => {
   
const [timeList, setTimeList] = useState([])

const [selectedTime, setSelectedTime] = useState('')
const [selectedStartDate, setSelectedStartDate] = useState('');
const [notes, setNotes] = useState('')

const {user} = useUser()

useEffect(() => {
  getTime()
}, [])

  // create an array of available time [8:00AM - 7PM]
    const getTime = () => {
        const timeList = []

        // sets time from 8:00AM to 11:30AM
        for (let index = 8; index < 12; index++) {
            timeList.push({
                time: index + ": 00 AM"
            })
            timeList.push({
                time: index + ": 30 AM"
            })
        }

        // sets time from 12:00PM to 7:
        for (let index = 0; index <= 8; index++) {
           if(index == 0){ 
            timeList.push({
                time: 12 + ": 00 PM"
            })} else {
                timeList.push({
                    time: index + ": 00 PM"
                })
            }

            if(index == 8){  // as available time is only till 8:00PM
                break
            }

            if(index == 0){
            timeList.push({
                time: 12 + ": 30 PM"
            })} else {
                timeList.push({
                    time: index + ": 30 PM"
                })
            }
        }

        setTimeList(timeList)
    }

    // method to post data for creating booking 
    const createNewBooking = ()=> {
        if(!selectedStartDate || !selectedTime){
            ToastAndroid.show("Please Select Date & Time!", ToastAndroid.LONG)
            return
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            date: format(selectedStartDate, 'dd-MMM-yyyy'),
            time: selectedTime,
            notes: notes,
            businessId: businessId
        }
        
        GlobalAPI.createBooking(data).then((res)=> {
            // console.log(res)
            ToastAndroid.show("Booking Created Successfully!", ToastAndroid.LONG)
        })
    }
 

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior='padding' style={{padding: 20, paddingTop: 25, flex: 1}} >
        <TouchableOpacity onPress={()=> hideModal()} style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 25}}>
        <AntDesign name="arrowleft" size={26} color="black" />
        <Text style={{fontSize: 24, fontFamily: 'outfit-medium'}}>Booking</Text>
        </TouchableOpacity>

        {/* calender section  */}
        <Heading text={'Select Date'} />
        <View style={styles.calender}>
         
        <CalendarPicker onDateChange={(date) => setSelectedStartDate(date)} width={360} minDate={Date.now()} todayBackgroundColor={Colors.GRAY} todayTextStyle={{color: Colors.WHITE}} selectedDayColor={Colors.PRIMARY} selectedDayTextColor={Colors.WHITE} selectedStartDate={selectedStartDate}/>

        </View>

        {/* Time selection section  */}
        <View style={{marginTop: 27}}>
            <Heading text={"Select Time Slot"} />
            <FlatList 
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=> (
                <TouchableOpacity style={{marginRight: 9}} activeOpacity={0.6} onPress={()=> setSelectedTime(item.time)}>
                    <Text style={selectedTime === item.time ? styles.selectedTime : styles.unselectedTime}>{item.time}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
      
      
        {/* suggestions notes section  */}
        <View style={{marginTop: 27}}>
            <Heading text={'Write Suggestion Notes'} />
            <TextInput placeholder='write here' multiline numberOfLines={5} style={styles.noteText} value={notes} onChangeText={setNotes}/> 
        </View>

        {/* confirmation btn and booking  */}
        <TouchableOpacity activeOpacity={0.7} onPress={()=> createNewBooking()}>
              <Text  style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default BookingModalScreen

const styles = StyleSheet.create({
    calender: {
        padding: 17,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 9,
        marginTop: 10
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        paddingHorizontal: 15,
        borderRadius: 99,
        fontSize: 16,
        fontFamily: 'outfit'
    },

    unselectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        color: Colors.PRIMARY,
        paddingHorizontal: 15,
        borderRadius: 99,
        fontSize: 16,
        fontFamily: 'outfit'
    },
    noteText: {
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        fontSize: 19,
        fontFamily: 'outfit',
        borderColor: Colors.PRIMARY

    },
    confirmBtn: {
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        fontSize: 19,
        borderRadius: 99, 
        textAlign: 'center',
        elevation: 3,
        fontFamily: 'outfit-bold',
        marginTop: 20
    }
})