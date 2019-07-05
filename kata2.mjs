// práctica de JS

// Santiago San Román
// Alicante

"use strict"



/* ************************************************************
## Segunda Kata

### Sistema Romano

Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.

Como refresco, vamos a ver sus símbolos y reglas.

#### Símbolos

 Romano | Árabe
--------|-------
 I | 1
 V | 5
 X | 10
 L | 50
 C | 100
 D | 500
 M | 1000

#### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

- Cálculos...
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y 
    solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M


#### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos

********************************************************************** */

// Variable globales
let romanValues = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
let arabicValues = { 1000: 'M', 500: 'D', 100: 'C', 50: 'L', 10: 'X', 5: 'V', 1: 'I' };


// Nos permite saber si 'key' está contenido como clave en 'dict'
// Param:   dict: Dictionary. Diccionario donde buscar
//          key. String. Cadena a buscar como clave en el diccionario
// Return -> true / false
function inDictionary( dict, key) {
    return dict.hasOwnProperty( key );
}

// Nos permite saber si 'ch' está contenido en el array 'array'
// Param:   array: Array. Array donde buscar
//          ch. String. Cadena a buscar el array
// Return -> true / false
function inArray( array, ch ) {
    let pos = array.search(ch);
    return ( pos != -1 ) ? true : false;
}


// Nos indicará si en 'str' hay un 'ch' repetido '>= times' 
// Param -> str: string. Cadena donde buscar
//          ch: String. Caracter/Cadena a buscar
//          times: Number. Número de veces a comprobar si se repite
//          together: Boolean. Si la repetición DEBE o NO estar seguida
// Return --> true / false
function isRepeat( str, ch, times = 2, together = true) {
    let cont = 0;
    let retValue = false;

    str.split("").forEach( (element) => {
        if (element == ch) { 
            cont++; 
            if (cont > times) { retValue = true; }
        }
        else if (!together) { cont = 0; }
    });
    return retValue;
};


// Permite controlar que la cadena pasada como parámetro sea un valor Romano 
// entre 1 y 3999 y válido
// param -> String
// Return -> true / false
function isRoman( strRoman ) {
    let retValue = true;

    strRoman = strRoman.toUpperCase();  // Pasamos TODO a mayúsculas por seguridad

    // Empezamos los controles principales 
    // Los símbolos [I, X, C, M] --> NO se pueden repetir más de 3 veces (NO >= 4 juntos) en el número
    if (isRepeat(strRoman, 'I', 4) ||
        isRepeat(strRoman, 'X', 4) ||
        isRepeat(strRoman, 'C', 4) ||
        isRepeat(strRoman, 'M', 4) ) { retValue = false; }

    // los símbolos [V, L, D] --> NO pueden repetirse (NO >= 2) en el número (juntos ni separados)
    if (isRepeat(strRoman, 'V', 2, false) ||
        isRepeat(strRoman, 'L', 2, false) ||
        isRepeat(strRoman, 'D', 2, false) ) { retValue = false; }

    for (let i = 0; i < strRoman.length && retValue; i++) {
        let element = strRoman[i];  // Cogemos el elemento 

        // Si el elemento leído es válido
        if (inDictionary(romanValues, element)) {    
        
            if (i < strRoman.length-1) {  // Si hay más caracteres por la derecha

                // Tenemos un 'D', 'L' ó 'V' y NO pueden haber mas grandes por la derecha
                if (element == 'D' || element == 'L' || element == 'V') {
                    // Miramos los caracteres de la derecha
                    for (let x=i+1; x < strRoman.length; x++){
                        if (romanValues[ strRoman[x] ] > romanValues[ element ]) {
                            retValue = false;
                        }
                    }
                }
            }
        }
        // Si tenemos un 'elemento' NO valido en ROMAN.. terminamos
        else { retValue = false; }
    }

    // Finalmente avisamos si ha habido un error de formulación
    // if (!retValue) { console.log(`ERROR : [ ${strRoman} ] -> Error en formato`); }
    return retValue;
}



// convierte un número ARABIC dado en ROMAN
// Param -> number: Number. Número a convertir (entre 1 y 3999)
// Return -> String : "" = ERROR
function arabicToRoman ( number ) {
    let unidad = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    let decena = [ "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    let centena = [ "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    let strReturn = "";
    let i = 0;
    let numOriginal = number;

    if ( number > 0 && number < 3999 ) {
        if (number >= 1000) { 
            strReturn += "M".repeat( Math.floor(number/1000) ); 
            number = number % 1000;
        }
        if (number >= 100) {
            strReturn += centena[ Math.floor(number/100) ];
            number = number % 100;
        }
        if (number >= 10) {
            strReturn += decena[ Math.floor(number/10) ];
            number = number % 10;
        }
        if (number >= 1) {
            strReturn += unidad[ Math.floor(number) ];
        }
    }
    return strReturn;
}



// convierte un número ROMAN dado en ARABIC
// Param -> str: String. Cadena a convertir en número arábico
// Return -> Number: -1 = ERROR
function romanToArabic ( str ) {
    let strToConvert = str.toUpperCase().split("").reverse();
    let total = 0;
    let ch = "";
    let chPast = "";

    if (isRoman( str )) {       // Si es un número ROMANO correcto

        for (let i=0; i <= strToConvert.length; i++) {
            ch = strToConvert[i];
            if ( i == 0 ) {
                total = romanValues[ch];
                chPast = strToConvert[i];
            }
            else {
                if ( i <= strToConvert.length - 1 ) { // Hay más letras para operar
                    // Si la anterior letra es menor 
                    if ( romanValues[ ch ] >= romanValues[ chPast ] ) { 
                        total += romanValues[ ch ];
                    }
                    else { 
                        total -= romanValues[ ch ];
                    }
                    chPast = ch;
                }
            }
        }
    }
    else { total = -1 }
  
    return total;
}








export function main() {
    let pruebaArabic = [ 4, 10, 56, 14, 0, 39, 1785];
    let pruebaRomanic = [ "XVII", "v", "VLX", "XLVII" ];

    console.log("KATA2 --> Comenzamos pruebas!!");
    
    // // Pruebas...
    console.log("\nKata2 (de Arábico a Romano)\n");
    let resp = "";
    for (let i = 0; i < pruebaArabic.length; i++) {
        resp = arabicToRoman( pruebaArabic[i] );
        if (resp != "" )  {
            console.log(pruebaArabic[i] + " = [ " + resp + " ] --> correcto");
        }else {
            console.log(`${pruebaArabic[i]} -> ERROR. Número NO válido (1..3999)`);
        }
    };

    console.log("\nKata2 (de Romano a Arábico)\n");
    resp = "";
    for (let i = 0; i < pruebaRomanic.length; i++) {
        resp = romanToArabic( pruebaRomanic[i] );
        if (resp != -1 )  {
            console.log(`${pruebaRomanic[i]} = [ ${resp} ] --> correcto`);
        }
        else {
            console.log(`${pruebaRomanic[i]} -> ERROR. Error en formulación`);
        }
    };


    console.log("\n********* Fin de las pruebas .. KATA2\n\n")
}



// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
main();