;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-canting" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M827.752937 960.298013c-0.085 38.139992-9.874998 62.354988-46.204991 62.289988-36.269993-0.08-44.204991-24.444995-44.119991-62.609987l-1.15-361.278928c-1.325 0.15-102.914979-13.824997-137.129973-116.074977 0 0 41.639992-483.008903 198.09896-482.623903 39.934992 0.085 28.519994 105.726979 28.519994 105.726979L827.752937 960.298013zM363.64703 473.40611l-18.536996 0 26.131995 488.080902c0 38.169992-34.451993 62.509987-70.761986 62.509987s-68.864986-24.339995-68.864986-62.509987l27.179995-487.610902-19.604996-0.385c-14.891997 0-86.784983-131.901974-86.784983-154.941969l33.769993-316.201937c0.088 0.405 47.316991 1.855 47.316991 1.855l-0.66 208.211958c0 23.979995-0.64 42.389992 23.189995 42.389992 23.826995 0 24.169995-18.431996 24.169995-42.389992L280.192046 4.202204l64.959987 0 0 210.986958c0 23.976995 3.134999 39.274992 26.964995 39.274992 23.829995 0 23.424995-15.296997 23.424995-39.274992L395.542023 4.202204c0 0 37.331993 0 39.421992 0l33.216993 314.346937C468.181009 341.782136 378.347027 473.40611 363.64703 473.40611z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-huiyishi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M960.46976 895.57056 41.81888 895.57056c-15.1456 0-27.42272-12.2784-27.42272-27.424l41.13344-150.82176c0-15.14432 12.27712-27.42272 27.42272-27.42272l68.55616 0 0-41.13344c0-30.29056 24.55552-54.8448 54.8448-54.8448l82.26752 0c30.28928 0 54.8448 24.55424 54.8448 54.8448l0 41.13344 82.26752 0 0-41.13344c0-30.29056 24.55552-54.8448 54.8448-54.8448l82.26752 0c30.28928 0 54.8448 24.55424 54.8448 54.8448l0 41.13344 68.55616 0 0-41.13344c0-30.29056 24.55424-54.8448 54.8448-54.8448l82.26752 0c30.28928 0 54.8448 24.55424 54.8448 54.8448l0 41.13344 54.8448 0c15.1456 0 27.42272 12.2784 27.42272 27.42272l41.13344 150.82176C1001.6032 883.29216 975.61472 895.57056 960.46976 895.57056zM302.33152 662.47872c0-15.14368-12.27712-27.42208-27.42208-27.42208L220.064 635.05664c-15.14432 0-27.42272 12.2784-27.42272 27.42208l0 27.424 109.6896 0L302.33088 662.47872zM576.55552 662.47872c0-15.14368-12.27712-27.42208-27.42272-27.42208L494.28864 635.05664c-15.14432 0-27.42208 12.2784-27.42208 27.42208l0 27.424 109.6896 0L576.55616 662.47872zM837.0688 662.47872c0-15.14368-12.27712-27.42208-27.42272-27.42208l-54.8448 0c-15.1456 0-27.42272 12.2784-27.42272 27.42208l0 27.424 109.6896 0L837.06816 662.47872zM919.33568 744.7488c0-7.5744-6.13824-13.71136-13.71136-13.71136L110.3744 731.03744c-7.57248 0-13.71136 6.13696-13.71136 13.71136l-27.42272 87.7504c0 12.11648 9.82144 21.93792 21.93792 21.93792l833.6416 0c12.1152 0 21.93792-9.82144 21.93792-21.93792L919.33568 744.7488zM768.51264 456.81152l-121.47456 0 38.30784 90.68736c2.96448 8.05376-3.6032 16.33152-14.66944 18.48832-11.06752 2.15808-22.44224-2.62016-25.408-10.67392L605.89376 462.10048C605.2384 460.32064 605.21728 458.54464 605.43808 456.81152L422.2688 456.81152c0.58944 2.14016 0.7072 4.36416-0.12736 6.61696L383.58976 553.776C380.68416 561.61344 369.54688 566.2656 358.7104 564.16384c-10.83584-2.0992-17.26784-10.15424-14.36416-17.9904l38.13248-89.36128L247.48672 456.81216c-30.28928 0-54.8448-24.55552-54.8448-54.84352L192.64192 114.03136c0-30.28928 24.55552-54.84608 54.8448-54.84608l521.02592 0c30.28928 0 54.8448 24.5568 54.8448 54.84608l0 287.93664C823.35744 432.25664 798.80192 456.81152 768.51264 456.81152zM782.224 127.74144c0-15.14432-12.2784-27.41952-27.42272-27.41952L261.19808 100.32192c-15.14432 0-27.42272 12.27584-27.42272 27.41952L233.77536 388.256c0 15.14432 12.2784 27.42208 27.42272 27.42208l493.6032 0c15.14432 0 27.42272-12.2784 27.42272-27.42208L782.224 127.74144zM676.56128 275.2288c-3.77472 0.29504-7.07392-2.52672-7.36704-6.30016l-5.15648-66.27712c-0.24832 0.3744-0.16448 0.864-0.49344 1.19296l-143.584 143.584c-0.56896 1.2736-1.23392 2.55168-2.53376 3.30304C515.38752 351.90848 513.04512 351.8016 511.07264 350.85312 510.70912 350.7296 510.38784 350.5376 510.04672 350.35264 509.9616 350.29248 509.87392 350.24704 509.792 350.18368 509.32288 349.90144 508.82496 349.6768 508.4192 349.27232 507.99936 348.8512 508.07808 348.23936 507.7888 347.7504L443.4336 236.28224 342.97856 336.73856c-2.67776 2.6752-7.01888 2.6752-9.69536 0-2.67776-2.67648-2.67776-7.01888 0-9.69664l106.64704-106.64832c2.67776-2.67776 7.01888-2.67776 9.69536 0 0.12608 0.12608 0.07552 0.32192 0.18944 0.45504 0.5952 0.4992 1.15328 1.06112 1.56416 1.7728l63.68704 110.30912 138.42304-138.42176L588.16064 199.59232C584.38592 199.88736 581.08736 197.0656 580.7936 193.28896 580.4992 189.51616 583.32224 186.21568 587.09696 185.92384l82.0192-6.38144c3.77472-0.29504 7.07392 2.52864 7.36704 6.30016l6.38144 82.02176C683.15776 271.63776 680.336 274.93824 676.56128 275.2288zM663.36704 194.03264l-0.02176-0.28928-0.59776 0.04672C662.93376 193.93088 663.19296 193.86816 663.36704 194.03264z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jianshenfang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M959.744 806.7072 325.9392 806.7072c0-92.7232-58.5216-170.8544-140.288-201.984l130.816-334.5408 70.7072 42.1376c23.04 13.312 51.1488 6.9632 67.7888-12.5952l196.9152 0c20.0192 0 36.1984-16.2304 36.1984-36.1984 0-20.0192-16.2304-36.1984-36.1984-36.1984L451.7888 227.328c-3.2256-3.1744-6.144-6.656-10.2912-9.0624L137.5744 37.0688C111.616 22.0672 78.3872 30.976 63.3856 56.9856 48.384 82.944 57.2928 116.1728 83.2512 131.1744l170.1376 101.376L25.088 816.384C10.3424 826.112 0 842.0352 0 861.0304c0 30.0032 24.32 54.3232 54.3232 54.3232l905.4208 0c30.0032 0 54.3232-24.32 54.3232-54.3232S989.7472 806.7072 959.744 806.7072z"  ></path>' +
    '' +
    '<path d="M869.2224 951.552 144.8448 951.552c-20.0192 0-36.1984 16.2304-36.1984 36.1984C108.6464 1007.7696 124.8768 1024 144.8448 1024l724.3264 0c20.0192 0 36.1984-16.2304 36.1984-36.1984C905.4208 967.7824 889.1904 951.552 869.2224 951.552z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tingchechang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M751.126469 625.751945q-1.023306-2.046612-3.069919-4.604878t-4.093225-3.581572l-1.023306-2.046612-25.582655-67.538209q-4.093225-9.209756-12.791327-14.83794t-15.861246-5.628184l-133.029806 0q-4.093225 0-9.209756 2.046612t-10.744715 7.163143-7.674796 11.256368l-25.582655 67.538209-2.046612 2.046612-3.069919 3.069919q-3.069919 3.069919-4.093225 5.116531-1.023306 3.069919-2.046612 5.116531t-1.534959 10.744715-0.511653 23.024389q0 36.839023 12.279674 42.97886l6.139837 3.069919 0 27.629267q0 5.116531 1.023306 7.163143t3.069919 3.069919 6.139837 1.023306l19.442818 0 5.116531 0q2.046612 0 4.604878-0.511653t3.581572-2.558265 1.023306-5.116531l0-26.605961 142.239562 0 0 26.605961q0 6.139837 3.069919 7.163143t10.233062 1.023306l19.442818 0q10.233062 0 10.233062-11.256368l0-27.629267 6.139837-3.069919q12.279674-6.139837 12.279674-42.97886 0-29.67588-4.093225-38.885636zM524.975799 611.425658q1.023306 0 6.139837-21.48943t7.163143-28.652574q1.023306-5.116531 7.674796-10.744715t13.814634-4.604878l124.843356 0q7.163143-1.023306 13.814634 4.604878t7.674796 10.744715l3.069919 12.279674q2.046612 8.18645 4.093225 15.349593t3.581572 13.814634 2.558265 8.698103q0 4.093225-4.093225 4.093225l-186.241728 0q-3.069919 1.023306-4.093225-2.046612l0-2.046612zM538.278779 678.963867q-4.093225 0-7.674796-2.558265t-6.139837-6.139837-2.558265-8.698103q0-3.069919 1.023306-5.628184t2.558265-4.604878 3.581572-3.581572 4.604878-2.046612 4.604878-0.511653q17.396205 0 17.396205 16.372899 0 7.163143-5.116531 12.279674t-12.279674 5.116531zM648.795849 688.173623l-53.211922 0 0-9.209756 53.211922 0 0 9.209756zM648.795849 669.754112l-53.211922 0 0-8.18645 53.211922 0 0 8.18645zM648.795849 652.357906l-53.211922 0 0-9.209756 53.211922 0 0 9.209756zM706.100996 678.963867q-3.069919 0-6.139837-1.534959t-5.116531-4.093225-3.581572-5.628184-1.534959-6.139837 1.023306-5.628184 2.558265-4.604878 3.581572-3.581572 4.604878-2.046612 4.604878-0.511653q3.069919 0 6.139837 1.023306t5.628184 3.581572 3.581572 5.628184 1.023306 6.139837q0 7.163143-4.604878 12.279674t-11.768021 5.116531zM578.187721 381.181764q0-57.305147-41.443901-97.725742t-98.749048-40.420595q-3.069919 0-11.256368 1.023306l-123.82005 0-63.444984 0 0 505.513262 71.631434 0 0-230.243895 115.6336 0 8.18645 0 3.069919 0q57.305147 0 98.749048-40.420595t41.443901-97.725742zM426.738404 447.696666l-115.6336 0 0-133.029806 115.6336 0q25.582655 1.023306 45.025473 20.977777t19.442818 45.025473-19.442818 45.537126-45.025473 21.48943z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wuxian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M445.053 714.037c0 36.974 29.973 66.947 66.946 66.947 36.974 0 66.947-29.973 66.947-66.947 0-36.974-29.973-66.946-66.946-66.946-36.974 0-66.946 29.973-66.946 66.946zM510.949 163.018c-151.094 0-287.978 60.819-387.521 159.305l48.035 48.252c43.925-43.429 94.88-77.606 151.52-101.563 59.498-25.166 122.738-37.924 187.966-37.924s128.467 12.758 187.964 37.924c57.5 24.32 109.151 59.149 153.525 103.52l48.132-48.134c-99.714-99.709-237.467-161.378-389.621-161.378z"  ></path>' +
    '' +
    '<path d="M224.126 423.361l48.033 48.252c30.883-30.446 66.671-54.416 106.434-71.234 41.92-17.73 86.49-26.72 132.469-26.72s90.549 8.99 132.469 26.72c40.523 17.139 76.93 41.689 108.208 72.97l48.134-48.134c-73.915-73.911-176.023-119.627-288.811-119.627-111.84 0-213.175 44.956-286.938 117.774z"  ></path>' +
    '' +
    '<path d="M321.951 521.521l48.023 48.24c37.949-37.158 87.996-57.607 141.194-57.607 53.923 0 104.619 20.998 142.749 59.127l48.131-48.134c-48.85-48.849-116.337-79.063-190.88-79.063-73.708 0-140.502 29.553-189.217 77.438z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
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

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)