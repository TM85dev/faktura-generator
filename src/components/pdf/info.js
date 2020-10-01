import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function Info({dane, moreStyle}) {
    Font.register({family: 'OpenSans-Bold', src: require('../../fonts/OpenSans-Bold.ttf')});
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        dane_kontaktowe_title: {
            borderTop: 1,
            backgroundColor: "lightgray",
            color: "black",
            fontSize: 11,
            fontFamily: 'OpenSans-Bold',
            padding: 4,
            textAlign: 'left'
        },
        dane_kontaktowe_text: {
            fontFamily: 'OpenSans',
            fontSize: 10,
            margin: "0px 2px",
            lineHeight: 1.1
        },
          dane_kontaktowe_text_bold: {
            fontFamily: 'OpenSans-Bold',
            fontSize: 10,
            margin: "0px 2px"
        },
    });

    return(
        <View style={{flexBasis: '45%', margin: moreStyle}}>
            {dane.map((item, index) => (
                <Text style={index===0 ? styles.dane_kontaktowe_title : (index===1 ? styles.dane_kontaktowe_text_bold : styles.dane_kontaktowe_text)}>
                    {item}
                </Text>
            ))}
        </View>
    )
}

export default Info;