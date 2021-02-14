import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Root(props) {
  return (
    <>
      <Router>
        <Route
          exact
          path="/learn-single-spa"
          render={() => {
            return (
              <>
                <section>{props.name} is mounted!</section>
                <ul>
                  <li>
                    <Link to="/learn-single-spa/app1">App 1</Link>
                  </li>
                  <li>
                    <Link to="/learn-single-spa/app2">App 2</Link>
                  </li>
                </ul>
              </>
            );
          }}
        />
      </Router>
    </>
  );
}
