import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Heading from '../../components/Heading'




const Slider = () => {
  const [sliderData, setSliderData] = useState(null)

      // getting slider list
  const getSliders = ()=> {
    GlobalAPI.getSlider().then((res)=> {
      // console.log('sliders', res)
      setSliderData(res?.sliders)
    }).catch((error)=> console.log("Error fetching slider data:", error))
  }

  useEffect(()=>{ 
    getSliders()
  }, [])
  return (
    <View>
      <Heading text={'Offers For You'} />
      <FlatList 
      data={sliderData}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem ={ ({item, index}) => { 
       return <View style={{marginRight: 20}}>
        <Image source={{uri: item?.image?.url}} style={styles.sliderImg} />
       </View>
      }}
      />
    </View>
  )
}


export default Slider

const styles = StyleSheet.create({
  sliderImg: {
    height: 150,
    width: 270,
    borderRadius: 20,
    objectFit: 'contain'
  }
})