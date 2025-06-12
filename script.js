/* ============================================
 * =              CONFIGURATION                 =
 * ============================================ */
tailwind.config = {
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'bounce-gentle': 'bounceGentle 2s infinite',
                'blink': 'blink 0.75s step-end infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                blink: {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: '#2c3e50' }
                }
            }
        }
    }
}

/* ============================================
 * =        NAVIGATION MOBILE                 =
 * ============================================ */
// Menu mobile toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fas fa-bars text-xl';
    } else {
        menuIcon.className = 'fas fa-times text-xl';
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fas fa-bars text-xl';
    });
});

/* ============================================
 * =        DÉFILEMENT FLUIDE                =
 * ============================================ */
// Gestion du défilement fluide
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
 * =        BOUTON RETOUR EN HAUT           =
 * ============================================ */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ============================================
 * =     MISE EN SURBRILLANCE NAVIGATION     =
 * ============================================ */
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('bg-blue-500', 'text-white');
                link.classList.add('text-slate-600');
            });

            // Add active class to current section's nav link
            const activeLinks = document.querySelectorAll(`[href="#${entry.target.id}"]`);
            activeLinks.forEach(link => {
                link.classList.add('bg-blue-500', 'text-white');
                link.classList.remove('text-slate-600');
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

/* ============================================
 * =        ANIMATION AU DÉFILEMENT          =
 * ============================================ */
// Fonction pour animer les éléments au défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Exécuter au chargement de la page

/* ============================================
 * =        ANIMATION TYPING                 =
 * ============================================ */
// Fonction pour l'animation typing
const typingAnimation = (text, element, speed = 100) => {
    let index = 0;
    element.textContent = '';

    const typeNextChar = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, speed);
        }
    };

    typeNextChar();
};

/* ============================================
 * =        INITIALISATION                   =
 * ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation AOS
    AOS.init({
        duration: 600, // Réduction de la durée pour mobile
        easing: 'ease-out',
        once: true,
        startEvent: 'DOMContentLoaded',
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Initialisation typing
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        typingAnimation('Bienvenue sur mon portfolio !', typingText);
    }

    // Gestion du redimensionnement
    window.addEventListener('resize', () => {
        AOS.refresh();
    });
});