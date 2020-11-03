import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 3,
    },
    title: {
        fontFamily: "Ubuntu_700Bold",
    },
    textItem: {
        flexDirection: "row",
    },
    quantity: {
        flexDirection: "row",
    },
    quantityText: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    price: {
        paddingLeft: 20,
        flex: 1,
    }
});

export default styles;