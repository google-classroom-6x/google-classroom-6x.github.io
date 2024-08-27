<!-- Include Popup HTML -->
<div id="pwa-popup" class="pwa-popup">
  <div class="pwa-popup-content">
    <h2>Install Our App</h2>
    <p>Get our app for a better experience.</p>
    <button id="install-button">Install</button>
    <button id="close-button">Close</button>
  </div>
</div>

<!-- Link to CSS -->
<link rel="stylesheet" href="https://google-classroom-6x.github.io/assets/css/styles.css">

<!-- Link to Popup JavaScript -->
<script src="/assets/js/popup.js"></script>

<!-- Combined JavaScript file -->

<!-- Google Analytics Initialization -->
<script>
(function() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-8L1MQ91YFD';
    document.head.appendChild(script);

    script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-8L1MQ91YFD');
    };
})();
</script>

<!-- jQuery.appear Plugin -->
<script>
(function($) {

    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            // arbitrary data to pass to fn
            data: undefined,

            // call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            // whether the element is currently visible
            t.appeared = false;

            if (!fn) {
                // trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            // fires the appear event when appropriate
            var check = function() {

                // is the element hidden?
                if (!t.is(':visible')) {
                    // it became hidden
                    t.appeared = false;
                    return;
                }

                // is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    // trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {
                    // it scrolled out of view
                    t.appeared = false;
                }
            };

            // create a modified fn with some additional logic
            var modifiedFn = function() {

                // mark the element as visible
                t.appeared = true;

                // is this supposed to happen only once?
                if (settings.one) {

                    // remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                // trigger the original fn
                fn.apply(this, arguments);
            };

            // bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            // check whenever the window scrolls
            w.scroll(check);

            // check whenever the dom changes
            $.fn.appear.checks.push(check);

            // check now
            (check)();

        });

    };

    // keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        // process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        // check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }

    });

    // run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);
</script>

<!-- Manifest and Service Worker Registration -->
<script>
(function() {
    var link = document.createElement('link');
    link.rel = 'manifest';
    link.href = 'https://google-classroom-6x.github.io/manifest.json';
    document.head.appendChild(link);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
})();
</script>
