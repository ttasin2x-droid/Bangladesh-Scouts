// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger Entrance Animation
            gsap.fromTo(".hero-element", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            );
        }, 500);
    }, 1200);
});

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// Reveal Sections
gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    gsap.fromTo(elem, 
        { autoAlpha: 0, y: 30 }, 
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", 
          scrollTrigger: { trigger: elem, start: "top 85%" } 
        }
    );
});

// Stagger Elements (Cards, Stats)
const staggerSections = ['.ios-widget', '.compact-card', '.branch-card', '.org-box', '.training-card', '.activity-item', '.award-box'];
staggerSections.forEach(selector => {
    gsap.utils.toArray(selector).forEach((elem, i) => {
        ScrollTrigger.create({
            trigger: elem,
            start: "top 90%",
            onEnter: () => gsap.fromTo(elem, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1 })
        });
    });
});

// Number Counter
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const inc = target / 50;
                if(count < target) {
                    count += inc;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
});
counters.forEach(c => counterObserver.observe(c));

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
    
    // Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
});
