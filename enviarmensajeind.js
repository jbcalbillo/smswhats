// enviarmensajeind.js

const axios = require('axios');
const { metaToken } = require('./config'); // Importa el token de acceso desde config.js
const readline = require('readline');

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

const enviarMensajeANumero = async (mensaje, numeroTelefono) => {
  try {
    // Datos del mensaje en formato JSON
    let data = JSON.stringify({
      messaging_product: 'whatsapp',
      preview_url: false,
      recipient_type: 'individual',
      to: numeroTelefono,
      type: 'text',
      text: {
        body: mensaje // Usamos el mensaje ingresado por el usuario
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
    const response = await axios.request(config);
    console.log(`Mensaje enviado a ${numeroTelefono}:`, JSON.stringify(response.data));
  } catch (error) {
    console.error(`Error al enviar mensaje a ${numeroTelefono}:`, error);
  }
};

// Solicitar al usuario que ingrese el número de teléfono al que se enviará el mensaje
const main = async () => {
  try {
    const numeroTelefono = await solicitarInput('Ingrese el número de teléfono al que se enviará el mensaje: ');

    // Solicitar al usuario que ingrese el mensaje a enviar
    const mensaje = await solicitarInput('Ingrese el mensaje a enviar: ');

    // Enviar el mensaje al número de teléfono proporcionado por el usuario
    await enviarMensajeANumero(mensaje, numeroTelefono);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
