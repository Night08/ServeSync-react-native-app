import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import GlobalAPI from '../../Utils/GlobalAPI'
import BusinessListItem from '../BusinessListByCategory/BusinessListItem'

const BookingScreen = () => {
  const {user} = useUser()
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && getBookingsList()
  }, [])

  const getBookingsList = ()=>{
    setLoading(true)
    GlobalAPI.getBookings(user?.primaryEmailAddress.emailAddress).then((res)=>{
      // console.log(res)
      setBookingList(res.bookings)
    })
    setLoading(false)
  }
  
  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 29, fontFamily: 'outfit-medium', marginBottom: 20}}>My Bookings</Text>
      <View>
      <FlatList
        data={bookingList}
        onRefresh={()=> getBookingsList()}
        refreshing={loading}
        renderItem={({ item, index }) => ( 
          <BusinessListItem business={item?.businessName} booking={item}/>
          )}

      />
      </View>
    </View>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})