# React Progressive Image

[npm-badge]: https://img.shields.io/npm/v/react-context-emission.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-context-emission

[`react-progressive-image`](https://www.npmjs.com/package/react-progressive-image) React component for progressive image loading

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-progressive-image


The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-progressive-image@0.1.0/umd/react-progressive-image.min.js"></script>
```

If you use the UMD build you can find the library on `window.ReactProgressiveImage`.

## Usage

`react-progressive-image` exports a single React component, `ProgressiveImage`, which takes a `src` and `placeholder` prop, as well as an optional `onError` function.

`src` should be the final image you want to load, and `placeholder` is the image you want to display until `src` is loaded. `placeholder` can be anything you want. A typical use case might involve using a smaller version of the image, an inlined version (data URI), or a loading graphic.

`ProgressiveImage` excepts a render callback as a child, which will be called with the `placeholder` first, and then `src` once the image has been loaded.

```js
<ProgressiveImage src='large-image.jpg' placeholder='tiny-image.jpg'>
  {(src) => <img src={src} alt='an image'/>}
</ProgressiveImage>
```
