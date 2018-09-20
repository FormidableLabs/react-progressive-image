// @flow

import * as React from 'react';

type SrcSetData = {
  srcSet: string,
  sizes: string
};

type Props = {
  children: (string, boolean, SrcSetData) => React.Node,
  delay?: number,
  onError?: (errorEvent: Event) => void,
  placeholder: string,
  src: string,
  srcSetData?: SrcSetData
};

type State = {
  image: string,
  loading: boolean,
  srcSetData: SrcSetData
};

export default class ProgressiveImage extends React.Component<Props, State> {
  image: HTMLImageElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      image: props.placeholder,
      loading: true,
      srcSetData: { srcSet: '', sizes: '' }
    };
  }

  componentDidMount() {
    const { src, srcSetData } = this.props;
    this.loadImage(src, srcSetData);
  }

  componentDidUpdate(prevProps: Props) {
    const { src, placeholder, srcSetData } = this.props;
    // We only invalidate the current image if the src has changed.
    if (src !== prevProps.src) {
      this.setState({ image: placeholder, loading: true }, () => {
        this.loadImage(src, srcSetData);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = (src: string, srcSetData?: SrcSetData) => {
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
    if (srcSetData) {
      image.srcset = srcSetData.srcSet;
      image.sizes = srcSetData.sizes;
    }
  };

  onLoad = () => {
    // use this.image.src instead of this.props.src to
    // avoid the possibility of props being updated and the
    // new image loading before the new props are available as
    // this.props.
    setTimeout(() => {
      this.setState({
        image: this.image.src,
        loading: false,
        srcSetData: {
          srcSet: this.image.srcset || '',
          sizes: this.image.sizes || ''
        }
      });
    }, this.props.delay || 0);
  };

  onError = (errorEvent: Event) => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  };

  render() {
    const { image, loading, srcSetData } = this.state;
    const { children } = this.props;

    if (!children || typeof children !== 'function') {
      throw new Error(`ProgressiveImage requires a function as its only child`);
    }

    return children(image, loading, srcSetData);
  }
}
