import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Cookies from "universal-cookie"

const cookies = new Cookies()

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            error:"",
        }
    }
    evitarSubmit(event){
        event.preventDefault()

        let storage = localStorage.getItem('usuarios');
        let usuarios;

        if (storage !== null) {
            usuarios = JSON.parse(storage);
        } else {
            usuarios = [];
        }
        let mismoEmail = null;

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === this.state.email) {
                mismoEmail = usuarios[i];
            }
        }
      

      if (!mismoEmail) {
        this.setState({ error: "Credenciales incorrectas" });
      } else if (mismoEmail.password !== this.state.password) {
        this.setState({ error: "Credenciales incorrectas" });
      } else {
        this.setState({ error: "" })}
        cookies.set("session", mismoEmail)
        this.props.history.push("/")

        }

    controlarCambios(event){
        if (event.target.name === "email") {
            this.setState({ email: event.target.value })
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value })
        }
    }

    render(){
        return(
           
    <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input  value= {this.state.email} onChange={(event) => this.controlarCambios(event)} name="email"
                    className="form-control" id="email" placeholder="Ingresá tu email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input value= {this.state.password} onChange={(event) => this.controlarCambios(event)} name="password" className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                        <p>{this.state.error}</p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block"> Iniciar sesión</button>
                </form>
                <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/CrearCuenta">Registrarse</Link></p>
            </div>
        </div>
        );
    }
}

export default Login;