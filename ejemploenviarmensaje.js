const axios = require('axios');

let data = JSON.stringify({
  "messaging_product": "whatsapp",
  "preview_url": false,
  "recipient_type": "individual",
  "to": "525519114644", // Reemplaza este número con el número al que deseas enviar el mensaje
  "type": "text",
  "text": {
    "body": "Prueba de simulación de envío de comunicados automatizados desde la API de WhatsApp por Juan Barrios"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://graph.facebook.com/v18.0/252165641309335/messages', // Reemplaza esta URL con la URL correcta para enviar mensajes
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer TU_TOKEN', // Reemplaza TU_TOKEN con tu token de autorización
    'Cookie': 'ps_l=0; ps_n=0'
  },
  data: data
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
