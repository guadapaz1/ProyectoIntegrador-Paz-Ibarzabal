import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import FiltroS from "../../components/FiltroS/FiltroS";


class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      page: 1
    };
  }

  
  componentDidMount() {
    this.cargarSeries();
  }

  cargarSeries() {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0&page=${this.state.page}`)
      .then(response => response.json())
      .then(data => this.setState({ series: this.state.series.concat(data.results)}))
      .catch(error => console.log("El error fue " + error));
  }
  cargarMas() {
    this.setState(
      {page: this.state.page + 1},
      () => this.cargarSeries() 
    )}

  render() {
    return (
      <section className="container">
        <FiltroS/>
        <h2 className="alert alert-warning">Todas las series</h2>

        <section className="row cards">
          {this.state.series.length === 0 ? (<Loader />) : (
            this.state.series.map((elemento, idx) => (<Card key={idx + elemento} data={elemento} />
            ))
          )}
        </section>
        <button onClick={() => this.cargarMas()} className="btn btn-primary"> Cargar más </button>
      </section>
    );
  }
}

export default Series;
