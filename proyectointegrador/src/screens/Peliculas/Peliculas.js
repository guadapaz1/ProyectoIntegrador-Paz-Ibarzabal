import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Peliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      page: 1,
      texto: ""
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
  }

  controlarCambios(event) {
    this.setState({
     texto: event.target.value
    });
  }

  filtrarPeliculas() {
    return this.state.peliculas.filter(
      (unaPeli) => unaPeli.title.toLowerCase().includes(this.state.texto.toLowerCase())
    );
  }

  cargarPeliculas() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${this.state.page}`)
    .then(response => response.json())
    .then(data => {
      let nuevas = [];

      for (let i = 0; i < this.state.peliculas.length; i++) {
        nuevas.push(this.state.peliculas[i]);
      }

      for (let i = 0; i < data.results.length; i++) {
        nuevas.push(data.results[i]);
      }

      this.setState({
        peliculas: nuevas
      });
    })
    .catch(error => console.log("El error fue " + error));
}

  cargarMas() {
    this.setState(
      {page: this.state.page + 1},
      () => this.cargarPeliculas() 
    );
  }

  render() {
    let peliculasFiltradas = this.filtrarPeliculas();
    return (
      <section className="container">
        <form className="search-form">
        <input type="text" placeholder="Buscar..." value={this.state.texto} onChange={(event) => this.controlarCambios(event)}/>
      </form>
        <h2 className="alert alert-primary">Todas las películas</h2>

        <section className="row cards">
           {this.state.peliculas.length === 0 ? (<Loader />) : 
           (peliculasFiltradas.map((elemento, idx) => (<Card key={elemento +idx} data={elemento}/>)))}
        </section>
        <button onClick={() => this.cargarMas()} className="btn btn-primary"> Cargar más </button>
      </section>
    );
  }
}

export default Peliculas;
