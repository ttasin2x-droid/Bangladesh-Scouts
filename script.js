// Custom Cursor Logic (Performance optimized)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if(window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        cursorOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 200, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .cursor-none').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(0, 106, 78, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// Preloader & Intro Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => { 
            preloader.style.display = 'none'; 
            
            gsap.fromTo(".hero-element", 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power1.out", force3D: true }
            );
        }, 500);
    }, 500); 
});

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Timeline Animations
gsap.to("#animatedTimelineLine", { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: true } });

gsap.utils.toArray('.timeline-node-green').forEach((node) => { 
    gsap.fromTo(node, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, 
          scrollTrigger: { 
              trigger: node, start: "top 80%", toggleActions: "play none none reverse",
              onEnter: () => node.classList.add('active-node'),
              onLeaveBack: () => node.classList.remove('active-node')
          } 
        }
    ); 
});

gsap.utils.toArray('.history-card').forEach((card) => { 
    gsap.fromTo(card, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power1.out", force3D: true, scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); 
});

// Stagger Sections
const sectionsToStagger = ['#mulniti', '#shakha', '#poricalona', '#proshikkhon', '#karyokram', '#sommanona'];
sectionsToStagger.forEach(sec => {
    gsap.fromTo(`${sec} .gsap-stagger`, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, force3D: true, scrollTrigger: { trigger: sec, start: "top 85%", toggleActions: "play none none reverse" } }
    );
});

// Reveal Elements
gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    gsap.fromTo(elem, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.5, force3D: true, scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none reverse" }});
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.remove('open')); });

// Scroll Events (Progress Bar, Nav Shadow)
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('progressBar').style.width = ((winScroll / height) * 100) + '%';
    
    const navbar = document.getElementById('navbar');
    if (winScroll > 30) { navbar.classList.add('shadow-md'); }
    else { navbar.classList.remove('shadow-md'); }
});

// Smooth Number Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 30; 
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) { counter.innerText = Math.ceil(current); requestAnimationFrame(updateCounter); } 
                else { counter.innerText = target; }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
