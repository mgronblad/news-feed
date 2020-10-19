import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Pane } from "evergreen-ui";
import Home from "./pages/Home";
import News from "./pages/News";
import Article from "./pages/Article";
import "./App.css";

function App() {
  return (
    <Router>
      <Pane width={1000} margin="auto">
        <nav>
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <Link to="/nyheter">Senaste nytt</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/nyheter/:slug" component={Article} />
          <Route path="/nyheter" component={News} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Pane>
    </Router>
  );
}

export default App;
