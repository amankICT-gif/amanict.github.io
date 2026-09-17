const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

const closeNav = () => {
  mainNav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const open = mainNav?.classList.toggle('is-open') ?? false;
  navToggle.setAttribute('aria-expanded', String(open));
});

mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
document.querySelector('#year').textContent = '2016';

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.main-nav a')];
const linkFor = (id) => links.find((link) => link.getAttribute('href') === '#' + id);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.remove('is-active'));
    linkFor(entry.target.id)?.classList.add('is-active');
  });
}, { rootMargin: '-32% 0px -58% 0px' });

sections.forEach((section) => observer.observe(section));
