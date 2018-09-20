declare module 'react-progressive-image' {
  export interface ProgressiveImageProps {
    delay?: number;
    onError?: (errorEvent: Event) => void;
    placeholder: string;
    src: string;
    srcSetData?: {
      srcSet: string;
      sizes: string;
    };
  }

  export interface ProgressiveImageState {
    image: string;
    loading: boolean;
    srcSetData?: {
      srcSet: string;
      sizes: string;
    };
  }

  export default class ProgressiveImage extends React.Component<
    ProgressiveImageProps,
    ProgressiveImageState
  > {}
}
