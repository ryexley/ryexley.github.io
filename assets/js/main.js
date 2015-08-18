(function ($, global) {

  var app = global.Resume = global.Resume || {

    init: function () {
      this.registerEvents();
      this.hideElements();
    },

    registerEvents: function () {
      var $document = $(document);
      $document.on("click", "a[href*=#]:not([href=#])", this.slideToPageLink);
      $document.on("click", "[data-toggle]", this.onToggleClick.bind(this));
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

    hideElements: function () {
      var $elementsToHide = $(".hide");

      if ($elementsToHide.length) {
        $elementsToHide.each(function (index, el) {
          var $el = $(el),
              $toggle = $("<div>").addClass("toggle is-hidden").attr("data-height", $el.outerHeight());

          $el.removeClass("hide").wrap($toggle);
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
