// Importamos el módulo 'fs' para trabajar con archivos
const fs = require('fs');
const diacritics = require('diacritics');
// Leemos el contenido del archivo 'entrada.txt'
// 'utf-8' es la codificación para que lea correctamente acentos y caracteres especiales
const textoEntrada = fs.readFileSync('entrada.txt', 'utf-8');
// // Mostramos el contenido en la consola para verificar
console.log('Texto original:', textoEntrada);
// // Convertimos todo el texto a minúsculas
// const textoProcesado = textoEntrada.toLowerCase();
// console.log('Texto en minúsculas:', textoProcesado);
// Aplicamos ambas transformaciones en cadena
const textoNormalizado =
diacritics.remove(textoEntrada.toLowerCase());
console.log('Texto normalizado (sin tildes y en minúsculas):');
console.log(textoNormalizado);

// Guardamos el texto normalizado en un nuevo archivo llamado
'salida.txt'
fs.writeFileSync('salida.txt', textoNormalizado);
console.log('\n¡ El texto modificado se ha guardado en “salida.txt”');