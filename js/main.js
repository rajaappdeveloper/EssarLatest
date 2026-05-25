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
            pause: false,
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
    
    // Re-trigger CSS animations on carousel slide and handle SVG dissolve background
    if (heroCarousel) {
        const carouselImages = [
            'images/home/onsite-construction-fabrication.jpg',
            'images/home/onsite-erection.jpg',
            'images/home/clean-room-ducting-revamp-welding.jpg'
        ];
        
        heroCarousel.addEventListener('slide.bs.carousel', function (e) {
            // Text animation reflow
            const activeElements = document.querySelectorAll('.hero-slide.active .fade-in-up');
            activeElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null; 
            });
            
            // SVG Dissolve animation
            const fromIndex = e.from;
            const toIndex = e.to;
            
            const overlayImg = document.getElementById('svg-overlay');
            const underlayImg = document.getElementById('svg-underlay');
            const slopeEl = document.getElementById('dissolve-slope');
            
            if (overlayImg && underlayImg && slopeEl) {
                // Set the outgoing image as the overlay
                overlayImg.setAttribute('href', carouselImages[fromIndex]);
                // Set the incoming image as the underlay
                underlayImg.setAttribute('href', carouselImages[toIndex]);
                
                // Animate slope from 5 to 0
                let startTime = null;
                const duration = 800; // ms duration of dissolve
                
                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    
                    const currentSlope = 5 - (progress * 5); 
                    slopeEl.setAttribute('slope', currentSlope);
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        // Reset to solid state with the new slide as overlay
                        overlayImg.setAttribute('href', carouselImages[toIndex]);
                        slopeEl.setAttribute('slope', 5);
                        
                        // Prep underlay with the next logical slide
                        const nextIndex = (toIndex + 1) % carouselImages.length;
                        underlayImg.setAttribute('href', carouselImages[nextIndex]);
                    }
                }
                requestAnimationFrame(step);
            }
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
