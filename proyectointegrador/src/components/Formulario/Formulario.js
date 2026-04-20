import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class Formulario extends Component{
    constructor(){
        super();
        this.state= {
            value: "",
            tipo: "movie"
        }
    }

    enviarFormulario(event){
        event.preventDefault()
        this.props.history.push("/resultados/"+ this.state.tipo + "/" + this.state.value)

    }

    controlarCambiosInput(event){
        this.setState({
            value: event.target.value
        }, )
    }
    controlarCambiosSelect(event){
        this.setState({
            tipo: event.target.value
        }, )
    }

    render(){

        return(
            <form onSubmit={(event) => this.enviarFormulario(event)} className="search-form" action="results.html" method="get">
            <input type="text" className="" name="value" placeholder="Buscar..." value={this.state.value}
                onChange={(event) => this.controlarCambiosInput(event)} />
                <select name="tipo" value={this.state.tipo} onChange={(event) => this.controlarCambiosSelect(event)}>
            <option value="movie">Películas</option>
            <option value="tv">Series</option>
            </select>
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        );
    };

}


export default withRouter(Formulario)