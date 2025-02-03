
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.program-card, .feature-box, .gallery-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.nav-overlay');

// Add this function to check current page
function isAuthPage() {
    return window.location.pathname.includes('/auth/');
}



// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});