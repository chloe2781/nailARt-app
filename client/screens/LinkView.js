import React, { useEffect, useState } from "react";
// import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Button } from "react-native";

const LinkView = ({ route }) => {
    const [weblink, setWeblink] = useState("");

    useEffect(() => {
        if (route.params?.link) {
            if (route.params.link.link.includes("http" || "https")) {
                setWeblink(route.params.link.link);
            } else {
                setWeblink(`http://${route.params.link.link}`);
            }
        }
    }, [route.params?.link]);

    const handleOpenWebBrowser = async () => {
        await WebBrowser.openBrowserAsync(weblink);
    };

    // return <WebView startInLoadingState source={{ uri: weblink }} />;
    return (
        // Render a button or a touchable element to open the web page
        <Button title="Open Web Page" onPress={handleOpenWebBrowser} />
    );

}

export default LinkView;