// enviarplantillaarea.js

const axios = require('axios');
const { obtenerPlantillas } = require('./dbConnector');
const { obtenerCodigoIdiomaPorPlantilla } = require('./dbConnector');
const { metaToken } = require('./config'); // Importa el token de acceso desde config.js
const plantillas = require('./plantillas'); // Importa las plantillas desde plantillas.js
const readline = require('readline');
const { obtenerAreas, obtenerNumerosTelefonosPorArea } = require('./dbConnector'); // Importa la función para obtener números por área

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

const enviarMensajePorArea = async (plantillaSeleccionada, numerosTelefonos) => {
  // Obtener el código de idioma correspondiente a la plantilla seleccionada
  const codigoIdioma = await obtenerCodigoIdiomaPorPlantilla(plantillaSeleccionada);

  // Obtener los datos de la plantilla seleccionada
  const dataPlantilla = plantillas[plantillaSeleccionada];

  // Iterar sobre los números de teléfono y enviar el mensaje a cada uno
  for (const numeroTelefono of numerosTelefonos) {
    // Datos del mensaje en formato JSON
    let data = JSON.stringify({
      ...dataPlantilla, // Utiliza los datos de la plantilla seleccionada
      to: numeroTelefono // Agrega el número de teléfono actual
    });

    // Configuración de la solicitud
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v18.0/252165641309335/messages', // Revisa si esta URL es correcta y tienes permisos para acceder
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${metaToken}`, // Utiliza el token de acceso de Facebook
        'Cookie': 'ps_l=0; ps_n=0' // Reemplaza con las cookies necesarias, si es aplicable
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
    const opcionPlantilla = await solicitarInput('Seleccione el número de la plantilla: ');
    const plantillaSeleccionada = plantillaNombres[opcionPlantilla - 1];

    // Obtener las áreas disponibles y permitir al usuario elegir una
    console.log('Áreas disponibles:');
    const areasDisponibles = await obtenerAreas();
    areasDisponibles.forEach((area, index) => {
      console.log(`${index + 1}. ${area}`);
    });
    const opcionArea = await solicitarInput('Seleccione el número del área para la cual se enviará la plantilla: ');
    const areaSeleccionada = areasDisponibles[opcionArea - 1];

    // Obtener los números de teléfono para el área seleccionada
    const numerosTelefonosPorArea = await obtenerNumerosTelefonosPorArea(areaSeleccionada);

    // Enviar el mensaje con la plantilla seleccionada a los números de teléfono obtenidos
    await enviarMensajePorArea(plantillaSeleccionada, numerosTelefonosPorArea);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
};

main();
