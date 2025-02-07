document.addEventListener("DOMContentLoaded", () => {
    let langButtons = document.querySelectorAll('.language-div');
    let humburger = document.querySelector('.hamburger-btn');
    let spanMenu = document.querySelector('.span-menu');

    const languages = [
        {
            code: 'EN',
            flag: './assets/images/header-footer-images/US-Flag.svg'
        },
        {
            code: 'TH',
            flag: './assets/images/header-footer-images/thailand-flag.png'
        }
    ];
    let currentLangIndex = 0;

    langButtons.forEach(langButton => {
        langButton.addEventListener('click', () => {
            currentLangIndex = (currentLangIndex + 1) % languages.length;
            const newLang = languages[currentLangIndex];

           
            langButtons.forEach(button => {
                let langText = button.querySelector('.wrapper-desc-text');
                let langFlag = button.querySelector('img');

                langText.textContent = newLang.code;
                langFlag.src = newLang.flag;
            });
        });
    });

    humburger.addEventListener('click', () => {
        spanMenu.classList.toggle('active');
    });

    function updateMenuPosition() {
        if (window.scrollY < 45) {
            spanMenu.style.top = '70px';
        } else {
            spanMenu.style.top = '0';
        }
    }

  
    window.addEventListener('scroll', updateMenuPosition);
    updateMenuPosition(); 
});