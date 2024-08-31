!function(s) {
    "use strict";

    // Toggle light/dark mode
    s(".switch").on("click", function() {
        s("body").hasClass("light") ? 
            (s("body").removeClass("light"), s(".switch").removeClass("switched")) : 
            (s("body").addClass("light"), s(".switch").addClass("switched"));
    });

    s(document).ready(function() {
        // Progress bar path animation
        var e = document.querySelector(".progress-wrap path"),
            t = e.getTotalLength();
        e.style.transition = e.style.WebkitTransition = "none";
        e.style.strokeDasharray = t + " " + t;
        e.style.strokeDashoffset = t;
        e.getBoundingClientRect();
        e.style.transition = e.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        
        var o = function() {
            var o = s(window).scrollTop(),
                r = s(document).height() - s(window).height(),
                i = t - o * t / r;
            e.style.strokeDashoffset = i;
        };

        o();
        s(window).scroll(o);

        jQuery(window).on("scroll", function() {
            jQuery(this).scrollTop() > 50 ? 
                jQuery(".progress-wrap").addClass("active-progress") : 
                jQuery(".progress-wrap").removeClass("active-progress");
        });

        jQuery(".progress-wrap").on("click", function(s) {
            return s.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 }, 550), !1;
        });

        // Insert Adsterra ad dynamically
        var adContainer = document.createElement('div');
        adContainer.className = 'ad-container';
        adContainer.style.textAlign = 'center';
        adContainer.style.margin = '20px 0';
        adContainer.style.padding = '10px 0';

        var adScriptOptions = document.createElement('script');
        adScriptOptions.type = 'text/javascript';
        adScriptOptions.innerHTML = `
            atOptions = {
                'key': '23db35c912a1e51596e05e4a90abd42a',
                'format': 'iframe',
                'height': 90,
                'width': 728,
                'params': {}
            };
        `;

        var adScriptInvoke = document.createElement('script');
        adScriptInvoke.type = 'text/javascript';
        adScriptInvoke.src = '//www.topcreativeformat.com/23db35c912a1e51596e05e4a90abd42a/invoke.js';

        adContainer.appendChild(adScriptOptions);
        adContainer.appendChild(adScriptInvoke);

        // Append the container to the body or any other desired element
        document.body.appendChild(adContainer);
    });
}(jQuery);
