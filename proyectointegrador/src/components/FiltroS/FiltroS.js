import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "../Card/Card";

class FiltroS extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      datos: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0")
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

  filtrarSeries(textoAFiltrar) {
    return this.state.datos.filter((unaSerie) =>
      unaSerie.name.toLowerCase().includes(textoAFiltrar.toLowerCase())
    );
  }

    render(){
let seriesFiltradas = this.filtrarSeries(this.state.value);
        return (
      <>
        <form onSubmit={(event) => this.enviarFormulario(event)} className="search-form">
          <input type="text" className="" name="value" placeholder="Buscar..." value={this.state.value} onChange={(event) => this.controlarCambios(event)} />
        </form>
        {this.state.datos.length === 0 ? (<h2>Cargando...</h2>) : (seriesFiltradas.map((i) => (<Card key={i.id} data={i}/>)))}
      </>

    );
  }
}


export default withRouter(FiltroS)