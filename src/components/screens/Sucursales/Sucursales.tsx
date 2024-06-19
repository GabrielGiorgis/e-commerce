import "./Sucursales.css";

const Sucursales = () => {
  return (
    <div className="main-container">
      <h1 className="title">Selecciona una sucursal</h1>
      <div className="cards">
        {/* {sucursales.map((sucursal) => (
          <div className="card">
            <p className="tip">{sucursal.nombre}</p>
            <p className="second-text">{sucursal.direccion.calle} {sucursal.direccion.numero}, {sucursal.direccion.localidad.nombre}</p>
          </div>
        ))} */}
        {/* EJEMPLO */}
        <div className="card">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
        <div className="card">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
        <div className="card">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
};

export default Sucursales;
