# React Progressive Image

[npm-badge]: https://img.shields.io/npm/v/react-context-emission.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-context-emission

[`react-progressive-image`](https://www.npmjs.com/package/react-progressive-image) React component for progressive image loading

### Install

```bash
$ yarn add react-progressive-image
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-progressive-image@0.1.0/umd/react-progressive-image.min.js"></script>
```

If you use the UMD build you can find the library on `window.ReactProgressiveImage`.

### Examples

#### Simple

```jsx
<ProgressiveImage src="large-image.jpg" placeholder="tiny-image.jpg">
  {src => <img src={src} alt="an image" />}
</ProgressiveImage>
```

#### With Delay

```jsx
<ProgressiveImage
  delay={3000}
  src="large-image.jpg"
  placeholder="tiny-image.jpg"
>
  {src => <img src={src} alt="an image" />}
</ProgressiveImage>
```

#### With loading argment

```jsx
<ProgressiveImage src="large-image.jpg" placeholder="tiny-image.jpg">
  {(src, loading) => (
    <img style={{ opacity: loading ? 0.5 : 1 }} src={src} alt="an image" />
  )}
</ProgressiveImage>
```

#### With srcSet

```jsx
<ProgressiveImage
  src="medium.jpg"
  srcSetData={{
    srcSet: 'small.jpg 320w, medium.jpg 700w, large.jpg 2000w',
    sizes: '(max-width: 2000px) 100vw, 2000px'
  }}
  placeholder="tiny-image.jpg"
>
  {(src, _loading, srcSetData) => (
    <img
      src={src}
      srcSet={srcSetData.srcSet}
      sizes={srcSetData.sizes}
      alt="an image"
    />
  )}
</ProgressiveImage>
```

### Props

| Name        | Type                                   | Required | Description                                     |
| ----------- | -------------------------------------- | -------- | ----------------------------------------------- |
| children    | `function`                             | `true`   | returns `src`, `loading`, and `srcSetData`      |
| delay       | `number`                               | `false`  | time in milliseconds before src image is loaded |
| onError     | `function`                             | `false`  | returns error event                             |
| placeholder | `string`                               | `true`   | the src of the placeholder image                |
| src         | `string`                               | `true`   | the src of the main image                       |
| srcSetData  | `{srcSet: "string", sizes: "string" }` | `false`  | srcset and sizes to be applied to the image     |
