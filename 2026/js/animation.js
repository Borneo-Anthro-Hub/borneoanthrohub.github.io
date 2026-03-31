const REVEAL_RESET_CLASSES = [
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
];

const observedRevealElements = new WeakSet();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.remove(...REVEAL_RESET_CLASSES);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

function observeRevealElements(root = document) {
  if (!root?.querySelectorAll) {
    return;
  }

  root.querySelectorAll('.reveal').forEach((el) => {
    if (observedRevealElements.has(el)) {
      return;
    }

    observedRevealElements.add(el);
    observer.observe(el);
  });
}

window.observeRevealElements = observeRevealElements;

document.addEventListener('DOMContentLoaded', () => {
  observeRevealElements();
});
