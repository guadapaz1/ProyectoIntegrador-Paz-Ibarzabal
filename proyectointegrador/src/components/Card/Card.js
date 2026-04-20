import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar: false,
      esFavorito: false,
       generos: []
    };
  }
componentDidMount() {
    let tip = this.props.data.title ? "movie" : "tv";
  fetch(`https://api.themoviedb.org/3/genre/${tip}/list?api_key=41abfd625c63035603389ca24c10eed0`)
    .then(response => response.json())
    .then(data => this.setState({ generos: data.genres }))
    .catch(error => console.log(error));

    let tipo = this.props.data.title ? "favoritosMovies" : "favoritosSeries";

    let storage = localStorage.getItem(tipo);
    let storageParseado = storage ? JSON.parse(storage) : [];

    let favorito = false;

    for (let i = 0; i < storageParseado.length; i++) {
        if (storageParseado[i] === this.props.data.id) {
            favorito = true;
        }
    }

    this.setState({
        esFavorito: favorito
    });
}

agregarFav(id){
  let tipo = this.props.data.title ? "favoritosMovies" : "favoritosSeries";

  let storage = localStorage.getItem(tipo);
  let storageParseado = storage ? JSON.parse(storage) : [];

  storageParseado.push(id);
  let storageString = JSON.stringify(storageParseado);
  localStorage.setItem(tipo, storageString);

  this.setState({
    esFavorito: true
  });
}

sacarFav(id){
  let tipo = this.props.data.title ? "favoritosMovies" : "favoritosSeries";

  let storage = localStorage.getItem(tipo);
  let storageParseado = storage ? JSON.parse(storage) : [];

  let arrayNuevo = [];

  for(let i = 0; i < storageParseado.length; i++){
    if(storageParseado[i] !== id){
      arrayNuevo.push(storageParseado[i]);
    }
  }

  localStorage.setItem(tipo, JSON.stringify(arrayNuevo));

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
    let user = cookies.get("session");
    let nombresGeneros = [];

  if (this.props.data.genre_ids && this.state.generos.length > 0) {
  for (let i = 0; i < this.props.data.genre_ids.length; i++) {
    for (let j = 0; j < this.state.generos.length; j++) {
      if (this.props.data.genre_ids[i] === this.state.generos[j].id) {
        nombresGeneros.push(this.state.generos[j].name);}
    }
  }
}

let textoGeneros = "";
for (let i = 0; i < nombresGeneros.length; i++){
  if (i === 0) {textoGeneros = nombresGeneros[i];
  } else {textoGeneros = textoGeneros + ", " + nombresGeneros[i];}
}

return (
  <article className="single-card-playing">
  <img src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path} alt= ""/>
  <div className="cardBody">
    <h3>{this.props.data.title ? this.props.data.title : this.props.data.name}</h3>
    {this.state.mostrar === true ? <p className="card-text">{this.props.data.overview}</p> : ""}
    
    <p>Género: {textoGeneros}</p>

    {this.state.mostrar === false ? (<button className="btn alert-primary"  onClick={() => this.mostrarDescripcion()}>Ver descripción</button>) 
    : (<button className="btn alert-primary"  onClick={() => this.ocultarDescripcion()}>Ocultar descripción</button>)
    }

    <Link className="btn btn-primary" to={`/detalle/${this.props.data.title ? "movie" : "tv"}/${this.props.data.id}`}>Ver más</Link>
    
    {user ? (this.state.esFavorito === false ? (
      <button onClick={() => this.agregarFav(this.props.data.id)} className="btn alert-primary"> 🤍 </button>) 
      : (<button className="btn alert-primary" onClick={() => {
        if (this.props.eliminarFavorito) {
        this.props.eliminarFavorito();
        } else {
          this.sacarFav(this.props.data.id);}}}> Eliminar de favoritos </button>)) : null}
    </div>
    </article>  
);
}}

export default Card