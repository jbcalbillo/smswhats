const mysql = require('mysql');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'carlos12',
  password: 'carlos12',
  database: 'message_data'
});

// Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión establecida con la base de datos MySQL');
  solicitarNumeroEmpleado();
});

// Función para solicitar al usuario el número de empleado a borrar
function solicitarNumeroEmpleado() {
  rl.question('Ingrese el número de empleado a borrar: ', (numeroEmpleado) => {
    if (!numeroEmpleado) {
      console.log('¡El número de empleado es obligatorio!');
      solicitarNumeroEmpleado(); // Vuelve a solicitar el número de empleado
    } else {
      // Verificar si el número de empleado existe en la tabla y borrarlo si lo encuentra
      confirmarBorrado(numeroEmpleado);
    }
  });
}

// Función para confirmar el borrado de un usuario antes de realizar la operación
function confirmarBorrado(numeroEmpleado) {
  connection.query('SELECT nombre FROM numeros2 WHERE no_empleado = ?', numeroEmpleado, (err, rows) => {
    if (err) {
      console.error('Error al buscar el usuario en la base de datos:', err);
      rl.close();
      connection.end();
      return;
    }

    // Verificar si se encontró al usuario con el número de empleado proporcionado
    if (rows.length === 0) {
      console.log('No se encontró ningún usuario con el número de empleado proporcionado.');
      rl.close();
      connection.end();
      return;
    }

    const nombreEmpleado = rows[0].nombre;
    // Mostrar confirmación y esperar respuesta del usuario
    rl.question(`¿Seguro deseas borrar a "${nombreEmpleado}"? (S/N): `, (respuesta) => {
      if (respuesta.toLowerCase() === 's') {
        borrarUsuario(numeroEmpleado, nombreEmpleado); // Borrar al usuario si la respuesta es S
      } else {
        console.log('Operación cancelada.');
        rl.close();
        connection.end();
      }
    });
  });
}

// Función para borrar un usuario de la base de datos MySQL por su número de empleado
function borrarUsuario(numeroEmpleado, nombreEmpleado) {
  connection.query('DELETE FROM numeros2 WHERE no_empleado = ?', numeroEmpleado, (err, result) => {
    if (err) {
      console.error('Error al borrar el usuario de la base de datos:', err);
    } else if (result.affectedRows === 0) {
      console.log('No se encontró ningún usuario con el número de empleado proporcionado.');
    } else {
      console.log(`El usuario "${nombreEmpleado}" ha sido borrado exitosamente de la base de datos.`);
    }
    rl.close();
    connection.end(); // Cerrar la conexión a la base de datos
  });
}
