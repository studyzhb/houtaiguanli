;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-iconfontbiaoge" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M973.484466 65.48341 50.51451 65.48341c-27.133052 0-49.12992 21.994943-49.12992 49.126884l0 794.779412c0 27.129894 21.996868 49.126884 49.12992 49.126884l922.969956 0c27.133052 0 49.12992-21.99699 49.12992-49.126884L1022.614387 114.610294C1022.614387 87.479377 1000.617519 65.48341 973.484466 65.48341zM321.88085 892.703675 68.386262 892.703675 68.386262 719.224622l253.494588 0L321.88085 892.703675zM321.88085 661.398612 68.386262 661.398612l0-173.4811 253.494588 0L321.88085 661.398612zM321.88085 430.091502 68.386262 430.091502 68.386262 256.611425l253.494588 0L321.88085 430.091502zM638.747294 892.703675 385.252706 892.703675 385.252706 719.224622l253.494588 0L638.747294 892.703675zM638.747294 661.398612 385.252706 661.398612l0-173.4811 253.494588 0L638.747294 661.398612zM638.747294 430.091502 385.252706 430.091502 385.252706 256.611425l253.494588 0L638.747294 430.091502zM955.611691 892.703675 702.11915 892.703675 702.11915 719.224622l253.492541 0L955.611691 892.703675zM955.611691 661.398612 702.11915 661.398612l0-173.4811 253.492541 0L955.611691 661.398612zM955.611691 430.091502 702.11915 430.091502 702.11915 256.611425l253.492541 0L955.611691 430.091502z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jinlingyingcaiwangtubiao45" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M722.0992 321.024c-43.904 0-79.616-35.712-79.616-79.616L642.4832 46.976 192.7168 46.976c-40.32 0-73.1136 32.7936-73.1136 73.1136l0 778.3168c0 40.32 32.7936 73.088 73.1136 73.088l640.1536 0c40.32 0 73.1136-32.7936 73.1136-73.088L905.984 321.024 722.0992 321.024zM726.9376 767.4368 291.9168 767.4368c-10.5984 0-19.2-8.6016-19.2-19.2s8.6016-19.2 19.2-19.2l435.0208 0c10.5984 0 19.2 8.6016 19.2 19.2S737.536 767.4368 726.9376 767.4368zM726.9376 627.2 291.9168 627.2c-10.5984 0-19.2-8.6016-19.2-19.2S281.3184 588.8 291.9168 588.8l435.0208 0c10.5984 0 19.2 8.6016 19.2 19.2S737.536 627.2 726.9376 627.2zM726.9376 486.9376 291.9168 486.9376c-10.5984 0-19.2-8.6016-19.2-19.2s8.6016-19.2 19.2-19.2l435.0208 0c10.5984 0 19.2 8.6016 19.2 19.2S737.536 486.9376 726.9376 486.9376z"  ></path>'+
      ''+
      '<path d="M722.0992 279.1936l146.7392 0-184.5248-192L684.3136 241.408C684.288 262.2464 701.2608 279.1936 722.0992 279.1936z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xiangxiajiantou" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xiangyoujiantou" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
