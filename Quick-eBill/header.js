document.addEventListener("DOMContentLoaded", () => {
    let langButtons = document.querySelectorAll('.language-div'); // Both desktop & mobile language buttons
    let langChosenContainers = document.querySelectorAll('.lang-wrap-chosen'); // Dropdowns
    let humburger = document.querySelector('.hamburger-btn');
    let spanMenu = document.querySelector('.span-menu');

    // Toggle dropdown on button click
    langButtons.forEach((langButton, index) => {
        langButton.addEventListener('click', () => {
            langChosenContainers[index].classList.toggle('active');
            spanMenu.classList.remove('active');
        });
    });

    // Handle language selection for all dropdowns
    langChosenContainers.forEach(langChosen => {
        langChosen.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                let chosenText = button.querySelector('.wrapper-desc-text').textContent;
                let chosenFlag = button.querySelector('img').src;

                // Update all headers (both desktop & mobile)
                langButtons.forEach(langButton => {
                    let langText = langButton.querySelector('.wrapper-desc-text');
                    let langFlag = langButton.querySelector('img');

                    // Swap text & flag
                    let tempText = langText.textContent;
                    let tempFlag = langFlag.src;

                    langText.textContent = chosenText;
                    langFlag.src = chosenFlag;

                    // Update the dropdown button with previous language
                    button.querySelector('.wrapper-desc-text').textContent = tempText;
                    button.querySelector('img').src = tempFlag;
                });

                // Close all dropdowns
                langChosenContainers.forEach(container => container.classList.remove('active'));
            });
        });
    });

    humburger.addEventListener('click', () => {
        spanMenu.classList.toggle('active');
        langChosenContainers.forEach(item => {
            item.classList.remove('active');
        })
    });

    function updateMenuPosition() {
        if (window.scrollY < 45) {
            spanMenu.style.top = '70px';
        } else {
            spanMenu.style.top = '0';
        }
    }

    // Run on scroll and page load
    window.addEventListener('scroll', updateMenuPosition);
    updateMenuPosition(); // Initial check
});
