import React, { useState } from 'react';

import { ICliente } from '../../../types/ICliente';
import './RegisterClient.css'

export const RegisterClient = () => {
  const [cliente, setCliente] = useState<ICliente>({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    imagenCliente: { UUID: '', name: '', url: '' },
    domicilios: [],
    pedidos: [],
    usuario: { userName: '', password: '' }
  });

  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, usuario: { ...cliente.usuario, [name]: value } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación básica
    if (cliente.nombre.trim() === '' || cliente.apellido.trim() === '' ||
        cliente.telefono.trim() === '' || cliente.email.trim() === '' ||
        cliente.usuario.userName.trim() === '' || cliente.usuario.password.trim() === '') {
      setError('Por favor, complete todos los campos');
      return;
    }
    // Aquí puedes manejar la lógica de registro
    console.log('Cliente:', cliente);
    // Reset error message
    setError('');
  };

  return (
    <div className="registro-container">
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={handleInputChange}
            placeholder="Ingrese su nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={cliente.apellido}
            onChange={handleInputChange}
            placeholder="Ingrese su apellido"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={cliente.telefono}
            onChange={handleInputChange}
            placeholder="Ingrese su teléfono"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleInputChange}
            placeholder="Ingrese su email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Nombre de Usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={cliente.usuario.userName}
            onChange={handleUsuarioChange}
            placeholder="Ingrese su nombre de usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={cliente.usuario.password}
            onChange={handleUsuarioChange}
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="registro-button">Registrar</button>
      </form>
    </div>
  );
};

