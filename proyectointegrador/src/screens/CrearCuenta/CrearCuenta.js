import React, { Component } from 'react'

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

    let usuariosGuardados = localStorage.getItem("usuarios");
    let usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : []

    let emailEnUso = false;

    for (let i = 0; i < this.state.usuarios.length; i++) {
      if (this.state.usuarios[i].email === this.state.email) {
        emailEnUso = true;
      }
    }
    emailEnUso ? this.setState({error: "El mail ya esta en uso"}):
    this.state.password.length < 6 ? this.setState({error: "La contraseña debe tener al menos 6 caracteres"}) :
    (this.state.usuarios.push({
      email: this.state.email,
      password: this.state.password
    }))
      let usuariosEnString = JSON.stringify(usuarios);
      localStorage.setItem("usuarios", usuariosEnString);

    }

    controlarCambios(event){
      this.setState({[event.target.name]: event.target.value})
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
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                </form>
                <p className="mt-3 text-center">¿Ya tenés cuenta? <a href="./Login/Login.js">Iniciar sesión</a></p>
            </div>
        </div>
      
      </>
    )
  }
}

export default CrearCuenta