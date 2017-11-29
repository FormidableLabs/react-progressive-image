import "raf/polyfill";
import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProgressiveImage from "../src";

configure({ adapter: new Adapter() });

const src = "SOURCE";
const placeholder = "PLACEHOLDER";

const mountProgressiveImage = renderFn => {
  const defaultRender = image => {
    return <img src={image} />;
  };
  const render = renderFn || defaultRender;
  return mount(
    <ProgressiveImage src={src} placeholder={placeholder}>
      {render}
    </ProgressiveImage>
  );
};

describe("react-progressive-image", () => {
  beforeEach(() => {
    global.Image = Image;
  });

  it("exports a React component", () => {
    expect(typeof ProgressiveImage).toBe("function");
  });

  it("throws if not provided a function as a child", () => {
    /* eslint-disable no-console */
    const _error = console.error;
    console.error = jest.fn(() => {});
    try {
      expect(() => {
        mount(
          <ProgressiveImage>
            <h1>Uh oh!</h1>
          </ProgressiveImage>
        );
      }).toThrow(`ProgressiveImage requires a function as its only child`);
    } finally {
      console.error = _error;
    }
    /* eslint-enable no-console */
  });

  it("creates an instance of Image when mounted", () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.constructor).toBe(HTMLImageElement);
  });

  it("sets the onload property on the Image instance", () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.onload).toEqual(instance.onLoad);
  });

  it("sets the onerror property on the Image instance", () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.onerror).toEqual(instance.onError);
  });

  it("sets the src property on the Image instance", () => {
    const wrapper = mountProgressiveImage();
    const instance = wrapper.instance();
    expect(instance.image.src).toEqual(src);
  });

  it("should call the render callback with placeholder the src", () => {
    const render = jest.fn(() => <h1>Hello, world</h1>);
    mountProgressiveImage(render);
    expect(render.mock.calls[0][0]).toEqual(placeholder);
    expect(render.mock.calls[1][0]).toEqual(src);
  });

  it("should pass the loading state", () => {
    const render = jest.fn(() => <h1>Hello, world</h1>);
    mountProgressiveImage(render);
    expect(render.mock.calls[0][0]).toEqual(placeholder);
    expect(render.mock.calls[0][1]).toEqual(true);
    expect(render.mock.calls[1][0]).toEqual(src);
    expect(render.mock.calls[1][1]).toEqual(false);
  });
});
