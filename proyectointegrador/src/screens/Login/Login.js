import React, { Component } from 'react'

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    
    render(){
        return(
           <>
    <div className="row justify-content-center">
            <div className="col-md-6">
                <form >
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email"
                    className="form-control" id="email" placeholder="Ingresá tu email"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                </form>
                <p className="mt-3 text-center">¿No tenés cuenta? <a href="./CrearCuenta/CrearCuenta.js">Registrarse</a></p>
            </div>
        </div>
        </>
        );
    }

}


export default Login;