const SITE_PATH_STOPS = [
  { href: 'index.html', label: 'Home', x: '50%', y: '5%' },
  { href: 'about.html', label: 'About', x: '78%', y: '23%' },
  { href: 'projects.html', label: 'Projects', x: '22%', y: '50%' },
  { href: 'activities.html', label: 'Activities', x: '78%', y: '77%' },
  { href: 'resume.html', label: 'Resume', x: '50%', y: '95%' },
];

function initSitePathNav() {
  const nav = document.getElementById('site-path-nav');
  if (!nav) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const hint = document.getElementById('site-path-hint');

  nav.querySelectorAll('.site-path-stop').forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === currentPage || (currentPage === '' && href === 'index.html');
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }

    link.addEventListener('click', () => {
      if (hint) hint.classList.add('is-hidden');
      sessionStorage.setItem('pathHintDismissed', '1');
    });
  });

  if (hint) {
    if (sessionStorage.getItem('pathHintDismissed')) {
      hint.classList.add('is-hidden');
    } else {
      const nextStop = SITE_PATH_STOPS.find(
        (stop) => stop.href !== currentPage && !(currentPage === '' && stop.href === 'index.html')
      );
      if (nextStop) {
        hint.style.top = nextStop.y;
        hint.style.left = nextStop.x;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSitePathNav();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinksList = document.querySelector('.nav-links');

  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksList.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinksList.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinksList.classList.remove('active');
      }
    });
  }

  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pageName || (pageName === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const projectFilter = document.getElementById('projects-filter');
  if (projectFilter) {
    const sections = document.querySelectorAll('.projects-section[data-category]');

    projectFilter.querySelectorAll('.projects-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        projectFilter.querySelectorAll('.projects-filter-btn').forEach(b => {
          b.classList.toggle('active', b === btn);
        });

        sections.forEach(section => {
          const category = section.dataset.category;
          const show = filter === 'all' || filter === category;
          section.classList.toggle('is-hidden', !show);
        });
      });
    });
  }
});
