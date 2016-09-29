'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressiveImage = function (_React$Component) {
  _inherits(ProgressiveImage, _React$Component);

  function ProgressiveImage(props) {
    _classCallCheck(this, ProgressiveImage);

    var _this = _possibleConstructorReturn(this, (ProgressiveImage.__proto__ || Object.getPrototypeOf(ProgressiveImage)).call(this, props));

    _this.loadImage = function (src) {
      // If there is already an image we nullify the onload
      // and onerror props so it does not incorrectly set state
      // when it resolves
      if (_this.image) {
        _this.image.onload = null;
        _this.image.onerror = null;
      }
      var image = new Image();
      image.onload = _this.onLoad;
      image.onerror = _this.onError;
      image.src = src;
      _this.image = image;
    };

    _this.onLoad = function () {
      // use this.image.src instead of this.props.src to
      // avoid the possibility of props being updated and this
      // image loading before the new props are available as
      // this.props
      _this.setState({
        image: _this.image.src
      });
    };

    _this.onError = function (errorEvent) {
      var onError = _this.props.onError;

      if (onError) {
        onError(errorEvent);
      }
    };

    _this.state = {
      image: props.placeholder
    };
    return _this;
  }

  _createClass(ProgressiveImage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var src = this.props.src;

      this.loadImage(src);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var src = nextProps.src;
      var placeholder = nextProps.placeholder;
      // We only invalidate the current image if the src has changed.

      if (src !== this.props.src) {
        this.setState({ image: placeholder }, function () {
          _this2.loadImage(src);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.image) {
        this.image.onload = null;
        this.image.onerror = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var image = this.state.image;
      var children = this.props.children;

      if (!children || typeof children !== 'function') {
        throw new Error('ProgressiveImage requires a function as its only child, ' + ('received ' + children + ' instead.'));
      }
      return children(image);
    }
  }]);

  return ProgressiveImage;
}(_react2.default.Component);

exports.default = ProgressiveImage;
