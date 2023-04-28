import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useContext, useEffect, useState } from "react";
import FooterList from "../components/footer/FooterList";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import theme from "../styles/theme.style";
import { LinkContext } from "../context/link";
import nails_image from "../assets/nails.png";
import Saved from "./Saved";
import { BlurView } from 'expo-blur';


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

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const { width } = Dimensions.get("window");

    useEffect(() => {
        if (state) {
            const { name, email, role, image } = state.user;
            setName(name);
            setEmail(email);
            setRole(role);
            setImage(image);
        }
    }, [state]);

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

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

    const signOut = async () => {
        setState({ user: "", token: "" });
        await AsyncStorage.removeItem("auth-rn");
    };

    const [links, setLinks] = useContext(LinkContext);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        const { data } = await axios.get("http://localhost:8000/api/links");
        setLinks(data);
    };

    const handlePress = async link => {
        await axios.put(`http://localhost:8000/api/view-count/${link._id}`);
        navigation.navigate("LinkView", { link });
        setLinks(links.map(l => l._id === link._id ? { ...l, views: l.views + 1 } : l));
    };

    const nailsets = [
        require('../assets/nail-sets/nails1.png'),
        require('../assets/nail-sets/nails2.png'),
        require('../assets/nail-sets/nails3.png'),
        require('../assets/nail-sets/nails4.png'),
        require('../assets/nail-sets/nails5.png'),
        require('../assets/nail-sets/nails6.png'),

    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.signupText}><FontAwesome5 name="user" solid style={styles.headerIcon} />  {name}</Text>
            <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
                <FontAwesome5 name="sign-out-alt" size={25} color={theme.colors.dark_blue} />
            </TouchableOpacity>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    {image && image.url ? <Image source={{ uri: image.url }} style={styles.imageStyles} /> :
                        uploadImage ? <Image source={{ uri: uploadImage }} style={styles.imageStyles} /> : (
                            <TouchableOpacity onPress={() => handleUpload()}>
                                <FontAwesome5 name="camera" size={25} color={theme.colors.dark_blue} />
                            </TouchableOpacity>
                        )}
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.headerStats}>
                        <View style={styles.headerStatComp}>
                            <Text style={styles.headerStatNum}>21</Text>
                            <Text style={styles.headerStatTitle}>designs</Text>
                        </View>
                        <View style={styles.headerStatComp}>
                            <Text style={styles.headerStatNum}>105</Text>
                            <Text style={styles.headerStatTitle}>followers</Text>
                        </View>
                    </View>
                    {/* Go to Saved screen */}
                    <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("Saved")}>
                        <Text style={styles.saveButtonText}><FontAwesome5 name="bookmark" solid style={styles.saveIcon} />  saved</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {image && image.url ? (
                <TouchableOpacity onPress={() => handleUpload()} style={styles.cameraButton}>
                    <FontAwesome5 name="camera" size={25} color={theme.colors.dark_blue} style={styles.iconStyle} />
                </TouchableOpacity>
            ) : (
                <></>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.posts}>
                    {links && links.map((item, index) => (
                        // <View key={item._id} style={{ alignItems: "left" }}>
                        <View key={item._id} style={styles.box}>
                            {/* <View style={styles.boxImageView}> */}
                            <TouchableOpacity style={styles.boxImageView}
                                onPress={() => handleImagePress(nailsets[index % nailsets.length])}
                            >
                                <Image style={styles.boxImage}
                                    source={nailsets[index % nailsets.length]} />
                            </TouchableOpacity>
                            {/* </View> */}
                            <View style={{ position: "absolute", bottom: '10%', right: 15 }}>
                                <Text style={styles.viewText}>{item.views}</Text>
                                <FontAwesome5 name="bookmark" solid size={22} color={theme.colors.yellow_mellow} />
                            </View>
                        </View>
                        // </View>
                    ))}
                    <Modal visible={modalVisible} transparent style={styles.modalView}>
                        <BlurView style={styles.blur} blurType="dark" blurAmount={10}>
                            <TouchableOpacity
                                style={styles.modalBackground}
                                onPress={() => setModalVisible(false)}
                            >
                                <Image source={selectedImage} style={styles.modalImage} />
                            </TouchableOpacity>
                        </BlurView>
                    </Modal>
                </View>
            </ScrollView>
            {/* <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                
                <View style={{ marginVertical: 0 }}>



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
                
            </KeyboardAwareScrollView> */}
            <FooterList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    signOutButton: {
        position: "absolute",
        top: '8%',
        right: 25,
        zIndex: 1,
    },
    iconStyle: {
        marginTop: -5,
        marginBottom: 10,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    headerIcon: {
        fontSize: 28,
        color: theme.colors.dark_blue,
        marginRight: 15,
    },
    signupText: {
        fontSize: 36,
        marginLeft: 30,
        fontFamily: theme.fonts.ss_black,
        color: theme.colors.dark_blue,
        marginBottom: -10,
    },
    header: {
        flexDirection: "row",
        // alignItems: "center",
        marginTop: 0,
    },
    headerRight: {
        flex: 1,
        flexDirection: "column",
    },
    headerStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 0.8,
        marginHorizontal: 69,
        marginLeft: 45,
        marginTop: 25,
    },
    headerStatComp: {
        alignItems: "center",
    },
    headerStatNum: {
        fontSize: 24,
        fontFamily: theme.fonts.ss_regular,
        color: "black",
    },
    headerStatTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.ss_regular,
        color: "black",
    },
    saveButton: {
        backgroundColor: theme.colors.gray_gal,
        borderRadius: 10,
        height: 35,
        width: 185,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 43,
    },
    saveButtonText: {
        fontSize: 22,
        fontFamily: theme.fonts.sc_regular,
        color: theme.colors.dark_blue,
    },
    saveIcon: {
        fontSize: 19,
        color: theme.colors.dark_blue,
        marginRight: 5,
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
        marginLeft: 30,
    },
    imageStyles: {
        width: 105,
        height: 105,
        marginVertical: 20,
        borderRadius: 100,
    },
    cameraButton: {
        alignSelf: "left",
        marginLeft: 103,
        marginTop: -50,
        marginBottom: 20,
        backgroundColor: theme.colors.primary_white,
        paddingTop: 13,
        borderRadius: 100,
        height: 45,
        width: 45,
    },
    posts: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        justifyContent: "space-between",
        marginLeft: 30,
        marginRight: 30,
        marginBottom: "65%",
    },
    box: {
        width: "46%",
        aspectRatio: 1,
    },
    boxImageView: {
        marginTop: "5%",
        width: "100%",
        height: "100%",
        borderRadius: 40,
        backgroundColor: theme.colors.post_background,
        shadowColor: "#171717",
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 7,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    boxImage: {
        width: "100%",
        height: "100%",
    },
    viewText: {
        fontSize: 20,
        color: theme.colors.yellow_mellow,
        textAlign: "center",
        fontFamily: theme.fonts.ss_regular,
    },
    modalView: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
        // width: '100%',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: theme.colors.post_background,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: '90%',
        marginVertical: '60%',
        borderRadius: 30,
        shadowColor: "#171717",
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    modalImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    blur: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },

});

export default Account;