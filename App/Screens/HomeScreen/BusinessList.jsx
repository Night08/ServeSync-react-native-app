import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import GlobalAPI from '../../Utils/GlobalAPI';
import BusinessListSingleItem from './BusinessListSingleItem';

const BusinessList = () => {
  
    const [BusinessData, setBusinessData] = useState(null);

    // getting Business list
    const getBusinessLists = () => {
      GlobalAPI.getBusinessList()
        .then((res) => {
          setBusinessData(res?.businessLists);
        })
        .catch((error) => console.log("Error fetching slider data:", error));
    };
  
    useEffect(() => {
        getBusinessLists();
    }, []);
    // console.log(BusinessData)

  return (
    <View style={{marginTop: 20}}>

      <Heading text={'Latest Business'} isViewAll={true} />
      <FlatList
        data={BusinessData}
        horizontal={true}
      showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>  ( 
            <View style={{marginRight: 12}}>
              <BusinessListSingleItem business={item} />
              </View>

  )}
      />
    </View>
  )
}

export default BusinessList

const styles = StyleSheet.create({})