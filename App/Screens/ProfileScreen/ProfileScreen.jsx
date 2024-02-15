import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const ProfileScreen = () => {
  const {user} = useUser()
  const {isLoaded, signOut} = useAuth()
  const navigation = useNavigation()

  const profileMenu = [{
    id: 1,
    name: 'Home',
    icon: 'home'
  },
  {
    id: 2,
    name: 'My Bookings',
    icon: 'bookmarks'
  },
  {
    id: 3,
    name: 'Contact Us',
    icon: 'mail'
  },
  {
    id: 4,
    name: 'Logout',
    icon: 'log-out'
  }
  ]

  const  handleClick = (item) => {
    if(item.name === 'Home'){
      navigation.navigate('Home')
    } 
    else if (item.name === 'My Bookings') {
      navigation.navigate('Booking')
    } 
    else if (item.name === 'Contact Us') {
      Linking.openURL('mailto:' + 'serveSync@email.com' + '?subject=I am facing some issues&body=Hey there!')
    }
    else if (item.name === 'Logout') {
     isLoaded && signOut()
    }
   
   }
  return (
    <View>
    <View style={{padding: 20, paddingTop: 28, backgroundColor: Colors.PRIMARY}}>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 30, color: Colors.WHITE}}>Profile</Text>

      <View style={{display: 'flex' , alignItems: 'center', justifyContent: 'center', padding: 22}}>
        <Image source={{uri: user?.imageUrl}} style={{width: 90, height:90, borderRadius: 99}} />
        <Text style={{fontSize: 27, color: Colors.WHITE, marginTop: 12, fontFamily: 'outfit-medium'}}>{user?.fullName}</Text>
        <Text style={{fontSize: 20, color: Colors.WHITE, marginTop: 4, fontFamily: 'outfit'}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
    </View>

    <View style={{padding: 40}}>
      <FlatList data={profileMenu} 
      renderItem={({item, index})=> (
        <TouchableOpacity style={{display:'flex', flexDirection: 'row', alignItems: 'center', gap: 17, marginVertical: 9}} activeOpacity={0.7} onPress={()=>handleClick(item)}>
          <Ionicons name={item.icon} size={34} color={Colors.PURPLE_SHADE} />
          <Text style={{fontFamily: 'outfit', fontSize: 25}}>{item.name}</Text>
          </TouchableOpacity>
      )}
      />
    </View>
    </View>
  )
}

export default ProfileScreen

