import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useContext, useEffect, useState } from "react";
import FooterList from "../components/footer/FooterList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState({
        url: "",
        public_id: ""
    });
    const [state, setState] = useContext(AuthContext);
    const [uploadImage, setUploadImage] = useState("");
    useEffect(() => {
        if (state) {
            const { name, email, role, image } = state.user;
            setName(name);
            setEmail(email);
            setRole(role);
            setImage(image);
        }
    }, [state]);

    const handleSubmit = async () => {
        try {
            let storedData = await AsyncStorage.getItem("auth-rn");
            const user = JSON.parse(storedData);
            console.log("USER => ", user);
            const resp = await axios.post(`http://localhost:8000/api/update-password`, { password, user });
            const data = resp.data;
            if (data.error)
                alert(data.error);
            else {
                alert("Password updated successfully");
                setPassword("");
            }
        } catch (error) {
            alert("Password update failed. Try again");
            console.log("PASSWORD UPDATE ERROR => ", error);
        }
    };

    const handleUpload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        if (pickerResult.canceled === true) {
            return;
        }
        let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
        setUploadImage(base64Image);

        let storedData = await AsyncStorage.getItem("auth-rn");
        const parsed = JSON.parse(storedData);
        const { data } = await axios.post("http://localhost:8000/api/upload-image", {
            image: base64Image,
            user: parsed.user,
        });
        console.log("UPLOAD RESPONSE => ", data);
        // update async storage
        const stored = JSON.parse(await AsyncStorage.getItem("auth-rn"));
        stored.user = data;
        await AsyncStorage.setItem("auth-rn", JSON.stringify(stored));
        // update state
        setState({ ...state, user: data });
        setImage(data.image);
        alert("Image uploaded successfully");
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={{ marginVertical: 100 }}>
                <View style={styles.imageContainer}>
                    {image && image.url ? <Image source={{ uri: image.url }} style={styles.imageStyles} /> :
                        uploadImage ? <Image source={{ uri: uploadImage }} style={styles.imageStyles} /> : (
                            <TouchableOpacity onPress={() => handleUpload()}>
                                <FontAwesome5 name="camera" size={25} color="darkmagenta" />
                            </TouchableOpacity>
                        )}
                </View>
                {image && image.url ? (
                    <TouchableOpacity onPress={() => handleUpload()}>
                        <FontAwesome5 name="camera" size={25} color="darkmagenta" style={styles.iconStyle} />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
                <Text style={styles.signupText}>{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
                <Text style={styles.roleText}>{role}</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: "#8e93a1" }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        autoCompleteType="password" />
                </View>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Update password</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        marginTop: -5,
        marginBottom: 10,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    signupText: {
        fontSize: 30,
        textAlign: "center",
        paddingBottom: 10,
    },
    emailText: {
        fontSize: 18,
        textAlign: "center",
        paddingBottom: 10,
    },
    roleText: {
        fontSize: 16,
        textAlign: "center",
        paddingBottom: 10,
        color: 'gray',
    },
    signupInput: {
        height: 48,
        borderBottomWidth: 0.5,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    },
    buttonStyle: {
        height: 50,
        backgroundColor: 'darkmagenta',
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageStyles: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },

});

export default Account;