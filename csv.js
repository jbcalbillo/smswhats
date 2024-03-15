const fs = require('fs');
const csv = require('csv-parser');

// Ruta del archivo CSV de entrada
const csvFilePath = 'C:/Users/Familia MB/Downloads/directorio-organizacional.csv';

// Arreglo para almacenar los datos del CSV
let data = [];

// Leer el archivo CSV
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Agregar cada fila como un objeto al arreglo de datos
    data.push(row);
  })
  .on('end', () => {
    // Convertir los datos a formato JavaScript
    const jsData = `const data = ${JSON.stringify(data, null, 2)};`;

    // Ruta del archivo JavaScript de salida
    const jsFilePath = 'C:/Users/Familia MB/Downloads/datos.js';

    // Escribir los datos en el archivo JavaScript
    fs.writeFileSync(jsFilePath, jsData);

    console.log('Archivo JavaScript generado con éxito.');
  });
