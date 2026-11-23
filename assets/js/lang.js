/* =========================================================
   Language links.
   German is the default and lives at the site root.
   English lives at /en/, French at /fr/.

   The DE / EN / FR switcher in the header links directly to the
   same page in each language. The only script-side navigation is
   an explicit ?lang=de|en|fr parameter (for shared links).

   Nothing is detected automatically: every visitor - and every
   crawler - receives exactly the same HTML from the same URL,
   so there is no redirect and no cloaking surface at all.
   ========================================================= */

(function () {
  'use strict';

  var LANGS = ['de', 'en', 'fr'];
  var root = document.documentElement;
  var current = String(root.getAttribute('data-lang') || 'de').toLowerCase();
  var urls = {
    de: root.getAttribute('data-url-de'),
    en: root.getAttribute('data-url-en'),
    fr: root.getAttribute('data-url-fr')
  };

  var param = null;
  try { param = new URLSearchParams(window.location.search).get('lang'); } catch (err) { /* old browser */ }
  if (!param) return;

  param = String(param).toLowerCase().slice(0, 2);
  if (LANGS.indexOf(param) === -1) return;
  if (param === current) return;

  var url = urls[param];
  if (!url) return;

  /* Safety: only ever navigate inside this site. A protocol
     (https:, javascript:, data:) or protocol-relative //host
     target is refused, so no injected attribute can send a
     visitor to another domain. */
  if (/^[a-z][a-z0-9+.\-]*:/i.test(url) || url.slice(0, 2) === '//') return;

  window.location.replace(url);
})();
