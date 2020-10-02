import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Bank from './bank';

function Summary({dane, suma}) {
    Font.register({family: 'OpenSans-Bold', src: require('../../fonts/OpenSans-Bold.ttf')});
    Font.register({family: 'OpenSans', src: require('../../fonts/OpenSans-Regular.ttf')});
    const styles = StyleSheet.create({
        block: {display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "5 20"},
        right: {width: "49%", display: "flex"},
        razem_zaplata: {
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            backgroundColor: "lightgray", 
            borderTop: 1, 
            fontFamily: "OpenSans-Bold", 
            fontSize: 13,
            padding: 1
        },
        wplacono: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "lightgray",
            borderBottom: 1,
            fontFamily: "OpenSans-Bold",
            fontSize: 13,
            padding: 1
        },
        pozostalo: {
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-between", 
            backgroundColor: "lightgray", 
            fontFamily: "OpenSans-Bold", 
            fontSize: 13,
            padding: 1
        },
        slownie: {fontFamily: "OpenSans", fontSize: 10}
    });

    const converter = (value) => {
        return Number(value).toFixed(2);
    }
    const slownie = (value) => {
        const kwota = converter(value).split(".");
        const calosc = kwota[0].split("");
        const jednosci = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"];
        const nastki = ["dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
        const dziesiatki = ["dzieścia", "dzieści", "dziesiąt"];
        const setki = ["", "sto", "dwieście", "sta", "set"];
        const tysiace = ["tysiąc", "tysiące", "tysięcy"];
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
          const nr = Number(calosc[0]);
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
    const resztaCalc = (value) => {
        const kwota = converter(value).split(".");
        const reszta = kwota[1];
        if(reszta !== "00") {
          return `${reszta}/100`;
        } else {
          return ""
        }
    }
    const fixedDane = {
        ...dane,
        wplacono: parseFloat(dane.wplacono),
    }

    return(
        <View style={styles.block}>
            <Bank dane={dane} />

            <View style={styles.right}>
                <View style={styles.razem_zaplata}>
                    <Text>Razem do zapłaty: </Text>
                    <Text>{converter(suma.brutto)} PLN</Text>
                </View>
                <View style={styles.wplacono}>
                    <Text>Wpłacono: </Text>
                    <Text>{converter(dane.wplacono)} PLN</Text>
                </View>
                <View style={styles.pozostalo}>
                    <Text>Pozostało do zapłaty: </Text>
                    <Text>{converter(suma.brutto - fixedDane.wplacono)} PLN</Text>
                </View>
                <View style={styles.slownie}>
                    <Text>Słownie: {slownie(suma.brutto - fixedDane.wplacono)} zł {resztaCalc(suma.brutto - fixedDane.wplacono)}</Text>
                </View>
            </View>
        </View>
    )
}

export default Summary;