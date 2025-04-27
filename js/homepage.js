// Homepage JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburgerMenu && menuOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !menuOverlay.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Initialize slider
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        let isDragging = false;
        let startPosition = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        sliderTrack.addEventListener('mousedown', dragStart);
        sliderTrack.addEventListener('touchstart', dragStart);
        sliderTrack.addEventListener('mouseup', dragEnd);
        sliderTrack.addEventListener('touchend', dragEnd);
        sliderTrack.addEventListener('mouseleave', dragEnd);
        sliderTrack.addEventListener('mousemove', drag);
        sliderTrack.addEventListener('touchmove', drag);

        function dragStart(e) {
            isDragging = true;
            startPosition = getPositionX(e);
            sliderTrack.style.cursor = 'grabbing';
        }

        function dragEnd() {
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
        }

        function drag(e) {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                currentTranslate = prevTranslate + currentPosition - startPosition;
                setSliderPosition();
            }
        }

        function getPositionX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        }

        function setSliderPosition() {
            sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
        }

        // Auto-slide functionality
        let slideInterval = setInterval(() => {
            if (!isDragging) {
                currentTranslate -= 1;
                if (currentTranslate <= -sliderTrack.scrollWidth / 2) {
                    currentTranslate = 0;
                }
                setSliderPosition();
            }
        }, 20);

        // Pause auto-slide on hover
        sliderTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (!isDragging) {
                    currentTranslate -= 1;
                    if (currentTranslate <= -sliderTrack.scrollWidth / 2) {
                        currentTranslate = 0;
                    }
                    setSliderPosition();
                }
            }, 20);
        });
    }
}); 