import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios'
import { injectGlobal } from "styled-components";
import Home from "./components/Home";

import "./App.css";

class App extends Component {
  state = {
    business: [],
    error: ''    
  };
  componentDidMount() {
    this.getAllBusinesses();
  }

  getAllBusinesses = async () => {
    console.log();
    try {
      const res = await axios.get("http://localhost:3001");
      this.setState({
        business: res.data.data
      });
    } catch (err) {
      console.log(err);
      this.setState({
        error: err.message
      });
    }
  };
  
  //taking the data set and setting it to state within react allows access to the data set anywhere within the application
  //having a data set on a purely client side application seems like an odd practice, dat would normally be collected from a fetch or axios call from a server/3rd party API
  render() {
    const HomeWrap = props => {
      return <Home {...props} business={this.state.business} />;
    };

    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={HomeWrap} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

injectGlobal`

@import url('https://fonts.googleapis.com/css?family=Anton|Lobster|Pacifico');


*, :after, :before {
  box-sizing: inherit;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: darkgray;
  font-family: "Anton", sans-serif;
}
#map {
  height: 100%;
}
#map2 {
  height: 100%;
}
#footer {
  position: absolute;
  botoom: 0;
  right: 0;
  left: 0;
}
`;
