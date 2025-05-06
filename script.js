// Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.add('active');
});

mobileMenuClose.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
});

// Animation on scroll
const animatedElements = document.querySelectorAll('.service-card, .about-image, .about-content, .offering-card, .about-image-container, .about-text-container');

const animateOnScroll = function() {
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check

// Service Tabs
const serviceTabs = document.querySelectorAll('.service-tab-button');
const serviceTabPanels = document.querySelectorAll('.service-tab-panel');

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        serviceTabs.forEach(tab => tab.classList.remove('active'));
        serviceTabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// Counter animation
const counterItems = document.querySelectorAll('.counter-value');

const startCounter = function() {
    counterItems.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps approx
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const counterPosition = counter.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (counterPosition < screenPosition) {
            updateCounter();
        }
    });
};

window.addEventListener('scroll', startCounter);
setTimeout(startCounter, 1000); // Start counters after a delay if they're visible on page load

// Testimonials auto-scroll (will be overridden if user scrolls)
const testimonialsSlider = document.querySelector('.testimonials-slider');
let isScrolling = false;

testimonialsSlider.addEventListener('scroll', () => {
    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 3000);
});

const autoScroll = () => {
    if (!isScrolling && testimonialsSlider) {
        testimonialsSlider.scrollBy({
            left: 1,
            behavior: 'smooth'
        });
    }
    requestAnimationFrame(autoScroll);
};

autoScroll();
});