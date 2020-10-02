import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function Bank({dane}) {
    Font.register({family: 'OpenSans-Bold', src: require('../../fonts/OpenSans-Bold.ttf')});
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        box: {width: "49%", fontFamily: "OpenSans", fontSize: 9.5},
        sposob_zaplaty: {
            display: "Flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            borderTop: 1, 
            borderBottom: 1
        },
        termin_zaplaty: {
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            borderBottom: 1
        },
        bank: {
            marginTop: 30, 
            display: "flex", 
            borderTop: 1, 
            borderBottom: 1, 
            padding: "4 2", 
            fontFamily: "OpenSans", 
            fontSize: 9.5
        },
        bank_nazwa: {display: "flex", flexDirection: "row", justifyContent: "space-between"},
        bank_nr: {display: "flex", flexDirection: "row", justifyContent: "space-between"},
    });
    const termin = (value, iloscDni) => {
        const data = value.length>0 ? value.split("-") : "";
        return iloscDni<=0 ? "zapłacono" :  `${data[2]}.${data[1]}.${data[0]}`
    }
    const converter = (sposobZaplaty, iloscDni) => {
        return iloscDni<=0 ? `${sposobZaplaty}` : `${sposobZaplaty} ${iloscDni} dni`;
    }
    return(
        <View style={styles.box}>
            <View style={styles.sposob_zaplaty}>
                <Text>Sposób zapłaty: </Text>
                <Text>{converter(dane.sposob_zaplaty, dane.dni_do_zaplaty)}</Text>
            </View>
            <View style={styles.termin_zaplaty}>
                <Text>Termin zapłaty:</Text>
                <Text>{termin(dane.termin_zaplaty, dane.dni_do_zaplaty)}</Text>
            </View>
            <View style={styles.bank}>
                <View style={styles.bank_nazwa}>
                    <Text>Numer</Text>
                    <Text>{dane.nazwa_banku}</Text>
                </View>
                <View style={styles.bank_nr}>
                    <Text>rachunku</Text>
                    <Text>{dane.nr_konta}</Text>
                </View>
            </View>
        </View>
    )
}

export default Bank;