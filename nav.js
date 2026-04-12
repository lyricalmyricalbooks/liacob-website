document.addEventListener('DOMContentLoaded', function() {
  var SHOPIFY_PATH_PREFIX = '/cdn/shop/';
  var DEFAULT_IMAGE_HOSTS = [
    'https://www.lucianoiacobelli.com',
    'https://lucianoiacobelli.com'
  ];
  var configuredHosts = Array.isArray(window.IMAGE_FALLBACK_HOSTS) ? window.IMAGE_FALLBACK_HOSTS : [];
  var imageHosts = configuredHosts.concat(DEFAULT_IMAGE_HOSTS).filter(function(host, idx, arr) {
    return typeof host === 'string' && host.length > 0 && arr.indexOf(host) === idx;
  });

  var toUrl = function(value) {
    try {
      return new URL(value, window.location.origin);
    } catch (e) {
      return null;
    }
  };

  var nextImageCandidate = function(src) {
    var url = toUrl(src);
    if (!url || url.pathname.indexOf(SHOPIFY_PATH_PREFIX) === -1) return null;
    var currentOrigin = url.origin;
    var currentIdx = imageHosts.indexOf(currentOrigin);
    var nextHost = currentIdx >= 0 ? imageHosts[currentIdx + 1] : imageHosts[0];
    if (!nextHost) return null;
    return nextHost + url.pathname + url.search;
  };

  document.addEventListener('error', function(event) {
    var img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    var retries = parseInt(img.dataset.cdnRetry || '0', 10);
    var nextSrc = nextImageCandidate(img.currentSrc || img.src);
    if (!nextSrc || retries >= imageHosts.length - 1) return;
    img.dataset.cdnRetry = String(retries + 1);
    img.src = nextSrc;
  }, true);

  var path = window.location.pathname;

  var dir = path.endsWith('/') ? path : path.substring(0, path.lastIndexOf('/') + 1);

  var subDirs = ['art/', 'poetry-books/', 'lyricalmyrical/', 'lucs-apartment/', 'contact/'];
  var base = dir;
  for (var i = 0; i < subDirs.length; i++) {
    if (dir.endsWith(subDirs[i])) {
      base = dir.substring(0, dir.length - subDirs[i].length);
      break;
    }
  }

  var NAV = '<header class="site-header">'
    + '<div class="header-top">'
    + '  <a href="' + base + 'index.html" class="header-logo">Luciano Iacobelli</a>'
    + '</div>'
    + '<div class="header-bottom">'
    + '<button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>'
    + '<nav class="header-nav" id="header-nav">'
    + '<a href="' + base + 'index.html" class="nav-link">Home</a>'
    + '<div class="nav-dropdown">'
    + '<a href="#" class="nav-link nav-art">Art <svg style="width:1rem; margin-left:0.3rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>'
    + '<div class="dropdown-panel">'
    + '<a href="' + base + 'art/large.html">Large Artwork</a>'
    + '<a href="' + base + 'art/medium.html">Medium Art</a>'
    + '<a href="' + base + 'art/small.html">Small Art</a>'
    + '<a href="' + base + 'art/digital.html">Digital Art</a>'
    + '<a href="' + base + 'art/assemblage.html">Assemblage</a>'
    + '</div></div>'
    + '<a href="' + base + 'poetry-books/index.html" class="nav-link">Poetry Books</a>'
    + '<a href="' + base + 'lyricalmyrical/index.html" class="nav-link">Lyricalmyrical Covers</a>'
    + '<a href="' + base + 'lucs-apartment/index.html" class="nav-link">Luc\'s Apartment</a>'
    + '<a href="' + base + 'contact/index.html" class="nav-link">Contact</a>'
    + '</nav></div></header>';

  var FOOTER = '<footer><div class="footer-inner">'
    + '<div class="footer-links-block"><h4>Quick links</h4>'
    + '<div class="footer-quick-links">'
    + '<a href="' + base + 'index.html">Home</a>'
    + '<a href="' + base + 'art/large.html">Art</a>'
    + '<a href="' + base + 'poetry-books/index.html">Poetry Books</a>'
    + '<a href="' + base + 'lyricalmyrical/index.html">Lyricalmyrical Covers</a>'
    + '<a href="' + base + 'lucs-apartment/index.html">Luc\'s Apartment</a>'
    + '<a href="' + base + 'contact/index.html">Contact</a>'
    + '</div></div>'
    + '<div class="footer-bottom">&copy; 2026, Luciano Iacobelli</div>'
    + '</div></footer>';

  document.body.insertAdjacentHTML('afterbegin', NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER);

  document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('header-nav').classList.toggle('open');
  });

  if (path.includes('/art/')) {
    var artLink = document.querySelector('.nav-art');
    if (artLink) artLink.classList.add('active');
  }

  var productGrid = document.querySelector('.product-grid');
  if (productGrid) {
    document.querySelectorAll('.toolbar-left, .sort-group, .filter-group, .collection-toolbar .toolbar-right > span').forEach(function(el) {
      el.remove();
    });

    var updateCount = function() {
      var cardCount = productGrid.querySelectorAll('.product-card').length;
      var countEl = document.querySelector('.product-count');
      if (!countEl) {
        var header = document.querySelector('.page-header');
        if (header) {
          countEl = document.createElement('div');
          countEl.className = 'product-count';
          header.appendChild(countEl);
        }
      }
      if (countEl) {
        countEl.textContent = cardCount + (cardCount === 1 ? ' piece' : ' pieces');
      }
    };

    updateCount();
    window.addEventListener('load', updateCount);
  }
});
