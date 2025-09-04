import React, { useState } from 'react';
import './RegisterForm.css'; // Crearemos este archivo para los estilos

// Este es nuestro componente funcional de React.
// Un componente es como un bloque de construcción para nuestra interfaz.
function RegisterForm() {
    // --- ESTADO DEL COMPONENTE ---
    // El "estado" es la memoria del componente. Usamos 'useState' para guardar
    // datos que pueden cambiar y que, al cambiar, deben redibujar la interfaz.
    // Aquí guardamos lo que el usuario escribe en cada campo del formulario.
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // --- MANEJADOR DE EVENTOS ---
    // Esta función se ejecutará cuando el usuario envíe el formulario.
    const handleSubmit = (event) => {
        // Prevenimos el comportamiento por defecto del formulario (que es recargar la página).
        event.preventDefault();

        // Por ahora, solo mostraremos los datos en la consola del navegador.
        // En el futuro, aquí es donde llamaríamos a la API del backend para registrar al usuario.
        console.log('Datos del formulario enviados:');
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Contraseña:', password);

        alert('¡Registro enviado! Revisa la consola para ver los datos.');
    };

    // --- RENDERIZADO DEL COMPONENTE (JSX) ---
    // Esto es lo que el componente "dibuja" en la pantalla.
    // Se parece mucho a HTML, pero es JSX, lo que nos permite mezclar JavaScript.
    return (
        <div className="register-form-container">
            <h2>Crear una Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre} // El valor del input está conectado a nuestro estado.
                        onChange={(e) => setNombre(e.target.value)} // Cuando el usuario escribe, actualizamos el estado.
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Registrarse</button>
            </form>
        </div>
    );
}

// Exportamos el componente para poder usarlo en otras partes de la aplicación.
export default RegisterForm;