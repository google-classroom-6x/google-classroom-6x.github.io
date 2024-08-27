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

<!-- Popup HTML -->
<div id="pwa-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); color: white; text-align: center; z-index: 1000; flex-wrap: wrap; flex-direction: row;">
  <div style="margin: 20% auto; padding: 20px; background: #333; border-radius: 10px; width: 80%; max-width: 600px;">
    <h2>Install our Google Classroom 6x to Play Unblocked Games</h2>
    <p style="color: white;">For a better experience, install our app on your device.</p>
    <button id="install-button" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Install Classroom 6x</button>
    <button id="close-popup" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-left: 10px;">Close</button>
  </div>
</div>

<!-- PWA Installation Popup Script -->
<script>
let deferredPrompt;
const popup = document.getElementById('pwa-popup');
const installButton = document.getElementById('install-button');
const closePopupButton = document.getElementById('close-popup');

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  popup.style.display = 'flex';
});

// Handle the install button click
installButton.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
      popup.style.display = 'none';
    });
  }
});

// Handle the close popup button click
closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
});
</script>
