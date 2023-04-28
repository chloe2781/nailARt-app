import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinkContext } from "../context/link";
import axios from "axios";
import FooterList from "../components/footer/FooterList";
import LinkView from "./LinkView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../styles/theme.style";
import AppLoading from "expo-app-loading";
import nails_image from "../assets/nails.png";
import { AuthContext } from "../context/auth";


const Home = ({ navigation }) => {
    let [fontsLoaded] = theme.useFonts();
    const [links, setLinks] = useContext(LinkContext);
    const [bookmarkedLinks, setBookmarkedLinks] = useState([]);
    const [bookmarkCounts, setBookmarkCounts] = useState(0);
    const [name, setName] = useState("");
    const [image, setImage] = useState({
        url: "",
        public_id: ""
    });
    const [state, setState] = useContext(AuthContext);

    useEffect(() => {
        if (state) {
            const { name, email, role, image } = state.user;
            setName(name);
            setImage(image);
        }
    }, [state]);


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

    const handleBookmark = (link) => {
        const linkId = link._id;
        const isBookmarked = bookmarkedLinks.includes(linkId);

        if (isBookmarked) {
            // Remove bookmark
            setBookmarkedLinks(bookmarkedLinks.filter(id => id !== linkId));
            setBookmarkCounts({
                ...bookmarkCounts,
                [linkId]: bookmarkCounts[linkId] - 1
            });
        } else {
            // Add bookmark
            setBookmarkedLinks([...bookmarkedLinks, linkId]);
            setBookmarkCounts({
                ...bookmarkCounts,
                [linkId]: (bookmarkCounts[linkId] || 0) + 1
            });
        }
    };



    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nailsets = [
        require('../assets/nail-sets/nails1.png'),
        require('../assets/nail-sets/nails2.png'),
        require('../assets/nail-sets/nails3.png'),
        require('../assets/nail-sets/nails4.png'),
        require('../assets/nail-sets/nails5.png'),
        require('../assets/nail-sets/nails6.png'),

    ];

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.mainText}> <FontAwesome5 name="globe-asia" solid style={styles.headerIcon} />  explore </Text>
                    <Text style={styles.subText}>inspirations</Text>
                    {links && links.map((item, index) => (
                        <View key={item._id} style={{ alignItems: "left" }}>
                            <Image source={{ uri: image.url }} style={styles.imageStyles} />
                            <View style={styles.box}>
                                <View style={styles.boxImageView}>

                                    <Image style={styles.boxImage}
                                        source={nailsets[index % nailsets.length]} />
                                </View>
                                <View style={{ position: "absolute", bottom: '30%', right: 16 }}>
                                    {/* <Text style={styles.viewText}>{item.views}</Text> */}
                                    {/* <Text style={styles.viewText}>{bookmarkCount + item.views}</Text> */}
                                    {bookmarkedLinks.includes(item._id) || (
                                        <Text style={styles.viewText}>{item.views} </Text>
                                    )}
                                    {bookmarkedLinks.includes(item._id) && (
                                        <Text style={styles.viewText}>{bookmarkCounts[item._id] + item.views} </Text>
                                    )}
                                    {/* <FontAwesome5 name="bookmark"
                                        solid={bookmarked}
                                        size={22}
                                        color={theme.colors.post_background}
                                        onPress={() => {
                                            if (bookmarked) {
                                                setBookmarked(false);
                                                setBookmarkCount(bookmarkCount - 1);
                                            } else {
                                                setBookmarked(true);
                                                setBookmarkCount(bookmarkCount + 1);
                                            }
                                        }} /> */}
                                    <TouchableOpacity onPress={() => handleBookmark(item)} style={{}}>
                                        {bookmarkedLinks.includes(item._id) ? (
                                            <FontAwesome5 name="bookmark" solid size={22} color={theme.colors.post_background} />
                                        ) : (
                                            <FontAwesome5 name="bookmark" regular size={22} color={theme.colors.post_background} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: "absolute", bottom: '18%', right: 10 }}>
                                    <FontAwesome5 name="share-square" solid size={22} color={theme.colors.post_background} />
                                </View>
                                <TouchableOpacity onPress={() => handlePress(item)}>
                                    <View style={{ padding: 5, height: 50 }}>
                                        <Text style={styles.boxText}>{item.title}</Text>
                                        {/* <Text style={styles.linkText}>{item.link}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={{ marginVertical: 120 }} />
                </ScrollView>
                <FooterList />
            </SafeAreaView >
        );
    }
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
    mainText: {
        fontSize: 36,
        marginLeft: 30,
        fontFamily: theme.fonts.ss_black,
        color: theme.colors.dark_blue,
    },
    subText: {
        fontSize: 25,
        marginLeft: 38,
        marginTop: 5,
        marginBottom: 30,
        fontFamily: theme.fonts.sc_light,
        color: theme.colors.dark_blue,
        textTransform: "uppercase",
    },
    viewText: {
        fontSize: 20,
        color: theme.colors.dark_blue,
        textAlign: "center",
        fontFamily: theme.fonts.ss_regular,
    },
    imageStyles: {
        position: "absolute",
        // align on the right
        top: 20,
        right: 15,
        width: 70,
        height: 70,
        // marginVertical: 20,
        borderRadius: 100,
        zIndex: 2,
    },
    box: {
        width: "89%",
        aspectRatio: 1,
        backgroundColor: theme.colors.gray_gal,
        shadowColor: "#171717",
        shadowOffset: { width: 10, height: 11 },
        shadowOpacity: 0.15,
        shadowRadius: 7,
        marginBottom: 25,
        zIndex: 1,
    },
    boxImageView: {
        marginTop: "5%",
        marginLeft: "7%",
        width: "80%",
        height: "80%",
        borderRadius: 50,
        backgroundColor: theme.colors.post_background,
        shadowColor: "#171717",
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 7,
        // zIndex: 2,
    },
    boxImage: {
        // marginTop: "5%",
        // marginLeft: "7%",
        // width: "80%",
        // height: "80%",
        // borderRadius: 50,
        // backgroundColor: theme.colors.post_background,
        // shadowColor: "#171717",
        // shadowOffset: { width: 10, height: 11 },
        // shadowOpacity: 0.15,
        // shadowRadius: 7,
        // zIndex: 2,
        width: "100%",
        height: "100%",
    },
    boxText: {
        fontSize: 22,
        color: "#171717",
        fontFamily: theme.fonts.ss_regular,
        paddingTop: 10,
        paddingBottom: 5,
        marginLeft: "7%",
    },
    linkText: {
        fontSize: 16,
        color: "darkgray",
        textDecorationLine: "underline",
    },
});

export default Home;