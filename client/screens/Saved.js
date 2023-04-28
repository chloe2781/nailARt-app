import React, { useEffect, useState } from "react";
// import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Button, View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, ScrollView, Modal } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../styles/theme.style";
import { BlurView } from 'expo-blur';

const Saved = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

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
            <View style={styles.header}>
                <Text style={styles.signupText}><FontAwesome5 name="bookmark" solid style={styles.headerIcon} /> saved </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.backButtonContainer}>
                    <FontAwesome5 name="angle-left" style={styles.backButton} />
                    {/* <Text style={styles.backButtonText}>Back</Text> */}
                </View>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.posts}>

                    {nailsets.map((nailset, index) => (
                        <View style={styles.box}>
                            <TouchableOpacity style={styles.boxImageView}
                                onPress={() => handleImagePress(nailsets[index % nailsets.length])}
                            >
                                <Image style={styles.boxImage} key={index} source={nailset} />
                            </TouchableOpacity>
                        </View>
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

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'left',
    },
    header: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 65,
    },
    headerIcon: {
        fontSize: 28,
        color: theme.colors.dark_blue,
        marginRight: 15,
    },
    signupText: {
        fontSize: 36,
        marginLeft: 0,
        fontFamily: theme.fonts.ss_black,
        color: theme.colors.dark_blue,
        marginBottom: -10,
    },
    backButtonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 30,
    },
    backButton: {
        fontSize: 40,
        color: theme.colors.dark_blue,
    },
    backButtonText: {
        fontSize: 30,
        // marginTop: 10,
        marginLeft: 10,
        color: theme.colors.dark_blue,
        fontFamily: theme.fonts.sc_regular,
    },
    scrollView: {
        marginTop: 20,
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
        // top: '5%',
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


export default Saved;