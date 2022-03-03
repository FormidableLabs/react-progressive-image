# React Progressive Image

[![Maintenance Status][maintenance-image]](#maintenance-status)

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

#### With loading argument

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

#### Component As Placeholder

If you want to use a component, such as a loading spinner, as a placeholder, you can make use of the `loading` argument in the render callback. It will be true while the main image is loading and false once it has fully loaded. Keep in mind that the `placeholder` props is `required`, so you will need to explicitly declare an empty string as it's value if you plan on using a component in the render callback.

```jsx
const dominantImageColor = '#86356B';
const placeholder = (
  <div
    style={{ backgroundColor: dominantImageColor, height: 300, width: 500 }}
  />
);

<ProgressiveImage src="large-image.jpg" placeholder="">
  {(src, loading) => {
    return loading ? placeholder : <img src={src} alt="an image" />;
  }}
</ProgressiveImage>;
```

#### Progressive Enhancement and No JavaScript

Since this component relies on JavaScript to replace the placeholder src with the full image src, you should use a fallback image if your application supports environments that do not have JavaScript enabled or is progressively enhanced.

You can do this by adding the fallback image inside of a `<noscript>` tag in the render callback you provide as the `ProgressiveImage` component's child.

```jsx
<ProgressiveImage src="large-image.jpg" placeholder="tiny-image.jpg">
  {src => {
    return (
      <div>
        <img className="progressive-image" src={src} />
        <noscript>
          <img className="progressive-image no-script" src="large-image.jpg" />
        </noscript>
      </div>
    );
  }}
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

## Maintenance Status

**Archived:** This project is no longer maintained by Formidable. We are no longer responding to issues or pull requests unless they relate to security concerns. We encourage interested developers to fork this project and make it their own!
