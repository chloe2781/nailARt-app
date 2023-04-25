import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import theme from "../../styles/theme.style";

const FooterItem = ({ name, text, handlePress, screenName, routeName }) => {
    const activeScreenColor = screenName === routeName ? theme.colors.dark_blue : theme.colors.light_blue;

    return (
        <TouchableOpacity onPress={handlePress}>
            <>
                <FontAwesome5 name={name} solid size={30} style={styles.fontStyle} color={activeScreenColor} />
                {/* <Text style={styles.iconText}>{text}</Text> */}
            </>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fontStyle: {
        marginBottom: 3,
        alignSelf: "center",
    },
    // iconText: { textAlign: "center", fontSize: 12, textTransform: "uppercase" },
});

export default FooterItem;
