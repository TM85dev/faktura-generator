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
        padding: "2 7",
        border: "1 solid black",
      },
      table_main: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: "center",
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
    })
    const dataTable = ["Lp.", "Nazwa towaru lub usługi", "Ilość", "J.m.", "Cena\nbrutto", "Wartość\nnetto", "Stawka\nVAT", "Kwota\nVAT", "Wartość\nbrutto"];
    const sprzedawca = data.sprzedawca
    const klient = data.klient;
    const przedmioty = data.przedmioty;
    const dane = data.dane;
    const suma = data.suma;
    const kwotaVat = (brutto, netto) => {
      const suma = Number(brutto) - Number(netto);
      return suma.toFixed(2);
    };
    const dziesietne = (wartosc) => Number(wartosc).toFixed(2);
    const stawki = Object.values(suma ? suma : {stawka_23: ""}).filter(item => (typeof(item) === "object"));
    const termin = () => {
      const data = dane.termin_zaplaty.split("-");
      return `${data[2]}.${data[1]}.${data[0]}`
    }
    const converter = (value) => {
      return Number(value).toFixed(2);
    }
    const slownie = (value) => {
      const kwota = converter(value).split(".");
      const calosc = kwota[0].split("");
      const reszta = kwota[1];
      const jednosci = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
      const nastki = ["dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
      const dziesiatki = ["dzieścia", "dzieści", "dziesiąt"];
      const setki = ["", "sto", "dwieście", "sta", "set"];
      const tysiace = ["tysiąc", "tysiące", "tysięcy"];
      // const miliony = ["milion", "miliony", "milionów"];
      const dziesiatkiCalc = (nr1, nr10) => {
        if(nr10 === 0) {
          if(nr1 === 0) {
            return "";
          } else {
            return jednosci[nr1];
          }
        } else if(nr10 === 1) {
          return nastki[nr1];
        } else if(nr1 === 0) {
          if(nr10 === 2) {
            return `${jednosci[nr10]}${dziesiatki[0]}`;
          } else if(nr10 === 3) {
            return `${jednosci[nr10]}${dziesiatki[1]}`;
          } else if(nr10 === 4) {
            return `czter${dziesiatki[1]}`;
          } else {
            return `${jednosci[nr10]}${dziesiatki[2]}`;
          }
        } else {
          if(nr10 === 2) {
            return `${jednosci[nr10]}${dziesiatki[0]} ${jednosci[nr1]}`;
          } else if(nr10 === 3) {
            return `${jednosci[nr10]}${dziesiatki[1]} ${jednosci[nr1]}`;
          } else if(nr10 === 4) {
            return `czter${dziesiatki[1]} ${jednosci[nr1]}`;
          } else {
            return `${jednosci[nr10]}${dziesiatki[2]} ${jednosci[nr1]}`;
          }
        }        
      }
      const setkiCalc = (nr1, nr10, nr100) => {
        if(nr100 === 0) {
          return dziesiatkiCalc(nr1, nr10);
        }
        else if(nr100 === 1 || nr100 === 2) {
          if(nr1 === 0 && nr10 === 0) {
            return setki[nr100];
          } else {
            return `${setki[nr100]} ${dziesiatkiCalc(nr1, nr10)}`;
          }
        } else if(nr100 === 3 || nr100 === 4) {
          if(nr1 === 0 && nr10 === 0) {
            return `${jednosci[nr100]}${setki[3]}`
          } else {
            return `${jednosci[nr100]}${setki[3]} ${dziesiatkiCalc(nr1, nr10)}`;
          }
        } else {
          if(nr1 === 0 && nr10 === 0) {
            return `${jednosci[nr100]}${setki[4]}`;
          }
          return `${jednosci[nr100]}${setki[4]} ${dziesiatkiCalc(nr1, nr10)}`;
        }
      }
      if(calosc.length === 1) {
        const nr = Number(calosc[0])
        return jednosci[nr];
      } else if(calosc.length === 2) {
        const nr10 = Number(calosc[0]);
        const nr1 = Number(calosc[1]);
        return dziesiatkiCalc(nr1, nr10);
      } else if(calosc.length === 3) {
        const nr100 = Number(calosc[0]);
        const nr10 = Number(calosc[1]);
        const nr1 = Number(calosc[2]);
        return setkiCalc(nr1, nr10, nr100);
      } else if(calosc.length === 4) {
        const nr1000 = Number(calosc[0]);
        const nr100 = Number(calosc[1]);
        const nr10 = Number(calosc[2]);
        const nr1 = Number(calosc[3]);
        if(nr1000 === 1) {
          if(nr1 === 0 && nr10 === 0 && nr100 === 0) {
            return tysiace[0]; 
          } else {
            return `${tysiace[0]} ${setkiCalc(nr1, nr10, nr100)}`;
          }
        } else if(nr1000 > 1 && nr1000 < 5) {
          if(nr1 === 0 && nr10 === 0 && nr100 === 0) {
            return `${jednosci[nr1000]} ${tysiace[1]}`;
          } else {
            return `${jednosci[nr1000]} ${tysiace[1]} ${setkiCalc(nr1, nr10, nr100)}`;
          }
        } else {
          if(nr1 === 0 && nr10 === 0 && nr100 === 0) {
            return `${jednosci[nr1000]} ${tysiace[2]}`;
          } else {
            return `${jednosci[nr1000]} ${tysiace[2]} ${setkiCalc(nr1, nr10, nr100)}`;
          }
        }
      }
    }

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
                {index===1 ? <Text style={{width: 203}}>{item}</Text> : <Text>{item}</Text>}
              </View>
            ))}
          </View>

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
                  <Text style={{width: 22.5}}>{przedmiot.rodzaj}</Text>
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
              {stawki.map((stawka, index) => {
                if(stawka === null) {
                  return <View></View>
                } else {
                  return (<View key={index} style={{display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
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

          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "5 20"}}>
            <View style={{width: "49%", fontFamily: "OpenSans", fontSize: 9.5}}>
              <View style={{display: "Flex", flexDirection: "row", justifyContent: "space-between", borderTop: 1, borderBottom: 1}}>
                <Text>Sposób zapłaty: </Text>
                <Text>{dane.sposob_zaplaty} {dane.dni_do_zaplaty} dni</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: 1}}>
                <Text>Termin zapłaty:</Text>
                <Text>{termin()}</Text>
              </View>
            </View>
            <View style={{width: "49%", display: "flex"}}>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "lightgray", borderTop: 1, fontFamily: "OpenSans-Bold", fontSize: 14}}>
                <Text>Razem do zapłaty: </Text>
                <Text>{suma.brutto} PLN</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "lightgray", borderBottom: 1, fontFamily: "OpenSans-Bold", fontSize: 14}}>
                <Text>Wpłacono: </Text>
                <Text>{converter(dane.wplacono)} PLN</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "lightgray", fontFamily: "OpenSans-Bold", fontSize: 14}}>
                <Text>Pozostało do zapłaty: </Text>
                <Text>{converter(suma.brutto - dane.wplacono)} PLN</Text>
              </View>
              <View style={{fontFamily: "OpenSans", fontSize: 10}}>
                <Text>Słownie: {slownie(suma.brutto - dane.wplacono)} zł</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  export default MyDocument;