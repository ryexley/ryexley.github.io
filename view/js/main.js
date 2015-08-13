(function ($, global) {

  var app = global.Resume = global.Resume || {

    init: function () {
      this.registerEvents();
      this.hideElements();
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
          var $el = $(el);
          $el.attr("data-height", $el.outerHeight());
          $el.css({ height: 0, opacity: 0 });
          $el.addClass("is-hidden");
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

      isVisible = !($target.hasClass("is-hidden"));
      if (isVisible) {
        $target.css({
          transition: "all .5s ease",
          height: 0,
          opacity: 0,
          transform: "scaleY(0)"
        });
        $target.removeClass("is-visible").addClass("is-hidden");
      } else {
        var targetHeight = $target.attr("data-height");

        $target.css({
          transition: "all .5s ease",
          height: targetHeight,
          opacity: 1,
          transform: "scaleY(1)"
        });
        $target.removeClass("is-hidden").addClass("is-visible");
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
