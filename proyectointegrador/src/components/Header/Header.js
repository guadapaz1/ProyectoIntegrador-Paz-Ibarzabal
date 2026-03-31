import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header>
        <h1>Letterboxd</h1>

        <nav>
          <a href="/">Home</a> | 
          <a href="/peliculas">Películas</a> | 
          <a href="/series">Series</a> | 
          <a href="/login">Login</a> | 
          <a href="/crear-cuenta">Crear Cuenta</a> | 
          <a href="/favoritos">Favoritos</a>
        </nav>
      </header>
    )
  }
}

export default Header