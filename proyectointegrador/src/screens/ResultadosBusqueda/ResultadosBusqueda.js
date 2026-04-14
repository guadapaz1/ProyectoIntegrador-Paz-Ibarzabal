import React, { Component } from 'react'
import Card from '../../components/Card/Card';

class ResultadosBusqueda extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultados: [],
            cargando: true
        }
    }

    componentDidMount(){
        let textoBuscado = this.props.match.params.busqueda;
        let tipo = this.props.match.params.tipo;

        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=41abfd625c63035603389ca24c10eed0&query=${textoBuscado}`)
            .then(response => response.json())
            .then(data => {
    if (data.results) {
        this.setState({
            resultados: data.results,
            cargando: false
        });
    } else {
        this.setState({
            resultados: [],
            cargando: false
        });
    }
})
            .catch(error => {
                console.log("El error fue: " + error);
                this.setState({
                    resultados: [],
                    cargando: false
                });
            });
    }
    

    render(){
        return(
            <section >
                <h2>Resultados de {this.props.match.params.tipo} para: {this.props.match.params.busqueda}</h2>

                {this.state.cargando ? (
                    <h3>Cargando...</h3>
                ) : this.state.resultados.length === 0 ? (
                    <h3>No se encontraron resultados</h3>
                ) : (
                    this.state.resultados.map((elemento, idx) => (
                        <Card key={elemento.id} data={elemento}/>
                    ))
                )}
            </section>
        );
    }
}

export default ResultadosBusqueda;