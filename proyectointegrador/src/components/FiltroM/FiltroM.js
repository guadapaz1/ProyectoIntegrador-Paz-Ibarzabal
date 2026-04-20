import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

class FiltroM extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      datos: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
      .then(data => this.setState({ datos: data.results }))
      .catch(error => console.log("El error fue: " + error));
  }

  enviarFormulario(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      value: event.target.value
    });
  }

  filtrarPeliculas(textoAFiltrar) {
    return this.state.datos.filter((unaPelicula) =>
      unaPelicula.title.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
  }

    render(){
      let peliculasFiltradas = this.filtrarPeliculas(this.state.value);
        return (
      <>
        <form onSubmit={(event) => this.enviarFormulario(event)} className="search-form">
          <input type="text" className="" name="value" placeholder="Buscar..." value={this.state.value} onChange={(event) => this.controlarCambios(event)} />
        </form>
        {this.state.datos.length === 0 ? <Loader/> : (peliculasFiltradas.map((i) => (<Card key={i.id} data={i}/>)))}
      </>

    );
  }
}


export default withRouter(FiltroM)