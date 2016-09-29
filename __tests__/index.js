import React from 'react';
import { mount } from 'enzyme';
import ProgressiveImage from '../index';

const src = 'SOURCE';
const placeholder = 'PLACEHOLDER';

const mountProgressiveImage = (renderFn) => {
  const defaultRender = (image) => {
    return <img src={image} />;
  };
  const render = renderFn || defaultRender;
  return mount(
    <ProgressiveImage src={src} placeholder={placeholder}>
      {render}
    </ProgressiveImage>
  );
};


describe('react-progressive-image', () => {

  beforeEach(() => {
    global.Image = Image;
  });

  it('exports a React component', () => {
    expect(typeof ProgressiveImage).toBe('function');
  });

  it('throws if not provided a function as a child', () => {
    expect(() => {
      mount(
        <ProgressiveImage>
          <h1>Uh oh!</h1>
        </ProgressiveImage>
      );
    }).toThrow(`ProgressiveImage requires a function as its only child`);
  });

  it('creates an instance of Image when mounted', () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.constructor).toBe(HTMLImageElement);
  });

  it('sets the onload property on the Image instance', () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.onload).toEqual(instance.onLoad);
  });

  it('sets the onerror property on the Image instance', () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.onerror).toEqual(instance.onError);
  });

  it('sets the src property on the Image instance', () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.src).toEqual(src);
  });

  it('should call the render callback with placeholder the src', () => {
    const render = jest.fn(() => <h1>Hello, world</h1>);
    mountProgressiveImage(render);
    expect(render.mock.calls[0][0]).toEqual(placeholder);
    expect(render.mock.calls[1][0]).toEqual(src);
  });

});
