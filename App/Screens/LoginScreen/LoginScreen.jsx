import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

// clerk authentication
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';


WebBrowser.maybeCompleteAuthSession();
const Login = () => {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

    
  return (
    <SafeAreaView style={{alignItems:'center', backgroundColor: Colors.PRIMARY_LIGHTER}}>
        <View style={[{height: '60%', }, styles.mainContainer]}>
          <Text style={{fontFamily: 'outfit-bold', fontSize: 52, color: Colors.PRIMARY }}>ServeSync</Text>
          <Text style={{fontFamily: 'outfit-medium', fontSize: 25, color: Colors.TAGLINE }}>Connecting services, simplifying lives.</Text>
            </View>
      <View style={styles.subContainer} >
        <Text style={{fontSize: 27, color: Colors.WHITE, textAlign: 'center'}}>
            Let's Find  {}
             <Text style={{fontWeight: 'bold'}}>
             Professional Cleaning and Repair  
            </Text> {}
            Services
        </Text>
        <Text style={{fontSize: 17, color: Colors.WHITE, textAlign: 'center', marginTop: 20}}>
            Best app to find services near you which delivers and synchronizes various professional services
        </Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
            <Text style={{color: Colors.PRIMARY, fontSize: 17, textAlign: 'center'}}>
                Let's Get Started
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '40%',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    button: {
        marginTop: 40,
        borderRadius: 99,
        backgroundColor: Colors.WHITE,
        padding: 15
    },
    mainContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: 40,
      alignItems: 'center',
      gap: 1
}
} 
)