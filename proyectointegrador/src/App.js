import { Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";


function App() {
  return (
    <>
      <Header />

      <Switch>
        <Route path="/" exact= {true} component={Home} />
        <Route path="/login" component={Login}/>
        
      </Switch>

      <Footer />
    </>
  );
}

export default App