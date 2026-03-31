import React, { Component } from "react";

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

        <img src={""}/>
        <div className="cardBody">
            <h3>aca va el titulo</h3>

            {this.state.mostrar === false ? (<button onClick={() => this.mostrarDescripcion()}>Ver descripción</button>) 
            : (<button onClick={() => this.ocultarDescripcion()}>Ocultar descripción</button>)}

            <a href={"/detalle/" + this.props.data.id}>Ver más</a>
        </div>

      </article>
    );
  }
}

export default Card;