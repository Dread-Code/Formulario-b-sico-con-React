import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";
const Form = ({ showed }) => {
  const [titulo, setTitulo] = useState("");
  const [publicacion, setPublicacion] = useState("");

  const firstInput = useRef(); // useRef se usa para hacer referencia a un elemento del DOM 

  useEffect(()=>{
    // Actualizar el DOM es un efecto secundario 
    if(showed){ // si showed es igual a true 
      firstInput.current.focus(); // current significa que ahi esta guardado el objeto que estamos llamando por referencia 
    }
    console.log(":3");
  },[showed]) // unicamente se ejecutara cuando showed cambie
  const sendForm = ev => {
    ev.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: titulo,
        body: publicacion,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        setTitulo("");
        setPublicacion("");
        console.log(json);
      });
  };
  return (
    <form onSubmit={ev => sendForm(ev)}>
      <div>
        <label htmlFor="titulo">Titulo</label>
        <input
          type="text"
          value={titulo}
          id="titulo"
          onChange={ev => setTitulo(ev.target.value)} ref = {firstInput}
        />
      </div>
      <div>
        <label htmlFor="publicacion">Publicacion</label>
        <textarea
          id="publicacion"
          value={publicacion}
          onChange={ev => setPublicacion(ev.target.value)}
        />
      </div>
      <input type="submit" value="Enviar" />
    </form>
  );
};

const According = () => {
  const [show, setShow] = useState(false); // creamos un estado 
  return ( // cuando hagan clic se cambia el estado  y pasa a ser true
    <div>
      <button onClick={() => setShow(true)}>Mostrar formulario</button>
      {show && <Form showed={show} />} 
    </div> // Evalua si show es igual a true primero si lo es muestra el dom y creamos un prop llamado showed el cual lo vamos a pasar en el componente Form 
  );
};

const App = () => {
  return (
    <div>
      <According />
    </div>
  );
};
render(<App />, document.getElementById("root"));
