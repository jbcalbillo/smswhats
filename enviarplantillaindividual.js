// enviarplantillaindividual.js

const axios = require('axios');
const { obtenerPlantillas } = require('./dbConnector');
const { obtenerCodigoIdiomaPorPlantilla } = require('./dbConnector');
const { metaToken } = require('./config'); // Importa el token de acceso desde config.js
const readline = require('readline');
const plantillas = require('./plantillas'); // Importa las plantillas desde plantillas.js

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

const enviarMensaje = async (plantillaSeleccionada, numeroTelefono) => {
  // Obtener el código de idioma correspondiente a la plantilla seleccionada
  const codigoIdioma = await obtenerCodigoIdiomaPorPlantilla(plantillaSeleccionada);

  // Obtener los datos de la plantilla seleccionada
  const dataPlantilla = plantillas[plantillaSeleccionada];

  // Datos del mensaje en formato JSON
  let data = JSON.stringify({
    ...dataPlantilla, // Utiliza los datos de la plantilla seleccionada
    to: numeroTelefono // Agrega el número de teléfono
  });

  // Configuración de la solicitud
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graph.facebook.com/v18.0/252165641309335/messages', // Revisa si esta URL es correcta y tienes permisos para acceder
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${metaToken}`,  // Utiliza el token de acceso de Facebook
      'Cookie': 'ps_l=0; ps_n=0'  // Reemplaza con las cookies necesarias, si es aplicable
    },
    data: data
  };

  // Enviar la solicitud
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

// Obtener las plantillas disponibles y permitir al usuario elegir una
const main = async () => {
  try {
    // Obtener las plantillas disponibles
    const plantillaNombres = Object.keys(plantillas);
    console.log('Plantillas disponibles:');
    plantillaNombres.forEach((nombre, index) => {
      console.log(`${index + 1}. ${nombre}`);
    });

    // Permitir al usuario elegir una plantilla
    const opcion = await solicitarInput('Seleccione el número de la plantilla: ');
    const plantillaSeleccionada = plantillaNombres[opcion - 1];

    // Solicitar al usuario que ingrese el número de teléfono
    const numeroTelefono = await solicitarInput('Ingrese el número de teléfono: ');

    // Enviar el mensaje con la plantilla seleccionada y el número de teléfono ingresado
    await enviarMensaje(plantillaSeleccionada, numeroTelefono);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
