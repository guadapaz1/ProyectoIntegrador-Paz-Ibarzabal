import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    const tipo = this.props.match.params.tipo;
    const id = this.props.match.params.id;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=41abfd625c63035603389ca24c10eed0`)
      .then(response => response.json())
      .then(data => this.setState(
        {data: data}
        ))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <section className="container">

        {this.state.data.id === undefined ? (<Loader />) 
        : (<div>
            <h2>{this.state.data.title || this.state.data.name}</h2>
            <img className="detalle-img" src={"https://image.tmdb.org/t/p/w500" + this.state.data.poster_path} alt={this.state.data.title || this.state.data.name}/>

            <p>Rating:{this.state.data.vote_average}</p>

            <p>Fecha de estreno: {" "} {this.state.data.release_date || this.state.data.first_air_date}</p>

            <p>Sinopsis: {this.state.data.overview}</p>

          </div>
        )}

      </section>
    );
  }
}

export default Detalle;