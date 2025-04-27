// Sample product data
const products = [
    {
        id: 1,
        title: "Mobile App Platform",
        description: "A comprehensive platform for building and managing mobile applications",
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80",
        category: "apps",
        tags: ["Mobile", "iOS", "Android"]
    },
    {
        id: 2,
        title: "E-commerce Solution",
        description: "Complete e-commerce platform with advanced features and analytics",
        image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&auto=format&fit=crop&q=80",
        category: "web",
        tags: ["Web", "E-commerce", "Analytics"]
    },
    {
        id: 3,
        title: "Project Management Tool",
        description: "Streamline your workflow with our intuitive project management solution",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        category: "tools",
        tags: ["Productivity", "Management", "Collaboration"]
    },
    {
        id: 4,
        title: "Social Media Dashboard",
        description: "Monitor and manage all your social media accounts in one place",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=80",
        category: "web",
        tags: ["Social Media", "Analytics", "Dashboard"]
    },
    {
        id: 5,
        title: "Fitness Tracking App",
        description: "Track your fitness journey with our comprehensive mobile app",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
        category: "apps",
        tags: ["Fitness", "Health", "Mobile"]
    },
    {
        id: 6,
        title: "AI Analytics Platform",
        description: "Leverage artificial intelligence for advanced data analysis",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        category: "tools",
        tags: ["AI", "Analytics", "Data Science"]
    }
];

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="product-item" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
                </div>
                <button class="buy-btn" data-product-id="${product.id}">View Details</button>
            </div>
        </div>
    `;
}

// Function to render products
function renderProducts(category = 'all') {
    const container = document.querySelector('.products-container');
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    container.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Function to handle category filtering
function setupCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and render products
            const category = button.dataset.category;
            renderProducts(category);
        });
    });
}

// Product Detail Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('productDetailPopup');
    const closeBtn = document.querySelector('.close-popup');
    const productsContainer = document.querySelector('.products-container');

    // Function to open popup
    function openPopup(productData) {
        const popupImage = popup.querySelector('.popup-image img');
        const popupTitle = popup.querySelector('.popup-info h2');
        const popupDescription = popup.querySelector('.popup-description');
        const popupTags = popup.querySelector('.popup-tags');

        // Set popup content
        popupImage.src = productData.image;
        popupImage.alt = productData.title;
        popupTitle.textContent = productData.title;
        popupDescription.textContent = productData.description;
        
        // Clear existing tags
        popupTags.innerHTML = '';
        
        // Add new tags
        productData.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'popup-tag';
            tagElement.textContent = tag;
            popupTags.appendChild(tagElement);
        });

        // Show popup
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Function to close popup
    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Close popup when clicking close button
    closeBtn.addEventListener('click', closePopup);

    // Close popup when clicking outside the content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Handle buy button clicks using event delegation
    productsContainer.addEventListener('click', function(e) {
        const buyBtn = e.target.closest('.buy-btn');
        if (buyBtn) {
            const productId = parseInt(buyBtn.dataset.productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                openPopup(product);
            }
        }
    });

    // Handle contact button clicks in popup
    const contactBtn = popup.querySelector('.contact-btn');
    contactBtn.addEventListener('click', function() {
        window.location.href = 'contact.html';
    });

    // Handle buy now button clicks in popup
    const buyNowBtn = popup.querySelector('.buy-btn');
    buyNowBtn.addEventListener('click', function() {
        // Add your purchase logic here
        alert('Purchase functionality coming soon!');
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Render initial products
    renderProducts();
    
    // Setup category filtering
    setupCategoryFilter();
}); 