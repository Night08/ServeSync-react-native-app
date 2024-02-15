import { Image, KeyboardAvoidingView, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../Utils/Colors";
import Heading from "../../components/Heading";
import BusinessPhotos from "./BusinessPhotos";
import { ScrollView } from "react-native-gesture-handler";
import BookingModalScreen from "./BookingModalScreen";


const BusinessDetailScreen = () => {
  const param = useRoute().params;
  const navigation = useNavigation();

  const [business, setBusiness] = useState(param.business);
  const [isReadMore, setIsReadMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
 
 const handleMessage = () => {
   Linking.openURL('mailto:' + business?.email + '?subject=I am looking forward for your service&body=Heyy!')
  }

  return business && (
    <View>
   <ScrollView style={{height: '93%'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backbtn}
      >
        <AntDesign name="arrowleft" size={26} color="black" />
      </TouchableOpacity>

      <Image
        source={{ uri: business?.images[0]?.url }}
        style={{ width: "100%", height: 250 }}
      />
      <View style={styles.detailsContainer}>
        <Text style={{fontSize:25, fontFamily: 'outfit-bold'}}>{business?.name}</Text>
        <View style={styles.subContainer} >
          <Text style={{fontSize:20, fontFamily: 'outfit-medium', color: Colors.PRIMARY}}>{business?.contactPerson} </Text>
          <Text style={{fontSize:14, fontFamily: 'outfit', color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, padding: 3, paddingHorizontal: 6, borderRadius: 9}}>{business?.category?.name}</Text>
        </View>
        <Text style={{fontSize: 18, fontFamily: 'outfit', color: Colors.GRAY}} ellipsizeMode='tail'><MaterialIcons name="location-pin" size={20} color={Colors.PRIMARY}/>{business?.address} </Text>
      </View>

      {/* separator line  */}
      <View style={{borderBottomWidth: 1, borderColor: Colors.GRAY, marginBottom: 20, marginTop: 15}}></View>

      {/* About section  */}
      <View style={{paddingHorizontal: 17, paddingTop: 8}}>
      <Heading text={"About"}/>
      <Text style={{lineHeight: 23, fontSize: 16, fontFamily: 'outfit', color: Colors.GRAY}}  numberOfLines={isReadMore ? 25 : 3}>{business?.about}</Text>
      <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
       <Text style={{fontFamily: 'outfit', color: Colors.PRIMARY, fontSize: 14, marginTop: 6}}>{isReadMore ? 'Read Less' : 'Read More ' }{!isReadMore && <Text style={{fontSize: 18}}>&raquo;</Text>}</Text>
      </TouchableOpacity>
      </View>

        {/* separator line  */}
        <View style={{borderBottomWidth: 1, borderColor: Colors.GRAY, marginBottom: 20, marginTop: 15}}></View>

        {/* business photos  */}
        <BusinessPhotos business={business} />
    </ScrollView>

    {/* buttons  */}
    <View style={{display: 'flex', flexDirection: 'row', margin: 6, gap: 10}}>
        <TouchableOpacity style={styles.messageBtn} activeOpacity={0.6} onPress={()=> handleMessage()}>
            <Text style={{textAlign: 'center', fontSize: 19, fontFamily: 'outfit-medium', color: Colors.PRIMARY}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingBtn}  activeOpacity={0.6} onPress={()=> setShowModal(true)}>
            <Text style={{textAlign: 'center', fontSize: 19, fontFamily: 'outfit-medium', color: Colors.WHITE}}>Book Now</Text>
        </TouchableOpacity>
    </View>

    {/* Modal screen for booking  */}
  
    <Modal visible={showModal} animationType="slide">
        <BookingModalScreen businessId={business.id} hideModal={()=> setShowModal(false)} />
    </Modal>
    
    </View>
 
  );
};

export default BusinessDetailScreen;

const styles = StyleSheet.create({
  backbtn: {
    position: "absolute",
    zIndex: 100,
    padding: 10,
  },
  detailsContainer: {
    display: 'flex',
    padding: 15,
    gap: 7
  },
  subContainer: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  messageBtn: {
    padding: 10,
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderWidth: 1,
    flex: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99
  },
  bookingBtn: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  }
});
