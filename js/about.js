// About Page JavaScript
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

    // Team member navigation
    const teamMembers = document.querySelectorAll('.team-member');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    if (teamMembers.length && prevBtn && nextBtn) {
        function updateNavigation() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === teamMembers.length - 1;
        }

        function showTeamMember(index) {
            teamMembers.forEach(member => member.classList.remove('active'));
            teamMembers[index].classList.add('active');
            currentIndex = index;
            updateNavigation();
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                showTeamMember(currentIndex - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < teamMembers.length - 1) {
                showTeamMember(currentIndex + 1);
            }
        });

        updateNavigation();
    }

    // Scroll animation for team members
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const teamMemberElements = document.querySelectorAll('.team-member-modern');
    teamMemberElements.forEach(member => {
        observer.observe(member);
    });
}); 