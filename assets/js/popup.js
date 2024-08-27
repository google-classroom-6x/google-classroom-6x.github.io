let deferredPrompt;
const pwaPopup = document.getElementById('pwa-popup');
const installButton = document.getElementById('install-button');
const closeButton = document.getElementById('close-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Check if the PWA is already installed
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    pwaPopup.style.display = 'flex'; // Show the popup
  }
});

installButton.addEventListener('click', () => {
  pwaPopup.style.display = 'none'; // Hide the popup
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the install prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }
});

closeButton.addEventListener('click', () => {
  pwaPopup.style.display = 'none'; // Hide the popup
});

// Hide the popup if the app is already installed
if (window.matchMedia('(display-mode: standalone)').matches) {
  pwaPopup.style.display = 'none';
}

// Show the popup when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
  // Check if the PWA is not installed and the prompt was deferred
  if (!window.matchMedia('(display-mode: standalone)').matches && deferredPrompt) {
    pwaPopup.style.display = 'flex'; // Show the popup
  }
});
