// práctica de JS

// Santiago San Román
// Alicante

"use strict"

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

let Baraja = [];
let jugador1 = [];  // Esto contiene la 'mano' (5 cartas) para la jugada del jugador1
let jugador2 = [];  // Esto contiene la 'mano' (5 cartas) para la jugada del jugador2

class Carta {
    constructor (suit="", valor="") {
        // propiedades
        this.suit = ( suit != "" ) ? this.getSuit( suit.toString() ) : this.getRandomSuits();
        this.valor = ( valor != "" ) ? this.getValor( valor.toString() ) : this.getRandomValor();
    }
    suitValues = { S:'Picas', H:'Corazones', C:'Tréboles', D:'Diamantes'};
    valorValues = { 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 
        10:'Diez', 11:'Dama', 12:'Reina', 13:'Rey', 14:'As'};

    
    // métodos
    // devuelve el 'suit - palo' que tenga la carta
    getSuit ( suit=this.suit ) {
        if ( suit != "" && suit in this.suitValues ) { this.suit = suit; }
        return this.suit;
    }

    // Devuelve el valor que tenga la carta, si se le pasa "" genera uno aleatorio.
    getValor ( valor=this.valor) { 
        if ( valor != "" && valor in this.valorValues ) { this.valor = valor; }
        return this.valor;
    }

    // Buscamos un valor aletario para 'suit - palo'
    getRandomSuits () {
        let min = 0;
        let max = Object.keys(this.suitValues).length-1;
        let suit = Object.keys(this.suitValues)[ Math.floor(Math.random() * (max - min)) + min ];
        return suit;
    }

    // Buscamos un valor aletario para 'valor - valor'
    getRandomValor () {
        let min = 0;
        let max = Object.keys(this.valorValues).length-1;
        let valor = Object.keys(this.valorValues)[ Math.floor(Math.random() * (max - min)) + min ];
        return valor;
    }

    // Nos devuelve string de DATO con el par 'suit/valor' - 'palo/valor'
    data () {
        return `${this.suit}${this.valor}`;
    }

    // Nos devuelve string con el par 'suit/valor' - 'palo/valor'
    info () {
        return `${this.valorValues[this.valor]} de ${this.suitValues[this.suit]}`;
    }
};


/*  ---> Esta función es generalista para obtener un número aleatorio 
        entre 'min' y 'max'
// Nos devuelve un número aleatorio entre 'min' y 'max' (incluidos ambos)
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
*/

// const suitValues = { S:'Picas', H:'Corazones', C:'Tréboles', D:'Diamantes'};
// const valorValues = { 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 
//         10:'Diez', 11:'Dama', 12:'Reina', 13:'Rey', 14:'As'};



function main () {
    let cartas = [ ["S", "3"], ["D", "13"], ["",""], ["",""], ["",""]  ];
    let mano = [];
    let carta;
    
    for (let i=0; i<cartas.length; i++)  {
        carta = new Carta( cartas[i][0], cartas[i][1] );
        mano.push( carta.data() );
        console.log( mano[i] ); 
    };
    
}


main();


