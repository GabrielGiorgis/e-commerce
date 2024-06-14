import { ReactNode, useEffect, useState } from "react";
import { IUsuarioCliente } from "../../../types/IUsuarioCliente";
import { useNavigate } from "react-router-dom";
import { UsuarioService } from "../../../services/UsuarioService";
const API_URL = import.meta.env.VITE_API_URL;

export const RutaPrivada = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<IUsuarioCliente | undefined>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const usuarioService = new UsuarioService(`${API_URL}/usuario-cliente`);

    useEffect(() => {
        const id = localStorage.getItem('idUser');
        if (id != null) {
            const fetchUsuario = async () => {
                try {
                    const usuario = await usuarioService.getById(Number(id));
                    console.log("Usuario:", usuario);
                    if (usuario) {
                        setUsuario(usuario);
                    } else {
                        navigate('/login');
                    }
                } catch (error) {
                    console.error("Error fetching usuario:", error);
                    navigate('/login');
                } finally {
                    setLoading(false);
                }
            };

            fetchUsuario();
        } else {
            navigate('/login');
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return <div>Cargando...</div>; // O cualquier componente de carga que prefieras
    }

    return usuario ? <>{children}</> : null;
}
