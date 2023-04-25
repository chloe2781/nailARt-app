import AppLoading from 'expo-app-loading';
import {
    useFonts as expoUseFonts,
    SourceSerifPro_200ExtraLight,
    SourceSerifPro_200ExtraLight_Italic,
    SourceSerifPro_300Light,
    SourceSerifPro_300Light_Italic,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black,
    SourceSerifPro_900Black_Italic,
} from '@expo-google-fonts/source-serif-pro';
import {
    // useFonts as expoUseFont,
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
} from '@expo-google-fonts/source-sans-pro';

export const useFonts = () => {
    return expoUseFonts({
        SourceSerifPro_200ExtraLight,
        SourceSerifPro_200ExtraLight_Italic,
        SourceSerifPro_300Light,
        SourceSerifPro_300Light_Italic,
        SourceSerifPro_400Regular,
        SourceSerifPro_400Regular_Italic,
        SourceSerifPro_600SemiBold,
        SourceSerifPro_600SemiBold_Italic,
        SourceSerifPro_700Bold,
        SourceSerifPro_700Bold_Italic,
        SourceSerifPro_900Black,
        SourceSerifPro_900Black_Italic,
        SourceSansPro_200ExtraLight,
        SourceSansPro_200ExtraLight_Italic,
        SourceSansPro_300Light,
        SourceSansPro_300Light_Italic,
        SourceSansPro_400Regular,
        SourceSansPro_400Regular_Italic,
        SourceSansPro_600SemiBold,
        SourceSansPro_600SemiBold_Italic,
        SourceSansPro_700Bold,
        SourceSansPro_700Bold_Italic,
        SourceSansPro_900Black,
        SourceSansPro_900Black_Italic,
    });
};

export const colors = {
    // Colors
    primary_white: '#ECE9E6',
    light_blue: '#ABB3C5',
    dark_blue: '#494F64',
    white: '#FFFFFF',
    pinky: '#E0A6AA',
    yellow_mellow: '#EDD3B2',
    gray_gal: '#D9D9D9',
    post_background: '#747887',
};

export const fonts = {
    ss_extra_light: 'SourceSerifPro_200ExtraLight',
    ss_extra_light_italic: 'SourceSerifPro_200ExtraLight_Italic',
    ss_light: 'SourceSerifPro_300Light',
    ss_light_italic: 'SourceSerifPro_300Light_Italic',
    ss_regular: 'SourceSerifPro_400Regular',
    ss_regular_italic: 'SourceSerifPro_400Regular_Italic',
    ss_semibold: 'SourceSerifPro_600SemiBold',
    ss_semibold_italic: 'SourceSerifPro_600SemiBold_Italic',
    ss_bold: 'SourceSerifPro_700Bold',
    ss_bold_italic: 'SourceSerifPro_700Bold_Italic',
    ss_black: 'SourceSerifPro_900Black',
    ss_black_italic: 'SourceSerifPro_900Black_Italic',

    sc_extra_light: 'SourceSansPro_200ExtraLight',
    sc_light: 'SourceSansPro_300Light',
    sc_regular: 'SourceSansPro_400Regular',
    sc_semibold: 'SourceSansPro_600SemiBold',
    sc_bold: 'SourceSansPro_700Bold',
    sc_black: 'SourceSansPro_900Black',
    sc_extra_light_italic: 'SourceSansPro_200ExtraLight_Italic',
    sc_light_italic: 'SourceSansPro_300Light_Italic',
    sc_regular_italic: 'SourceSansPro_400Regular_Italic',
    sc_semibold_italic: 'SourceSansPro_600SemiBold_Italic',
    sc_bold_italic: 'SourceSansPro_700Bold_Italic',
    sc_black_italic: 'SourceSansPro_900Black_Italic',


};

export default {
    useFonts,
    colors,
    fonts,
}
