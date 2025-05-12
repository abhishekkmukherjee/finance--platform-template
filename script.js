// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Handle mobile dropdowns
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a:not(.mobile-dropdown a)');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Service Tab Functionality
    const serviceTabButtons = document.querySelectorAll('.service-tab-button');
    serviceTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            serviceTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Animation on scroll
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateOnScroll() {
        const elements = document.querySelectorAll('.advantage-card, .dashboard-image, .testimonial-card');
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.style.animation = 'fadeUp 1s forwards';
                element.classList.add('animated');
            }
        });
    }

    // Initial check on load
    window.addEventListener('load', animateOnScroll);
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    function checkCounterVisibility() {
        const counters = document.querySelectorAll('.counter-value');
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
                animateCounter(counter);
                counter.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkCounterVisibility);
    window.addEventListener('load', checkCounterVisibility);

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        testimonialSlider.classList.add('active');
        startX = e.pageX - testimonialSlider.offsetLeft;
        scrollLeft = testimonialSlider.scrollLeft;
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        isDown = false;
        testimonialSlider.classList.remove('active');
    });

    testimonialSlider.addEventListener('mouseup', () => {
        isDown = false;
        testimonialSlider.classList.remove('active');
    });

    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialSlider.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll testimonials
    let scrollInterval;
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            testimonialSlider.scrollLeft += 1;
            if (testimonialSlider.scrollLeft >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                testimonialSlider.scrollLeft = 0;
            }
        }, 30);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
    testimonialSlider.addEventListener('mouseleave', startAutoScroll);
    startAutoScroll();
});