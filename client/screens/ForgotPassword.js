import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import theme from "../styles/theme.style";
import AppLoading from "expo-app-loading";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [visible, setVisible] = useState(false);
    let [fontsLoaded] = theme.useFonts();

    const handleSubmit = async () => {
        if (!email) {
            alert("Email is required");
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/forgot-password", { email });
            if (data.error) {
                alert(data.error);
            } else {
                setVisible(true);
                alert("Enter the password reset code sent to your email");
            }
        } catch (err) {
            alert("Error sending reset code. Try again.");
            console.log(err);
        }
    };
    const handlePasswordReset = async () => {
        try {
            const { data } = await axios.post("http://localhost:8000/api/reset-password", { email, resetCode, password });
            if (data.error) {
                alert(data.error);
            } else {
                alert("Password reset successful");
                navigation.navigate("SignIn");
            }
        } catch (err) {
            alert("Error resetting password. Try again.");
            console.log(err);
        }
    };
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <KeyboardAwareScrollView contentCotainerStyle={styles.container}>
                <View style={{ marginVertical: 100 }}>
                    <View style={styles.imageContainer}>
                        <Image source={require("../assets/icon.png")} style={styles.imageStyles} />
                    </View>
                    <Text style={styles.signupText}>Forgot Password</Text>
                    <View style={{ marginHorizontal: 24 }}>
                        <Text style={styles.inputTitle}>EMAIL</Text>
                        <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                    </View>
                    {visible && (
                        <>
                            <View style={{ marginHorizontal: 24 }}>
                                <Text style={styles.inputTitle}>NEW PASSWORD</Text>
                                <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                            </View>
                            <View style={{ marginHorizontal: 24 }}>
                                <Text style={styles.inputTitle}>RESET CODE</Text>
                                <TextInput style={styles.signupInput} value={resetCode} onChangeText={text => setResetCode(text)} secureTextEntry={true} />
                            </View>
                        </>
                    )}
                    <TouchableOpacity onPress={visible ? handlePasswordReset : handleSubmit} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>{visible ? "Reset Password" : "Send Code"}</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 20 }}>
                        Changed your mind?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={[styles.buttonStyle, styles.darkerButton]}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
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
        marginBottom: 30,
        justifyContent: "center",
        marginHorizontal: '28%',
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
        fontSize: 12,
        textAlign: "center",
        marginTop: 10,
        color: "darkgreen",
        fontWeight: "bold"
    },
    darkerButton: {
        backgroundColor: theme.colors.dark_blue,
    }
});

export default ForgotPassword;