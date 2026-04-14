import React, { Component } from 'react'
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"

const cookies = new Cookies()

class CrearCuenta extends Component {
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
        let usuarios 
        if (JSON.parse(localStorage.getItem('usuarios')) != null){
            usuarios = JSON.parse(localStorage.getItem('usuarios'))
        } else{
            usuarios = []
        }

        let emailEnUso = false;

        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].email === this.state.email) {
             emailEnUso = true;
           }
        }

        if (emailEnUso) {
            this.setState({ error: "El mail ya esta en uso" });
        } else if (this.state.password.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
        } else {
            let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password
            }
            usuarios.push(nuevoUsuario)

            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            cookies.set(nuevoUsuario)

            this.props.history.push("/login")

        } 
      
    } 

    controlarCambios(event){
        if (event.target.name === "email") {
            this.setState({ email: event.target.value })
        } else if (event.target.name === "password") {
            this.setState({ password: event.target.value })
        }
    }

  render() {
    return (
      <>
      <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" onChange= {(event) => this.controlarCambios(event)} value={this.state.email} type="email" className="form-control" id="email" placeholder="Ingresá tu email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input name="password" onChange= {(event) => this.controlarCambios(event)} value={this.state.password} type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                        <p>{this.state.error}</p>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </form>
                <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </div>
        </div>
      </>
    )
  }
}

export default CrearCuenta