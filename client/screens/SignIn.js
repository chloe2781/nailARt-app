import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import AppLoading from 'expo-app-loading';
import theme from '../styles/theme.style';

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
                    <Text style={styles.signupText}>Sign In</Text>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
                        <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                    </View>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
                        <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>
                        Not yet registered? {" "}
                        <Text style={{ color: 'darkred', fontWeight: 'bold' }}
                            onPress={() => navigation.navigate("SignUp")} >
                            Sign Up
                        </Text>
                    </Text>
                    <Text onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgetText}>Forgot Password?</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>Forgot Password?</Text>
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
    signupText: {
        fontSize: 30,
        textAlign: 'center',
        color: theme.colors.dark_blue,
        fontFamily: theme.fonts.ss_black,
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        backgroundColor: "darkmagenta",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    imageContainer: {
        //     justifyContent: "center",
        //     alignItems: "left"
        top: -60,
        left: 30
    },
    imageStyles: {
        width: 120,
        height: 48,
        marginVertical: 20
    },
    forgetText: {
        fontSize: 12,
        textAlign: 'center',
        color: 'darkgreen',
        marginTop: 10,
        fontWeight: 'bold',
    }
})

export default SignIn;