import { View, Text, SafeAreaView, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const { user, isLoading } = useUser();
  return (
    user && (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImg} />
          <View>
            <Text style={{color: Colors.WHITE, fontFamily: 'outfit'}}>
                Welcome,
            </Text>
            <Text style={{color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-medium'}}>{user?.fullName}</Text>
            </View> 
        </View>
        <Ionicons name="bookmarks" size={24} color="white" />
        </View>

        {/* search bar section  */}
        <View style={styles.searchContainer}>
            <TextInput placeholder="search" style={styles.input}/>
            <Ionicons name="search" style={styles.searchBtn} size={24} color={Colors.PRIMARY} />
        </View>
      </SafeAreaView>
    )
  );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 99
  },
  searchContainer: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'row',
    gap: -2,
    marginBottom: 10
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: '85%',
    fontSize: 18,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    fontFamily: 'outfit'
  },
  searchBtn: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2
  }
});
