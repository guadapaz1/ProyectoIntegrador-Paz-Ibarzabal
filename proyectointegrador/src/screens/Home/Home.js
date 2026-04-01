import React, { Component } from "react";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
            .then(data => this.setState(
                {peliculas: data.results}
            ))
            .catch(error => console.log("El error fue" + error))

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=41abfd625c63035603389ca24c10eed0")
      .then(response => response.json())
            .then(data => this.setState(
                {series: data.results}
            ))
            .catch(error => console.log("El error fue" + error))
    }

  render() {
    return (
        <section className="container">
            <h2 className="alert alert-primary">Movies now playing</h2>
            <section className="row cards" id="now-playing">
                {this.state.peliculas.length === 0 ? <Loader/> :
                this.state.peliculas.slice(0, 6).map((elemento, idx) => <Card key={elemento +idx} data={elemento}/> )}        
            </section>
            <a href="/peliculas">Ver todas</a>
            <h2 className="alert alert-warning">Popular TV shows this week</h2>
            <section className="row cards tv-show">
                {this.state.series.length === 0 ? <Loader/> :
                this.state.series.slice(0, 6).map((elemento, idx) => <Card key={elemento +idx} data={elemento}/> )}
            </section>
            <a href="/series">Ver todas</a>
        </section>
    );
  }
}

export default Home;