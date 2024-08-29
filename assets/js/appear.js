// Combined JavaScript file

// Google Analytics Initialization
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

// jQuery.appear Plugin
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

// PWA Popup Code
(function() {
    let deferredPrompt;
    const popup = document.getElementById('pwa-popup');
    const installButton = document.getElementById('install-button');
    const closePopupButton = document.getElementById('close-popup');

    // Create the main popup container
    const pwaPopup = document.createElement('div');
    pwaPopup.id = 'pwa-popup';
    pwaPopup.style.display = 'none';
    pwaPopup.style.position = 'fixed';
    pwaPopup.style.top = '0';
    pwaPopup.style.left = '0';
    pwaPopup.style.width = '100%';
    pwaPopup.style.height = '100%';
    pwaPopup.style.background = 'rgba(255,255,255,0.8)';
    pwaPopup.style.color = '#333';
    pwaPopup.style.textAlign = 'center';
    pwaPopup.style.zIndex = '1000';
    pwaPopup.style.display = 'flex';
    pwaPopup.style.alignItems = 'center';
    pwaPopup.style.justifyContent = 'center';

    // Create the inner content container
    const innerDiv = document.createElement('div');
    innerDiv.style.padding = '25px';
    innerDiv.style.background = '#f5f5f5';
    innerDiv.style.borderRadius = '20px';
    innerDiv.style.width = '90%';
    innerDiv.style.maxWidth = '450px';
    innerDiv.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    innerDiv.style.textAlign = 'center';

    // Create the heading
    const heading = document.createElement('h2');
    heading.style.fontSize = '22px';
    heading.style.marginBottom = '15px';
    heading.style.color = '#2c3e50';
    heading.textContent = "Hey there! 👋";

    // Create the paragraph
    const paragraph = document.createElement('p');
    paragraph.style.fontSize = '16px';
    paragraph.style.color = '#444';
    paragraph.style.marginBottom = '25px';
    paragraph.textContent = "Add to Home Screen for Quick Access to Unblocked Games!";

    // Create the install button
    const installButton = document.createElement('button');
    installButton.id = 'install-button';
    installButton.style.padding = '12px 28px';
    installButton.style.fontSize = '18px';
    installButton.style.cursor = 'pointer';
    installButton.style.backgroundColor = '#ff7f50';
    installButton.style.color = 'white';
    installButton.style.border = 'none';
    installButton.style.borderRadius = '25px';
    installButton.style.marginRight = '10px';
    installButton.style.transition = 'background-color 0.3s';
    installButton.innerHTML = '<i class="fas fa-heart" style="margin-right: 8px;"></i>Add to Home Screen';

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-popup';
    closeButton.style.padding = '12px 28px';
    closeButton.style.fontSize = '18px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = '#888';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '25px';
    closeButton.style.transition = 'color 0.3s';
    closeButton.textContent = "Not Now";

    // Append all elements to their respective parents
    innerDiv.appendChild(heading);
    innerDiv.appendChild(paragraph);
    innerDiv.appendChild(installButton);
    innerDiv.appendChild(closeButton);
    pwaPopup.appendChild(innerDiv);

    // Append the popup to the body
    document.body.appendChild(pwaPopup);

    // Listen for the 'beforeinstallprompt' event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); // Prevent the default prompt
        deferredPrompt = e;
        popup.style.display = 'flex'; // Show the popup
    });

    // Handle the install button click
    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
                popup.style.display = 'none'; // Hide the popup
            });
        }
    });

    // Handle the close popup button click
    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none'; // Hide the popup
    });

    // Optionally, you might want to check if the PWA is already installed
    // You can check for the existence of the installed app using navigator.standalone
    // if (window.navigator.standalone) {
    //   popup.style.display = 'none'; // Hide the popup if app is installed
    // }

    // Add PWA manifest dynamically
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = 'https://google-classroom-6x.github.io/manifest.json';
    document.head.appendChild(manifestLink);

})();
