// Create a <style> element and inject CSS
var style = document.createElement('style');
style.type = 'text/css';

// Add combined CSS rules and animations
style.innerHTML = `
  /* Hover effects for install and close buttons */
  #install-button:hover {
    background: linear-gradient(135deg, #ff4500, #ff7f50);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  #close-popup:hover {
    color: #555;
  }

  /* Keyframe animations */
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulseText {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  /* Additional styles for PWA popup (optional) */
  /* You can add more styles here if needed */
`;

// Append the <style> element to the document head
document.head.appendChild(style);

// Wait for the window to fully load
$(window).on('load', function () {
    // ================================
    // Google Analytics Initialization
    // ================================
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

    // ================================
    // Dynamically Add Manifest Link
    // ================================
    (function() {
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = 'https://google-classroom-6x.github.io/manifest.json';
        document.head.appendChild(manifestLink);
    })();

    // ================================
    // Isotope Filtering Setup
    // ================================
    (function() {
        var $container = $('.gamesContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.projectFilter a').on('click', function () {
            $('.projectFilter .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    })();

    // ================================
    // PWA Installation Code
    // ================================
    (function() {
        let deferredPrompt;

        // Check if the PWA is already installed
        const isPwaInstalled = localStorage.getItem('pwaInstalled');

        if (!isPwaInstalled) {
            // Create and append the popup HTML
            const popupHTML = `
                <div id="pwa-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.8); color: #333; text-align: center; z-index: 1000; display: flex; align-items: center; justify-content: center;">
                    <div style="padding: 25px; background: #f5f5f5; border-radius: 20px; width: 90%; max-width: 450px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); text-align: center;">
                        <h2 style="font-size: 22px; margin-bottom: 15px; color: #2c3e50; animation: fadeInDown 1s;">Hey there! 👋</h2>
                        <p style="font-size: 16px; color: #444; margin-bottom: 25px; font-weight: bold; color: #ff7f50; animation: pulseText 2s infinite;">
                            Don't Miss Out - <span style="color: #ff4500;">Install Our</span> Desktop App!
                        </p>
                        <button id="install-button" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background: linear-gradient(135deg, #ff7f50, #ff4500); color: white; border: none; border-radius: 30px; margin-right: 10px; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); align-items: center;">
                            <i class="fas fa-download" style="margin-right: 10px; font-size: 20px;"></i>Add to Home Screen
                        </button>
                        <button id="close-popup" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background-color: transparent; color: #888; border: none; border-radius: 30px; transition: color 0.3s ease;">
                            Not Now
                        </button>
                    </div>
                </div>
            `;
            $('body').append(popupHTML);

            const popup = document.getElementById('pwa-popup');
            const installButton = document.getElementById('install-button');
            const closePopupButton = document.getElementById('close-popup');

            // Listen for the 'beforeinstallprompt' event
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault(); // Prevent the default prompt
                deferredPrompt = e;
                popup.style.display = 'flex'; // Show the popup

                // Track that the install prompt was shown
                if (typeof gtag === 'function') {
                    gtag('event', 'PWA Install Prompt', {
                        'event_category': 'PWA',
                        'event_label': 'Install Prompt Shown'
                    });
                }
            });

            // Handle the install button click
            installButton.addEventListener('click', () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt(); // Show the install prompt

                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the A2HS prompt');
                            // Track acceptance
                            if (typeof gtag === 'function') {
                                gtag('event', 'PWA Install Accepted', {
                                    'event_category': 'PWA',
                                    'event_label': 'Install Accepted'
                                });
                            }
                        } else {
                            console.log('User dismissed the A2HS prompt');
                            // Track dismissal
                            if (typeof gtag === 'function') {
                                gtag('event', 'PWA Install Dismissed', {
                                    'event_category': 'PWA',
                                    'event_label': 'Install Dismissed'
                                });
                            }
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

            // Listen for the 'appinstalled' event
            window.addEventListener('appinstalled', () => {
                console.log('PWA was installed');
                localStorage.setItem('pwaInstalled', 'true'); // Save the flag in localStorage
                popup.style.display = 'none'; // Hide the popup
                // Track the PWA installation
                if (typeof gtag === 'function') {
                    gtag('event', 'PWA Installed', {
                        'event_category': 'PWA',
                        'event_label': 'PWA Installed'
                    });
                }
            });
        }
    })();

    // ================================
    // jQuery.appear Plugin
    // ================================
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

    // ================================
    // Optional: Service Worker Registration
    // ================================
    (function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    })();
});
