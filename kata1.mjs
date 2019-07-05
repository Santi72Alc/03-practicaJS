// práctica de JS

// Santiago San Román
// Alicante

"use strict"


/* ***********************************************************
# Primera Kata
## FooBarQuix

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

* Si el número es divisible por 3, escribiremos “Foo” en lugar del número
* Si el número es divisible por 5, añadimos “Bar”
* Si el número es divisible por 7, añadimos “Quix”.
* Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.

### Ejemplos: 

* 1  -> 1
* 2  -> 2
* 3  -> FooFoo (divisible por 3, contiene 3)
* 4  -> 4
* 5  -> BarBar (divisible por 5, contains 5)
* 6  -> Foo (divisible por 3)
* 7  -> QuixQuix (divisible por 7, contiene 7)
* 8  -> 8
* 9  -> Foo
* 10 -> Bar
* 13 -> Foo 
* 15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
* 21 -> FooQuix
* 33 -> FooFooFoo (divisible por 3, contiene 3)
* 51 -> FooBar
* 53 -> BarFoo
* 75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)
*/

function fooBarQuix( numero ) {
    let strNumero, element;
    let strReturn = "";

    if (typeof numero != "number"  || numero < 1 || numero > 100 ) {
        console.log (`ERROR!! Entrada: [ ${numero} ]. SÓLO válidos valores entre 1 y 100`)
        return;
    }

    // Miramos la divisibilidad 
    if (numero % 3 == 0) { strReturn = "Foo"; }
    if (numero % 5 == 0) { strReturn += "Bar"; }
    if (numero % 7 == 0) { strReturn += "Quix"; }

    // lo convertimos a cadena para mirar los elementos
    strNumero = numero.toString(); 
    for (let i = 0; i < strNumero.length; i++) {
        element = strNumero.charAt(i);
    
        if (element === '3') {
            strReturn += "Foo";
        } else if (element === '5') {
            strReturn += "Bar";
        } else if (element === '7') {
            strReturn += "Quix";
        }
    }

    // Si hay ninguno de los supuestos, devolvemos el 
    // número
    if (strReturn == "") { strReturn = strNumero; }


    // Devolvemos la cadena generada
    console.log("Entrada : " + strNumero + " -> " + strReturn);
}


/* ************************************ */
export function main () {

    console.log("KATA1 --> Comenzamos pruebas!! \n");

    // Ejemplos...
    for (let i = 1; i <= 10; i++) {
        fooBarQuix(i);
    };

    fooBarQuix(13);
    fooBarQuix(15);
    fooBarQuix(21);
    fooBarQuix(51);
    fooBarQuix(53);
    fooBarQuix(75);

    // Prueba de error ...
    fooBarQuix(104);
    fooBarQuix(-6);
    fooBarQuix(7846);
    fooBarQuix("4636");

    console.log("\n********* Fin de las pruebas .. KATA1\n\n")
}


// Si deseamos probar directament esta KATA, debemos quitar el comentario de la línea de abajo
// main();