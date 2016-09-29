// @flow
import React from 'react';

type ProgressiveImageProps = {
  children: (image: string) => React$Element<any>,
  onError?: (errorEvent: Event) => void,
  placeholder: string,
  src: string,
};

type ProgressiveImageState = {
  image: string,
};

export default class ProgressiveImage extends React.Component {
  props: ProgressiveImageProps;
  state: ProgressiveImageState;
  image: HTMLImageElement;
  constructor(props: ProgressiveImageProps) {
    super(props);
    this.state = {
      image: props.placeholder
    };
  }

  componentDidMount() {
    const { src } = this.props;
    this.loadImage(src);
  }

  componentWillReceiveProps(nextProps: ProgressiveImageProps) {
    const { src, placeholder } = nextProps;
    // We only invalidate the current image if the src has changed.
    if (src !== this.props.src) {
      this.setState({ image: placeholder }, () => {
        this.loadImage(src);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = (src: string) => {
    // If there is already an image we nullify the onload
    // and onerror props so it does not incorrectly set state
    // when it resolves
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
  }

  onLoad = () => {
    // use this.image.src instead of this.props.src to
    // avoid the possibility of props being updated and the
    // new image loading before the new props are available as
    // this.props.
    this.setState({
      image: this.image.src
    });
  }

  onError = (errorEvent: Event) => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  }

  render() {
    const { image } = this.state;
    const { children } = this.props;
    if (!children || typeof children !== 'function') {
      throw new Error(
        `ProgressiveImage requires a function as its only child`
      );
    }
    return children(image);
  }
}
