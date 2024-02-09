import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddNew from "../../Components/AddNew";
import Table from "../../Components/Table";
import { confirmation, sendRequest } from "../../functions";

const Entradas = () => {
  const [entradas, setEntradas] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [table, setTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntradas, setFilteredEntradas] = useState([]);
  const [expandedContenido, setContenido] = useState(null);

  useEffect(() => {
    getEntradas();
  }, []);

  useEffect(() => {
    filterEntradas();
  }, [searchTerm, entradas]);

  const getEntradas = async () => {
    // setLoading(true);
    const res = await sendRequest("GET", "", "/entradas", "");
    setEntradas(res);
    setTable(res);
    // setLoading(false);
  };

  const filterEntradas = () => {
    if (searchTerm === "") {
      setFilteredEntradas(entradas);
    } else {
      const filtered = entradas.filter(
        (entrada) =>
          entrada.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entrada.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entrada.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entrada.contenido.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntradas(filtered);
    }
  };

  const deleteEntrada = (id, name) => {
    confirmation(name, `/entradas/${id}`, "/entradas");
  };

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              aria-label="Buscar"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-auto">
          <AddNew>
            <Link to="/create" className="btn btn-primary">
              Nueva Entrada
            </Link>
          </AddNew>
        </div>
      </div>
      <Table col="12" off="" table={table}>
        <div className="table-responsive">
          <table className="table table-bordered talbe-responsive">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">TÍtulo</th>
                <th scope="col">Autor</th>
                <th scope="col">Fecha</th>
                <th scope="col">Contenido</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntradas.map((entrada) => (
                <tr key={entrada.id}>
                  <th scope="row">{entrada.id}</th>
                  <td>{entrada.titulo}</td>
                  <td>{entrada.autor}</td>
                  <td>{new Date(entrada.fecha).toLocaleDateString()}</td>
                  <td>
                    {expandedContenido === entrada.id
                      ? entrada.contenido
                      : `${entrada.contenido.substring(0, 70)}...`}
                    {expandedContenido === entrada.id ? (
                      <a
                        className="text-primary"
                        href="#"
                        role="button"
                        onClick={() => setContenido(null)}
                      >
                        Ver menos
                      </a>
                    ) : (
                      <a
                        className="text-primary"
                        href="#"
                        role="button"
                        onClick={() => setContenido(entrada.id)}
                      >
                        Ver más
                      </a>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/edit/${entrada.id}`}
                      className="btn btn-warning me-1"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteEntrada(entrada.id, entrada.title)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Table>
    </div>
  );
};

export default Entradas;
