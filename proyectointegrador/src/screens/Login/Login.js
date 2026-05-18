import React, {useState} from "react"
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

 const cookies = new Cookies();

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState("");

  function evitarSubmit(event) {
    event.preventDefault();

    let storage = localStorage.getItem("usuarios");
    let usuarios = [];

    if (storage !== null) {
      usuarios = JSON.parse(storage);
    }

    let mismoMail = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        mismoMail = usuarios[i];
      }
    }

    if (mismoMail === null) {
      setError("Credenciales incorrectas");
    } else if (mismoMail.password !== password) {
      seterror("Credenciales incorrectas");
    } else {
      seterror("");
      cookies.set("session", mismoMail);
      this.props.history.push("/");
    }
  }

  function controlarCambios(event) {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
  }
  }
}
  
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={(event) => evitarSubmit(event)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(event) => controlarCambios(event)}
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
                value={password}
                onChange={(event) => controlarCambios(event)}
                name="password"
                className="form-control"
                id="password"
                type="password"
                placeholder="Ingresá tu contraseña"
              />
            </div>

            <p>{error}</p>

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


export default Login;