import { TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderTabs = () => {
    const [state, setState] = useContext(AuthContext);

    const signOut = async () => {
        setState({ user: "", token: "" });
        await AsyncStorage.removeItem("auth-rn");
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={signOut}>
                <FontAwesome5 name="sign-out-alt" size={25} color="darkmagenta" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default HeaderTabs;