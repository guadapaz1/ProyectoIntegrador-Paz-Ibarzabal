import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import CrearCuenta from "./screens/CrearCuenta/CrearCuenta";
import Favoritos from "./screens/Favoritos/Favoritos";
import Peliculas from "./screens/Peliculas/Peliculas";
import Series from "./screens/Series/Series";
import Detalle from "./screens/Detalle/Detalle";
import ResultadosBusqueda from "./screens/ResultadosBusqueda/ResultadosBusqueda";
import Notfound from "./screens/NotFound/NotFound";


function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact= {true} //(atributo booleano)
         component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/crearCuenta" component={CrearCuenta}/>
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/peliculas" component={Peliculas} />
        <Route path="/series" component={Series} />
        <Route path="/detalle/:tipo/:id" component={Detalle} />
        <Route path="/resultados/:tipo/:busqueda" component={ResultadosBusqueda} />
        <Route path="*" component={Notfound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App