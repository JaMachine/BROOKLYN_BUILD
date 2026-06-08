document.addEventListener('DOMContentLoaded', () => {
    // === ЛОГИКА ДЛЯ МОБИЛЬНОЙ ВЕРСИИ (ГАМБУРГЕР И ЗВОНОК) ===
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const phoneWidget = document.getElementById('phone-widget');
    const phoneBtn = document.getElementById('phone-btn');

    // Открытие/закрытие мобильного меню
    if (menuToggleBtn && mobileNavMenu) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggleBtn.classList.toggle('active');
            mobileNavMenu.classList.toggle('open');
        });
    }

    // Анимация выезда номера телефона
    if (phoneBtn && phoneWidget) {
        phoneBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            phoneWidget.classList.toggle('active');
        });
    }

    // Закрытие меню и виджета телефона при клике на пустую область экрана
    document.addEventListener('click', (e) => {
        if (mobileNavMenu && !mobileNavMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
            mobileNavMenu.classList.remove('open');
            menuToggleBtn.classList.remove('active');
        }
        if (phoneWidget && !phoneWidget.contains(e.target)) {
            phoneWidget.classList.remove('active');
        }
    });

    // Автоматическое закрытие меню при клике на любую кнопку навигации внутри него
    if (mobileNavMenu) {
        const mobileMenuLinks = mobileNavMenu.querySelectorAll('.nav-btn:not(#services-btn), .sub-nav-btn');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavMenu.classList.remove('open');
                menuToggleBtn.classList.remove('active');
            });
        });
    }
    // =======================================================


    // Элементы навигации страниц
    const navButtons = document.querySelectorAll('.nav-menu .nav-btn[data-target]');
    const homePage = document.getElementById('home-page');
    const contactsBtn = document.getElementById('to-contacts-btn');
    
    // Элементы выпадающего меню услуг
    const servicesBtn = document.getElementById("services-btn");
    const servicesDropdown = document.getElementById("services-dropdown");

    // 1. Открытие/закрытие подменю "Наші послуги"
    if (servicesBtn && servicesDropdown) {
        servicesBtn.addEventListener("click", (e) => {
            e.preventDefault();
            servicesDropdown.classList.toggle("hidden");
        });
    }

    // 2. Закрытие меню при клике в любое другое место экрана
    document.addEventListener("click", (e) => {
        if (servicesBtn && servicesDropdown) {
            if (!servicesBtn.contains(e.target) && !servicesDropdown.contains(e.target)) {
                if (!servicesDropdown.classList.contains("hidden")) {
                    servicesDropdown.classList.add("hidden");
                }
            }
        }
    });

    // 3. Переходы на внутренние экраны
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);

            if (!targetPage) return;

            homePage.classList.add('fade-out');
            
            setTimeout(() => {
                homePage.classList.add('hidden');
                targetPage.classList.remove('hidden');
                
                // Анимация галереи
                if (targetId === 'gallery-page') {
                    requestAnimationFrame(() => {
                        targetPage.classList.add('slide-up');
                    });
                } else {
                    targetPage.classList.add('fade-out');
                    requestAnimationFrame(() => {
                        targetPage.classList.remove('fade-out');
                    });
                }
            }, 500); 
        });
    });

    // 4. Обработка всех кнопок "Назад"
    document.querySelectorAll('.back-btn').forEach(backBtn => {
        backBtn.addEventListener('click', (e) => {
            const currentPage = e.target.closest('.page-container');
            
            if (currentPage.id === 'gallery-page') {
                currentPage.classList.remove('slide-up');
                setTimeout(() => {
                    currentPage.classList.add('hidden');
                    homePage.classList.remove('hidden');
                    requestAnimationFrame(() => {
                        homePage.classList.remove('fade-out');
                    });
                }, 600);
            } else {
                currentPage.classList.add('fade-out');
                setTimeout(() => {
                    currentPage.classList.add('hidden');
                    homePage.classList.remove('hidden');
                    requestAnimationFrame(() => {
                        homePage.classList.remove('fade-out');
                    });
                }, 500);
            }
        });
    });

    // 5. Кнопка контактов
    if (contactsBtn) {
        contactsBtn.addEventListener('click', () => {
            window.location.href = 'contacts.html'; 
        });
    }
});