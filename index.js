const fs = require('fs');
// Importamos el nuevo SDK oficial de OpenAI
const OpenAI = require('openai');
// 1. Configuramos el cliente de OpenAI
const openai = new OpenAI({
// ¡LA CLAVE! Apuntamos a nuestro servidor local de LM Studio
baseURL: 'http://localhost:1234/v1',
// Usamos una clave API ficticia. No importa lo que escribas,
// pero el SDK requiere que el campo exista.
apiKey: 'not-needed-for-local'
});
// Función principal asíncrona
async function chatearConModeloLocal() {
try {
// 2. Leemos el prompt desde nuestro archivo de entrada
const promptUsuario = fs.readFileSync('entrada.txt', 'utf-8');
console.log(` Enviando prompt: "${promptUsuario}"`);
// 3. ¡LA NUEVA FORMA! Usamos el método 'chat.completions.create'
const chatCompletion = await openai.chat.completions.create({
// El formato 'messages' es el estándar de OpenAI
messages: [
{ role: 'system',
content: 'Eres un analista de negocios experto. Tu trabajo es resumir texto en 3 bulletpoints clave.'  },

{ role: 'user',
content: promptUsuario } ],
model: 'mistral-7b-instruct', // El modelo cargado en LM Studio
temperature: 1.2, // Controla la creatividad
});
// 4. Extraemos y mostramos la respuesta
const respuesta = chatCompletion.choices[0].message.content;
console.log(' Respuesta del Modelo:');
console.log(respuesta);
// 5. Guardamos la respuesta en el archivo de salida
fs.writeFileSync('salida.txt', respuesta);
console.log('\nRespuesta guardada en "salida.txt"');
} catch (error) {
console.error(' Ha ocurrido un error:');
if (error.code === 'ECONNREFUSED') {
console.error('Error: No se pudo conectar. ¿Iniciaste el servidor en LM Studio?');
} else {
console.error(error.message);
}
}
}
// Ejecutamos la función
chatearConModeloLocal();