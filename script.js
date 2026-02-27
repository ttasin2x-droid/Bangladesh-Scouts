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

// Image Lightbox/Modal Function
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalImg.classList.remove('scale-95');
        modalImg.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.classList.add('opacity-0');
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalImg.src = '';
    }, 300);
}

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
        if(preloader){
            preloader.style.opacity = '0';
            setTimeout(() => { 
                preloader.style.display = 'none'; 
                triggerConfetti(); 
                initTypewriter(); 
                
                if (typeof gsap !== "undefined") {
                    gsap.fromTo(".hero-element", 
                        { y: 30, opacity: 0 }, 
                        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
                    );
                }
            }, 600);
        }
    }, 1000); 
});

function triggerConfetti() {
    if (typeof confetti === "undefined") return;
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

// GSAP Registration & Animation
setTimeout(() => {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
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
        const sectionsToStagger = ['.stat-box', '#mulniti', '#shakha', '#poricalona', '#regions', '#proshikkhon', '#karyokram', '#sommanona', '#bhobisshot', '#netritto', '#jamboree'];
        sectionsToStagger.forEach(sec => {
            gsap.fromTo(`${sec} .gsap-stagger`, 
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
    }
}, 500);

// Horizontal Chart Scroll Animation logic
const scrollArea = document.getElementById('scrollArea');
function checkHorizontalScroll() {
    const animElements = document.querySelectorAll('.anim-el');
    if(!scrollArea || animElements.length === 0) return;
    const areaRect = scrollArea.getBoundingClientRect();
    const triggerPoint = areaRect.left + (areaRect.width * 0.85);

    animElements.forEach(el => {
        const elRect = el.getBoundingClientRect();
        if (elRect.left < triggerPoint) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}
if(scrollArea){
    scrollArea.addEventListener('scroll', checkHorizontalScroll);
    window.addEventListener('resize', checkHorizontalScroll);
    setTimeout(checkHorizontalScroll, 800);
}

// Mobile Menu Fix
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if(mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.querySelectorAll('.mobile-link').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.remove('open')); });
}

// Scroll Events
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    const progress = document.getElementById('progressBar');
    if(progress) progress.style.width = ((winScroll / height) * 100) + '%';
    
    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        if (winScroll > 400) backToTop.classList.remove('opacity-0', 'pointer-events-none');
        else backToTop.classList.add('opacity-0', 'pointer-events-none');
    }
    
    const navbar = document.getElementById('navbar');
    if(navbar) {
        if (winScroll > 30) { navbar.classList.add('shadow-md', 'bg-white/95'); }
        else { navbar.classList.remove('shadow-md', 'bg-white/95'); }
    }
});

const backToTopBtn = document.getElementById('backToTop');
if(backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ==========================================
// NUMBER COUNTERS (BENGALI CONVERTER ADDED)
// ==========================================

// Function: Convert English Numbers to Bengali
function toBengaliNum(num) {
    const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
    return num.toString().replace(/[0-9]/g, x => banglaDigits[x]);
}

// Function: Convert Bengali Numbers to English (so JS can do math)
function toEnglishNum(str) {
    if(!str) return "0";
    const engDigits = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
    return str.toString().replace(/[০-৯]/g, x => engDigits[x]);
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const targetStr = counter.getAttribute('data-target');
            
            // Convert to english first for mathematical calculation
            const target = parseFloat(toEnglishNum(targetStr));
            if(isNaN(target)) return;

            const increment = target / 40; 
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) { 
                    // Show animation counting in Bengali!
                    counter.innerText = toBengaliNum(Math.ceil(current)); 
                    requestAnimationFrame(updateCounter); 
                } 
                else { 
                    // Set final value in Bengali!
                    counter.innerText = toBengaliNum(target); 
                }
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
