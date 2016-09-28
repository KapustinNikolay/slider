/**
 * Created by nik on 28.09.16.
 */
(function (w, $) {
  var DEFAULT_ITEMS_COUNT = 5;
  var MIN_ELEMENT_WIDTH = 100;
  var MAX_ELEMENT_WIDTH = 200;
  var SLIDE_STEP = 200;

  function Slider(container, itemsCount) {
    itemsCount = itemsCount || DEFAULT_ITEMS_COUNT;
    container = $(container);
    var wrapper;
    var wrapperWidth = 0;
    var translateX = 0;


    this.rebuild = function (count) {
      count = parseInt(count);
      itemsCount = count && typeof count == 'number' ? count : itemsCount;

      wrapper.empty();
      wrapperWidth = 0;
      translateX = 0;

      for (var i = 0; i < itemsCount; ++i) {
        var elemWidth = getRndWidth();
        var elem = $('<div class="slider__element"><div class="rectangle"></div></div>').width(elemWidth);
        wrapper.append(elem);
        wrapperWidth += elemWidth;
      }

      wrapper.width(wrapperWidth);
      setTranslate();
    };

    this.nextSlide = function () {
      moveWrapper(-SLIDE_STEP);
    };

    this.prevSlide = function () {
      moveWrapper(SLIDE_STEP);
    };

    function moveWrapper(val) {
      if (container.width() > wrapperWidth) {
        return false;
      } else if (translateX + val > 0) {
        translateX = 0;
      } else if (wrapperWidth + translateX + val < container.width()) {
        translateX = container.width() - wrapperWidth;
      } else {
        translateX += val;
      }

      setTranslate();
    }

    function setTranslate() {
      wrapper.css({transform: 'translateX(' + translateX + 'px)'});
    }

    var init = function () {
      wrapper = $('<div class="slider-wrapper"></div>');
      container.append(wrapper);

      this.rebuild();
    }.bind(this);

    init();
  }

  function getRndWidth() {
    return Math.floor(Math.random() * (MAX_ELEMENT_WIDTH - MIN_ELEMENT_WIDTH + 1)) + MIN_ELEMENT_WIDTH;
  }

  w.Slider = Slider;
})(window, jQuery);