import React from 'react';
import ReactDOM from 'react-dom';
import ProgressiveImage from '../src/index.js';
import inline from './inline';
const SM = 'https://farm2.staticflickr.com/1853/42944460370_e749cd18eb_b.jpg';
const MD = 'https://farm2.staticflickr.com/1867/30884025408_7e6907d2e4_b.jpg';
const LG = 'https://farm2.staticflickr.com/1875/42944459590_170ddf9fc8_b.jpg';

const centerAlign = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

const containerStyle = {
  ...centerAlign,
  overflow: 'hidden',
  position: 'relative'
};

const imageStyle = {
  minHeight: '100vh',
  minWidth: '100vw'
};

const textContainerStyle = {
  ...centerAlign,
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
};

const textStyle = {
  color: '#fff',
  fontFamily: 'sans-serif',
  fontSize: '2.5em',
  textTransform: 'uppercase'
};

class App extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <h1 style={textStyle}>
            React <br />
            Progressive <br />
            Image
          </h1>
        </div>
        <ProgressiveImage
          src={MD}
          placeholder={inline}
          srcSetData={{
            srcSet: `${SM} 320w, ${MD} 700w, ${LG} 2000w`,
            sizes: '(max-width: 2000px) 100vw, 2000px'
          }}
        >
          {(image, loading, srcSetData) => {
            return (
              <img
                style={imageStyle}
                src={image}
                srcSet={srcSetData.srcSet}
                sizes={srcSetData.sizes}
              />
            );
          }}
        </ProgressiveImage>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
