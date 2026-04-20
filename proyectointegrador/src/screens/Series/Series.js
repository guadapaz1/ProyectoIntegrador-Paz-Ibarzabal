import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      page: 1,
      texto: ""
    };
  }

  
  componentDidMount() {
    this.cargarSeries();
  }

   controlarCambios(event) {
    this.setState({
     texto: event.target.value
    });
  }

  filtrarSeries() {
  return this.state.series.filter((unaSerie) =>
    unaSerie.name.toLowerCase().includes(this.state.texto.toLowerCase())
  );
}

  cargarSeries() {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${this.state.page}`)
    .then(response => response.json())
    .then(data => {
      let nuevas = [];

      for (let i = 0; i < this.state.series.length; i++) {
        nuevas.push(this.state.series[i]);
      }

      for (let i = 0; i < data.results.length; i++) {
        nuevas.push(data.results[i]);
      }

      this.setState({
        series: nuevas
      });
    })
    .catch(error => console.log("El error fue " + error));
  }


  cargarMas() {
    this.setState(
      {page: this.state.page + 1},
      () => this.cargarSeries() 
    )}

  render() {
    let seriesFiltradas = this.filtrarSeries();
    return (
      <section className="container">
        <form className="search-form">
        <input type="text" placeholder="Buscar..." value={this.state.texto} onChange={(event) => this.controlarCambios(event)}/>
      </form>
        <h2 className="alert alert-warning">Todas las series</h2>

        <section className="row cards">
          {this.state.series.length === 0 ? (<Loader />) : (
            seriesFiltradas.map((elemento, idx) => (<Card key={idx + elemento} data={elemento} />
            ))
          )}
        </section>
        <button onClick={() => this.cargarMas()} className="btn btn-primary"> Cargar más </button>
      </section>
    );
  }
}

export default Series;
