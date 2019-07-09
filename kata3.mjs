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
    1: "As",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "Diez",
    11: "Dama",
    12: "Reina",
    13: "Rey",
    14: "As"
};

let usedValues = [];

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




class Jugador extends Baraja {
    constructor(name = "") {
        super(false); // Inicializamos jugador con la mano en blanco (sin cartas)

        this.name = name == "" ? "Jugador" : name;
        this.hand = []; // Contendrá 5 cartas de la baraja

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
    }

    showHand() {
        console.log(`Jugador : ${this.name}`);
        console.log("Mano : ");
        this.hand.forEach(element => {
            console.log(element.info());
        });
        console.log();
    }
}

/*  ---> Esta función es generalista para obtener un número aleatorio 
        entre 'min' y 'max'
*/
// Nos devuelve un número aleatorio entre 'min' y 'max' (incluidos ambos)
// function getRandomInt(min, max) {
//     return Math.floor( Math.random()*(max - min) + min );
// }

// const suitValues = { S:'Picas', H:'Corazones', C:'Tréboles', D:'Diamantes'};
// const valorValues = { 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9',
//         10:'Diez', 11:'Dama', 12:'Reina', 13:'Rey', 14:'As'};

export function main() {
    let jugador1 = new Jugador("Pedro S.P.");
    let jugador2 = new Jugador("Luis G.J.")

    jugador1.showHand();
    jugador2.showHand();
    console.log( usedValues );

}

// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
// main();
