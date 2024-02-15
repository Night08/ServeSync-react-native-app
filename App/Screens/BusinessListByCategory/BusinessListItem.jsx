import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";

const BusinessListItem = ({ business, booking }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => (
        navigation.push("business-details", { business: business }))
      }
      activeOpacity={0.6}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
          {business?.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
          {business?.name}
        </Text>

        {!booking?.id ? (
        <View style={styles.iconContainer}>
          <MaterialIcons
              name="location-pin"
              size={20}
              color={Colors.PRIMARY}
            />
            <Text
            style={{ fontSize: 16, fontFamily: "outfit", color: Colors.GRAY }}
            ellipsizeMode="tail"
          >
            
            {business?.address}
          </Text> 
          </View>
        ) : (
          <Text
            style={[
              {
                padding: 5,
                paddingHorizontal: 8,
                borderRadius: 9,
                fontSize: 15,
                alignSelf: "flex-start",
              },
              booking?.bookingStatus === "Completed"
                ? {
                    backgroundColor: Colors.GREEN,
                    color: Colors.WHITE,
                    borderWidth: 1,
                    borderColor: Colors.GREEN,
                  }
                : booking?.bookingStatus === "Cancelled"
                ? {
                    backgroundColor: Colors.RED,
                    color: Colors.WHITE,
                    borderWidth: 1,
                    borderColor: Colors.RED,
                  }
                : {
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    color: Colors.PRIMARY,
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                  },
            ]}
          >
            {booking?.bookingStatus}
          </Text>
        )}

        {booking?.id && (
          <View style={[styles.iconContainer, { marginVertical: 7}]}>
             <Fontisto name="date" size={20} color={Colors.PRIMARY} />
            <Text
              style={{ fontSize: 16, fontFamily: "outfit", color: Colors.GRAY }}
              ellipsizeMode="tail"
            >
             
              {booking?.date} at {booking?.time}
            </Text>
          </View>
        )}

      </View>
    </TouchableOpacity>
  );
};

export default BusinessListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    marginBottom: 17,
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  subContainer: {
    display: "flex",
    gap: 5,
    flex: 1,
    },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: '89%',
    alignItems: "center",
  },
});
