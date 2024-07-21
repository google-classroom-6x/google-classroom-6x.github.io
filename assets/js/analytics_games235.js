function inFrame() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function botBrowser() {
  try {
    return navigator.webdriver;
  } catch (e) {
    return true;
  }
}

function loadGoogleAnalytics(id) {
  // Google tag (gtag.js)
  var firstScript = document.getElementsByTagName("script")[0];
  var newScript = document.createElement("script");
  newScript.async = true;
  newScript.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  firstScript.parentNode.insertBefore(newScript, firstScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', id);
}

window.addEventListener("load", (event) => {
  if (botBrowser()) {
    loadGoogleAnalytics("G-8L1MQ91YFD");
    console.log('Bot Browser', event);
  } else {
    console.log('Human Browser', event);
    if (window.location.href.indexOf(".games235.com") > -1) {
      if (inFrame()) {
        loadGoogleAnalytics("G-8L1MQ91YFD");
      } else {
        loadGoogleAnalytics("G-8L1MQ91YFD");
      }
    } else {
      loadGoogleAnalytics("G-8L1MQ91YFD");
    }
  }
});
