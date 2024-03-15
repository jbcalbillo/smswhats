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
  solicitarDatosUsuario();
});

// Función para solicitar al usuario los datos del nuevo usuario
function solicitarDatosUsuario() {
  rl.question('Nombre del usuario: ', (nombre) => {
    rl.question('Puesto del usuario: ', (puesto) => {
      rl.question('Localidad del usuario: ', (localidad) => {
        rl.question('Jefe Directo del usuario: ', (jefeDirecto) => {
          rl.question('Teléfono del usuario: ', (movil) => {
            rl.question('Correo del usuario: ', (correo) => {
              rl.question('Área del usuario: ', (area) => {
                rl.question('Número de empleado: ', (noEmpleado) => {
                  const nuevoUsuario = {
                    nombre,
                    puesto,
                    localidad,
                    jefe_directo: jefeDirecto,
                    movil,
                    correo,
                    area,
                    no_empleado: noEmpleado // Agregar el número de empleado al objeto de usuario
                  };
                  agregarUsuario(nuevoUsuario);
                });
              });
            });
          });
        });
      });
    });
  });
}

// Función para agregar un nuevo usuario a la base de datos MySQL
function agregarUsuario(usuario) {
  // Verificar si ya existe un usuario con el mismo número de empleado o número de teléfono (movil)
  connection.query('SELECT * FROM numeros2 WHERE no_empleado = ? OR movil = ?', [usuario.no_empleado, usuario.movil], (err, rows) => {
    if (err) {
      console.error('Error al verificar duplicados en la base de datos:', err);
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
      return;
    }

    // Si se encontraron filas en el resultado, significa que ya existe un usuario con el mismo número de empleado o número de teléfono
    if (rows.length > 0) {
      const usuarioDuplicado = rows[0];
      if (usuarioDuplicado.no_empleado === usuario.no_empleado) {
        console.log(`El número de empleado ${usuario.no_empleado} ya está asociado al usuario ${usuarioDuplicado.nombre}.`);
      }
      if (usuarioDuplicado.movil === usuario.movil) {
        console.log(`El número de teléfono ${usuario.movil} ya está asociado al usuario ${usuarioDuplicado.nombre}.`);
      }
      console.log('No se pudo agregar el usuario debido a duplicados.');
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
      return;
    }

    // Si no se encontraron filas en el resultado, insertar el nuevo usuario
    connection.query('INSERT INTO numeros2 SET ?', usuario, (err, result) => {
      if (err) {
        console.error('Error al insertar el usuario en la base de datos:', err);
      } else {
        console.log('El usuario ha sido agregado exitosamente a la base de datos.');
      }
      rl.close();
      connection.end(); // Cerrar la conexión a la base de datos
    });
  });
}
