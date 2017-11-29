declare module "react-progressive-image"  {
    export interface ProgressiveImageProps {
        onError?: (errorEvent: Event) => void;
        placeholder: string;
        src: string;
    }

    export interface ProgressiveImageState {
        image: string;
    }

    export default class ProgressiveImage extends React.Component<ProgressiveImageProps, ProgressiveImageState>{}
}
