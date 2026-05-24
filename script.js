document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-menu .nav-btn');
    const homePage = document.getElementById('home-page');
    const stubPage = document.getElementById('stub-page');
    const backBtn = document.getElementById('back-btn');

    if (!homePage || !stubPage || !backBtn) {
        console.error('Ошибка: Один или несколько элементов (home-page, stub-page, back-btn) не найдены в HTML!');
        return;
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            homePage.classList.add('fade-out');
            
            setTimeout(() => {
                homePage.classList.add('hidden');
                stubPage.classList.remove('hidden');
                stubPage.classList.add('fade-out');
                
                requestAnimationFrame(() => {
                    stubPage.classList.remove('fade-out');
                });
            }, 500); 
        });
    });

    backBtn.addEventListener('click', () => {
        stubPage.classList.add('fade-out');
        
        setTimeout(() => {
            stubPage.classList.add('hidden');
            homePage.classList.remove('hidden');
            
            requestAnimationFrame(() => {
                homePage.classList.remove('fade-out');
            });
        }, 500);
    });
});