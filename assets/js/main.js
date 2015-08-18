(function ($, global) {

  var app = global.Resume = global.Resume || {

    debounce: function (func, threshold, execImmediate) {
      var timeout;

      return function debounced () {
        var target = this,
            args = arguments;

        function delayed () {
          if (!execImmediate) {
            func.apply(target, args);
          }

          timeout = null;
        };

        if (timeout) {
          global.clearTimeout(timeout);
        } else if (execImmediate) {
          func.apply(target, args);
        }

        timeout = global.setTimeout(delayed, threshold || 100);
      }
    },

    init: function () {
      this.registerEvents();
      this.initHiddenElements();
    },

    registerEvents: function () {
      var $window = $(window),
          $document = $(document);

      $document.on("click", "a[href*=#]:not([href=#])", this.slideToPageLink);
      $document.on("click", "[data-toggle]", this.onToggleClick.bind(this));
      $window.on("resize", this.debounce(this.initHiddenElements.bind(this)));
      $window.on("orientationchange", this.debounce(this.initHiddenElements.bind(this)));
    },

    // adapted from https://css-tricks.com/snippets/jquery/smooth-scrolling/
    slideToPageLink: function (e) {
      if (e) { e.preventDefault(); }

      if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
        var target = $(this.hash);

        if (!target.length) {
          target = $("[name=" + this.hash.slice(1) + "]");
        }

        if (target.length) {
          $("html, body").animate({ scrollTop: target.offset().top }, 500, function () {
            location.hash = target.selector;
          });
        }
      }
    },

    slideTo: function (options) {
      options = options || {};

      var $target, top,
          offsetBuffer = options.offsetBuffer || 10;

      if (options.target) {
        if (!(options.target instanceof jQuery)) {
          $target = $(options.target);
        } else {
          $target = options.target;
        }

        top = $target.offset().top;
        $("html, body").animate({ scrollTop: (top - offsetBuffer) });
      }
    },

    initHiddenElements: function () {
      var $elementsToHide = $(".hide");

      if ($elementsToHide.length) {
        $elementsToHide.each(function (index, el) {
          var $el = $(el),
              $toggle = $el.closest(".toggle"),
              newHeight = $el.outerHeight();

          if (!$toggle.length) {
            $toggle = $("<div>").addClass("toggle is-hidden").attr("data-height", newHeight);
            $el.wrap($toggle);
          } else {
            $toggle.attr("data-height", newHeight);
          }

          if (!($toggle.hasClass("is-hidden"))) {
            // force open elements to resize
            $toggle.css({ height: newHeight });
          }
        });
      }
    },

    onToggleClick: function (e) {
      if (e) {
        var $trigger = $(e.currentTarget),
            $target = $trigger.parent().find($trigger.attr("data-toggle"));

        this.toggleEl($trigger, $target);
      }
    },

    toggleEl: function (trigger, target) {
      var $trigger, $toggleIndicator, $target, isVisible;

      if (!(trigger instanceof jQuery)) {
        $trigger = $(trigger);
      } else {
        $trigger = trigger;
      }

      if (!(target instanceof jQuery)) {
        $target = $(target);
      } else {
        $target = target;
      }

      $target = $target.closest(".toggle");
      $toggleIndicator = $trigger.find("i");

      isVisible = !($target.hasClass("is-hidden"));
      if (isVisible) {
        $toggleIndicator.removeClass("fa-angle-up").addClass("fa-angle-down");
        $target.addClass("is-hidden").removeAttr("style");
      } else {
        var targetHeight = $target.attr("data-height");

        $target.css({
          height: targetHeight,
          opacity: 1
        });

        $toggleIndicator.removeClass("fa-angle-down").addClass("fa-angle-up");
        $target.removeClass("is-hidden");
      }
    }

  };

  global.Resume = app;
  global.Resume.init();

}(jQuery, this));
