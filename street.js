// Import Vue.js createApp function for creating Vue application instance
const { createApp } = Vue;

// Create and configure Vue.js application
createApp({
    // DATA PROPERTIES - Reactive data that can change and trigger UI updates
    data() {
        return {
            // Navigation state management
            isScrolled: false,        // Track if user has scrolled past header threshold
            mobileMenuOpen: false,    // Control mobile hamburger menu visibility
            
            // Menu filtering system
            activeCategory: 'All',    // Currently selected menu category filter
            selectedItem: null,       // Store selected menu item for modal display
            
            // Form handling states
            isSubmitting: false,      // Track form submission state for loading indicator
            submitMessage: '',        // Store success/error messages after form submission
            
            // Contact form data object - two-way binding with form inputs
            form: {
                name: '',             // User's name input
                email: '',            // User's email input
                message: ''           // User's message input
            },
            // Screen size detection
            isMobile: false,
            // Menu category filter options
            categories: ['All', 'Asian', 'Mexican', 'Middle Eastern', 'Desserts'],
            
            // Menu items array with detailed information and real food images
            menuItems: [
                {
                    id: 1,                    // Unique identifier for Vue key binding
                    name: 'Noodles', // Display name
                    description: 'Authentic Thai stir-fried noodles with shrimp, tofu, and fresh herbs',
                    price: 12.99,             // Numerical price for calculations
                    category: 'Asian',       // Category for filtering
                    emoji: '🍜',              // Visual identifier
                    image: './img/1.png' // Real food photo
                },
                {
                    id: 2,
                    name: 'Fish Tacos',
                    description: 'Grilled fish with cabbage slaw and spicy mayo in soft tortillas',
                    price: 10.99,
                    category: 'Mexican',
                    emoji: '🌮',
                    image: './img/casey-lee-awj7sRviVXo-unsplash.jpg'
                },
                {
                    id: 3,
                    name: 'Falafel Wrap',
                    description: 'Crispy chickpea balls with tahini sauce and fresh vegetables',
                    price: 9.99,
                    category: 'Middle Eastern',
                    emoji: '🥙',
                    image: './img/anh-nguyen-kcA-c3f_3FE-unsplash.jpg'
                },
                {
                    id: 4,
                    name: 'BBQ Pulled Pork',
                    description: 'Slow-cooked pork with smoky BBQ sauce on a brioche bun',
                    price: 13.99,
                    category: 'American',
                    emoji: '🍖',
                    image: './img/7.jpg'
                },
                {
                    id: 5,
                    name: 'Baozi Dumplings',
                    description: 'Steamed Chinese buns filled with seasoned pork and vegetables',
                    price: 8.99,
                    category: 'Asian',
                    emoji: '🥟',
                    image: './img/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'
                },
                {
                    id: 6,
                    name: 'Elote Corn',
                    description: 'Mexican street corn with mayo, cotija cheese, and chili powder',
                    price: 6.99,
                    category: 'Mexican',
                    emoji: '🌽',
                    image: './img/bakd-raw-by-karolin-baitinger-KhfwDYdhmN8-unsplash.jpg'
                },
                {
                    id: 7,
                    name: 'Churros',
                    description: 'Crispy fried dough sticks dusted with cinnamon sugar',
                    price: 7.99,
                    category: 'Desserts',
                    emoji: '🍩',
                    image: './img/marcus-loke-8QRvzJGumSw-unsplash.jpg'
                },
                {
                    id: 8,
                    name: 'Korean Corn Dogs',
                    description: 'Mozzarella-filled hot dogs coated in crispy potato cubes',
                    price: 11.99,
                    category: 'Desserts',
                    emoji: '🌭',
                    image: 'img/tai-s-captures-JiRSy0GfqPA-unsplash.jpg' 
                },
                {
                    id: 9,
                    name: 'Korean Burger',
                    description: 'Mozzarella-filled hot dogs coated in crispy potato cubes',
                    price: 11.99,
                    category: 'Asian',
                    emoji: '🌭',
                    image: 'img/burger.png' 
                },
                {
                    id: 10,
                    name: 'Chocolate',
                    description: 'Mozzarella-filled hot dogs coated in crispy potato cubes',
                    price: 11.99,
                    category: 'Middle Eastern',
                    emoji: '🌭',
                    image: 'img/sittinat-thurdnampetch-5QrDbTtWd84-unsplash.jpg' 
                }
            ], 
            image:{
                    width: '20px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                 }
        }
    },
    
    // COMPUTED PROPERTIES - Derived data that updates automatically when dependencies change
    computed: {
        // Show different categories based on screen size
        displayedCategories() {
            if (this.isMobile) {
                return ['All', 'Asian', 'Mexican', 'Desserts'];
            }
            return this.categories;
        },
        // Filter menu items based on selected category
        filteredMenuItems() {
            // If 'All' is selected, return complete menu array
            if (this.activeCategory === 'All') {
                if (this.isMobile) {
                    // On mobile, "All" shows only Asian, Mexican, and Desserts
                    return this.menuItems.filter(item => 
                        ['Asian', 'Mexican', 'Desserts'].includes(item.category)
                    );
                }
                return this.menuItems;
            }
            // Otherwise, filter items matching the selected category
            return this.menuItems.filter(item => item.category === this.activeCategory);
        }
    },
    
    // METHODS - Functions that handle user interactions and component logic
    methods: {
        // Toggle mobile navigation menu visibility
        toggleMobileMenu() {
            // Flip boolean state to show/hide mobile menu
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        
        buyItem(item) {
            if (confirm(`Do you want to buy: ${item.name} for GHC${item.price}?`)) {
                // client clicked OK
                this.selectedItem = null;  // close modal
                alert(`✅ ${item.name} purchased successfully!`);
                // 👉 here you can also add to cart or process order
            } else {
                // client clicked Cancel
                alert("❌ Purchase cancelled.");
            }
        },
        
        // Smooth scroll to specific page sections
        scrollTo(elementId) {
            // Close mobile menu when navigation link is clicked
            this.mobileMenuOpen = false;
            
            // Find the target element by ID
            const element = document.getElementById(elementId);
            
            if (element) {
                // Account for fixed header height when calculating scroll position
                const headerHeight = 80;
                const elementPosition = element.offsetTop - headerHeight;
                
                // Smooth scroll to calculated position
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'  // CSS smooth scrolling animation
                });
            }
        },
        
        // Check if screen is mobile size
        checkScreenSize() {
            this.isMobile = window.innerWidth <= 425;
        },
        
        // Update active category filter for menu
        filterMenu(category) {
            // Set the active category - triggers computed property update
            this.activeCategory = category;
        },
        
        // Open modal with selected menu item details
        selectMenuItem(item) {
            // Store selected item data for modal display
            this.selectedItem = item;
        },
        
        // Handle contact form submission
        async submitForm() {
            // Set loading state to show spinner and disable form
            this.isSubmitting = true;
            this.submitMessage = '';
            
            // Simulate API call with 2-second delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Reset loading state and show success message
            this.isSubmitting = false;
            this.submitMessage = 'Thank you! Your message has been sent successfully.';
            
            // Clear form inputs after successful submission
            this.form = {
                name: '',
                email: '',
                message: ''
            };
        },
        
        // Handle window scroll events for header styling
        handleScroll() {
            // Update scroll state based on vertical scroll position
            this.isScrolled = window.scrollY > 100;
        }
    },
    
    // LIFECYCLE HOOK - Runs after component is mounted to DOM
    mounted() {
        // Add scroll event listener for header background changes
        window.addEventListener('scroll', this.handleScroll);
        
        // Set up smooth scrolling for all anchor links on the page
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor link behavior
                
                // Extract target section ID from href attribute
                const target = anchor.getAttribute('href').substring(1);
                this.scrollTo(target); // Use our custom smooth scroll method
            });
        });

        // Set up Intersection Observer for scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Add fade-in animation class when element enters viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        
        // Observe all menu items for scroll animations
        document.querySelectorAll('.menu-item').forEach(item => {
            observer.observe(item);
        });
        
        // Check initial screen size and add resize listener
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);
    },
    
    // CLEANUP LIFECYCLE HOOK - Runs before component is destroyed
    beforeUnmount() {
        // Remove event listeners to prevent memory leaks
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkScreenSize);
    }

}).mount('#app'); // Mount Vue application to element with ID 'app'

//for the about 
// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50; // Duration control
    let current = 0;
    
    element.classList.add('animate-counter');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Intersection Observer for triggering animation when in view
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Stats section is now visible!'); // Debug log

            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    console.log('Animating counter:', counter.getAttribute('data-target')); // Debug log
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

// Scroll event listener as backup
function checkScrollPosition() {
    const statsContainer = document.querySelector('.stats-container');
    const aboutSection = document.querySelector('#about, .about-section, [id*="about"]'); // Multiple selectors for about section
    
    if (statsContainer && !statsContainer.classList.contains('animation-triggered')) {
        const rect = statsContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if element is in view (top of element is above bottom 70% of viewport)
        if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
            console.log('Stats container in view via scroll!'); // Debug log
            
            statsContainer.classList.add('animation-triggered');
            const counters = statsContainer.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            });
        }
    }
}

// Start observing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
         console.log('Stats container found, setting up observer...'); // Debug log
        observer.observe(statsContainer);
        window.addEventListener('scroll', checkScrollPosition);
        setTimeout(checkScrollPosition, 100);
    } else {
        console.error('Stats container not found! Make sure the element exists.'); // Debug log
    }
    
    // Reset animation if user scrolls away and back (optional)
    function resetCountersOnScrollUp() {
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            const rect = statsContainer.getBoundingClientRect();
            
            // If stats container is completely above viewport, reset for re-animation
            if (rect.bottom < 0) {
                const counters = statsContainer.querySelectorAll('.counter');
                counters.forEach(counter => {
                    counter.classList.remove('animated');
                    counter.textContent = '0'; // Reset to 0
                });
                statsContainer.classList.remove('animation-triggered');
            }
        }
    }

    // Add hover effects to images
    const images = document.querySelectorAll('.img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Optional: Trigger animation immediately if you prefer
// setTimeout(() => {
//     document.querySelectorAll('.counter').forEach(animateCounter);
// }, 500);

// for the contact us 
// Form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');
const btnText = document.querySelector('.btn-text');

// Form state
let isSubmitting = false;

// Form submission handler
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Start loading state
    setLoadingState(true);
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simulate form submission (replace with actual API call)
    try {
        await simulateFormSubmission(data);
        showSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        showErrorMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
        setLoadingState(false);
    }
});

// Set loading state
function setLoadingState(loading) {
    isSubmitting = loading;
    submitBtn.disabled = loading;
    
    if (loading) {
        btnText.innerHTML = '<span class="loading"></span>Sending...';
    } else {
        btnText.innerHTML = 'Send Message';
    }
}

// Show success message
function showSuccessMessage(message) {
    responseMessage.className = 'success-message show';
    responseMessage.textContent = message;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        responseMessage.classList.remove('show');
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    responseMessage.className = 'error-message show';
    responseMessage.textContent = message;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        responseMessage.classList.remove('show');
    }, 5000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log('Form submitted:', data);
                resolve();
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// Input animations
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Smooth scroll to contact section (if needed)
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add floating animation to contact info items
const contactInfoItems = document.querySelectorAll('.contact-info p');
contactInfoItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

//getting back to the home page 
function goToHome() {
    // Option 1: Scroll to top of current page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Option 2: Navigate to home page (uncomment if you want this instead)
    // window.location.href = '/';
    // or window.location.href = 'index.html';
}

window.addEventListener('load', function() {
    // Simulate loading time (you can adjust this)
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        const mainContent = document.getElementById('mainContent');
        
        // Hide preloader
        preloader.classList.add('hidden');
        
        // Show main content
        setTimeout(function() {
            mainContent.classList.add('loaded');
        }, 100);
        
        // Remove preloader from DOM after animation
        setTimeout(function() {
            preloader.remove();
        }, 600);
        
    }, 2000); // 2 seconds loading time - adjust as needed
});

// Additional smooth interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your navigation logic here
            alert('Explore feature coming soon!');
        });
    }
});