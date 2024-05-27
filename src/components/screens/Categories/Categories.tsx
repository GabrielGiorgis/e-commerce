import { ICategoria } from "../../../types/ICategoria";
import { CardCategoria } from "../../ui/Card/Card";
import "./Categories.css";

const Categories = () => {
  const categoriasDeMuestra: ICategoria[] = [
    {
      id: 1,
      denominacion: "CATEGORIA 1",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
    {
      id: 2,
      denominacion: "CATEGORIA 2",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
    {
      id: 3,
      denominacion: "CATEGORIA 3",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
    {
      id: 4,
      denominacion: "CATEGORIA 4",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
    {
      id: 5,
      denominacion: "CATEGORIA 5",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
    {
      id: 6,
      denominacion: "CATEGORIA 6",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg",
    },
  ];

  return (
    <>
      <p className="title">Nuestros productos</p>
      <div className="cards-container">
        {categoriasDeMuestra.map((categoria) => (
          <div key={categoria.id} className="card-container">
            <CardCategoria categoria={categoria} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
