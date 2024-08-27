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

            data: undefined,
            one: true,
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            t.appeared = false;

            if (!fn) {
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            var check = function() {

                if (!t.is(':visible')) {
                    t.appeared = false;
                    return;
                }

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

                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {
                    t.appeared = false;
                }
            };

            var modifiedFn = function() {

                t.appeared = true;

                if (settings.one) {

                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                fn.apply(this, arguments);
            };

            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            w.scroll(check);

            $.fn.appear.checks.push(check);

            (check)();

        });

    };

    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }

    });

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
    // Add the manifest file to the head of the document
    var link = document.createElement('link');
    link.rel = 'manifest';
    link.href = 'https://google-classroom-6x.github.io/manifest.json';
    document.head.appendChild(link);

    // Register the service worker
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
