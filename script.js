document.addEventListener('DOMContentLoaded', () => {
    
    // Элементы управления
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const phoneWidget = document.getElementById('phone-widget');
    const phoneBtn = document.getElementById('phone-btn');
    
    const servicesBtn = document.getElementById("services-btn");
    const servicesDropdown = document.getElementById("services-dropdown");
    const galleryBtn = document.getElementById('to-gallery-btn');

    const galleryPage = document.getElementById('gallery-page');
    const closeGalleryBtn = document.getElementById('close-gallery-btn');
    
    // Мобильный логотип
    const mobileLogo = document.querySelector('.menu-mobile-logo');

    // Функция полного закрытия меню и сброса всех состояний
    function closeMobileMenuWithReset() {
        if (mobileNavMenu && menuToggleBtn) {
            mobileNavMenu.classList.remove('open');
            menuToggleBtn.classList.remove('active');
        }
        if (servicesDropdown) {
            servicesDropdown.classList.add('hidden'); 
        }
        if (mobileLogo) {
            mobileLogo.classList.remove('fade-out'); 
        }
    }

    // Открытие/закрытие главного мобильного меню
    if (menuToggleBtn && mobileNavMenu) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileNavMenu.classList.contains('open')) {
                closeMobileMenuWithReset();
            } else {
                menuToggleBtn.classList.add('active');
                mobileNavMenu.classList.add('open');
            }
        });
    }

    // Кнопка телефона
    if (phoneBtn && phoneWidget) {
        phoneBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            phoneWidget.classList.toggle('active');
        });
    }

    // Клик мимо элементов закрывает шторки
    document.addEventListener('click', (e) => {
        if (mobileNavMenu && !mobileNavMenu.contains(e.target) && !menuToggleBtn.contains(e.target)) {
            closeMobileMenuWithReset();
        }
        if (phoneWidget && !phoneWidget.contains(e.target)) {
            phoneWidget.classList.remove('active');
        }
    });

    // Показ подменю услуг + скрытие/показ логотипа
    if (servicesBtn && servicesDropdown) {
        servicesBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            servicesDropdown.classList.toggle("hidden");
            
            if (mobileLogo) {
                if (!servicesDropdown.classList.contains("hidden")) {
                    mobileLogo.classList.add('fade-out');
                } else {
                    mobileLogo.classList.remove('fade-out');
                }
            }
        });
    }

    // Скролл к выбранной карточке услуги
    const subNavButtons = document.querySelectorAll('.sub-nav-btn');
    subNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetSectionId);

            if (targetElement) {
                closeMobileMenuWithReset(); 
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Открытие галереи поверх страницы
    if (galleryBtn && galleryPage) {
        galleryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenuWithReset();
            galleryPage.classList.remove('hidden');
            requestAnimationFrame(() => {
                galleryPage.classList.add('slide-up');
            });
        });
    }

    // Закрытие галереи
    if (closeGalleryBtn && galleryPage) {
        closeGalleryBtn.addEventListener('click', () => {
            galleryPage.classList.remove('slide-up');
            setTimeout(() => {
                galleryPage.classList.add('hidden');
            }, 500);
        });
    }
});