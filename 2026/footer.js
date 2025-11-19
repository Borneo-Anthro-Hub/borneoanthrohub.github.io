// document.addEventListener("DOMContentLoaded", function () {
//   fetch("footer.html")
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById("footer").innerHTML = data;
//     });
// });

const icons = {
  arrow: `<svg width="7" height="11" viewBox="0 0 7 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.29999 0C3.49999 1.3 5.29996 3.2 6.39996 5.5C5.29996 7.8 3.49999 9.7 1.29999 11C0.499988 9.3 0 7.5 0 5.5C0 3.6 0.399988 1.7 1.29999 0Z"
              />
          </svg>`
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;

      //insert SVG code
      document.querySelectorAll("#footer [data-icon]").forEach(el => {
        const name = el.getAttribute("data-icon");
        if (icons[name]) el.innerHTML = icons[name];
      });

      const btn = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          btn.classList.remove('opacity-0', 'pointer-events-none');
          btn.classList.add('opacity-100');
        } else {
          btn.classList.add('opacity-0', 'pointer-events-none');
          btn.classList.remove('opacity-100');
        }
      });
      footer.classList.add("mt-auto");
    });
});

document.dispatchEvent(new Event("footerLoaded"));