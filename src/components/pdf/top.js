import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function Top({dane}) {
    Font.register({family: 'OpenSans-Bold', src: require('../../fonts/OpenSans-Bold.ttf')});
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
        },
        h1: {
            fontSize: 14,
            fontFamily: 'OpenSans-Bold',
            flexGrow: 1
        },
        logo_title: {
            textAlign: 'center', 
            textTransform: "capitalize",
            fontFamily: 'OpenSans-Bold',
            width: '50%'
        },
        normal_text: {
            paddingRight: 4,
            fontSize: 10,
            fontFamily: "OpenSans",
            textAlign: 'right',
            width: 200
        },
        table_title: {
            backgroundColor: "lightgray",
            color: "black",
            fontSize: 9,
            fontFamily: 'OpenSans-Bold',
            width: 200,
            padding: 4,
            textAlign: 'center'
        },
    });

    return(
        <View style={styles.top}>
            <View>
              <Text style={styles.h1}>Faktura nr {`${ dane.skrot }/${ dane.nrFaktury }/2020`}</Text>
              <Text style={styles.logo_title}>{ dane.firma }</Text>
            </View>
            <View>
              <Text style={styles.table_title}>Miejsce Wystawienia</Text>
              <Text style={styles.normal_text}>{ dane.miejsceWystawienia }</Text>
              <View style={{marginTop: 4}}></View>
              <Text style={styles.table_title}>dane Wystawienia</Text>
              <Text style={styles.normal_text}>{ dane.dataWystawienia }</Text>
            </View>
          </View>
    )
}

export default Top;