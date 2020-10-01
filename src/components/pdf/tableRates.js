import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

function TableRates({stawki}) {
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        table: {display: "flex", alignItems: "flex-end", fontFamily: "OpenSans", margin: 20},
        table_body: {display: "fex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "lightgray", borderBottom: 1},
        text: {textAlign: "right", padding: "2 6"},
        stawka: {display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}
    });
    const converter = (value) => {
        return Number(value).toFixed(2);
    }

    return(
        <View style={styles.table}>
            <View>
              <Text style={{fontSize: 9, width: 200}}>Zestawienie sprzedaży w/g stawek podatku</Text>
            </View>
            <View style={{border: 1, fontSize: 9}}>
              <View style={styles.table_body}>
                <View style={{width: 39}}>
                  <Text style={styles.text}>Netto</Text>
                </View>
                <View style={{width: 60, borderLeft: 1}}>
                  <Text style={styles.text}>Stawka VAT</Text>
                </View>
                <View style={{width: 56, borderLeft: 1}}>
                  <Text style={styles.text}>Kwota VAT</Text>
                </View>
                <View style={{width: 44, borderLeft: 1}}>
                  <Text style={styles.text}>Brutto</Text>
                </View>
              </View>
              {stawki.map((stawka, index) => {
                if(stawka === null) {
                  return <View></View>
                } else {
                  return (<View key={index} style={styles.stawka}>
                    <View style={{width: 39}}>
                      <Text style={styles.text}>{converter(stawka.netto)}</Text>
                    </View>
                    <View style={{width: 60, borderLeft: 1}}>
                      <Text style={styles.text}>{stawka.stawka_vat}</Text>
                    </View>
                    <View style={{width: 56, borderLeft: 1}}>
                      <Text style={styles.text}>{stawka.kwota_vat}</Text>
                    </View>
                    <View style={{width: 44, borderLeft: 1}}>
                      <Text style={styles.text}>{converter(stawka.brutto)}</Text>
                    </View>
                  </View>
                  )}
              })}
            </View>
        </View>
    )
}

export default TableRates;