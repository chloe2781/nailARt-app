import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import react, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import theme from "../styles/theme.style";
import AppLoading from "expo-app-loading";

const SignUp = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useContext(AuthContext);
    let [fontsLoaded] = theme.useFonts();


    const handleSubmit = async () => {
        if (name === "" || email === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }
        const resp = await axios.post("http://localhost:8000/api/signup", { name, email, password });
        console.log(resp.data);
        if (resp.data.error)
            alert(resp.data.error);
        else {
            setState(resp.data)
            await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
            alert("Account created successfully");
            navigation.navigate("Home");
        }
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={{ marginVertical: 100 }} >
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/icon.png")} style={styles.imageStyles} />
                    </View>
                    <Text style={styles.signupText}>Sign Up</Text>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={styles.inputTitle}>NAME</Text>
                        <TextInput style={styles.signupInput}
                            value={name} onChangeText={text => setName(text)}
                            autoCapitalize="words" autoCorrect={false} />
                    </View>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={styles.inputTitle}>EMAIL</Text>
                        <TextInput style={styles.signupInput}
                            value={email} onChangeText={text => setEmail(text)}
                            autoCompleteType="email" keyboardType="email-address" />
                    </View>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={styles.inputTitle}>PASSWORD</Text>
                        <TextInput style={styles.signupInput}
                            value={password} onChangeText={text => setPassword(text)}
                            secureTextEntry={true} autoCompleteType="password" />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    {/* <Text style={{ marginHorizontal: 24 }}>{JSON.stringify({ name, email, password })}</Text> */}
                    <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 20 }}>
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={[styles.buttonStyle, styles.darkerButton]} >
                        <Text style={styles.buttonText}> Log In
                        </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
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
        marginTop: '6%',
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
        marginBottom: 40,
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
    darkerButton: {
        backgroundColor: theme.colors.dark_blue,
    }

});

export default SignUp;