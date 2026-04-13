import React, { Component } from 'react'
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"

const cookies = new Cookies()

class Header extends Component {

  render() {

    const user = cookies.get("session")

    return (
      <header>
        <h1>Letterboxd</h1>
        
        {user ? 
            <nav className="nav nav-tabs my-4">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/peliculas">Películas</Link>
                <Link className="nav-item" to="/series">Series</Link>
                <Link className="nav-item" to="/favoritos">Favoritos</Link>
            </nav>
        : 
            <nav className="nav nav-tabs my-4">
                <Link className="nav-item" to="/">Home</Link>
                <Link className="nav-item" to="/peliculas">Películas</Link>
                <Link className="nav-item" to="/series">Series</Link>
                <Link className="nav-item" to="/login">Login</Link>
                <Link className="nav-item" to="/CrearCuenta">Crear Cuenta</Link>
            </nav>
        }
      </header>
    )
  }
}

export default Header