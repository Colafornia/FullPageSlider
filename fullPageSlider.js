;(function () {
  function addClass (element, className) {
    if (element.classList) {
      element.classList.add(className)
    } else {
      element.className += ' ' + className
    }
  }
  function removeClass (element, className) {
    if (element.classList) {
      element.classList.remove(className)
    } else {
      element.className.replace( /(?:^|\s)className(?!\S)/g , '' )
    }
  }
  function fullPageSlider (option) {
    this.option = {
      wrap: '.wrap',
      page: '.page',
      speed: 400,
      delayTime: 50,
      onSwipeStart: function () {},
      callback: function () {},
      beforeChange: function () {}
    }
    for (var i in option) {
      this.option[i] = option[i]
    }
    this.currentIndex = 0
    this.wrap = document.querySelector(this.option.wrap)
    this.wrap.style.cssText+="display:block;position:relative;width:100%;height:100%"
    this.scrollDist = window.innerHeight
    this.pages = this.wrap.querySelectorAll(this.option.page)
    this.length = this.pages.length
    this._init()
  }
  fullPageSlider.prototype = {
    _init: function () {
      for (var i = 1; i < this.length; i++) {
        this._outPage(i, 0)
      }
      this._toPage(0)
    },
    _toPage: function (index) {
      this.pages[index].style.cssText += '-webkit-transition-duration:' + this.option.speed + 'ms;-webkit-transform:translate3d(0, 0, 0)'
    },
    _outPage: function (index, current) {
      var offset = index - current
      this.pages[index].style.cssText += '-webkit-transition-duration:0ms;;-webkit-transform:translate3d(0,'+ this.scrollDist*offset + 'px,0)'
    },
    next: function (index) {},
    prev: function () {},
    to: function () {}
  }
  if (typeof module === 'object') {
    module.exports = fullPageSlider
  } else {
    window.fullPageSlider = fullPageSlider
  }
})()
