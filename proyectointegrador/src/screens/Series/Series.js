import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
      .then(data => this.setState({ series: data.results }))
      .catch(error => console.log("El error fue " + error));
  }

  render() {
    return (
      <section className="container">
        <h2 className="alert alert-warning">Todas las series</h2>

        <section className="row cards">
          {this.state.series.length === 0 ? (<Loader />) : (
            this.state.series.map((elemento, idx) => (<Card key={idx + elemento} data={elemento} />
            ))
          )}
        </section>
      </section>
    );
  }
}

export default Series;