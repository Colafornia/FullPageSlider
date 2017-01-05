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
    this.pages = this.wrap.querySelectorAll(this.option.page)
    this.length = this.pages.length
    for (var i = 0, len = this.length; i < len; i++) {
      this.pages[i].style.cssText+="display:block;position:absolute;left:0;top:0;width:100%;height:100%"
    }
    var s = document.createElement('style')
    s.innerHTML = 'html,body{width:100%;height:100%;overflow:hidden}'
    document.head.appendChild(s);
    s = null
    this.wrap.style.cssText+='display:block;position:relative;width:100%;height:100%'
    this.scrollDist = this.wrap.clientHeight
    this._init()
  }
  fullPageSlider.prototype = {
    _init: function () {
      for (var i = 1; i < this.length; i++) {
        this._outPage(i, 0)
        this.pages[i].style.height = this.scrollDist + 'px'
      }
      this._toPage(0)
      this.pages[0].style.height = this.scrollDist + 'px'
    },
    _toPage: function (index) {
      this.pages[index].style.cssText += '-webkit-transition-duration:' + this.option.speed + 'ms;-webkit-transform:translate3d(0, 0, 0)'
    },
    _outPage: function (index, current) {
      var offset = index - current
      this.pages[index].style.cssText += '-webkit-transition-duration:' + this.option.speed +'ms;-webkit-transform:translate3d(0,'+ this.scrollDist*offset + 'px,0)'
    },
    _transition: function (leaveIndex, toIndex) {
      this.currentIndex = toIndex
      this._outPage(leaveIndex, this.currentIndex)
      this._toPage(toIndex)
    },
    next: function () {
      var index = this.currentIndex + 1
      if (index > this.length - 1) {
        index = 0
      }
      this.to(index)
    },
    prev: function (index) {
      var index = this.currentIndex - 1
      if (index < 0) {
        index = 0
      }
      this.to(index)
    },
    to: function (index) {
      this._transition(this.currentIndex, index)
    }
  }
  if (typeof module === 'object') {
    module.exports = fullPageSlider
  } else {
    window.fullPageSlider = fullPageSlider
  }
})()
