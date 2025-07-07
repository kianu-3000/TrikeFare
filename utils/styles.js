import { StyleSheet } from 'react-native';
import { Constants } from '../constants/constants';

const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.PADDING.REGULAR
    },

    // Header
    headerContainer: {  
        flex: 0,
        padding: Constants.PADDING.REGULAR,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.COLORS.RED
    },
    textTitle: {
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.HEADINGS,
        fontFamily: 'Montserrat-Bold'
    }
});

export {globalStyle};