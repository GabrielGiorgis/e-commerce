import { useNavigate } from "react-router-dom";
import { IArticulo } from "../../../types/IArticulo";
import { ICategoria } from "../../../types/ICategoria";
import "./Card.css";

interface ICardCategoria {
  categoria: ICategoria;
}
export const CardCategoria = ({ categoria }: ICardCategoria) => {
  //   const navigate = useNavigate();
  //   const handleSelect = (id: number) => {
  //     navigate("/articulos/" + id);
  //   };
  return (
    <>
      <div className="card">
        <div className="card-img"></div>
        <div className="card-info">
          <p className="text-title">{categoria.denominacion}</p>
          <p className="text-body">Product description and details</p>
        </div>
      </div>
    </>
  );
};
