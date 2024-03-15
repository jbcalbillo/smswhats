// dbConnector.js

const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'carlos12',
  password: 'carlos12',
  database: 'message_data',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para obtener los datos de la tabla numeros2
const obtenerNumeros = async () => {
  try {
    const [rows] = await pool.query('SELECT nombre, movil, area FROM numeros2');
    return rows;
  } catch (error) {
    console.error('Error al obtener los datos de la tabla numeros2:', error);
    throw error;
  }
};

// Función para obtener los datos de la tabla areas
const obtenerAreas = async () => {
  try {
    const [rows] = await pool.query('SELECT area_a FROM areas');
    return rows.map(row => row.area_a); // Devuelve solo los nombres de las áreas
  } catch (error) {
    console.error('Error al obtener los datos de la tabla areas:', error);
    throw error;
  }
};

  

// Función para obtener los datos de la tabla plantillas
const obtenerPlantillas = async () => {
  try {
    const [rows] = await pool.query('SELECT name, code FROM plantillas');
    return rows;
  } catch (error) {
    console.error('Error al obtener los datos de la tabla plantillas:', error);
    throw error;
  }
};

// Función para obtener el código de idioma por plantilla
const obtenerCodigoIdiomaPorPlantilla = async () => {
    try {
      const [rows] = await pool.query('SELECT code FROM plantillas');
      return rows;
    } catch (error) {
      console.error('Error al obtener los datos de la tabla plantillas:', error);
      throw error;
    }
};

// Función para obtener los números de teléfono desde la base de datos
const obtenerNumerosTelefonos = async () => {
  try {
    // Ejecuta la consulta para obtener los números de teléfono
    const query = 'SELECT movil FROM numeros2';
    const [resultados] = await pool.query(query);

    // Extrae los números de teléfono de los resultados
    const numerosTelefonos = resultados.map(resultado => resultado.movil);

    return numerosTelefonos;
  } catch (error) {
    throw error;
  }
};

// Función para obtener los números de teléfono por área desde la base de datos
const obtenerNumerosTelefonosPorArea = async (area) => {
    try {
      // Ejecuta la consulta para obtener los números de teléfono para el área especificada
      const query = 'SELECT movil FROM numeros2 WHERE area = ?';
      const [resultados] = await pool.query(query, [area]);
  
      // Extrae los números de teléfono de los resultados
      const numerosTelefonos = resultados.map(resultado => resultado.movil);
  
      return numerosTelefonos;
    } catch (error) {
      throw error;
    }
  };
  

  
module.exports = { obtenerNumeros, obtenerAreas, obtenerPlantillas, obtenerCodigoIdiomaPorPlantilla, obtenerNumerosTelefonos, obtenerNumerosTelefonosPorArea };
