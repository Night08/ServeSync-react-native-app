import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import GlobalAPI from '../../Utils/GlobalAPI';
import BusinessListItem from './BusinessListItem';
import PageHeadingBack from '../../components/PageHeadingBack';

const BusinessListByCategoryScreen = ({navigation}) => {
    const {category} = useRoute().params;
    const [businessList, setBusinessList] = useState([])

  // fetching business list by category
  const getBusinessesByCategory = () => {
    GlobalAPI.getBusinessListByCategory(category)
      .then((res) => {
        //   console.log('business', res)
        setBusinessList(res?.businessLists);
      })
      .catch((error) => console.log("Error fetching slider data:", error));
  };

  useEffect(() => {
   category && getBusinessesByCategory();
  }, [category]);
//   console.log(category)
    
  return (
    <View style={{padding: 20, paddingTop: 25}}>
         <PageHeadingBack title={category}/>


     { businessList.length > 0 ?  <FlatList
        data={businessList}
        renderItem={({ item, index }) => ( 
          <BusinessListItem business={item}/>
  )}
      /> : <Text style={{fontSize:22, textAlign: 'center', marginTop: 300, fontFamily: 'outfit-medium'}}>No Business Found!</Text>}
    </View>
  )
}

export default BusinessListByCategoryScreen

const styles = StyleSheet.create({})