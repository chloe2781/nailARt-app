import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import AppLoading from 'expo-app-loading';
import theme from '../styles/theme.style';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useContext(AuthContext);
    let [fontsLoaded] = theme.useFonts();
    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        const resp = await axios.post("http://localhost:8000/api/signin", { email, password });
        console.log(resp.data);
        if (resp.data.error)
            alert(resp.data.error);
        else {
            setState(resp.data);
            await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
            alert("Sign In Successful");
            navigation.navigate("Home");
        }
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <KeyboardAwareScrollView contentCotainerStyle={styles.container}>

                <View style={{ marginVertical: 100, backgroundColor: '#ECE9E6', flex: 1 }}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/icon.png")} style={styles.imageStyles} />
                    </View>
                    <Text style={styles.signupText}>sign in</Text>
                    <View style={{ marginHorizontal: 35 }}>
                        <Text style={styles.inputTitle}>EMAIL</Text>
                        <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                    </View>
                    <View style={{ marginHorizontal: 35 }}>
                        <Text style={styles.inputTitle}>PASSWORD</Text>
                        <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgetbutton}>
                        <Text style={styles.forgetText}> Forgot Password? </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, textAlign: 'center', marginBottom: 20 }}>
                        OR
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={[styles.buttonStyle, styles.darkerButton]}>
                        <Text style={styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    imageContainer: {
        top: -60,
        left: 30
    },
    imageStyles: {
        width: 120,
        height: 48,
        marginVertical: 20
    },
    signupText: {
        marginTop: '12%',
        marginBottom: '8%',
        fontSize: 40,
        textAlign: 'center',
        color: theme.colors.dark_blue,
        fontFamily: theme.fonts.ss_black,
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: theme.colors.light_blue,
        marginBottom: 40,
        fontSize: 18,
        fontFamily: theme.fonts.sc_regular,
        color: theme.colors.dark_blue,
    },
    inputTitle: {
        fontSize: 18,
        color: theme.colors.light_blue,
        fontFamily: theme.fonts.sc_regular,
        textTransform: 'uppercase',
    },
    buttonStyle: {
        backgroundColor: theme.colors.light_blue,
        height: 52,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: '33%',
        borderRadius: 55,
    },
    buttonText: {
        fontSize: 23,
        textAlign: 'center',
        color: theme.colors.white,
        textTransform: 'capitalize',
        fontFamily: theme.fonts.sc_regular,
    },
    forgetText: {
        fontSize: 13,
        textAlign: 'center',
        color: 'darkgreen',
        marginBottom: 30,
        fontWeight: 'bold',
        fontFamily: theme.fonts.sc_semibold,
    },
    darkerButton: {
        backgroundColor: theme.colors.dark_blue,
    }
})

export default SignIn;