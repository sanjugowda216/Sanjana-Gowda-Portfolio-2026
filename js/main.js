document.addEventListener('DOMContentLoaded', () => {
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
