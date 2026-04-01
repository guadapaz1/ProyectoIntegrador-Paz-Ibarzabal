import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar: false
    };
  }

  mostrarDescripcion() {
    this.setState({
      mostrar: true
    });
  }

  ocultarDescripcion() {
    this.setState({
      mostrar: false
    });
  }

  render() {
    return (
      <article className="single-card-playing">
        <img src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} />
        <div className="cardBody">
            <h3>{this.props.data.title || this.props.data.name}</h3>

            {this.state.mostrar === true ? <p className="card-text">{this.props.data.overview}</p> : ""}

            {this.state.mostrar === false ? (<button onClick={() => this.mostrarDescripcion()}>Ver descripción</button>) 
              : (<button onClick={() => this.ocultarDescripcion()}>Ocultar descripción</button>
            )}

            <Link to={`/detalle/${this.props.data.title ? "movie" : "tv"}/${this.props.data.id}`}>Ver más</Link>

        </div>

      </article>
    );
  }
}

export default Card;