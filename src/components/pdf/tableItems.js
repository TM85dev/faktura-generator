import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function TableItems({przedmioty, suma}) {
    Font.register({family: 'OpenSans-Bold', src: require('../../fonts/OpenSans-Bold.ttf')});
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        table_main: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "OpenSans",
            fontSize: 9.5,
            margin: "0 20",
            borderBottom: 1,
            borderTop: 0
        },
        item_table: {
            display: 'flex',
            flexDirection: 'row',
        },
        item_table_text: {
            display: "flex",
            justifyContent: "center",
            textAlign: "right",
            height: 20,
            padding: "2 3 2 5",
            borderLeft: 1,
            borderRight: 1
        },
        table_suma: {
            display: 'flex',
            flexDirection: "row",
            margin: "0 20",
            fontFamily: "OpenSans",
            fontSize: 9.5,
            justifyContent: "flex-end",
            alignItems: "center"
        },
        razem: {width: 40, fontFamily: 'OpenSans-Bold', padding: 2},
        razem_netto: {width: 53.5, border: 2, borderTop: 0, padding: 2, textAlign: "right"},
        razem_vat: {width: 43, borderBottom: 2, borderLeft: 2, padding: 2, textAlign: "right"},
        razem_brutto: {width: 53, border: 2, borderTop: 0, fontFamily: 'OpenSans-Bold', padding: 2, textAlign: "right"}
    });
    const kwotaVat = (brutto, netto) => {
        const suma = Number(brutto) - Number(netto);
        return suma.toFixed(2);
    };
    const dziesietne = (wartosc) => Number(wartosc).toFixed(2);
    const converter = (value) => {
        return Number(value).toFixed(2);
    }
    return(
        <>
        <View style={styles.table_main}>
            {Object.values(przedmioty).map((przedmiot, index) => (
              <View key={index} style={styles.item_table}>
                <View style={styles.item_table_text}>
                  <Text style={{width: 19.5}}>{index + 1}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 209, textAlign: "left"}}>{przedmiot.nazwa}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 25.5}}>{przedmiot.ilosc}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 22.5}}>{przedmiot.jm}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 34}}>{dziesietne(przedmiot.brutto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 42}}>{dziesietne(przedmiot.wartosc_netto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 37.5}}>{przedmiot.vat}%</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 33.5}}>{kwotaVat(przedmiot.wartosc_brutto, przedmiot.wartosc_netto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 41.5}}>{przedmiot.wartosc_brutto}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.table_suma}>
            <View><Text style={styles.razem}>RAZEM:</Text></View>
            <View><Text style={styles.razem_netto}>{converter(suma.netto)}</Text></View>
            <View><Text style={{width: 46}}></Text></View>
            <View><Text style={styles.razem_vat}>{suma.vat}</Text></View>
            <View><Text style={styles.razem_brutto}>{converter(suma.brutto)}</Text></View>
          </View>
        </>
    )
}

export default TableItems;