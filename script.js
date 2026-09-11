const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('rm-theme');
if (savedTheme === 'dark') root.classList.add('dark');
if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');

toggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('rm-theme', root.classList.contains('dark') ? 'dark' : 'light');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Smooth anchor behavior with room for the floating dock.
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
