import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalAPI from "../../Utils/GlobalAPI";
import Heading from "../../components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const Category = () => {
    const navigation = useNavigation()
  const [categoryData, setCategoryData] = useState(null);

  // getting category list
  const getCategories = () => {
    GlobalAPI.getCategories()
      .then((res) => {
        //   console.log('categories', res)
        setCategoryData(res?.categories);
      })
      .catch((error) => console.log("Error fetching slider data:", error));
  };

  useEffect(() => {
    getCategories();
  }, []);
//   console.log(categoryData)
  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={categoryData}
        numColumns={4}
        renderItem={({ item, index }) => index <= 3 && ( // to control the number of items to be displayed when 'view all' is clicked
            <TouchableOpacity activeOpacity={0.3} style={styles.container} onPress={()=> navigation.push('business-list', {category: item?.name})}>
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item.icon.url }}
                  style={{height: 30, width: item.name === 'Shifting'? 47 : 32}}
                />
                <Text style={{fontFamily: 'outfit-medium', marginTop: 8}} >{item?.name}</Text>
              </View>
              
            </TouchableOpacity>
  )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 17,
        borderRadius: 99,
        alignItems: 'center'
    }
});
