import { useState, useEffect } from "react";
import { sendRequest } from "../../functions";

const Blog = () => {
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    getEntradas();
  }, []);

  const getEntradas = async () => {
    const res = await sendRequest("GET", "", "/entradas", "");
    setEntradas(res);
  };

  return (
    <div>
      <h2 className=" mt-3 mb-3">Bienvenido al blog</h2>
      {entradas.map((entrada) => {
        return (
          <article key={entrada.id}>
            <h3>Entrada: {entrada.titulo}</h3>
            <p>{entrada.contenido}</p>
          </article>
        );
      })}
    </div>
  );
};

export default Blog;
