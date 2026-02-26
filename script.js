// Custom Cursor Logic
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
    }, { duration: 300, fill: "forwards" });
});

document.querySelectorAll('a, button, .cursor-pointer, .hero-badge').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(0, 106, 78, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Typewriter Function 
function initTypewriter() {
    const text = "সেবাই আমাদের ব্রত, আত্মোৎসর্গ আমাদের দীক্ষা";
    const element = document.getElementById("typewriter-text");
    if(!element) return;
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 80); // Speed of typing
        }
    }
    setTimeout(type, 500); // Delay before starting
}

// Preloader & Confetti
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => { 
            preloader.style.display = 'none'; 
            triggerConfetti(); 
            initTypewriter(); 
            
            gsap.fromTo(".hero-element", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
            );
        }, 600);
    }, 1000); 
});

function triggerConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { return clearInterval(interval); }
      var particleCount = 40 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#006A4E', '#F42A41', '#ffffff', '#eab308'] }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#006A4E', '#F42A41', '#ffffff', '#eab308'] }));
    }, 250);
}

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Timeline Animations
gsap.to("#animatedTimelineLine", { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: 1 } });

gsap.utils.toArray('.timeline-node-green').forEach((node) => { 
    gsap.fromTo(node, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)", 
          scrollTrigger: { 
              trigger: node, start: "top 75%", toggleActions: "play none none reverse",
              onEnter: () => node.classList.add('active-node'),
              onLeaveBack: () => node.classList.remove('active-node')
          } 
        }
    ); 
});

gsap.utils.toArray('.timeline-content-left').forEach((card) => { gsap.fromTo(card, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });
gsap.utils.toArray('.timeline-content-right').forEach((card) => { gsap.fromTo(card, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });

// Stagger Sections
const sectionsToStagger = ['.stat-box', '#mulniti', '#shakha', '#poricalona', '#proshikkhon', '#karyokram', '#sommanona', '#bhobisshot'];
sectionsToStagger.forEach(sec => {
    gsap.fromTo(`${sec}.gsap-stagger, ${sec} .gsap-stagger`, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)", scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none reverse" } }
    );
});

// Reveal Elements
gsap.utils.toArray('.gsap-reveal').forEach(elem => {
    gsap.fromTo(elem, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none reverse" }});
});

// Parallax Background
gsap.utils.toArray('.parallax-bg').forEach(bg => {
    const speed = bg.getAttribute('data-speed');
    gsap.to(bg, { y: () => (ScrollTrigger.maxScroll(window) * speed), ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }});
});

// Mobile Menu Fix
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.remove('open')); });

// Scroll Events
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('progressBar').style.width = ((winScroll / height) * 100) + '%';
    
    const backToTop = document.getElementById('backToTop');
    if (winScroll > 400) backToTop.classList.remove('opacity-0', 'pointer-events-none');
    else backToTop.classList.add('opacity-0', 'pointer-events-none');
    
    const navbar = document.getElementById('navbar');
    if (winScroll > 30) { navbar.classList.add('shadow-md', 'bg-white/95'); }
    else { navbar.classList.remove('shadow-md', 'bg-white/95'); }
});

document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Number Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 40; 
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
}, { threshold: 0.3 });
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
