/**
 * Created by nik on 28.09.16.
 */
$(document).ready(function () {
  var container = $('.slider-container');
  var sliderCountInp = $('#slider-count');

  var slider = new Slider(container, 10);

  $(document).on('click', '.slide-prev', slider.prevSlide);
  $(document).on('click', '.slide-next', slider.nextSlide);

  $(document).on('mousewheel', '.slider-container', onMouseWheel);
  $(document).on('DOMMouseScroll', '.slider-container', onMouseWheel);

  function onMouseWheel(e) {
    e = e.originalEvent;

    if (e.wheelDelta && e.wheelDelta < 0 || e.detail && e.detail > 0) {
      slider.nextSlide();
    } else {
      slider.prevSlide();
    }
  }

  $(document).on('click', '#rebuild-slider', function () {
    var val = sliderCountInp.val();
    slider.rebuild(val);
  });
});