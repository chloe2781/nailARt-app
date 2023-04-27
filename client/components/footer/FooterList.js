import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterItem from "./FooterItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterList = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <FooterItem text="Home" name="globe-asia" screenName="Home" handlePress={() => navigation.navigate("Home")} routeName={route.name} />
            <FooterItem text="Post" name="hand-sparkles" screenName="SeeNails" handlePress={() => navigation.navigate("SeeNails")} routeName={route.name} />
            {/* <FooterItem text="Links" name="list-ol" screenName="Links" handlePress={() => navigation.navigate("Links")} routeName={route.name} /> */}
            <FooterItem text="Account" name="user" screenName="Account" handlePress={() => navigation.navigate("Account")} routeName={route.name} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 42,
        marginHorizontal: 70,
        borderRadius: 50,
        justifyContent: "space-between",
        backgroundColor: "rgba(252, 249, 246, 0.6)",
        // opacity: 0.7,
        marginTop: '-50%',
    },
});

export default FooterList;