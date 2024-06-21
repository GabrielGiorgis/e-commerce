import React, { useEffect, useState } from 'react';
import './LoginClient.css'
import { IUsuarioCliente } from '../../../types/IUsuarioCliente';
import { UsuarioService } from '../../../services/UsuarioService';
import { useNavigate } from 'react-router-dom';
import { ClienteService } from '../../../services/ClienteService';


const API_URL = import.meta.env.VITE_API_URL;
export const LoginClient = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');

  const [user, setUser] = useState<IUsuarioCliente>();

  const usuarioService = new UsuarioService(`${API_URL}/usuario-cliente`);
  const clienteService = new ClienteService(`${API_URL}/cliente`);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      userName: username,
      password: password,
      email: email
    });
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación basica
    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    // Aquí puedes manejar la lógica de autenticación
    try{
      const response = await usuarioService.login(user as IUsuarioCliente);
      console.log(response);
      if (response) {
        const client = await clienteService.getByUserId(response.id);
        console.log(client);
        const idClient = client?.id;
        if (idClient) {
          localStorage.setItem('idUser', idClient.toString());
          navigate('/');
        }

      }else{
        setError('Credenciales incorrectas');
        return navigate('/login');
      }
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }

    // Reset error message
    setError('');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="userName">Nombre de Usuario</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su nombre de usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="login-button">Ingresar</button>
        <p>¿No tenes una cuenta? <a href="/register">Registrate</a></p>
      </form>
    </div>
  );
};
