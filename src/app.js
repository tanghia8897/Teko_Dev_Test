import React from "react";
import { Route } from "react-router";
import Main from "./components/main";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from 'styled-components';

class App extends React.Component {
  onScrollTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  render() {
    return (
      <div>
        <Route exact path="/*" component={Main} />
        <div className="" id="scrolltop" data-html2canvas-ignore="true" style={{display:"none"}} onClick={()=>this.onScrollTop()}>
              <div className="top-arrow"></div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          className="custom-toast"
        />
      </div>
    );
  }
}

export default App;
