import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, TouchableOpacity } from "react-native";
import React, { userContext, useEffect } from "react";
import FooterList from "../components/footer/FooterList";
import axios from "axios";
import { LinkContext } from "../context/link";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Links = ({ navigation }) => {
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
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>Trending Links</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {links && links.sort((a, b) => (a.views < b.views ? 1 : -1)).slice(0, 3).map(item => (
                    <View key={item._id} style={{ alignItems: "center" }}>
                        <View style={styles.box}>
                            <Image style={styles.boxImage}
                                source={{ uri: 'https://placeimg.com/500/500/tech' }} />
                            <View style={{ position: "absolute", top: 20, right: 20 }}>
                                <FontAwesome5 name="eye" size={25} color="#ffc600" />
                                <Text style={styles.viewText}>{item.views}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handlePress(item)}>
                                <View style={{ padding: 5, height: 50 }}>
                                    <Text style={styles.boxText}>{item.title}</Text>
                                    <Text style={styles.linkText}>{item.link}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <FooterList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainText: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
    },
    viewText: {
        color: "#ffc600",
        fontSize: 20,
        textAlign: "center",
    },
    box: {
        width: 400,
        height: 300,
        backgroundColor: "#fff",
        borderRadius: 14,
        shadowColor: "#171717",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginRight: 20,
    },
    boxImage: {
        width: "100%",
        height: "70%",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    boxText: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: "bold",
        color: "#171717",
    },
    linkText: {
        fontSize: 15,
        color: "darkgray",
        textDecorationLine: "underline",
    },
});

export default Links;