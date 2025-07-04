# 🔒 securityUtils.js— Librería de Autenticación y Contraseñas

---

## 📌 Descripción

**securityUtils JS** es una librería JavaScript que ofrece utilidades esenciales para:

- Limitar el número de intentos de inicio de sesión por usuario en un intervalo de tiempo.
- Evaluar la seguridad de contraseñas basándose en longitud, uso de mayúsculas/minúsculas, números y símbolos especiales.
- Generar contraseñas aleatorias seguras para proteger accesos.

Con esta librería se busca reforzar prácticas básicas de validación del lado del cliente en interfaces web.

---

## 📦 Instalación

Descarga el archivo `securityUtils.js` y añádelo en tu proyecto HTML de la siguiente forma:

```html
<script src="securityUtils.js"></script>
```

Asegúrate de que esté en la misma carpeta que tu archivo HTML o ajusta la ruta según tu estructura de carpetas.

---

## ⚙️ Uso

#### 📌 Login con límite de intentos

```html
<input type="text" id="username" placeholder="Usuario">
<input type="password" id="password" placeholder="Contraseña">
<button onclick="intentarLogin()">Iniciar sesión</button>
<div id="estado"></div>

<script>
  function intentarLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      loginLibrary.checarIntentos(username);

      if (username === "admin" && password === "1234") {
        alert("¡Inicio de sesión exitoso!");
        loginLibrary.limpiarIntentos(username);
      } else {
        alert("Usuario o contraseña incorrectos");
        throw new Error("Datos inválidos");
      }
    } catch (err) {
      alert(err.message);
    }
  }
</script>
```

---

#### 📌 Evaluar seguridad de contraseña

```javascript
console.log(evaluarSeguridadPassword("Hola1234!@"));
// Resultado: Fuerte
```

---

#### 📌 Generador de contraseña aleatoria

```javascript
console.log(generarPassword(16));
// Resultado: contraseña aleatoria de 16 caracteres
```

---

## 📸 Capturas de Pantalla

### 📍 Login con intentos limitados  
![Login con intentos limitados](https://github.com/YayisTorres/Libreriaweb/blob/main/img/loginlimite.png)

### 📍 Evaluación de seguridad de contraseñas  
![Evaluación de contraseña](https://github.com/YayisTorres/Libreriaweb/blob/main/img/validardebil.png)
![Evaluación de contraseña](https://github.com/YayisTorres/Libreriaweb/blob/main/img/validarfuerte.png)

### 📍 Generador de contraseñas aleatorias  
![Generador de contraseñas](https://github.com/YayisTorres/Libreriaweb/blob/main/img/generadorcontra.png)

---

## 🎥 Video

📹 **Demostración rápida de la librería funcionando en HTML + JS:**  

[▶ Ver video de demostración](videos/demo-seguridad.mp4)

---

## 📁 Estructura recomendada del proyecto

```
/proyecto
│
├── index.html
├── seguridad.js
│
├── /imagenes
│   ├── login-limitado.png
│   ├── evaluar-password.png
│   └── generador-password.png
│
└── /videos
    └── demo-seguridad.mp4
```

---

## 📑 Licencia

Uso libre para fines educativos y demostrativos.

---

## 📞 Contacto

Autor: Dayanira Torres Quiroz  
Correo: dayanira@example.com  
