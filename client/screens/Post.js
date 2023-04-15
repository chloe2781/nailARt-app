import { StyleSheet, Text, SafeAreaView, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import FooterList from "../components/footer/FooterList";
import axios from "axios";
import { LinkContext } from "../context/link";

const Post = ({ navigation }) => {
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [links, setLinks] = useContext(LinkContext);

    const handleSubmit = async () => {
        if (link === "" || title === "") {
            alert("Please fill all the fields");
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:8000/api/post-link", {
                link,
                title,
            });
            console.log("data => ", data);
            setLink([data, ...links]);
            setTimeout(() => {
                alert("Link posted successfully");
                navigation.navigate("Home");
            }, 500);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.mainText}>POST</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#Be93a1' }}>LINK</Text>
                    <TextInput style={styles.signupInput} value={link} onChangeText={text => setLink(text)}
                        autoCapitalize="none" autoCorrect={false} placeholder="Paste the url" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#Be93a1' }}>TITLE</Text>
                    <TextInput style={styles.signupInput} value={title} onChangeText={text => setTitle(text)}
                        autoCapitalize="sentences" autoCorrect={false} placeholder="Title of the post" />
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
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