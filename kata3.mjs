// práctica de JS

// Santiago San Román
// Alicante

"use strict";

/* *************************************************************** */
/*
## Tercera Kata

### Póker

#### Introdución

Una baraja de poker contiene 52 cartas.

### Cartas

Una carta se compone de dos cosas:

Palo (suit) que pueden ser los siguientes:

* picas/spades (S)
* corazones/hearts (H)
* tréboles/clubs (C)
* diamantes/diamonds (D).

Valor:

* 2
* 3
* 4
* 5
* 6
* 7
* 8
* 9
* 10 /Ten (T)
* dama/Jack (J)
* reina/Queen (Q)
* rey/King (K)
* as/Ace (A).

#### Mano

Una mano es un conjunto de 5 cartas, estamos jugando con una baraja, por lo que no puede haber cartas repetidas.

Las manos de poker se ordenan de menor a mayor dependiendo de una serie de reglas asociadas a la mano.

* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, el ganador es aquel que tiene 
la carta más alta. Si se produce un empate entonces se compara la siguiente carta más alta y así sucesivamente.

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, entonces gana 
la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga la carta más alta.

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas diferentes 
entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas entonces se compara la otra
 pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la carta más alta restante.

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas con mayor valor.

* Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces gana la que tiene 
la carta más alta.

* Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen color entonces gana el que tenga la carta 
más alta.

* Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana el que tenga el 
trío más alto.

* Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de tener escalera las 
dos manos entonces gana el que tenga el valor más alto.

#### Ejemplos

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C AH
Salida: Jugador 2 gana, carta más alta:

Entrada: Jugador 1: 2H 4S 4C 2D 4H Jugador 2: 2S 8S AS QS 3S
Salida: Jugador 1 gana, escalera de color

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2C 3H 4S 8C KH
Salida: Jugador 1 gana, carta más alta

Entrada: Jugador 1: 2H 3D 5S 9C KD Jugador 2: 2D 3H 5C 9S KH
Salida: Empate


*/
/* ************************************************ */

// Variables públicas para el juego
const suitNames = {
    S: "Picas",
    H: "Corazones",
    C: "Tréboles",
    D: "Diamantes"
};
const codeValues = {
    // "01": "As",
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "T" : 10,
    "J" : 11,
    "Q" : 12,
    "K" : 13,
    "A" : 14
};

const codeNames = {
    "2" : "2",
    "3" : "3",
    "4" : "4",
    "5" : "5",
    "6" : "6",
    "7" : "7",
    "8" : "8",
    "9" : "9",
    "10": "Diez",
    "11" : "Dama",
    "12" : "Reina",
    "13" : "Rey",
    "14" : "As"
}

let fullBaraja = [];
let usedValues = [];        // Almacena las cartas que tienen los jugadores. Para evitar repetidas!!


// Clase Carta
class Carta {
    constructor( code = "" ) {

        // propiedades
        let resp = this.readCode( code );
        this.value = resp[0];
        this.suit = resp[1];
        this.code = this.makeCode();    // creamos el código de la carta
    }


    readCode( code ) {
        let value;
        let suit;
        suit = code.slice( 1 );
        value = code.slice( 0, 1);

        switch (value) {
            case "A": value = 14; break;
            case "K": value = 13; break;
            case "Q": value = 12; break;
            case "J": value = 11; break;
            case "T": value = 10; break;
            case "9": value = 9; break;
            case "8": value = 8; break;
            case "7": value = 7; break;
            case "6": value = 6; break;
            case "5": value = 5; break;
            case "4": value = 4; break;
            case "3": value = 3; break;
            case "2": value = 2; break;
        }
        return [parseInt(value), suit];
    }


    makeCode() {
        let value = '';

        switch (this.value.toString()) {
            case "14": value = 'A'; break;
            case "13": value = 'K'; break;
            case "12": value = 'Q'; break;
            case "11": value = 'J'; break;
            case "10": value = 'T'; break;
            case "9": value = "9"; break;
            case "8": value = "8"; break;
            case "7": value = "7"; break;
            case "6": value = "6"; break;
            case "5": value = "5"; break;
            case "4": value = "4"; break;
            case "3": value = "3"; break;
            case "2": value = "2"; break;
        }
        return `${value}${this.suit}`;
    }



    // métodos
    // devuelve el 'suit - palo' que tenga la carta
    getSuit(suit = this.suit) {
        if (suit != "" && suit in suitNames) {
            this.suit = suit;
        }
        return this.suit;
    }

    // Devuelve el valor que tenga la carta
    getValue(value = "") {
        if (value != "" && value in codeValues) {
            value = codeValues[value].toString();
        }
        else { value = ""; }
        return value;
    }

    // Buscamos un valor aletario para 'suit - palo'
    getRandomSuit() {
        let min = 0;
        let max = Object.keys(suitNames).length - 1;
        let index = Object.keys(suitNames)[
            Math.floor(Math.random() * (max - min)) + min
        ];
        return index;
    }

    // Buscamos un valor aletario para 'valor - valor'
    getRandomValue() {
        let min = 0;
        let max = Object.keys(codeValues).length - 1;
        let index = Object.keys(codeValues)[
            Math.floor(Math.random() * (max - min)) + min
        ];
        return index;
    }

    // Nos devuelve string decorado del par 'suit/value' - 'palo/valor'
    info() {

        return `${codeNames[this.value.toString()]} de ${suitNames[this.suit]}`;
    }
}
/* FIN declaración de class Carta ********************************************* */



class Baraja {
    constructor() {
        this.values = this.fillBaraja();
    }

    // Rellenamos la bajara con las 52 cartas posibles
    fillBaraja () {
        let baraja = [];
        // Rellenamos la baraja
        // cada 'valor' de la carta
        for (let value in codeValues) {
            // Cada 'suit/palo'
            for (let suit in suitNames) {
                baraja.push(new Carta(`${value}${suit}`));
            }
        }
        return baraja;
    }

    existCarta( code ) {
        let exist = false;
        this.values.forEach(element => {
            if (element.code == code) {
                exist = true;
            }
        });
        return exist;
    }

    // Devuelve una carta aleatoria de las 52 existentes
    getRandomValue() {
        return this.values[Math.floor(Math.random() * this.values.length - 1)];
    }
}
/* FIN declaración de class Baraja ********************************************* */


class Jugador  {
    // El jugador consta de [ 'nombre' , [array 5 cartas] ]. Si no se pasan las cartas, se cogen aleatorias
    constructor(jugador = ["Jugador", []]) {
        // super( (typeof jugador[1] == 'array' && jugador[1].length == 5) ? jugador[1] : [] );              // Inicializamos jugador con la mano en blanco (sin cartas)

        this.name = (typeof jugador[0] != 'string' || jugador[0] == "") ? "Jugador" : jugador[0];
        // Mano del jugador (5 cartas diferentes de la baraja)
        this.hand = [];         // Mano del jugador (5 cartas)
        this.totalHand = 0;     // Total de puntos del jugador en la mano actual
        this.totalTrio = 0;     // Total de puntos del trio (si existe en la mano actual, sino será 0)

        (typeof jugador[1] == 'object' && jugador[1].length == 5) ? this.fillHand(jugador[1]) : this.fillHand([]);  

    }

    // Rellenamos la mano del jugador con 5 cartas definidas o aleatorias()
    fillHand( hand = [] ) {
        let carta;
        let exist = false;
        let objHand = [];

        if (hand != []) {       // Cada elemento del array pasado, lo convertimos a class 'Carta'
            hand.forEach( element => {
                carta = new Carta(element.toUpperCase());
                objHand.push(carta);
            });
        }

        for (let i = 0; this.hand.length < 5; i++) {        // SIEMPRE leemos/creamos 5 cartas para la mano
            exist = false;

            // Miramos si existe en las cartas ya guardados
            objHand.forEach( carta => {
                usedValues.forEach( element => { 
                    if (element.code == carta.code) { exist = true; }
                });
                if (!exist) {   // La carta NO está usada... la añadimos en su mano y en 'usadas'
                    this.hand.push(carta); 
                    usedValues.push(carta);
                } 
                else { objHand.push(new Carta()); }       // Añadimos una aleatoria ???
            });
        }
        this.sortHand();    // Ordenamos la mano del jugador
        this.totalHand = 0;
        this.hand.forEach( element => {     // Calculamos el total de la mano del jugador
            this.totalHand += parseInt(element.value);
        }); 
    }

    // Ordena la mano del jugador
    sortHand () {
        this.hand.sort( function( a, b ) {
            return b.code.localeCompare( a.code );
        });
    }

    // Visualiza los datos del jugador y su mano actual
    showHand() {
        console.log(`JUGADOR => ${this.name}, con una mano de ${this.totalHand} puntos\n`);
        console.log(`Mano... (carta de máx. valor ${this.highestHandValue()})`);
        this.hand.forEach(element => {
            console.log(element.info());
        });
        console.log("");
        // if ( this.isTrio() ) { console.log("Tiene trio"); };
        // if ( this.isPair() ) { console.log("Tiene pareja"); };
    }

    // Devuelve el valor más alto de la mano
    highestHandValue () {
        let values =  [];
        this.hand.forEach( element => { 
            values.push( element.value );           
        });
        // return values[0];
        return  Math.max( ...values );
    }

    // Devuelve si tenemos EXACTAMENTE 3 valores iguales en la mano
    isTrio () {
        let times = [];
        let pos = 0;
        this.hand.forEach( element => {
            pos = element.value;
            if ( times[ pos ] == undefined ) { times[ pos ] = 1; }
            else { times[ pos ]++; }
        });
        pos = times.indexOf(3);
        if ( pos != -1) { this.totalTrio = pos*3 }
        return (pos != -1);
    }


    // Devuelve si tenemos EXACTAMENTE 2 valores iguales en la mano
    isPair () {
        let times = [];
        let pos = 0;
        this.hand.forEach( element => {
            pos = element.value;
            if ( times[ pos ] == undefined ) { times[ pos ] = 1 }
            else { times[ pos ]++; }
        });
        return times.includes(2);
    }

    // Devuelve si el jugador tiene 'Stright_Flush' / 'Escalera de Color'
    isStraightFlush () {
        let isStraight = true;
        let oldSuit = "";
        let min;
        let max;

        this.hand.forEach( element => {
            if (oldSuit == "") {        // El primer elemento
                oldSuit = element.suit;
                min = max = element.value;
            }
            else if ( element.suit != oldSuit || !isStraight ) { isStraight = false; }     // NO es del mismo palo
            else {
                if (element.value == min - 1) { min = element.value; }
                else if (element.value == max + 1) { max = element.value; }
                else { isStraight = false; }    // NO es valor consecutivo
            }
        });
        return isStraight;
    }

    // Devuelve si el jugador tiene un 'poker' (4 cartas de igual valor)
    isFourOfAKind () {
        let isFour = true;
        let oldValor = 0;
        let cont = 0;
        this.hand.forEach( element => {
            if (cont == 0) { oldValor = element.value }         // Cogemos el 1er valor
            else if (element.value != oldValor ) { cont++; }
            if (cont > 2) { isFour = false; }       // Más de 2 cartas diferentes NO puede haber poker
        });
        return isFour;
    }

    // La mano contiene un trío (3 cartas iguales) y una pareja (2 cartas iguales)
    isFullHouse () {
        return ( this.isTrio() && this.isPair() );
    }




}
/* FIN declaración de class Jugador ********************************************* */




class Game {
    constructor (player1 = ["Jugador 1", []], player2 = ["Jugador 2", []]) {
        fullBaraja = new Baraja();
        this.jugador1 = new Jugador(player1);
        this.jugador2 = new Jugador(player2);
    }

    play () {

        console.log("\n***********************************");
        console.log("Kata 3 - Juego de poker ---- \n");

        this.jugador1.showHand();

        this.jugador2.showHand();

        // usedValues.forEach( element => { console.log( element.data() )});
    }

}
/* FIN declaración de class Game ********************************************* */






/*  ---> Esta función es generalista para obtener un número aleatorio 
        entre 'min' y 'max'
*/
// Nos devuelve un número aleatorio entre 'min' y 'max' (incluidos ambos)
// function getRandomInt(min, max) {
//     return Math.floor( Math.random()*(max - min) + min );
// }



export function main() {
    let game = new Game(
        ["Santi",       ['2H', '3D', '5S', '9C', 'KD']],
        ["Machine",     ['2c', '3H', '4S', '8C', 'AH']]
        );

    game.play();


}

// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
// main();
