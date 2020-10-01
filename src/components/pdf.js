import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Top from './pdf/top';
import Info from './pdf/info';
import TableItems from './pdf/tableItems';
import TableRates from './pdf/tableRates';
import Summary from './pdf/summary';
import Bottom from './pdf/bottom';

function MyDocument({ data }) {
  Font.register({family: 'OpenSans', src: require('../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        color: 'E4E4E4'
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
        padding: "2 7",
        border: "1 solid black",
      },
    })
    const dataTable = ["Lp.", "Nazwa towaru lub usługi", "Ilość", "J.m.", "Cena\nbrutto", "Wartość\nnetto", "Stawka\nVAT", "Kwota\nVAT", "Wartość\nbrutto"];
    const sprzedawca = data.sprzedawca
    const klient = data.klient;
    const przedmioty = data.przedmioty;
    const dane = data.dane;
    const suma = data.suma;
    const stawki = Object.values(suma ? suma : {stawka_23: ""}).filter(item => (typeof(item) === "object"));
    const fixedSprzedawca = {
      ...sprzedawca,
      kod: `${sprzedawca.kod.slice(0, 2)}-${sprzedawca.kod.slice(2)}`,
      nip: `${sprzedawca.nip.slice(0,3)}-${sprzedawca.nip.slice(3, 6)}-${sprzedawca.nip.slice(6, 8)}-${sprzedawca.nip.slice(8)}`,
      telefon: `${sprzedawca.telefon.slice(0, 2)} ${sprzedawca.telefon.slice(2, 5)}-${sprzedawca.telefon.slice(5, 7)}-${sprzedawca.telefon.slice(7)}` 
    }
    const fixedKlient = {
      ...klient,
      kod: `${klient.kod.slice(0, 2)}-${klient.kod.slice(2)}`,
      telefon: `${klient.telefon.slice(0, 2)} ${klient.telefon.slice(2, 5)}-${klient.telefon.slice(5, 7)}-${klient.telefon.slice(7)}`  
    }
    const daneSprzedawca = ["Sprzedawca", fixedSprzedawca.firma, `ul. ${fixedSprzedawca.ulica} ${fixedSprzedawca.nr}`, `${fixedSprzedawca.kod} ${fixedSprzedawca.miejscowosc}`, `NIP: ${fixedSprzedawca.nip}, REGON: ${fixedSprzedawca.regon}`, `Tel: +48 ${fixedSprzedawca.telefon}`];
    const daneKlient = ["Nabywca", fixedKlient.nazwa, `ul. ${fixedKlient.ulica} ${fixedKlient.nr}`, `${fixedKlient.kod} ${fixedKlient.miejscowosc}`, `Tel: +48 ${fixedKlient.telefon}`];
    const daneTop = {
      skrot: fixedSprzedawca.skrot,
      nrFaktury: fixedSprzedawca.nr_faktury,
      firma: fixedSprzedawca.firma,
      miejsceWystawienia: dane.miejsce_wystawienia,
      dataWystawienia: dane.data_wystawienia
    }

    return(
      <Document style={styles.doc}>
        <Page size="A4" style={styles.page}>
          <Top dane={daneTop} />
          <View>
            <Text style={styles.nr_zamowienia}>Zamówienie nr { dane.nr_zamowienia }</Text>
          </View>
          <View style={styles.dane_kontaktowe}>
            <Info dane={daneSprzedawca} moreStyle={'0px 10px 10px 20px'} />
            <Info dane={daneKlient} moreStyle={'0px 20px 10px 10px'} />
          </View>
          <View style={styles.table_header}>
            {dataTable.map((item, index) => (
              <View key={index} style={styles.item_table_header}>
                {index===1 ? <Text style={{width: 203}}>{item}</Text> : <Text>{item}</Text>}
              </View>
            ))}
          </View>
          <TableItems przedmioty={przedmioty} suma={suma} />
          <TableRates stawki={stawki} />
          <Summary dane={dane} suma={suma} />
          <Bottom />
        </Page>
      </Document>
    )
  }

  export default MyDocument;