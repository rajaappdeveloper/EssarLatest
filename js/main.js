// Immediate check for dark mode to prevent visual flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Bootstrap Carousel with specific options
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover',
            wrap: true
        });
    }

    // Scroll to Top Button Logic
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('d-none');
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.classList.add('d-none');
                }
            }, 300);
        }
        
        // Sticky Navbar subtle shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // Smooth scroll for scroll-to-top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Re-trigger CSS animations on carousel slide
    if (heroCarousel) {
        heroCarousel.addEventListener('slide.bs.carousel', function () {
            const activeElements = document.querySelectorAll('.hero-slide.active .fade-in-up');
            activeElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null; 
            });
        });
    }

    // Preloader Logic: Full logo landing screen for first visit, clean circular spinner for navigations
    const preloader = document.getElementById('landing-preloader');
    if (preloader) {
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited === 'true') {
            // Subsequent load within session: transform to simple circular spinner
            const activeTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
            if (activeTheme === 'dark') {
                preloader.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            } else {
                preloader.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }
            
            preloader.innerHTML = `
                <div class="preloader-content text-center">
                    <div class="nav-spinner"></div>
                </div>
            `;
            
            // Fast loading fade out (600ms spinner)
            setTimeout(function() {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
                setTimeout(function() {
                    preloader.remove();
                }, 600);
            }, 600);
        } else {
            // First time load: Show brand-filled landing screen for exactly 2 seconds and mark visited
            sessionStorage.setItem('hasVisited', 'true');
            
            setTimeout(function() {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
                setTimeout(function() {
                    preloader.remove();
                }, 600);
            }, 2000);
        }
    }

    // Dark Theme Toggler Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateToggleIcon('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcon('dark');
            }
        });

        // Initialize toggle button icon
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateToggleIcon(activeTheme);
    }

    function updateToggleIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
                themeToggleBtn.title = 'Switch to Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                themeToggleBtn.title = 'Switch to Dark Mode';
            }
        }
    }
});
