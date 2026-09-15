const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.tab, .site-nav a[data-tab]').forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();
    const target = tab.getAttribute('data-tab');
    const targetPanel = document.getElementById(target);

    if (!targetPanel) return;

    document.querySelectorAll('.tab').forEach((item) => {
      const isActive = item.getAttribute('data-tab') === target;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === target);
    });
    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelector('#year').textContent = '2016';