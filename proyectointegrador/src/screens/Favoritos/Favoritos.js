import React, { Component } from "react";
import Card from "../../components/Card/Card";

class Favoritos extends Component {
    constructor(props){
        super(props);
        this.state = {
      peliculasFavoritas: [],
      seriesFavoritas: [],
      cargando: true
}
    }

    componentDidMount(){
        let storageMovies = localStorage.getItem("favoritosMovies");
        let storageSeries = localStorage.getItem("favoritosSeries");

        let moviesParseado = storageMovies ? JSON.parse(storageMovies) : [];
        let seriesParseado = storageSeries ? JSON.parse(storageSeries) : [];

        if (moviesParseado.length === 0 && seriesParseado.length === 0) {
    this.setState({
        peliculasFavoritas: [],
        seriesFavoritas: [],
        cargando: false
    });
        } else {
            let pedidosMovies = moviesParseado.map(id =>
            fetch(`https://api.themoviedb.org/3/movie/${id}??api_key=41abfd625c63035603389ca24c10eed0`)
            .then(response => response.json())
            );
            let pedidosSeries = seriesParseado.map(id =>
            fetch(`https://api.themoviedb.org/3/tv/${id}??api_key=41abfd625c63035603389ca24c10eed0`)
            .then(response => response.json())
            );

            Promise.all([
  Promise.all(pedidosMovies),
  Promise.all(pedidosSeries)
])
.then(([peliculasRecuperadas, seriesRecuperadas]) => {
  this.setState({
    peliculasFavoritas: peliculasRecuperadas,
    seriesFavoritas: seriesRecuperadas,
    cargando: false
  });
})
.catch(error => {
  console.log(error);
  this.setState({
    peliculasFavoritas: [],
    seriesFavoritas: [],
    cargando: false
  });
});
                
        }
    }

    render(){
        return(
            <section className="cardContainer">
  <h2>Películas favoritas</h2>
  {this.state.peliculasFavoritas.length === 0 ? (
    <h3>No hay películas favoritas</h3>
  ) : (
    this.state.peliculasFavoritas.map((elemento) => (
      <Card key={elemento.id} data={elemento} />
    ))
  )}

  <h2>Series favoritas</h2>
  {this.state.seriesFavoritas.length === 0 ? (
    <h3>No hay series favoritas</h3>
  ) : (
    this.state.seriesFavoritas.map((elemento) => (
      <Card key={elemento.id} data={elemento} />
    ))
  )}
</section>
        );
    }
}

export default Favoritos;