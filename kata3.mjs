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

Una mano es un conjunto de 5 cartas, estamos jugando con una baraja, por lo que no puede haber cartas 
repetidas.

Las manos de poker se ordenan de menor a mayor dependiendo de una serie de reglas asociadas a la mano.

* High Card (Carta Más Alta): Para manos que no entran en ninguna de las manos superior, 
el ganador es aquel que tiene la carta más alta. Si se produce un empate entonces se compara 
la siguiente carta más alta y así sucesivamente.

* Pair (Parejas): 2 de las 5 cartas de la mano tienen el mismo valor. Si las dos manos tienen pareja, 
entonces gana la que tenga la pareja más alta. Si ambas parejas son iguales entonces gana el que tenga 
la carta más alta.

* Two Pairs (Dobles Parejas): La mano contiene 2 parejas diferentes. Si las dos manos tienen dobles parejas 
diferentes entonces gana aquella que tenga la pareja más alta. Si las dos manos tienen las mismas parejas 
entonces se compara la otra pareja. Si ambas manos tiene las mismas parejas entonces gana el que tenga la 
carta más alta restante.

* Three of a Kind (Trio): 3 cartas de la mano tienen el mismo valor. Gana la mano que tiene las 3 cartas 
con mayor valor.

* Straight (Escalera): La mano contiene 5 cartas consecutivas. Si las dos manos tienen escalera entonces 
gana la que tiene la carta más alta.

* Flush (Color): La mano tiene 5 cartas con la misma cara. Si ambas manos tienen color entonces gana el 
que tenga la carta más alta.

* Full House (Full): La mano tiene un trío y una pareja. En caso de tener ambas manos full entonces gana 
el que tenga el trío más alto.

* Four of a Kind (Poker): 4 cartas con el mismo valor. En caso de tener ambas manos poker gana el que tenga 
el valor más alto.

* Straight flush (Escalera de Color): 5 cartas de la misma cara pero con valores consecutivos. En caso de 
tener escalera las dos manos entonces gana el que tenga el valor más alto.

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
const suitValues = {
    S: "Picas",
    H: "Corazones",
    C: "Tréboles",
    D: "Diamantes"
};
const valorValues = {
    // "01": "As",
    "02": "2",
    "03": "3",
    "04": "4",
    "05": "5",
    "06": "6",
    "07": "7",
    "08": "8",
    "09": "9",
    "10": "Diez",
    "11": "Dama",
    "12": "Reina",
    "13": "Rey",
    "14": "As"
};

let usedValues = [];        // Almacena las cartas que tienen los jugadores. Para evitar repetidas!!

// Clase Carta
class Carta {
    constructor(suit = "", valor = "") {
        // propiedades
        this.suit =
            suit != "" ? this.getSuit(suit.toString()) : this.getRandomSuits();
        this.valor =
            valor != "" ? this.getValor(valor.toString()) : this.getRandomValor();
    }

    // métodos
    // devuelve el 'suit - palo' que tenga la carta
    getSuit(suit = this.suit) {
        if (suit != "" && suit in suitValues) {
            this.suit = suit;
        }
        return this.suit;
    }

    // Devuelve el valor que tenga la carta, si se le pasa "" genera uno aleatorio.
    getValor(valor = this.valor) {
        if (valor != "" && valor in valorValues) {
            this.valor = valor;
        }
        return this.valor;
    }

    // Buscamos un valor aletario para 'suit - palo'
    getRandomSuits() {
        let min = 0;
        let max = Object.keys(suitValues).length - 1;
        let suit = Object.keys(suitValues)[
            Math.floor(Math.random() * (max - min)) + min
        ];
        return suit;
    }

    // Buscamos un valor aletario para 'valor - valor'
    getRandomValor() {
        let min = 0;
        let max = Object.keys(valorValues).length - 1;
        let valor = Object.keys(valorValues)[
            Math.floor(Math.random() * (max - min)) + min
        ];
        return valor;
    }

    // Nos devuelve string de DATO con el par 'suit/valor' - 'palo/valor'
    data() {
        return `${this.suit}${this.valor}`;
    }

    // Nos devuelve string con el par 'suit/valor' - 'palo/valor'
    info() {
        return `${valorValues[this.valor]} de ${suitValues[this.suit]}`;
    }
}
/* FIN declaración de class Carta ********************************************* */



class Baraja {
    constructor(fill = true) {
        this.values = (fill) ? this.fillBaraja() : [];
    }

    // Rellenamos la bajara con las 52 cartas posibles
    fillBaraja() {
        let baraja = [];
        // Rellenamos la baraja
        for (let suit in suitValues) {
            // Cada 'suit/palo'
            for (let valor in valorValues) {
                // cada 'valor' de la carta
                baraja.push(new Carta(suit, valor));
            }
        }
        return baraja;
    }

    existCarta(suit, valor) {
        let exist = false;
        this.values.forEach(element => {
            if (element.data() == `${suit}${valor}`) {
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



class Jugador extends Baraja {
    constructor(name = "") {
        super(false);   // Inicializamos jugador con la mano en blanco (sin cartas)

        this.name = name == "" ? "Jugador" : name;
        this.hand = [];         // Mano del jugador (5 cartas diferentes de la baraja)
        this.totalHand = 0;     // Total de puntos del jugador en la mano actual
        this.totalTrio = 0;     // Total de puntos del trio (si existe en la mano actual, sino será 0)

        // Rellenamos la mano del jugador
        this.fillHand();
    }

    // Rellenamos la mano del jugador con 5 cartas aleatorias()
    fillHand() {
        this.hand = [];
        let carta;
        let exist = false;

        for (let i = 0; this.hand.length < 5; i++) {
            exist = false;
            carta = new Carta();

            // Miramos si existe en las cartas ya guardados
            usedValues.forEach( element => { 
                if (element.data() == carta.data()) { exist = true; }
            });
            if (!exist) {   // La carta NO está usada... la añadimos
                this.hand.push(carta); 
                usedValues.push(carta);
            }
        }
        this.sortHand();    // Ordenamos la mano del jugador
        this.totalHand = 0;
        this.hand.forEach( element => {     // Calculamos el total de la mano del jugador
            this.totalHand += parseInt(element.valor);
        }); 
    }

    // Ordena la mano del jugador
    sortHand () {
        this.hand.sort( function( a, b ) {
            return b.data().toString().localeCompare( a.data().toString() );
        });
    }

    // Visualiza los datos del jugador y su mano actual
    showHand() {
        console.log(`Jugador : ${this.name}, con una mano de ${this.totalHand} puntos\n`);
        console.log(`artas de la mano... (máx. valor carta ${this.highestHandValue().toString()})`);
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
        this.hand.forEach( element => { values.push( element.valor ); });
        return Math.max( ...values );
    }

    // Devuelve si tenemos EXACTAMENTE 3 valores iguales en la mano
    isTrio () {
        let times = [];
        let pos = 0;
        this.hand.forEach( element => {
            pos = element.valor;
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
            pos = element.valor;
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
                min = max = element.valor;
            }
            else if ( element.suit != oldSuit || !isStraight ) { isStraight = false; }     // NO es del mismo palo
            else {
                if (element.valor == min - 1) { min = element.valor; }
                else if (element.valor == max + 1) { max = element.valor; }
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
            if (cont == 0) { oldValor = element.valor }         // Cogemos el 1er valor
            else if (element.valor != oldValor ) { cont++; }
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
    constructor (player1 = "Jugador 2", player2 = "Jugador 2") {
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
    let game = new Game("Santi", "Machine");

    game.play();


}

// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
// main();
