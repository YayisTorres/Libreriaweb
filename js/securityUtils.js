// Librería para máximos intentos en login
const intentos = {};
const intentosMaximos = 3;
const WINDOW_MS = 60 * 1000; // 1 minuto en milis

function checarIntentos(userId) {
  const tiempo = Date.now();

  if (!intentos[userId]) {
    intentos[userId] = [];
  }

  // Filtra los intentos que siguen dentro del rango de tiempo
  intentos[userId] = intentos[userId].filter(ts => tiempo - ts < WINDOW_MS);

  if (intentos[userId].length >= intentosMaximos) {
    const tiempoRestante = Math.ceil((WINDOW_MS - (tiempo - intentos[userId][0])) / 1000);
    throw new Error(`Demasiados intentos. Espere ${tiempoRestante} segundos`);
  }

  // Registra este nuevo intento
  intentos[userId].push(tiempo);
}

function limpiarIntentos(userId) {
  if (intentos[userId]) {
    delete intentos[userId];
  }
}

// Código para manejar el formulario
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formularioLogin');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusElement = document.getElementById('estado');
    
    try {
      // Verificar intentos
      checarIntentos(username);
      
      // Simulación de login 
      if (username === "admin" && password === "1234") {
        statusElement.textContent = "¡Inicio de sesión exitoso!";
        statusElement.className = "mensaje-exito";
        limpiarIntentos(username);
      } else {
        statusElement.textContent = " Usuario o contraseña incorrectos";
        statusElement.className = "mensaje-error";
        throw new Error("Datos inválidos");
      }
    } catch (err) {
      if (err.message !== "Datos inválidos") {
        statusElement.textContent = err.message;
        statusElement.className = "mensaje-error";
      }
    }
  });
});

// Para usar en otros archivos
window.loginLibrary = {
  checarIntentos,
  limpiarIntentos
};
// seguridad de  contraseñas
function evaluarSeguridadPassword(password) {
  let puntaje = 0;

  if (password.length >= 8) puntaje++;                        // longitud mínima
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) puntaje++; // mayúsculas y minúsculas
  if (/\d/.test(password)) puntaje++;                         // números
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) puntaje++;      // símbolos

  if (puntaje <= 1) return 'Débil';
  if (puntaje === 2 || puntaje === 3) return 'Media';
  if (puntaje === 4) return 'Fuerte';
}

// Ejemplos:
console.log(evaluarSeguridadPassword("hola"));          // Débil
console.log(evaluarSeguridadPassword("Hola1234"));      // Media
console.log(evaluarSeguridadPassword("Hola1234!@"));    // Fuerte

// generador de contraseña aleatoria
function generarPassword(longitud = 12) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?';
  let password = '';
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    password += caracteres[indiceAleatorio];
  }
  return password;
}

// Ejemplo de uso
console.log(generarPassword(16));
