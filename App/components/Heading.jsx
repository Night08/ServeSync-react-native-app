import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Heading = ({text, isViewAll = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{text}</Text>
      { isViewAll && <Text>
        View All
      </Text>}
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        fontFamily: 'outfit-medium',
        marginBottom: 9,
        fontSize: 20
      },
})