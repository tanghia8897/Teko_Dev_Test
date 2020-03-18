import React from "react";
import Products from '../Products'
import ProductDetail from '../Products/Detail'
import "../../assets/style/input.scss";
import '../../assets/style/common.scss'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router";
class Index extends React.Component {
  render() {
    return (
      <div>
        <main >
          <Switch>
            <Route exact path="/" component={Products}/>
            <Route exact path="/product/:id" component={ProductDetail} history={this.props.history}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default Index;
