import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

function MyDocument({ data }) {
  Font.register({family: 'OpenSans-Bold', src: require('../fonts/OpenSans-Bold.ttf')});
  Font.register({family: 'OpenSans', src: require('../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        color: 'E4E4E4'
      },
      top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
      },
      logo_title: {
        textAlign: 'center', 
        textTransform: "capitalize",
        fontFamily: 'OpenSans-Bold',
        width: '50%'
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
      nr_zamowienia: {
        fontSize: 10,
        textAlign: 'right',
        marginRight: 22,
        marginBottom: 4
      },
      dane_kontaktowe: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
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
      normal_text: {
        paddingRight: 4,
        fontSize: 10,
        fontFamily: "OpenSans",
        textAlign: 'right',
        width: 200
      },
      h1: {
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
        flexGrow: 1
      },
      table_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        fontFamily: "OpenSans",
        fontSize: 9.5,
        margin: "10 20 0 20",
        backgroundColor: "lightgray"
      },
      item_table_header: {
        display: "flex",
        justifyContent: "center",
        height: 38,
        padding: "2 6",
        border: "1 solid black",
      },
      table_main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
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
        padding: "2 6",
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
    })
    const dataTable = ["Lp.", "Nazwa towaru lub usługi", "Ilość", "l.m.", "Cena\nbrutto", "Wartość\nnetto", "Stawka\nVAT", "Kwota\nVAT", "Wartość\nbrutto"];
    const sprzedawca = data.sprzedawca
    const klient = data.klient;
    const przedmioty = data.przedmioty;
    const suma = data.suma;
    const kwotaVat = (brutto, netto) => {
      const suma = Number(brutto) - Number(netto);
      return suma.toFixed(2);
    };
    const dziesietne = (wartosc) => Number(wartosc).toFixed(2);
    const stawki = Object.values(suma ? suma : {stawka_23: ""}).filter(item => (typeof(item) === "object"))

    return(
      <Document style={styles.doc}>
        <Page size="A4" style={styles.page}>
          <View style={styles.top}>
            <View>
              <Text style={styles.h1}>Faktura nr {`${sprzedawca.skrot}/${sprzedawca.nr_faktury}/2020`}</Text>
              <Text style={styles.logo_title}>{ sprzedawca.firma }</Text>
            </View>
            <View>
              <Text style={styles.table_title}>Miejsce Wystawienia</Text>
              <Text style={styles.normal_text}>{ /*data.miejsce_wystawienia*/ }</Text>
              <View style={{marginTop: 4}}></View>
              <Text style={styles.table_title}>Data Wystawienia</Text>
              <Text style={styles.normal_text}>{ /*data.data_wystawienia*/ }</Text>
            </View>
          </View>

          <View>
            <Text style={styles.nr_zamowienia}>Zamówienie nr { /*data.nr_zamowienia*/ }</Text>
          </View>

          <View style={styles.dane_kontaktowe}>
            <View style={{flexBasis: '45%', margin: '0px 10px 10px 20px'}}>
              <Text style={styles.dane_kontaktowe_title}>Sprzedawca</Text>
              <Text style={styles.dane_kontaktowe_text_bold}>{sprzedawca.firma}</Text>
              <Text style={styles.dane_kontaktowe_text}>ul. {sprzedawca.ulica} {sprzedawca.nr}</Text>
              <Text style={styles.dane_kontaktowe_text}>{sprzedawca.kod} {sprzedawca.miejscowosc}</Text>
              <Text style={styles.dane_kontaktowe_text}>NIP: {sprzedawca.nip} REGON: {sprzedawca.regon}</Text>
              <Text style={styles.dane_kontaktowe_text}>Tel: +48 {sprzedawca.telefon}</Text>
            </View>
            <View style={{flexBasis: "45%", margin: '0px 20px 10px 10px'}}>
              <Text style={styles.dane_kontaktowe_title}>Nabywca</Text>
              <Text style={styles.dane_kontaktowe_text_bold}>{klient.nazwa}</Text>
              <Text style={styles.dane_kontaktowe_text}>ul. {klient.ulica} {klient.nr}</Text>
              <Text style={styles.dane_kontaktowe_text}>{klient.kod} {klient.miejscowosc}</Text>
              <Text style={styles.dane_kontaktowe_text}>Tel: +48 {klient.telefon}</Text>
            </View>
          </View>

          <View style={styles.table_header}>
            {dataTable.map((item, index) => (
              <View key={index} style={styles.item_table_header}>
                {index===1 ? <Text style={{width: 220}}>{item}</Text> : <Text>{item}</Text>}
              </View>
            ))}
          </View>

          <View style={styles.table_main}>
            {Object.values(przedmioty).map((przedmiot, index) => (
              <View key={index} style={styles.item_table}>
                <View style={styles.item_table_text}>
                  <Text style={{width: 13}}>{index + 1}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 220, textAlign: "left"}}>{przedmiot.nazwa}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 20}}>{przedmiot.ilosc}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 16}}>{przedmiot.rodzaj}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 28}}>{dziesietne(przedmiot.brutto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 36}}>{dziesietne(przedmiot.netto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 31.5}}>{przedmiot.vat}%</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 27.5}}>{kwotaVat(przedmiot.brutto, przedmiot.netto)}</Text>
                </View>
                <View style={styles.item_table_text}>
                  <Text style={{width: 36}}>{przedmiot.brutto}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.table_suma}>
            <View>
              <Text style={{width: 40, fontFamily: 'OpenSans-Bold', padding: 2}}>RAZEM:</Text>
            </View>
            <View>
              <Text style={{width: 52, border: 2, borderTop: 0, padding: 2, textAlign: "right"}}>{/*suma.netto*/}</Text>
            </View>
            <View>
              <Text style={{width: 44}}></Text>
            </View>
            <View>
              <Text style={{width: 41, borderBottom: 2, borderLeft: 2, padding: 2, textAlign: "right"}}>{/*suma.vat*/}</Text>
            </View>
            <View>
              <Text style={{width: 52, border: 2, borderTop: 0, fontFamily: 'OpenSans-Bold', padding: 2, textAlign: "right"}}>{/*suma.brutto*/}</Text>
            </View>
          </View>

          <View style={{display: "flex", alignItems: "flex-end", fontFamily: "OpenSans", margin: 20}}>
            <View>
              <Text style={{fontSize: 9, width: 200}}>Zestawienie sprzedaży w/g stawek podatku</Text>
            </View>
            <View style={{border: 1, fontSize: 9}}>
              <View style={{display: "fex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", backgroundColor: "lightgray", borderBottom: 1}}>
                <View style={{width: 39}}>
                  <Text style={{textAlign: "right", padding: "2 6"}}>Netto</Text>
                </View>
                <View style={{width: 60, borderLeft: 1}}>
                  <Text style={{textAlign: "right", padding: "2 6"}}>Stawka VAT</Text>
                </View>
                <View style={{width: 56, borderLeft: 1}}>
                  <Text style={{textAlign: "right", padding: "2 6"}}>Kwota VAT</Text>
                </View>
                <View style={{width: 44, borderLeft: 1}}>
                  <Text style={{textAlign: "right", padding: "2 6"}}>Brutto</Text>
                </View>
              </View>
              {stawki.map(stawka => {
                if(stawka === null) {
                  return <View></View>
                } else {
                  return (<View style={{display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
                    <View style={{width: 39}}>
                      <Text style={{textAlign: "right", padding: "2 6"}}>{stawka.netto}</Text>
                    </View>
                    <View style={{width: 60, borderLeft: 1}}>
                      <Text style={{textAlign: "right", padding: "2 6"}}>{stawka.stawka_vat}</Text>
                    </View>
                    <View style={{width: 56, borderLeft: 1}}>
                      <Text style={{textAlign: "right", padding: "2 6"}}>{stawka.kwota_vat}</Text>
                    </View>
                    <View style={{width: 44, borderLeft: 1}}>
                      <Text style={{textAlign: "right", padding: "2 6"}}>{stawka.brutto}</Text>
                    </View>
                  </View>
                  )}
              })}
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  export default MyDocument;