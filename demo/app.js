import React from "react";
import ReactDOM from "react-dom";
import ProgressiveImage from "../src/index.js";
import inline from "./inline";
const src = "http://i.imgur.com/XhGsjTN.jpg";

const imageStyle = {
  width: 800,
  margin: "0 auto"
};

class App extends React.Component {
  state = {
    image: src
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ image: "https://www.fillmurray.com/2000/2000" });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h1>Progressive!</h1>
        <ProgressiveImage src={this.state.image} placeholder={inline}>
          {image => <img style={imageStyle} src={image} />}
        </ProgressiveImage>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
