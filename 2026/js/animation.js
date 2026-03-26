const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove(
        'opacity-0',
        '-translate-x-10',
        'translate-x-10',
        'translate-y-10',
        '-translate-y-10',
        '-translate-x-5',
        'translate-x-5',
        'translate-y-5',
        '-translate-y-5',
        'blur-sm'
      );
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});