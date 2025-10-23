/*==================== NAVIGATION MENU ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== PORTFOLIO FILTERS ====================*/
const portfolioFilters = document.querySelectorAll('.portfolio__filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

function filterPortfolio() {
    const filterValue = this.getAttribute('data-filter');
    
    // Remove active class from all filters
    portfolioFilters.forEach(filter => {
        filter.classList.remove('active');
    });
    
    // Add active class to clicked filter
    this.classList.add('active');
    
    // Show/hide portfolio items
    portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', filterPortfolio);
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic form validation
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Phone validation (Brazilian format)
        const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5})-?(\d{4})$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('Por favor, insira um telefone válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server
        console.log('Form data:', data);
    });
}

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="notification__icon ${getNotificationIcon(type)}"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease forwards;
        transform: translateX(100%);
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fas fa-check-circle';
        case 'error':
            return 'fas fa-exclamation-circle';
        default:
            return 'fas fa-info-circle';
    }
}

/*==================== SCROLL ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.services__card, .about__feature, .portfolio__item, .contact__card, .home__stat'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

/*==================== TYPING EFFECT ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to the main title
document.addEventListener('DOMContentLoaded', () => {
    const titleElement = document.querySelector('.home__title');
    if (titleElement) {
        const originalText = titleElement.innerHTML;
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            titleElement.style.opacity = '1';
            typeWriter(titleElement, originalText, 50);
        }, 500);
    }
});

/*==================== COUNTER ANIMATION ====================*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent.replace('+', ''));
            animateCounter(counter, target, 2000);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.home__stat h3');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

/*==================== PARALLAX EFFECT ====================*/
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const parallaxElements = document.querySelectorAll('.home__img');
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

/*==================== LOADING ANIMATION ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
    
    // Add loading styles
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Hide loading after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
});

/*==================== WHATSAPP FLOATING BUTTON ====================*/
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5511999999999?text=Olá! Gostaria de solicitar um orçamento para serviços de limpeza.';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    
    whatsappBtn.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 100px;
        right: 1rem;
        background-color: #25d366;
        color: white;
        border-radius: 50%;
        text-align: center;
        font-size: 1.5rem;
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        text-decoration: none;
    `;
    
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.transform = 'scale(1.1)';
        whatsappBtn.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.6)';
    });
    
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
    });
    
    document.body.appendChild(whatsappBtn);
}

// Create WhatsApp button on page load
document.addEventListener('DOMContentLoaded', createWhatsAppButton);

/*==================== THEME TOGGLE ====================*/
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 1rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        z-index: 99;
        transition: all 0.3s ease;
        transform: translateY(-50%);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(themeToggle);
}

// Create theme toggle on page load
document.addEventListener('DOMContentLoaded', createThemeToggle);

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollHeader, 10));
window.addEventListener('scroll', debounce(scrollUp, 10));
window.addEventListener('scroll', debounce(scrollActive, 10));

/*==================== FORM ENHANCEMENTS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.contact__input');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input.value)) {
                    input.style.borderColor = 'var(--second-color)';
                } else {
                    input.style.borderColor = '#ef4444';
                }
            }
            
            if (input.type === 'tel') {
                const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5})-?(\d{4})$/;
                if (phoneRegex.test(input.value)) {
                    input.style.borderColor = 'var(--second-color)';
                } else {
                    input.style.borderColor = '#ef4444';
                }
            }
        });
    });
});

/*==================== ADD DYNAMIC STYLES ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        }
        
        .notification__close:hover {
            opacity: 1;
        }
        
        .loading-spinner {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .dark-theme {
            --title-color: #f9fafb;
            --text-color: #d1d5db;
            --text-color-light: #9ca3af;
            --body-color: #111827;
            --container-color: #1f2937;
            --border-color: #374151;
            --shadow-color: rgba(0, 0, 0, 0.3);
        }
        
        .dark-theme .header {
            background-color: rgba(17, 24, 39, 0.95);
        }
        
        .dark-theme .nav__menu {
            background-color: rgba(17, 24, 39, 0.95);
        }
        
        .dark-theme .services__card,
        .dark-theme .contact__form,
        .dark-theme .contact__card {
            background-color: var(--container-color);
            border-color: var(--border-color);
        }
    `;
    
    document.head.appendChild(style);
});