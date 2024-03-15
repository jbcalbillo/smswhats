const fs = require('fs');
const readline = require('readline');
const plantillas = require('./plantillas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para agregar una plantilla
function agregarPlantilla() {
  rl.question('Ingrese el nombre de la plantilla: ', (nombre) => {
    rl.question('Ingrese el código de idioma (ej. es_MX, en_US, etc.): ', (idioma) => {
      // Crear la nueva plantilla
      const nuevaPlantilla = {
        messaging_product: "whatsapp",
        type: "template",
        template: {
          name: nombre,
          language: {
            code: idioma
          }
        }
      };

      // Agregar la nueva plantilla al objeto existente
      plantillas[nombre] = nuevaPlantilla;

      // Guardar los cambios en el archivo plantillas.js
      fs.writeFile('plantillas.js', `module.exports = ${JSON.stringify(plantillas, null, 2)};`, (err) => {
        if (err) {
          console.error('Error al guardar la plantilla:', err);
        } else {
          console.log('Plantilla agregada exitosamente.');
        }
        rl.close();
      });
    });
  });
}

// Llamar a la función para agregar la plantilla
agregarPlantilla();
