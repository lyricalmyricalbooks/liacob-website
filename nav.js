document.addEventListener('DOMContentLoaded', function() {
  // Derive base URL from this script's own src — works on any host without hardcoding
  var scripts = document.getElementsByTagName('script');
  var base = '';
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src');
    if (src && src.indexOf('nav.js') !== -1) {
      var a = document.createElement('a');
      a.href = src;
      base = a.href.replace('nav.js', '');
      break;
    }
  }

  var NAV = '<header class="site-header">'
    + '<div class="header-top">'
    + '  <div class="header-top-left">'
    + '    <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
    + '  </div>'
    + '  <a href="' + base + 'index.html" class="header-logo">Luciano Iacobelli</a>'
    + '  <div class="header-top-right">'
    + '    <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
    + '    <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>'
    + '  </div>'
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
    + '<a href="' + base + 'lyricalmyrical/index.html" class="nav-link">LyricalMyrical Covers</a>'
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

  var path = window.location.pathname;
  if (path.includes('/art/')) {
    var artLink = document.querySelector('.nav-art');
    if (artLink) artLink.classList.add('active');
  }
});
