(function ($, global) {

  var app = global.Resume = global.Resume || {

    init: function () {
      this.registerEvents();
      // this.initWorkHistory();
      this.hideElements();
    },

    initWorkHistory: function () {
      var $oldWorkHistoryBodies = $(".work-history--entry:nth-child(n+4) .work-history--body");

      $oldWorkHistoryBodies.addClass("hide");
    },

    registerEvents: function () {
      var $document = $(document);
      $document.on("click", "a[href*=#]:not([href=#])", this.slideToPageLink);
      $document.on("click", ".contact-details-toggle", this.toggleContactDetails.bind(this));
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

    toggleEl: function (target) {
      var $target, isVisible;

      if (!(target instanceof jQuery)) {
        $target = $(target);
      } else {
        $target = target;
      }

      $target = $target.closest(".toggle");

      isVisible = !($target.hasClass("is-hidden"));
      if (isVisible) {
        $target.addClass("is-hidden").removeAttr("style");
      } else {
        var targetHeight = $target.attr("data-height");

        $target.css({
          height: targetHeight,
          opacity: 1
        });

        $target.removeClass("is-hidden");
      }
    },

    toggleContactDetails: function (e) {
      var $trigger, $target;

      if (e) {
        $trigger = $(e.currentTarget);
        $target = $trigger.attr("data-toggle");
        this.toggleEl($target);
      }
    }

  };

  global.Resume = app;
  global.Resume.init();

}(jQuery, this));
