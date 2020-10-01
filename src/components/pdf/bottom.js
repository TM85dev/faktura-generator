import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function Bottom() {
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        box: {display: "flex", flexDirection: "row", width: "100%", marginTop: 30, justifyContent: "space-around"},
        view: {width: 200, height: 100, border: 1},
        text: {textAlign: "center", backgroundColor: "lightgray", color: "black", fontFamily: "OpenSans", fontSize: 9.5, padding: 1}
    });
    return(
        <View style={styles.box}>
            <View style={styles.view}>
                <Text style={styles.text}>Wystawił(a)</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>Odebrał(a)</Text>
            </View>
        </View>
    )
}

export default Bottom;