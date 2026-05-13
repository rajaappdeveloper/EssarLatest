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
});
