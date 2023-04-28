import React, { useEffect, useState } from "react";
// import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Button, View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, ScrollView, Modal } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../styles/theme.style";
import { BlurView } from 'expo-blur';
import FooterList from "../components/footer/FooterList";
import SeeNails from "./SeeNails";
import back_hand from "../assets/back_hand.png";

const Design = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedNail, setSelectedNail] = useState(null);


    const nailsets = [
        require('../assets/nail-sets/nails1.png'),
        require('../assets/nail-sets/nails2.png'),
        require('../assets/nail-sets/nails3.png'),
        require('../assets/nail-sets/nails4.png'),
        require('../assets/nail-sets/nails5.png'),
        require('../assets/nail-sets/nails6.png'),

    ];

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container} >

            <View>
                <Text style={styles.signupText}><FontAwesome5 name="palette" style={styles.headerIcon} />  design </Text>
            </View>
            <View style={styles.instruction}>
                <Text style={{ fontSize: 16, fontFamily: theme.fonts.sc_light, marginBottom: 5 }}>
                    <FontAwesome5 name="lightbulb"
                        solid
                        style={{ color: theme.colors.yellow_mellow, fontSize: 25 }}
                    />   Click on the nail you want to design
                </Text>
            </View>
            <View style={styles.handContainer}>
                <Image style={styles.hand} source={back_hand} />
                <View style={[styles.nailShape, styles.thumb]}>
                    <TouchableOpacity style={[styles.invisibleThumb, selectedNail === 'thumb' && styles.selectedNail]}
                        onPress={() => setSelectedNail('thumb')}>
                    </TouchableOpacity>
                </View>

                <View style={[styles.nailShape, styles.pointer]}>
                    <TouchableOpacity style={[styles.invisiblePointer, selectedNail === 'pointer' && styles.selectedNail]}
                        onPress={() => setSelectedNail('pointer')}>
                    </TouchableOpacity>
                </View>

                <View style={[styles.nailShape, styles.middle]}>
                    <TouchableOpacity style={[styles.invisibleMiddle, selectedNail === 'middle' && styles.selectedNail]}
                        onPress={() => setSelectedNail('middle')}>
                    </TouchableOpacity>
                </View>

                <View style={[styles.nailShape, styles.ring]}>
                    <TouchableOpacity style={[styles.invisibleRing, selectedNail === 'ring' && styles.selectedNail]}
                        onPress={() => setSelectedNail('ring')}>
                    </TouchableOpacity>
                </View>

                <View style={[styles.nailShape, styles.pinky]}>
                    <TouchableOpacity style={[styles.invisiblePinky, selectedNail === 'pinky' && styles.selectedNail]}
                        onPress={() => setSelectedNail('pinky')}>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.nailContainer}>

            </View>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("SeeNails")} style={{ zIndex: 2, alignItems: 'center' }}>
                    <FontAwesome5 name="arrow-circle-left" solid style={{ fontSize: 45, color: theme.colors.pinky }} />
                    <Text style={{ fontSize: 20, color: theme.colors.pinky, marginTop: 5 }}>back</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("SeeNails")} style={{ zIndex: 2, alignItems: 'center' }}>
                    <FontAwesome5 name="arrow-circle-right" solid style={{ fontSize: 45, color: theme.colors.pinky }} />
                    <Text style={{ fontSize: 20, color: theme.colors.pinky, marginTop: 5 }}>next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <FooterList />
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerIcon: {
        fontSize: 28,
        color: theme.colors.dark_blue,
        marginRight: 15,
    },
    signupText: {
        fontSize: 36,
        marginLeft: 30,
        marginTop: 10,
        fontFamily: theme.fonts.ss_black,
        color: theme.colors.dark_blue,
    },
    instruction: {
        backgroundColor: 'white',
        width: '70%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '7%',
        borderRadius: 10,
        marginTop: 20,
        shadowColor: theme.colors.gray_gal,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    handContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15%'
    },
    hand: {
        width: 450,
        height: 450,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    backButtonContainer: {
        position: 'absolute',
        alignSelf: 'left',
        bottom: '15%',
        // top: 40,
        left: 60,
    },
    nextButtonContainer: {
        position: 'absolute',
        alignSelf: 'left',
        bottom: '15%',
        // top: 40,
        right: 60,
    },
    footer: {
        marginTop: '80%',
    },
    nailShape: {
        height: 55,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderWidth: 1,
        borderColor: theme.colors.dark_blue,
    },
    thumb: {
        transform: [{ rotate: '-25deg' }],
        position: 'absolute',
        top: '40%',
        left: '8%',
        right: 0,
        bottom: 0,
        width: 40,
    },
    pointer: {
        position: 'absolute',
        top: '7%',
        left: '33.3%',
        right: 0,
        bottom: 0,
        width: 41,
    },
    middle: {
        position: 'absolute',
        top: -5,
        left: '48.5%',
        right: 0,
        bottom: 0,
        width: 42,
    },
    ring: {
        position: 'absolute',
        top: '5%',
        left: '63.8%',
        right: 0,
        bottom: 0,
        width: 40,
    },
    pinky: {
        position: 'absolute',
        top: '17%',
        left: '79.3%',
        right: 0,
        bottom: 0,
        width: 38,
    },
    selectedNail: {
        position: 'absolute',
        height: 100,
        width: 60,
        borderWidth: 2,
        borderColor: theme.colors.pinky,
        borderRadius: 50,
        top: -30,
        left: -11,
    },
    invisibleThumb: {
        position: 'absolute',
        height: 100,
        width: 60,
        top: -30,
        left: -11,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    invisiblePointer: {
        position: 'absolute',
        height: 100,
        width: 60,
        top: -30,
        left: -11,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    invisibleMiddle: {
        position: 'absolute',
        height: 100,
        width: 60,
        top: -30,
        left: -11,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    invisibleRing: {
        position: 'absolute',
        height: 100,
        width: 60,
        top: -30,
        left: -11,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    invisiblePinky: {
        position: 'absolute',
        height: 100,
        width: 60,
        top: -30,
        left: -11,
        borderWidth: 2,
        borderColor: 'transparent',
    },
});


export default Design;