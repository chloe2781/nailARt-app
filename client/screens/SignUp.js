import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import react, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const SignUp = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useContext(AuthContext);

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

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }} >
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/icon.png")} style={styles.imageStyles} />
                </View>
                <Text style={styles.signupText}>Sign Up</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#AFAEAF' }}>NAME</Text>
                    <TextInput style={styles.signupInput}
                        value={name} onChangeText={text => setName(text)}
                        autoCapitalize="words" autoCorrect={false} />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#AFAEAF' }}>EMAIL</Text>
                    <TextInput style={styles.signupInput}
                        value={email} onChangeText={text => setEmail(text)}
                        autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#AFAEAF' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput}
                        value={password} onChangeText={text => setPassword(text)}
                        secureTextEntry={true} autoCompleteType="password" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                {/* <Text style={{ marginHorizontal: 24 }}>{JSON.stringify({ name, email, password })}</Text> */}
                <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    Already have an account?{" "}
                    <Text style={{ color: 'darkred', fontWeight: 'bold' }}
                        onPress={() => navigation.navigate("SignIn")}> Login
                    </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center',
    },
    signupInput: {
        height: 48,
        borderBottomWidth: 0.5,
        borderBottomColor: '#AFAEAF',
        marginBottom: 30,
    },
    buttonStyle: {
        height: 50,
        backgroundColor: '#E9446A',
        borderRadius: 50,
        marginHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyles: {
        width: 100,
        height: 100,
        marginVertical: 20
    }
});

export default SignUp;