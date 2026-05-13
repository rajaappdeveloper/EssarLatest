// Corporate Azure - Main JS

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const backToTop = document.getElementById('backToTop');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            nav.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });

    // Back to Top Click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections and cards
    document.querySelectorAll('section, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// CSS for the dynamically added class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
