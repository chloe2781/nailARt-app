import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterItem from "./FooterItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterList = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <FooterItem text="Home" name="home" screenName="Home" handlePress={() => navigation.navigate("Home")} routeName={route.name} />
            <FooterItem text="Post" name="plus-square" screenName="Post" handlePress={() => navigation.navigate("Post")} routeName={route.name} />
            <FooterItem text="Links" name="list-ol" screenName="Links" handlePress={() => navigation.navigate("Links")} routeName={route.name} />
            <FooterItem text="Account" name="user" screenName="Account" handlePress={() => navigation.navigate("Account")} routeName={route.name} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
    },
});

export default FooterList;