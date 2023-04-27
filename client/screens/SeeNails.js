import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import FooterList from "../components/footer/FooterList";
import theme from "../styles/theme.style";
import AppLoading from "expo-app-loading";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as MediaLibrary from 'expo-media-library';


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
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden', // clip overflow
                    borderRadius: 20,
                    marginTop: 40,
                }}
            >
                {/* <ImageBackground
                    source={{ uri: photo && photo.uri }}
                    style={{
                        flex: 1
                    }}
                /> */}
                <Image
                    source={{ uri: photo && photo.uri }}
                    style={{
                        width: '100%',
                        height: '130%',
                        resizeMode: 'cover',
                        position: 'absolute',
                        top: 0,
                        // left: 0,
                        // transform: [{ translateY: 50 }],

                    }}
                />

            </View>
        )
    };

    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    };

    const nails = [
        require('../assets/single-nails/nail1.png'),
        require('../assets/single-nails/nail2.png'),
        require('../assets/single-nails/nail3.png'),
        require('../assets/single-nails/nail4.png'),
        require('../assets/single-nails/nail5.png'),
        require('../assets/single-nails/nail6.png'),
        require('../assets/single-nails/nail7.png'),
        require('../assets/single-nails/nail8.png'),
        require('../assets/single-nails/nail9.png'),
        require('../assets/single-nails/nail10.png'),
        require('../assets/single-nails/nail11.png'),
    ];
    const { width: screenWidth } = Dimensions.get('window');
    const middleOffset = (screenWidth / 2) - (80 / 2);

    const BackButton = () => {
        const goBack = () => {
            setPreviewVisible(false);
        };

        return (
            <TouchableOpacity onPress={goBack} style={{ zIndex: 1, paddingHorizontal: 30 }}>
                <Text>Back</Text>
            </TouchableOpacity>
        );
    };

    const savePhoto = async (photo) => {
        try {
            if (Platform.OS === 'ios') {
                await MediaLibrary.requestPermissionsAsync();
            }
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            Alert.alert('Success!', 'Photo saved to your camera roll!');
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'Failed to save photo');
        }
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        if (previewVisible && capturedImage) {
            return (
                <View style={styles.imageContainer}>
                    <View style={styles.cameraView} >
                        <Text style={styles.mainText}> <FontAwesome5 name="hand-sparkles" solid style={styles.headerIcon} />  see nails </Text>
                    </View>
                    <View style={styles.imageContainerInner}>
                        <CameraPreview photo={capturedImage} />
                    </View>
                    <View style={{ position: 'absolute', bottom: 120, left: 50 }}>
                        <TouchableOpacity onPress={() => setPreviewVisible(false)} style={{ zIndex: 2, alignItems: 'center' }}>
                            <FontAwesome5 name="arrow-circle-left" solid style={{ fontSize: 45, color: theme.colors.pinky }} />
                            <Text style={{ fontSize: 20, color: theme.colors.pinky, marginTop: 5 }}>back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 120, right: 50 }}>
                        <TouchableOpacity onPress={() => savePhoto(capturedImage)} style={{ zIndex: 2, alignItems: 'center' }}>
                            <FontAwesome5 name="download" solid style={{ fontSize: 40, color: theme.colors.pinky }} />
                            <Text style={{ fontSize: 20, color: theme.colors.pinky, marginTop: 5 }}>save</Text>
                        </TouchableOpacity>
                    </View>
                    <FooterList />
                </View>
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
                        <ScrollView horizontal={true}
                            snapToAlignment="center"
                            snapToInterval={80}
                            decelerationRate="fast"
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 20, marginBottom: 20 }}
                            contentContainerStyle={{ paddingHorizontal: 241 }}>
                            {nails.map((nail, index) => {
                                return (
                                    // <TouchableOpacity key={index} onPress={() => { console.log('nail', nail) }}>
                                    //     <ImageBackground source={nail} style={{ width: 80, height: 200, marginRight: 0 }} />
                                    // </TouchableOpacity>
                                    <Image
                                        key={index}
                                        source={nail}
                                        style={{ width: 80, height: 200, marginRight: 0 }}
                                    />
                                )
                            })}
                        </ScrollView>
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
    imageContainer: {
        flex: 1,
        paddingBottom: 30
    },
    imageContainerInner: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        marginBottom: '80%'
    },
    headerIcon: {
        fontSize: 32,
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
        bottom: 70,
        width: '100%',
        // alignSelf: 'center',
        // flexDirection: 'row',
        // flex: 1,
        // width: '100%',
        // padding: 20,
        // justifyContent: 'bottom',
    },
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        zIndex: 1,
        // bottom: 0,
    },
    button: {
        width: 80,
        height: 140,
        bottom: -45,
        borderRadius: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.pinky,
    }
})