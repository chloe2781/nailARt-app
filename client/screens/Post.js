import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useContext, useState } from "react";
import FooterList from "../components/footer/FooterList";
import axios from "axios";
import { LinkContext } from "../context/link";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../styles/theme.style";
// import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
// import { Renderer } from 'expo-three';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Camera, CameraType } from 'expo-camera';


const Post = ({ navigation }) => {
    // const [link, setLink] = useState("");
    // const [title, setTitle] = useState("");
    // const [links, setLinks] = useContext(LinkContext);
    // const devices = useCameraDevices('wide-angle-camera');
    // const device = devices.back;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const handleSubmit = async () => {
        // if (link === "" || title === "") {
        //     alert("Please fill all the fields");
        //     return;
        // }
        // try {
        //     const { data } = await axios.post("http://localhost:8000/api/post-link", {
        //         link,
        //         title,
        //     });
        //     console.log("data => ", data);
        //     setLink([data, ...links]);
        //     setTimeout(() => {
        //         alert("Link posted successfully");
        //         navigation.navigate("Home");
        //     }, 500);
        // } catch (err) {
        //     console.log(err);
        // }
    }

    // if (device == null) return <LoadingView />

    return (
        // <SafeAreaView style={styles.container}>
        //     <Text style={styles.mainText}> <FontAwesome5 name="hand-sparkles" solid style={styles.headerIcon} /> see nails </Text>
        //     <ScrollView showsVerticalScrollIndicator={false}>

        //         {/*  <View style={{ marginHorizontal: 24 }}>
        //             <Text style={{ fontSize: 16, color: '#Be93a1' }}>LINK</Text>
        //             <TextInput style={styles.signupInput} value={link} onChangeText={text => setLink(text)}
        //                 autoCapitalize="none" autoCorrect={false} placeholder="Paste the url" />
        //         </View>
        //         <View style={{ marginHorizontal: 24 }}>
        //             <Text style={{ fontSize: 16, color: '#Be93a1' }}>TITLE</Text>
        //             <TextInput style={styles.signupInput} value={title} onChangeText={text => setTitle(text)}
        //                 autoCapitalize="sentences" autoCorrect={false} placeholder="Title of the post" />
        //         </View>
        //         <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
        //             <Text style={styles.buttonText}>Submit</Text>
        //         </TouchableOpacity>*/}
        //         <Text>Hello</Text>

        //     </ScrollView>
        //     <FooterList />
        // </SafeAreaView>
        <View style={styles.container}>
            <Text>hello</Text>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <Text>world</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
    },
    camera: {
        flex: 1,
    },
    headerIcon: {
        fontSize: 28,
        color: theme.colors.light_blue,
        marginRight: 15,
    },
    mainText: {
        fontSize: 36,
        marginLeft: 30,
        fontFamily: theme.fonts.ss_black,
        color: theme.colors.light_blue,
    },
    signupInput: {
        height: 48,
        borderBottomWidth: 0.5,
        borderBottomColor: '#Be93a1',
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
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold",
    },

});

export default Post;