// enviarmensajearea.js

const axios = require('axios');
const { obtenerNumerosTelefonosPorArea } = require('./dbConnector'); // Importa la función para obtener números por área
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

const enviarMensajePorArea = async (mensaje, area) => {
  try {
    // Obtener los números de teléfono para el área seleccionada
    const numerosTelefonosPorArea = await obtenerNumerosTelefonosPorArea(area);

    // Iterar sobre los números de teléfono y enviar el mensaje a cada uno
    for (const numeroTelefono of numerosTelefonosPorArea) {
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
    }
  } catch (error) {
    console.error('Error al enviar mensajes por área:', error);
  }
};

// Obtener el área para la cual se enviará el mensaje
const main = async () => {
  try {
    // Solicitar al usuario que ingrese el área para la cual se enviará el mensaje
    const areaSeleccionada = await solicitarInput('Ingrese el área para la cual se enviará el mensaje: ');

    // Solicitar al usuario que ingrese el mensaje a enviar
    const mensaje = await solicitarInput('Ingrese el mensaje a enviar: ');

    // Enviar el mensaje a los números de teléfono asociados al área seleccionada
    await enviarMensajePorArea(mensaje, areaSeleccionada);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();

