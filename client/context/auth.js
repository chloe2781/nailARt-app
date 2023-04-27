import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: "",
        token: "",
    });

    // navigation
    const navigation = useNavigation();

    // config axios
    const token = state && state.token ? state.token : "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // handle expired token or 401 error
    axios.interceptors.response.use(
        async function (response) {
            return response;
        },
        async function (error) {
            let res = error.response;
            if (res && res.status === 400 && res.config && !res.config.__isRetryRequest) {
                console.log("expired token or 401 error");
                await AsyncStorage.removeItem("auth-rn");
                setState({ user: "", token: "" });
                navigation.navigate("SignIn");
            }
        }
    );

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            let data = await AsyncStorage.getItem("auth-rn");
            const parsed = JSON.parse(data);
            setState({ ...state, user: parsed.user, token: parsed.token });
        };
        loadFromAsyncStorage();
    }, []);

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };