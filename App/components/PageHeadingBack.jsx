import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";

const PageHeadingBack = ({title}) => {
    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> navigation.goBack()} style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, marginBottom: 20}}>
        <AntDesign name="arrowleft" size={26} color="black" />
        <Text style={{fontSize: 24, fontFamily: 'outfit-medium'}}>{title}</Text>
        </TouchableOpacity>
  )
}

export default PageHeadingBack

const styles = StyleSheet.create({})