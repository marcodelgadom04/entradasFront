import { useEffect, useState, useRef } from "react";
import { sendRequest } from "../functions";

const FormEntradas = (params) => {
  const [titulo, setTitulo] = useState("");
  const [author, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [fecha, setFecha] = useState("");

  const TituloInput = useRef();
  const AutorInput = useRef();
  const ContenidoInput = useRef();
  const FechaInput = useRef();

  let method = "POST";
  let url = "/entradas";
  let redirect = "/entradas";

  useEffect(() => {
    TituloInput.current.focus();
    AutorInput.current.focus();
    ContenidoInput.current.focus();
    FechaInput.current.focus();
    getEntradas();
  }, []);

  const getEntradas = async () => {
    const res = await sendRequest("GET", "", url + "/" + params.id, "");
    setTitulo(res.titulo);
    setAutor(res.autor);
    setContenido(res.contenido);
    setFecha(res.fecha);
  };

  const saveEntrada = async (e) => {
    e.preventDefault();
    if (params.id !== null) {
      method = "PUT";
      url = url + "/" + params.id;
      redirect = "/entradas";
    }
    const res = await sendRequest(
      method,
      { titulo: titulo, autor: author, contenido: contenido, fecha: fecha },
      url,
      redirect
    );
    if (method === "POST" && res.status == true) {
      setTitulo("");
      setAutor("");
      setContenido("");
      setFecha("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-header">{params.tittle}</div>
            <div className="card-body">
              <form onSubmit={saveEntrada}>
                <div>
                  <label htmlFor="titulo">Título:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={titulo}
                    required="required"
                    ref={TituloInput}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="autor">Autor:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="autor"
                    name="autor"
                    value={author}
                    required="required"
                    ref={AutorInput}
                    onChange={(e) => setAutor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="fecha">Fecha:</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    required="required"
                    ref={FechaInput}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contenido">Contenido:</label>
                  <textarea
                    id="contenido"
                    name="contenido"
                    value={contenido}
                    required="required"
                    ref={ContenidoInput}
                    onChange={(e) => setContenido(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEntradas;