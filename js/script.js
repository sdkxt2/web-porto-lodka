// DOM Elements
const filterButtons = document.querySelectorAll('.dropdown-content a');
const projectsGrid = document.querySelector('.projects-grid');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLines = document.querySelectorAll('.menu-line');
const projectPreview = document.querySelector('.project-preview');
const closePreview = document.querySelector('.close-preview');
const previewImage = document.querySelector('.preview-image img');
const previewTitle = document.querySelector('.preview-info h2');
const previewYear = document.querySelector('.preview-year');
const previewCategory = document.querySelector('.preview-category');
const menuLinks = document.querySelectorAll('.mobile-nav a');
const mobileNav = document.querySelector('.mobile-nav');
const contactForm = document.getElementById('contactForm');

// Constants
const categories = ['branding', 'web', 'print', 'photo'];
const years = ['2023', '2022', '2021'];
const titles = [
    'Brand Identity',
    'E-commerce Website',
    'Magazine Layout',
    'Product Photography',
    'Logo Design',
    'Mobile App',
    'Packaging Design',
    'Portrait Series',
    'Corporate Identity',
    'Web Application'
];

// Generate project items
function generateProjects() {
    for (let i = 0; i < 40; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const year = years[Math.floor(Math.random() * years.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.setAttribute('data-category', category);
        
        projectItem.innerHTML = `
            <div class="project-image">
                <img src="https://picsum.photos/800/1000?random=${i}" alt="${title}">
                <div class="project-info">
                    <h2>${title}</h2>
                    <p>${year}</p>
                    <span class="project-category">${category}</span>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectItem);
    }
}

// Filter functionality
function setupFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            
            // Update dropdown button text
            document.querySelector('.dropbtn').textContent = button.textContent;
            
            // Filter projects
            const projectItems = document.querySelectorAll('.project-item');
            projectItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('show');
                }
            });
        });
    });
}

// Scroll animation
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize hamburger menu
function initHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLines = document.querySelectorAll('.menu-line');
    const menuLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburgerMenu && menuOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
            
            // Animate menu lines
            menuLines.forEach((line, index) => {
                if (hamburgerMenu.classList.contains('active')) {
                    if (index === 0) {
                        line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        line.style.opacity = '0';
                    } else if (index === 2) {
                        line.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                    }
                } else {
                    line.style.transform = '';
                    line.style.opacity = '';
                }
            });
        });

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset menu lines
                menuLines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerMenu.contains(e.target) && !menuOverlay.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset menu lines
                menuLines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            }
        });
    }
}

// Team member navigation
const teamMembers = document.querySelectorAll('.team-member');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

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

// Contact form handling
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    generateProjects();
    setupFilter();
    setupScrollAnimation();
    initHamburgerMenu();
    setupProjectPreview();
    updateNavigation();
    initContactForm();
    initSmoothScroll();
}); 