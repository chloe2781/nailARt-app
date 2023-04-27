import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'
import { Camera } from 'expo-camera'
import FooterList from "../components/footer/FooterList";
import theme from "../styles/theme.style";
import AppLoading from "expo-app-loading";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function SeeNails() {
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    let camera;
    let [fontsLoaded] = theme.useFonts();

    const CameraPreview = ({ photo }) => {
        console.log('sdsfds', photo)
        return (
            <View
                style={{
                    backgroundColor: 'green',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{ uri: photo && photo.uri }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    }

    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        if (previewVisible && capturedImage) {
            return (
                <CameraPreview photo={capturedImage} />
            )
        }
        else {
            return (
                <View style={styles.container}>

                    <Camera style={styles.container}
                        ref={(r) => {
                            camera = r
                        }}>
                        <View style={styles.cameraView} >
                            <Text style={styles.mainText}> <FontAwesome5 name="hand-sparkles" solid style={styles.headerIcon} />  see nails </Text>
                        </View>
                    </Camera>
                    <View style={styles.cameraInnerView} >
                        <View style={styles.buttonContainer} >
                            <TouchableOpacity onPress={__takePicture} style={styles.button} />
                        </View>
                    </View>
                    <FooterList />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgrountColor: 'transparent',
        paddingBottom: 30
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
    cameraView: {
        paddingTop: 55,
        // flex: 1,
        // width: '100%',
        // backgroundColor: 'transparent',
        // flexDirection: 'row'
    },
    cameraInnerView: {
        position: 'absolute',
        bottom: '12%',
        width: '100%',
        // alignSelf: 'center',
        // flexDirection: 'row',
        // flex: 1,
        // width: '100%',
        // padding: 20,
        // justifyContent: 'bottom',
    },
    buttonContainer: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        // bottom: 0,
    },
    button: {
        width: 80,
        height: 140,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.pinky,
    }
})