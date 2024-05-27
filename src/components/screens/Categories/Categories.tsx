import { ICategoria } from "../../../types/ICategoria";
import { CardCategoria } from "../../ui/Card/Card";
import "./Categories.css";

const Categories = () => {
  const categoriasDeMuestra: ICategoria[] = [
    {
      id: 1,
      denominacion: "Pizzas",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://img.freepik.com/foto-gratis/pizza-margarita-mesa_140725-1201.jpg?t=st=1716836480~exp=1716840080~hmac=65658fe9b871c5d4ffc8aa1663c2ec0b10179c0f5ef1bc881ed34af5ce28c184&w=740",
    },
    {
      id: 2,
      denominacion: "Hamburguesas",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://img.freepik.com/foto-gratis/bodegon-deliciosa-hamburguesa-americana_23-2149637306.jpg?t=st=1716836549~exp=1716840149~hmac=77bfcd7ecf3c4816b8822db0876df3af386f1d142bda9d5c2c7d8c7115ae8b63&w=740",
    },
    {
      id: 3,
      denominacion: "Sandwiches",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://img.freepik.com/foto-gratis/cesta-picnic-sandwich-delicioso-baguette-pollo_1147-503.jpg?t=st=1716836672~exp=1716840272~hmac=992399c21349e692eacbcc26021d71f9548093b84f9346628c5264ce14d60e66&w=740",
    },
    {
      id: 4,
      denominacion: "Papas fritas",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://img.freepik.com/foto-gratis/patatas-fritas-ketchup-mahonesa_123827-22130.jpg?t=st=1716836749~exp=1716840349~hmac=0428c4b19bf060cee5ff1c90d5079c57d50186018ac1306decf8550557bfe876&w=740",
    },
    {
      id: 5,
      denominacion: "Bebidas",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
      imagen:
        "https://img.freepik.com/foto-gratis/bebidas-gaseosas-coloridas-macro-disparo_53876-18225.jpg?t=st=1716836796~exp=1716840396~hmac=c67e39dafc477a1545d9ebd5e7297d57cf923dc1c844c196cd27e562fef14e62&w=740",
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
