import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationScreen from './NavigationScreen';
import { AuthProvider } from "../context/auth";
import { LinkProvider } from "../context/link";

const Navigation = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <LinkProvider>
                    <NavigationScreen />
                </LinkProvider>
            </AuthProvider>
        </NavigationContainer>

    );
}

export default Navigation;