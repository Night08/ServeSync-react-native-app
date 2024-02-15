import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'
import BusinessList from './BusinessList'

const HomeScreen = () => {
  return (
    <SafeAreaView>
        {/* header section  */}
      <Header />
      <View style={{padding: 20}}>
      {/* slider section  */}
      <Slider />

      {/* categories section  */}
      <Category />

      {/* Business list section  */}
      <BusinessList />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})