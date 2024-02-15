import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native';

const BusinessListSingleItem = ({business}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.push("business-details", { business: business }) }
       activeOpacity={0.6}>
      <Image source={{uri: business?.images[0]?.url}} style={styles.image}/>
      <View style={{padding: 3}}>
        <Text style={{fontSize: 18, fontFamily: 'outfit-medium'}}>{business?.name}</Text>
        <Text style={{fontSize: 14, color:Colors.GRAY, fontFamily: 'outfit'}}>{business?.contactPerson}</Text>
        <Text style={{fontSize: 12, fontFamily: 'outfit', padding:4,color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, alignSelf: 'flex-start', paddingHorizontal: 7, borderRadius: 9, marginTop: 5}}>{business?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusinessListSingleItem

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    },
    image: {
        width: 160,
        height: 100,
        borderRadius: 10,
        borderColor: 'black',
        marginBottom: 5
    }
})