import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  evitarSubmit(event) {
    event.preventDefault();

    let storage = localStorage.getItem("usuarios");
    let usuarios = [];

    if (storage !== null) {
      usuarios = JSON.parse(storage);
    }

    let mismoMail = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === this.state.email) {
        mismoMail = usuarios[i];
      }
    }

    if (mismoMail === null) {
      this.setState({ error: "Credenciales incorrectas" });
    } else if (mismoMail.password !== this.state.password) {
      this.setState({ error: "Credenciales incorrectas" });
    } else {
      this.setState({ error: "" });
      cookies.set("session", mismoMail);
      this.props.history.push("/");
    }
  }

  controlarCambios(event) {
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={(event) => this.evitarSubmit(event)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={this.state.email}
                onChange={(event) => this.controlarCambios(event)}
                name="email"
                className="form-control"
                id="email"
                type="email"
                placeholder="Ingresá tu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                value={this.state.password}
                onChange={(event) => this.controlarCambios(event)}
                name="password"
                className="form-control"
                id="password"
                type="password"
                placeholder="Ingresá tu contraseña"
              />
            </div>

            <p>{this.state.error}</p>

            <button type="submit" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>

          <p className="mt-3 text-center">
            ¿No tenés cuenta? <Link to="/CrearCuenta">Registrarse</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;