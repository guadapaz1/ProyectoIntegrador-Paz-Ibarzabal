import React, { Component } from 'react'

class Header extends Component {

  render() {
    return (
      <header>
        <h1>Letterboxd</h1>

        <nav className="nav nav-tabs my-4">
          <a className="nav-item" href="/">Home</a>
          <a className="nav-item" href="/peliculas">Películas</a>
          <a className="nav-item"  href="/series">Series</a>
          <a className="nav-item" href="/login">Login</a>
          <a className="nav-item" href="/CrearCuenta">Crear Cuenta</a> 
          <a className="nav-item" href="/favoritos">Favoritos</a>
        </nav>
      </header>
    )
  }
}

export default Header