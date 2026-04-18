import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import FiltroM from "../../components/FiltroM/FiltroM";

class Peliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
      .then(data => this.setState({ peliculas: data.results }))
      .catch(error => console.log("El error fue " + error));
  }

  render() {
    return (
      <section className="container">
        <FiltroM/>
        <h2 className="alert alert-primary">Todas las películas</h2>

        <section className="row cards">
          {this.state.peliculas.length === 0 ? (<Loader />) : (
            this.state.peliculas.map((elemento, idx) => (<Card key={elemento +idx} data={elemento}/>
            ))
          )}
        </section>
      </section>
    );
  }
}

export default Peliculas;