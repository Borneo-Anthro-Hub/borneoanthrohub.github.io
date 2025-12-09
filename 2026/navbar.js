document.addEventListener("DOMContentLoaded", function () {
  const icons = {
    arrow: `<svg width="7" height="11" viewBox="0 0 7 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.29999 0C3.49999 1.3 5.29996 3.2 6.39996 5.5C5.29996 7.8 3.49999 9.7 1.29999 11C0.499988 9.3 0 7.5 0 5.5C0 3.6 0.399988 1.7 1.29999 0Z"
            />
          </svg>`
  };

  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      //nav manu arrow
      document.querySelectorAll("#navbar [data-icon]").forEach(el => {
        const name = el.getAttribute("data-icon");
        if (icons[name]) el.innerHTML = icons[name];
      });


// 2. 汉堡菜单逻辑 (新增部分)
      const menuToggle = document.getElementById('menu-toggle');
      const menu = document.getElementById('mobile-menu');

      if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
          // switch hidden menu
          menu.classList.toggle('hidden');
        });
      }

      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      // 获取所有子菜单容器，用于遍历和关闭其他菜单
      const allDropdownMenus = document.querySelectorAll('.dropdown-menu'); 

      dropdownToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          const dropdownMenu = btn.nextElementSibling;
          const arrowIcon = btn.querySelector('.arrow-icon');
          
          allDropdownMenus.forEach(menuItem => {
              // 找到当前菜单项的触发按钮 (即上一个兄弟元素)
              const toggleButton = menuItem.previousElementSibling; 
              // 找到触发按钮里面的箭头
              const otherArrow = toggleButton ? toggleButton.querySelector('.arrow-icon') : null;

              // 如果当前的菜单不是我们点击的那个，并且它当前是打开的
              if (menuItem !== dropdownMenu && !menuItem.classList.contains('hidden')) {
                  menuItem.classList.add('hidden'); // 关闭其他菜单
                  if (otherArrow) {
                      otherArrow.style.transform = ''; // 重置其他箭头方向
                  }
              }
          });

          // 切换当前被点击的菜单的显示/隐藏状态
          if (dropdownMenu) {
            dropdownMenu.classList.toggle('hidden');
            
            // 切换当前箭头旋转
            if(arrowIcon) {
                if (dropdownMenu.classList.contains('hidden')) {
                     arrowIcon.style.transform = ''; // 关闭时重置
                } else {
                     arrowIcon.style.transform = 'rotate(90deg)'; // 打开时旋转
                }
            }
          }
        });
      });
      function resetAllSubmenus() {
          const allDropdownMenus = document.querySelectorAll('.dropdown-menu'); 
          allDropdownMenus.forEach(menuItem => {
              // 只需要重置当前打开的菜单
              if (!menuItem.classList.contains('hidden')) {
                  menuItem.classList.add('hidden'); // 强制关闭菜单
                  
                  // 找到对应的箭头并重置
                  const toggleButton = menuItem.previousElementSibling; 
                  const arrowIcon = toggleButton ? toggleButton.querySelector('.arrow-icon') : null;
                  
                  if (arrowIcon) {
                      arrowIcon.style.transform = ''; // 重置箭头方向
                  }
              }
          });
      }

      //UX click other place close menu
      document.addEventListener('click', (e) => {
        if (menu && !menu.classList.contains('hidden')) {
          if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            resetAllSubmenus();
            menu.classList.add('hidden');
          }
        }
      });

      const nav = document.querySelector('header#navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
          nav.classList.add('bg-[#e8804d]', 'from-transparent', 'to-transparent');
        } else {
          nav.classList.remove('bg-[#e8804d]', 'from-transparent', 'to-transparent');
        }
      });

    });
});