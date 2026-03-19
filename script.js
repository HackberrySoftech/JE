// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hello, I'm ${name}.%0A%0A` +
            `Phone: ${phone}%0A` +
            `Email: ${email}%0A%0A` +
            `Message: ${message}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappNumber = '91XXXXXXXXXX'; // Replace with actual number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Option 1: Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Option 2: Show success message (you can customize this)
        alert('Thank you for your message! We will contact you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Replace placeholder phone numbers and WhatsApp numbers
// Update these with actual contact details
function updateContactInfo() {
    const phoneNumber = '+91XXXXXXXXXX'; // Replace with actual phone number
    const whatsappNumber = '91XXXXXXXXXX'; // Replace with actual WhatsApp number
    
    // Update all phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.setAttribute('href', `tel:${phoneNumber}`);
    });
    
    // Update all WhatsApp links
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.setAttribute('href', `https://wa.me/${whatsappNumber}`);
    });
    
    // Update phone number display
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        if (link.textContent.includes('XXXXXXXXXX')) {
            link.textContent = phoneNumber;
        }
    });
}

// Call this function when page loads (update with actual numbers)
// updateContactInfo();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Counter animation for statistics (if you add stats section later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, product cards, etc.
document.querySelectorAll('.service-card, .product-card, .feature-box, .testimonial-card').forEach(el => {
    observer.observe(el);
});

