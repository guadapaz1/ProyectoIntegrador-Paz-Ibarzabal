import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar: false,
      esFavorito: false
    };
  }
componentDidMount() {
  
            let storage = localStorage.getItem("favoritos");
            let storageParseado = JSON.parse(storage);

            let favorito = false;

            if (storageParseado !== null) {
              for (let i=0; i< storageParseado.length; i++){
                if(storageParseado[i] === this.props.data.id){
                  favorito=true
                }
              }
            }

            this.setState({
                esFavorito: favorito
            });
        }
        
  
  agregarFav(id){
    let storage = localStorage.getItem("favoritos");
    let storageParseado = JSON.parse(storage);

    if(storageParseado !== null){
        storageParseado.push(id);
        let storageString = JSON.stringify(storageParseado);
        localStorage.setItem("favoritos", storageString);
    } 
    else {
        let primerFav = [id];
        let storageString = JSON.stringify(primerFav);
        localStorage.setItem("favoritos", storageString);
    } 
    
    this.setState(
        {esFavorito: true});
  }

  sacarFav(id){
    let storage = localStorage.getItem("favoritos");
    let storageParseado = JSON.parse(storage);

    let array= []

    for (let i =0; i< storageParseado.length; i++){
      if (storageParseado[i] !== id){
        array.push(storageParseado[i])
      }
    }

    let storageString = JSON.stringify(array);
    localStorage.setItem("favoritos", storageString);

    this.setState({
        esFavorito: false
    });
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

           {this.state.esFavorito === false ? (
            <button onClick={() => this.agregarFav(this.props.data.id)}>
              Agregar a favoritos
            </button>
          ) : (
            <button onClick={() => this.sacarFav(this.props.data.id)}>
              Eliminar de favoritos
            </button>
          )}

        </div>

      </article>
    );
  }
}

export default Card;