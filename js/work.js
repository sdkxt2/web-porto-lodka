// Work Page JavaScript
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

    // Project data
    const projects = [
        {
            title: 'Brand Identity',
            year: '2023',
            category: 'branding',
            image: 'https://picsum.photos/800/1000?random=1'
        },
        {
            title: 'E-commerce Website',
            year: '2023',
            category: 'web',
            image: 'https://picsum.photos/800/1000?random=2'
        },
        {
            title: 'Magazine Layout',
            year: '2022',
            category: 'print',
            image: 'https://picsum.photos/800/1000?random=3'
        },
        {
            title: 'Product Photography',
            year: '2022',
            category: 'photo',
            image: 'https://picsum.photos/800/1000?random=4'
        },
        {
            title: 'Logo Design',
            year: '2021',
            category: 'branding',
            image: 'https://picsum.photos/800/1000?random=5'
        },
        {
            title: 'Mobile App',
            year: '2021',
            category: 'web',
            image: 'https://picsum.photos/800/1000?random=6'
        }
    ];

    // Generate project items
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = '';
        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.setAttribute('data-category', project.category);
            
            projectItem.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-info">
                        <h2>${project.title}</h2>
                        <p>${project.year}</p>
                        <span class="project-category">${project.category}</span>
                    </div>
                </div>
            `;
            
            projectItem.addEventListener('click', () => showProjectPreview(project));
            projectsGrid.appendChild(projectItem);
        });
    }

    // Dropdown functionality
    const filterBtn = document.getElementById('filterBtn');
    const filterOptions = document.getElementById('filterOptions');

    if (filterBtn && filterOptions) {
        // Toggle dropdown
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            filterOptions.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            filterOptions.classList.remove('show');
        });

        // Filter functionality
        const filterLinks = filterOptions.querySelectorAll('a');
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Update button text
                filterBtn.innerHTML = `${this.textContent} <span class="arrow">▼</span>`;
                
                // Close dropdown
                filterOptions.classList.remove('show');
                
                // Filter projects
                const projects = document.querySelectorAll('.project-item');
                projects.forEach(project => {
                    if (category === 'all' || project.getAttribute('data-category') === category) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // Project preview functionality
    const projectPreview = document.querySelector('.project-preview');
    const closePreview = document.querySelector('.close-preview');
    const previewImage = document.querySelector('.preview-image img');
    const previewTitle = document.querySelector('.preview-info h2');
    const previewYear = document.querySelector('.preview-year');
    const previewCategory = document.querySelector('.preview-category');

    if (projectPreview && closePreview) {
        closePreview.addEventListener('click', () => {
            projectPreview.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close preview when clicking outside
        projectPreview.addEventListener('click', (e) => {
            if (e.target === projectPreview) {
                projectPreview.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    function showProjectPreview(project) {
        if (!projectPreview || !previewImage || !previewTitle || !previewYear || !previewCategory) return;
        
        previewImage.src = project.image;
        previewImage.alt = project.title;
        previewTitle.textContent = project.title;
        previewYear.textContent = project.year;
        previewCategory.textContent = project.category;
        
        projectPreview.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Scroll animation
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
}); 