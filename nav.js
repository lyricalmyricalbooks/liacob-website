document.addEventListener('DOMContentLoaded', function() {
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
    + '<div class="footer-contact-block"><h4>Contact</h4>'
    + '<p>For inquiries: <a href="mailto:julianiacobelli1@gmail.com">julianiacobelli1@gmail.com</a></p></div>'
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
