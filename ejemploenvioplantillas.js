const axios = require('axios');

// Datos del mensaje en formato JSON
let data = JSON.stringify({
  "messaging_product": "whatsapp",
  "to": "525519114644",  // Reemplaza con el número al que deseas enviar el mensaje
  "type": "template",
  "template": {
    "name": "tst12",
    "language": {
      "code": "es_MX"
    }
  }
});

// Configuración de la solicitud
let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://graph.facebook.com/v18.0/252165641309335/messages', // Revisa si esta URL es correcta y tienes permisos para acceder
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer Your_Facebook_Access_Token',  // Reemplaza con tu token de acceso de Facebook
    'Cookie': 'ps_l=0; ps_n=0'  // Reemplaza con las cookies necesarias, si es aplicable
  },
  data: data
};

// Enviar la solicitud
axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
