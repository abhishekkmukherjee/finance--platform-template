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
    const serviceFeaturesGrid = document.querySelector('.service-features-grid');

    // Define the content for each tab
    const tabContents = {
        'Mutual Funds': [
            {
                icon: 'fa-chart-line',
                title: 'Equity Funds',
                description: 'Invest in stocks of companies with high growth potential.'
            },
            {
                icon: 'fa-shield-alt',
                title: 'Debt Funds',
                description: 'Stable returns through fixed income securities.'
            },
            {
                icon: 'fa-balance-scale',
                title: 'Hybrid Funds',
                description: 'Balanced mix of equity and debt investments.'
            },
            {
                icon: 'fa-globe',
                title: 'International Funds',
                description: 'Diversify globally with international markets.'
            },
            {
                icon: 'fa-coins',
                title: 'Sector Funds',
                description: 'Focus on specific industry sectors.'
            },
            {
                icon: 'fa-piggy-bank',
                title: 'Index Funds',
                description: 'Track market indices for passive investing.'
            }
        ],
        'Fixed Income': [
            {
                icon: 'fa-landmark',
                title: 'Government Bonds',
                description: 'Secure investments backed by government guarantees.'
            },
            {
                icon: 'fa-building',
                title: 'Corporate Bonds',
                description: 'Higher returns through corporate debt instruments.'
            },
            {
                icon: 'fa-percentage',
                title: 'Fixed Deposits',
                description: 'Guaranteed returns with flexible tenures.'
            }
        ],
        'Insurance': [
            {
                icon: 'fa-heart',
                title: 'Life Insurance',
                description: 'Protect your loved ones with comprehensive coverage.'
            },
            {
                icon: 'fa-hospital',
                title: 'Health Insurance',
                description: 'Safeguard your health with medical coverage.'
            },
            {
                icon: 'fa-home',
                title: 'Property Insurance',
                description: 'Protect your assets from unforeseen events.'
            }
        ],
        'Business': [
            {
                icon: 'fa-briefcase',
                title: 'Business Loans',
                description: 'Fuel your business growth with flexible financing.'
            },
            {
                icon: 'fa-chart-pie',
                title: 'Investment Advisory',
                description: 'Expert guidance for business investments.'
            },
            {
                icon: 'fa-handshake',
                title: 'Partnership Programs',
                description: 'Strategic partnerships for business expansion.'
            }
        ]
    };

    // Function to update the content
    function updateServiceContent(tabName) {
        const content = tabContents[tabName];
        serviceFeaturesGrid.innerHTML = '';

        content.forEach(item => {
            const featureItem = document.createElement('div');
            featureItem.className = 'service-feature-item';
            featureItem.innerHTML = `
                <div class="service-feature-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            `;
            serviceFeaturesGrid.appendChild(featureItem);
        });
    }

    // Add click event listeners to tab buttons
    serviceTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            serviceTabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update content
            updateServiceContent(button.textContent);
        });
    });

    // Initialize with first tab
    updateServiceContent('Mutual Funds');

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