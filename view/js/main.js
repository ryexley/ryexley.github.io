(function ($, global) {

  var app = global.Resume = global.Resume || {

    init: function () {
      this.registerEvents();
    },

    registerEvents: function () {
      var $document = $(document);
      $document.on("click", "a[href*=#]:not([href=#])", this.slideToPageLink);
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
          $("html, body").animate({ scrollTop: target.offset().top }, 500);
        }
      }
    }

  };

  global.Resume = app;
  global.Resume.init();

}(jQuery, this));
