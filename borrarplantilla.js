const fs = require('fs');
const readline = require('readline');
const plantillas = require('./plantillas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar la lista de plantillas y solicitar al usuario que elija una
function mostrarPlantillas() {
  console.log('Lista de plantillas disponibles:');
  Object.keys(plantillas).forEach((nombre, index) => {
    console.log(`${index + 1}. ${nombre}`);
  });

  rl.question('Ingrese el número de la plantilla que desea borrar: ', (numero) => {
    const index = parseInt(numero) - 1;
    const plantillaSeleccionada = Object.keys(plantillas)[index];

    if (!plantillaSeleccionada) {
      console.log('El número ingresado no es válido. Inténtelo de nuevo.');
      mostrarPlantillas();
    } else {
      confirmarBorrado(plantillaSeleccionada);
    }
  });
}

// Función para confirmar el borrado de una plantilla
function confirmarBorrado(plantilla) {
  rl.question(`¿Está seguro de que desea borrar la plantilla "${plantilla}"? (S/N): `, (respuesta) => {
    if (respuesta.toLowerCase() === 's') {
      borrarPlantilla(plantilla);
    } else if (respuesta.toLowerCase() === 'n') {
      console.log('Operación cancelada.');
      rl.close();
    } else {
      console.log('Respuesta inválida. Por favor, responda "S" para sí o "N" para no.');
      confirmarBorrado(plantilla);
    }
  });
}

// Función para borrar una plantilla
function borrarPlantilla(nombre) {
  delete plantillas[nombre];

  // Guardar los cambios en el archivo plantillas.js
  fs.writeFile('plantillas.js', `module.exports = ${JSON.stringify(plantillas, null, 2)};`, (err) => {
    if (err) {
      console.error('Error al guardar el archivo:', err);
    } else {
      console.log(`La plantilla "${nombre}" ha sido borrada exitosamente.`);
    }
    rl.close();
  });
}

// Llamar a la función para mostrar la lista de plantillas
mostrarPlantillas();
