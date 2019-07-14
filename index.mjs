
// importamos las katas

import { main as kata1 } from './kata1.mjs';
import { main as kata2 } from './kata2.mjs';
import { main as kata3 } from './kata3.mjs';


// Las pruebas se hacen importando los 'main' de los archivos kata?.jms
// Los valores para cada una de las pruebas están en cada uno de sus propios 
// archivos kata? y dentro de la función 'main'

function main () {

    // quitar el comentario de la kata a probar
    // Se debe ejecutar con -->  node --experimental-modules index.mjs
    
    // kata1();
    kata2();
    // kata3();
}


// Ejecutamos TODAS las katas existentes en 'main'.
main();
