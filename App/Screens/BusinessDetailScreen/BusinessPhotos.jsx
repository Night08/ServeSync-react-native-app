import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Heading from '../../components/Heading'

const BusinessPhotos = ({business}) => {
  return (
    <View style={{margin: 10}}>
      <Heading text={"Business Photos"} /> 
      {
      <FlatList 
      data={business.images}
      numColumns={2}
      renderItem={({item})=>{
        return <Image source={{uri: item.url}} style={{width: '100%', height: 150,objectFit: 'contain', margin: 8, flex: 1, borderRadius: 40, }} />
      }}
      
      />}
    </View>
  )
}

export default BusinessPhotos