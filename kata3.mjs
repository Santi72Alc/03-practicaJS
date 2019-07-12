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
        let resp = (code == "") ? [0,""] : this.readCode( code );
        this.value = resp[0];
        this.suit = resp[1];
        this.code = this.makeCode( this.value, this.suit );    // creamos el código de la carta
    }

    // Devuelve la descomposición del 'code' de la carta
    // Return -> [ Value (int), suit (String)]
    readCode( code ) {
        let value = code.slice( 0, 1);
        let suit = code.slice( 1 );

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

    // Codifica los valores de 'this.value' y 'this.suit' en formato para 'this.code'
    // Return -> '{value}{suit}'
    makeCode( myValue = 0, mySuit = "" ) {
        let value = (myValue == 0) ? this.getRandomValue() : myValue;
        let suit = (mySuit == "") ? this.getRandomSuit() : mySuit;

        switch (value.toString()) {
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
        return `${value}${suit}`;
    }

    // // Devuelve el 'suit' que tenga la carta
    // getSuit(suit = this.suit) {
    //     if (suit != "" && suit in suitNames) {
    //         this.suit = suit;
    //     }
    //     return this.suit;
    // }

    // // Devuelve el 'value' que tenga la carta
    // getValue(value = "") {
    //     if (value != "" && value in codeValues) {
    //         value = codeValues[value].toString();
    //     }
    //     else { value = ""; }
    //     return value;
    // }

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

    // // Devuelve una carta aleatoria de las 52 existentes
    // getRandomValue() {
    //     return this.values[Math.floor(Math.random() * this.values.length - 1)];
    // }
}
/* FIN declaración de class Baraja ********************************************* */


class Jugador  {
    // El jugador consta de [ 'nombre' , [array 5 cartas] ]. Si no se pasan las cartas, se cogen aleatorias
    constructor(jugador = ["Jugador", []]) {
        this.name = (typeof jugador[0] != 'string' || jugador[0] == "") ? "Jugador" : jugador[0];
        // Mano del jugador (5 cartas diferentes de la baraja)
        this.hand = [];         // Mano del jugador (5 cartas)
        this.totalHand = 0;     // Total de puntos del jugador en la mano actual
        this.totalTrio = 0;     // Total de puntos del trio (si existe en la mano actual, sino será 0)
        this.highestCard = 0;   // Valor de la carta más alta
        this.awards = [];       // Premios obtenidos en la mano [ 9, 8, ... 0 ] 9=Escalera Color, 8=Poker, etc...

        (typeof jugador[1] == 'object' && jugador[1].length == 5) ? this.fillHand(jugador[1]) : this.fillHand([]);

        this.fillAwards();      // Rellenamos los datos de los premios de la mano
    }

    // Rellenamos la mano del jugador con 5 cartas definidas o aleatorias()
    fillHand( hand = [] ) {
        let element;
        let carta;
        let highestCard = 0;
        let exist = false;

        console.log(`Asignando cartas al jugador : ${this.name}`);
        for (let i=0; this.hand.length < 5; i++) {
            exist = false;
            if (hand[i] != "") {
                element = hand[i].toUpperCase()
                usedValues.forEach( used => {       // Comprobamos las cartas 'usadas'
                    if (element == used.code) { exist = true; }     // Carta utilizada por un jugador
                });
            }
            else { exist = true };
            if (exist) {        // ESTÁ utilizada la carta - Generamos una aleatoria
                console.log("Error en carta. Generando carta 'aleatoria'...");
                carta = new Carta("");
                hand.push( carta.code );
                console.log(`Carta aleatoria generada... ${carta.code}`);
            }
            else {
                carta = new Carta(element);
                usedValues.push(carta);
                this.hand.push(carta);
            }
            if (this.hand.length == 5) {      // Tenemos todas las cartas (5) de la mano
                console.log(`Terminada la asignación al jugador : ${this.name}`);
            }
        }

        this.sortHand();    // Ordenamos la mano del jugador
        this.totalHand = 0;
        this.hand.forEach( element => {     // Calculamos el total de la mano del jugador
            this.totalHand += parseInt(element.value);
            this.highestCard = (element.value > this.highestCard) ? element.value : this.highestCard;
        }); 
    }

    // Ordena la mano del jugador (carta mayor a menor)
    sortHand () {
        this.hand.sort( function( a, b ) {
            // return b.code.localeCompare( a.code );
            return a.value - b.value;
        });
    }


    // Miramos los premios obtenido en la mano y los guardamos en la propiedad 'awards'
    fillAwards() {
        this.awards = [];

        if (this.isStraightFlush()) { this.awards.push(9); }
        if (this.isFourOfAKind()) { this.awards.push(8); }
        if (this.isFullHouse()) { this.awards.push(7); }
        if (this.isFlush()) { this.awards.push(6); }
        if (this.isStraight()) { this.awards.push(5); }
        if (this.isTrio()) { this.awards.push(4); }
        if (this.isDoublePair()) { this.awards.push(3); }
        if (this.isPair()) { this.awards.push(2); }

    }

    // Visualiza los datos del jugador y su mano actual
    showHand() {
        console.log(`JUGADOR => ${this.name}, con una mano de ${this.totalHand} puntos\n`);
        console.log(`Mano... (carta de máx. valor ${this.highestHandValue()})`);
        this.hand.forEach(element => {
            console.log(element.info());
        });
        console.log("");
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


    // Devuelve si tenemos EXACTAMENTE 2 valores iguales en la mano
    isPair () {
        let times = [];
        let pos = 0;
        this.hand.forEach( element => {
            pos = element.value;
            if ( times[ pos ] == undefined ) { times[ pos ] = 1 }
            else { times[ pos ]++; }
        });
        return (times.includes(2));
    }

    // Devuelve si tenemos DOBLE PAREJA  ( 2 + 2 cartas de igual valor )
    isDoublePair () {
        let times = [];
        let pos = 0;
        this.hand.forEach( element => {
            pos = element.value;
            if ( times[ pos ] == undefined ) { times[ pos ] = 1 }
            else { times[ pos ]++; }
        });
        return (times.filter( function(x) { return x==2; }).length == 2);
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

    // Devuelve si el jugador tiene 'Stright' / 'Escalera' (5 cartas consecutivas)
    isStraight () {
        let isStraight = true;
        let oldSuit = "";
        let min;
        let max;

        this.hand.forEach( element => {
            if (oldSuit == "") {        // El primer elemento
                oldSuit = element.suit;
                min = max = element.value;
            }
            else {
                if (element.value == min - 1) { min = element.value; }
                else if (element.value == max + 1) { max = element.value; }
                else { isStraight = false; }    // NO es valor consecutivo
            }
        });
        return isStraight;
    }



    // Devuelve si el jugador tiene un 'Color' (5 cartas de igual 'suit/palo')
    isFlush () {
        let isFlush = true;
        let oldValor = 0;
        let cont = 0;
        this.hand.forEach( element => {
            if (cont == 0) { oldValor = element.suit; cont = 1; }         // Cogemos el 1er valor
            else if (element.suit == oldValor) { cont++; }
        });
        return (cont==5);
    }

      // La mano contiene un trío (3 cartas iguales) y una pareja (2 cartas iguales)
    isFullHouse () {
        return ( this.isTrio() && this.isPair() );
    }


    // Devuelve si el jugador tiene un 'poker' (4 cartas de igual valor)
    isFourOfAKind() {
        let isFour = true;
        let oldValor = 0;
        let cont = 0;
        this.hand.forEach( element => {
            if (cont == 0) { oldValor = element.value; cont = 1; }         // Cogemos el 1er valor
            else if (element.value != oldValor ) { cont++; }
            if (cont > 2) { isFour = false; }       // Más de 2 cartas diferentes NO puede haber poker
        });
        return (isFour);
    }

    // Devuelve si el jugador tiene 'Stright_Flush' / 'Escalera de Color'
    isStraightFlush () {
        let isStraightFlush = true;
        let oldSuit = "";
        let min;
        let max;

        this.hand.forEach( element => {
            if (oldSuit == "") {        // El primer elemento
                oldSuit = element.suit;
                min = max = element.value;
            }
            else if ( element.suit != oldSuit || !isStraightFlush ) { isStraightFlush = false; }     // NO es del mismo palo
            else {
                if (element.value == min - 1) { min = element.value; }
                else if (element.value == max + 1) { max = element.value; }
                else { isStraightFlush = false; }    // NO es valor consecutivo
            }
        });
        return isStraightFlush;
    }


}
/* FIN declaración de class Jugador ********************************************* */




class Game {
    constructor (   player1 = ["Jugador 1", []], 
                    player2 = ["Jugador 2", []]
                ) {
        fullBaraja = new Baraja();              // Creamos la baraja (NO se usa)

        console.clear();
        console.log("\n***********************************");
        console.log("Kata 3 - Juego de poker ---- \n");

        this.jugador1 = new Jugador(player1);   // Creamos al 1er jugador
        this.jugador2 = new Jugador(player2);   // Creamos al 2do jugador
    }



    play () {


        console.log("\n==> Comenzamos... \n");
        this.jugador1.showHand();       // Mostramos datos del 1er jugador
        this.jugador2.showHand();       // Mostramos datos del 2do jugador

        this.showResult();              // Mostramos los resultados de la jugada

    }

    showResult() {
        const txtEmpate = "* EMPATE *";
        let ply1MaxValue = this.jugador1.highestHandValue();
        let ply2MaxValue = this.jugador2.highestHandValue();
        let maxValue = ( ply1MaxValue > ply2MaxValue) ? [this.jugador1.name, ply1MaxValue] : 
                (ply2MaxValue > ply1MaxValue) ? [this.jugador2.name, ply2MaxValue] : [txtEmpate, ply1MaxValue];
            
        console.log("\n***********************************");
        console.log("Resultado ... \n");

        this.ctrlGame();
    }


    ctrlGame() {
        let winDescription = { 9: "Escalera de color", 8: "Póker", 7: "Full", 6: "Color", 
             5: "Escalera", 4: "Trío", 3: "Doble pareja", 2: "Pareja", 1: "Carta más alta"};
        let winCode = 1;
        let winnerName = "";

        let maxAwardPlayer1 = Math.max(...this.jugador1.awards);
        let maxAwardPlayer2 = Math.max(...this.jugador2.awards);
        let txtResult = ``;


        if ( maxAwardPlayer1 > maxAwardPlayer2 ) { 
            winCode = maxAwardPlayer1;
            winnerName = this.jugador1.name;
        }
        else if ( maxAwardPlayer2 > maxAwardPlayer1 ) {
            winCode = maxAwardPlayer2;
            winnerName = this.jugador1.name;
        }
        else if ( maxAwardPlayer1 == maxAwardPlayer2 ) {
            if (this.jugador1.highestCard > this.jugador2.highestCard) {
                winCode = 1;
                winnerName = this.jugador1.name;
            }
            else if ( this.jugador2.highestCard > this.jugador1.highestCard) {
                winCode = 1;
                winnerName = this.jugador2.name;
            }
            else {
                winCode = 0;
            }
        }

        console.log(winDescription[1]);
        txtResult = (winCode == 0) ? "Hay un empate" : `El ganador es ${winnerName} con ${winDescription[winCode.toString()]}`;
        console.log(txtResult);

        // console.log("Jugador 1 : ", this.jugador1.awards);
        // console.log("Jugador 2 : ", this.jugador2.awards);
        // console.log(this.jugador1.totalTrio);
        // console.log(this.jugador2.totalTrio);
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
        ["Santi",       ['2h', '3h', '4h', '5h', '6H']],
        ["Machine",     ['2c', '2s', '3d', '5D', '5S']]
        );

    game.play();

    console.log("\n*** Fin ejecución Kata 3\n");
}

// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
// main();
