// enviarmensajemasivo.js

const axios = require('axios');
const { obtenerPlantillas } = require('./dbConnector');
const { obtenerCodigoIdiomaPorPlantilla } = require('./dbConnector');
const { metaToken } = require('./config'); // Importa el token de acceso desde config.js
const plantillas = require('./plantillas'); // Importa las plantillas desde plantillas.js
const readline = require('readline');
const { obtenerNumerosTelefonos } = require('./dbConnector');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const solicitarInput = async (mensaje) => {
  return new Promise((resolve, reject) => {
    rl.question(mensaje, (respuesta) => {
      resolve(respuesta);
    });
  });
};

const enviarMensajeMasivo = async (mensaje, numerosTelefonos) => {
  // Iterar sobre los números de teléfono y enviar el mensaje a cada uno
  for (const numeroTelefono of numerosTelefonos) {
    // Datos del mensaje en formato JSON
    let data = JSON.stringify({
      messaging_product: 'whatsapp',
      preview_url: false,
      recipient_type: 'individual',
      to: numeroTelefono,
      type: 'text',
      text: {
        body: mensaje
      }
    });

    // Configuración de la solicitud para WhatsApp
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v18.0/252165641309335/messages', // Reemplaza esta URL con la URL correcta para enviar mensajes de WhatsApp
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${metaToken}` // Utiliza el token de acceso de Meta
      },
      data: data
    };

    // Enviar la solicitud
    try {
      const response = await axios.request(config);
      console.log(`Mensaje enviado a ${numeroTelefono}:`, JSON.stringify(response.data));
    } catch (error) {
      console.log(`Error al enviar mensaje a ${numeroTelefono}:`, error);
    }
  }
};

// Obtener los números de teléfono
const main = async () => {
  try {
    // Obtener los números de teléfono
    const numerosTelefonos = await obtenerNumerosTelefonos(); // Debes implementar esta función

    // Solicitar al usuario que ingrese el mensaje a enviar
    const mensaje = await solicitarInput('Ingrese el mensaje a enviar: ');

    // Enviar el mensaje a los números de teléfono obtenidos
    await enviarMensajeMasivo(mensaje, numerosTelefonos);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
