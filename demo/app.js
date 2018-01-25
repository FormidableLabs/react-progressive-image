import React from 'react';
import ReactDOM from 'react-dom';
import ProgressiveImage from '../src/index.js';
import inline from './inline';
const src = 'http://i.imgur.com/XhGsjTN.jpg';

const imageStyle = {
  width: 800,
  margin: '0 auto'
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Progressive!</h1>
        <ProgressiveImage src={src} placeholder={inline}>
          {image => (
            <img style={imageStyle} src={image}/>
          )}
        </ProgressiveImage>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('content')
);
