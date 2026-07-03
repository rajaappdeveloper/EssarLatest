// Immediate check for dark mode to prevent visual flash
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
})();

document.addEventListener('DOMContentLoaded', function () {

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

    window.addEventListener('scroll', function () {
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
        scrollTopBtn.addEventListener('click', function (e) {
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
            setTimeout(function () {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
                setTimeout(function () {
                    preloader.remove();
                }, 600);
            }, 600);
        } else {
            // First time load: Show brand-filled landing screen for exactly 2 seconds and mark visited
            sessionStorage.setItem('hasVisited', 'true');

            setTimeout(function () {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
                setTimeout(function () {
                    preloader.remove();
                }, 600);
            }, 2000);
        }
    }

    // Dark Theme Toggler Logic
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    if (themeToggleBtns.length > 0) {
        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                    updateToggleIcons('light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    updateToggleIcons('dark');
                }
            });
        });

        // Initialize toggle button icon
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateToggleIcons(activeTheme);
    }

    function updateToggleIcons(theme) {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                    btn.title = 'Switch to Light Mode';
                } else {
                    icon.className = 'fas fa-moon';
                    btn.title = 'Switch to Dark Mode';
                }
            }
        });
    }

    // Handle mobile sub-dropdown toggling
    const submenuToggles = document.querySelectorAll('.dropdown-submenu > .dropdown-toggle-submenu');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                const parent = this.parentElement;
                parent.classList.toggle('show');
            }
        });
    });

    // Dynamically adjust the timeline vertical track line
    function adjustTimelineLine() {
        const tracker = document.querySelector('.timeline-tracker');
        const trackLine = document.querySelector('.timeline-track-line');
        if (!tracker || !trackLine) return;

        const firstNode = tracker.querySelector('.timeline-step-1 .timeline-node');
        const lastNode = tracker.querySelector('.timeline-step-5 .timeline-node');
        if (!firstNode || !lastNode) return;

        const trackerRect = tracker.getBoundingClientRect();
        const firstRect = firstNode.getBoundingClientRect();
        const lastRect = lastNode.getBoundingClientRect();

        // Calculate offsets relative to the parent tracker container
        const topOffset = (firstRect.top + firstRect.height / 2) - trackerRect.top;
        const bottomOffset = (lastRect.top + lastRect.height / 2) - trackerRect.top;

        trackLine.style.top = `${topOffset}px`;
        trackLine.style.height = `${bottomOffset - topOffset}px`;
    }

    // Run the alignment calculations
    adjustTimelineLine();
    window.addEventListener('resize', adjustTimelineLine);
    window.addEventListener('load', adjustTimelineLine);

    // Automatically set active nav link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .dropdown-item');
    navLinks.forEach(link => {
        // Remove active class from all first (just in case they were hardcoded)
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
            
            // If it's inside a dropdown, also make the parent dropdown active
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const parentToggle = parentDropdown.querySelector('.nav-link.dropdown-toggle');
                if (parentToggle) parentToggle.classList.add('active');
            }
            
            // If it's a submenu, make parent submenu active
            const parentSubmenu = link.closest('.dropdown-submenu');
            if (parentSubmenu) {
                const submenuToggle = parentSubmenu.querySelector('.dropdown-toggle-submenu');
                if (submenuToggle) submenuToggle.classList.add('active');
            }
        }
    });

    // Automatically expand sidebar menu based on current URL
    const sidebarLinks = document.querySelectorAll('#sidebarAccordion a:not([data-bs-toggle="collapse"])');
    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.remove('text-muted');
            link.classList.add('active', 'fw-bold');
            
            // Expand parent collapse
            const parentCollapse = link.closest('.collapse');
            if (parentCollapse) {
                parentCollapse.classList.add('show');
                const toggleBtn = document.querySelector(`[href="#${parentCollapse.id}"]`);
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded', 'true');
                    const icon = toggleBtn.querySelector('.fa-chevron-down');
                    if (icon) {
                        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                    }
                }
            }
        }
    });

    // Handle chevron icon toggle on click for sidebar
    const collapses = document.querySelectorAll('#sidebarAccordion .collapse');
    collapses.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', function () {
            const toggleBtn = document.querySelector(`[href="#${this.id}"]`);
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('.fa-chevron-down');
                if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
        collapse.addEventListener('hide.bs.collapse', function () {
            const toggleBtn = document.querySelector(`[href="#${this.id}"]`);
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('.fa-chevron-up');
                if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });
});


// Lightbox functionality
let currentGalleryImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    const lightboxModalEl = document.getElementById('lightboxModal');
    if(lightboxModalEl) {
        const lightboxImg = document.getElementById('lightboxImage');
        
        // Add Next/Prev buttons if they don't exist
        const modalBody = lightboxModalEl.querySelector('.modal-body');
        if (!document.getElementById('lightboxPrev')) {
            modalBody.insertAdjacentHTML('beforeend', `
                <button id="lightboxPrev" class="lightbox-nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button id="lightboxNext" class="lightbox-nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            `);
        }
        
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        function updateLightboxImage() {
            if (currentGalleryImages.length > 0) {
                lightboxImg.src = currentGalleryImages[currentImageIndex].src;
                prevBtn.style.display = currentGalleryImages.length > 1 ? 'flex' : 'none';
                nextBtn.style.display = currentGalleryImages.length > 1 ? 'flex' : 'none';
            }
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentGalleryImages.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
                updateLightboxImage();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentGalleryImages.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
                updateLightboxImage();
            }
        });

        document.querySelectorAll('.gallery-container').forEach(container => {
            const images = Array.from(container.querySelectorAll('.gallery-main-img'));
            images.forEach((img, index) => {
                img.addEventListener('click', function() {
                    currentGalleryImages = images;
                    currentImageIndex = index;
                    updateLightboxImage();
                    const modal = new bootstrap.Modal(lightboxModalEl);
                    modal.show();
                });
            });
        });

        document.querySelectorAll('.single-gallery-img').forEach(img => {
            img.addEventListener('click', function() {
                currentGalleryImages = [img];
                currentImageIndex = 0;
                updateLightboxImage();
                const modal = new bootstrap.Modal(lightboxModalEl);
                modal.show();
            });
        });
    }
});
