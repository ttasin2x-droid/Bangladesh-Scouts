// --- DATA RENDERING LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    // Render History
    const historyContainer = document.getElementById("history-container");
    if(historyContainer && typeof scoutData !== 'undefined') {
        let historyHTML = `<div class="timeline-line-bg"></div><div class="timeline-line-fill" id="animatedTimelineLine"></div>`;
        scoutData.history.forEach((item, index) => {
            let alignClass = item.align === "right" ? "timeline-content-right" : "timeline-content-left md:text-right";
            let nodeClass = item.isRed ? "node-red" : (item.isYellow ? "node-yellow" : "");
            let nodeStyle = item.isRed ? "background: var(--bangladesh-red); border-color: white; box-shadow: 0 0 15px rgba(244, 42, 65, 0.6);" : (item.isYellow ? "background: #eab308; border-color: white; box-shadow: 0 0 15px rgba(234, 179, 8, 0.6);" : "");
            let borderClass = item.align === "right" ? "border-l-4" : "border-r-4";
            let colorClass = item.isRed ? "border-red-600 bg-red-50/50" : (item.isYellow ? "border-yellow-500 bg-yellow-50/50" : "border-green-600");
            let badgeBg = item.isRed ? "bg-red-100 text-red-700" : (item.isYellow ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-800");

            let leftDiv = item.align === "right" ? `<div class="hidden md:block"></div>` : `<div class="${alignClass}"><div class="glass-card-green timeline-card p-6 rounded-2xl ${borderClass} ${colorClass}"><span class="${badgeBg} font-bold text-lg px-3 py-1 rounded-lg shadow-sm inline-block mb-3">${item.year}</span><h3 class="text-xl font-bold mb-2 text-gray-900 font-display">${item.title}</h3><p class="text-gray-700 leading-relaxed text-sm font-medium">${item.desc}</p></div></div><div class="hidden md:block"></div>`;
            let rightDiv = item.align === "right" ? `<div class="${alignClass}"><div class="glass-card-green timeline-card p-6 rounded-2xl ${borderClass} ${colorClass}"><span class="${badgeBg} font-bold text-lg px-3 py-1 rounded-lg shadow-sm inline-block mb-3">${item.year}</span><h3 class="text-xl font-bold mb-2 text-gray-900 font-display">${item.title}</h3><p class="text-gray-700 leading-relaxed text-sm font-medium">${item.desc}</p></div></div>` : ``;

            historyHTML += `
            <div class="relative mb-20 timeline-row">
                <div class="timeline-node-green ${nodeClass} float-anim" style="top: 24px; ${nodeStyle}"></div>
                <div class="grid md:grid-cols-2 gap-10 items-center">
                    ${leftDiv}
                    ${rightDiv}
                </div>
            </div>`;
        });
        historyContainer.innerHTML = historyHTML;
    }

    // Render Branches
    const branchesContainer = document.getElementById("branches-container");
    if(branchesContainer && typeof scoutData !== 'undefined') {
        let branchesHTML = "";
        scoutData.branches.forEach(item => {
            branchesHTML += `
            <div class="glass-card-green p-6 rounded-2xl text-center gsap-stagger shadow-md group">
                <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-${item.color}-100 shadow-md">
                    <img src="${item.img}" loading="lazy" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1 font-display">${item.name}</h3>
                <p class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-${item.color}-500 to-${item.color}-700 mb-2 tracking-tight">${item.age}</p>
                <p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p>
            </div>`;
        });
        branchesContainer.innerHTML = branchesHTML;
    }

    // Render Specialized
    const specializedContainer = document.getElementById("specialized-container");
    if(specializedContainer && typeof scoutData !== 'undefined') {
        let specHTML = "";
        scoutData.specialized.forEach(item => {
            specHTML += `
            <div class="glass-card-green p-5 rounded-2xl text-center gsap-stagger shadow-md group">
                <div class="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-${item.color}-200 shadow-sm">
                    <img src="${item.img}" loading="lazy" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-1 font-display">${item.name}</h4>
                <p class="text-gray-600 text-xs font-medium px-2">${item.desc}</p>
            </div>`;
        });
        specializedContainer.innerHTML = specHTML;
    }

    // Render Org Summary
    const orgContainer = document.getElementById("org-summary-container");
    if(orgContainer && typeof scoutData !== 'undefined') {
        let orgHTML = "";
        scoutData.orgSummary.forEach(item => {
            orgHTML += `
            <div class="glass-card-green p-6 rounded-2xl gsap-stagger hover:bg-white transition-colors group shadow-sm">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-${item.colorFrom} to-${item.colorTo} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0 group-hover:scale-105 transition-transform">${item.num}</div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1 font-display">${item.title}</h3>
                        <p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p>
                    </div>
                </div>
            </div>`;
        });
        orgContainer.innerHTML = orgHTML;
    }

    // Render Training Centers
    const trainingContainer = document.getElementById("training-container");
    if(trainingContainer && typeof scoutData !== 'undefined') {
        let trainHTML = "";
        scoutData.training.forEach(item => {
            trainHTML += `
            <div class="glass-card-green rounded-2xl text-center gsap-stagger shadow-md overflow-hidden group hover:shadow-xl transition-all">
                <div class="h-48 w-full overflow-hidden relative">
                    <img src="${item.img}" loading="lazy" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2 font-display">${item.name}</h3>
                    <p class="text-${item.color}-700 font-bold mb-2 text-xs bg-${item.color}-100 inline-block px-3 py-1 rounded-full">${item.location}</p>
                    <p class="text-gray-700 text-sm font-medium mt-1">${item.desc}</p>
                </div>
            </div>`;
        });
        trainingContainer.innerHTML = trainHTML;
    }

    // Render Activities
    const actContainer = document.getElementById("activities-container");
    if(actContainer && typeof scoutData !== 'undefined') {
        let actHTML = "";
        scoutData.activities.forEach(item => {
            actHTML += `
            <div class="activity-card gsap-stagger group">
                <div class="h-40 overflow-hidden relative">
                    <img src="${item.img}" loading="lazy" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    <div class="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </div>
                <div class="p-6 bg-[#f8fafc]">
                    <span class="text-[11px] font-bold text-${item.color}-700 bg-${item.color}-100 px-2 py-1 rounded mb-2 inline-block">${item.badge}</span>
                    <h3 class="text-lg font-bold text-gray-900 mb-2 font-display">${item.name}</h3>
                    <p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p>
                </div>
            </div>`;
        });
        actContainer.innerHTML = actHTML;
    }

    // Render Global Initiatives
    const globalContainer = document.getElementById("global-container");
    if(globalContainer && typeof scoutData !== 'undefined') {
        globalContainer.innerHTML = `
        <div class="activity-card gsap-stagger group border border-blue-100 cursor-pointer" onclick="window.open('https://www.scout.org/messengers-of-peace', '_blank')">
            <div class="h-48 overflow-hidden relative">
                <img src="${scoutData.activities[0].img.replace('jota','mop')}" loading="lazy" alt="MoP" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-none">
                <div class="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>
            <div class="p-6 bg-white text-center">
                <span class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full mb-3 inline-block shadow-sm border border-blue-100">MoP গ্লোবাল নেটওয়ার্ক</span>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-display hover:text-blue-600 transition-colors">ম্যাসেঞ্জারস অফ পিস</h3>
                <p class="text-gray-700 text-sm font-medium leading-relaxed px-4">বিশ্বব্যাপী শান্তি, সম্প্রীতি ও ভ্রাতৃত্ববোধ রক্ষায় এবং সমাজে ইতিবাচক পরিবর্তন আনতে স্কাউটদের বিশেষ উদ্যোগ।</p>
            </div>
        </div>
        <div class="activity-card gsap-stagger group border border-green-100 cursor-pointer" onclick="window.open('https://sdgs.scout.org/', '_blank')">
            <div class="h-48 overflow-hidden relative">
                <img src="${scoutData.activities[0].img.replace('jota','ttl')}" loading="lazy" alt="TTL" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-none">
                <div class="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>
            <div class="p-6 bg-white text-center">
                <span class="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full mb-3 inline-block shadow-sm border border-green-100">এপিআর প্রজেক্ট</span>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-display hover:text-green-600 transition-colors">টিকিট টু লাইফ (TTL)</h3>
                <p class="text-gray-700 text-sm font-medium leading-relaxed px-4">পথশিশু ও সুবিধাবঞ্চিত শিশুদের স্কাউটিংয়ের মাধ্যমে শিক্ষা ও বৃত্তিমূলক প্রশিক্ষণ দিয়ে সমাজের মূলধারায় ফিরিয়ে আনা।</p>
            </div>
        </div>`;
    }

    // Render Awards
    const awardsContainer = document.getElementById("awards-container");
    if(awardsContainer && typeof scoutData !== 'undefined') {
        let awardHTML = "";
        scoutData.awards.forEach(item => {
            awardHTML += `
            <div class="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/10 gsap-stagger hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 shadow-xl group">
                <div class="shining-badge w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30" style="box-shadow: 0 0 20px ${item.shadowColor}">
                    <img src="${item.img}" loading="lazy" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                </div>
                <h3 class="text-lg font-bold mb-2 font-display text-white">${item.name}</h3>
                <p class="text-white/80 text-xs font-medium leading-relaxed">${item.desc}</p>
            </div>`;
        });
        awardsContainer.innerHTML = awardHTML;
    }

    // Render International
    const intContainer = document.getElementById("international-container");
    if(intContainer && typeof scoutData !== 'undefined') {
        let intHTML = "";
        scoutData.international.forEach(item => {
            intHTML += `
            <li class="relative flex items-center gap-4 group hover:-translate-y-1 transition-transform">
                <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0 z-10">✓</div>
                <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-50 flex-1">
                    <span class="font-bold text-gray-900 text-base">${item.year}</span>
                    <p class="text-gray-600 text-xs mt-0.5 font-medium">${item.desc}</p>
                </div>
            </li>`;
        });
        intContainer.innerHTML = intHTML;
    }

    // Render Future
    const futureContainer = document.getElementById("future-container");
    if(futureContainer && typeof scoutData !== 'undefined') {
        let futHTML = "";
        scoutData.future.forEach(item => {
            futHTML += `
            <div class="glass-card-green p-8 rounded-2xl hover:-translate-y-2 transition-transform shadow-md">
                <div class="text-5xl mb-4 float-anim bg-white w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-sm">${item.icon}</div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-display">${item.title}</h3>
                <p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p>
            </div>`;
        });
        futureContainer.innerHTML = futHTML;
    }

    // INITIALIZE ANIMATIONS AFTER RENDERING
    initCustomCursor();
    initGSAP();
});

// --- CORE SCRIPTS ---

function initCustomCursor() {
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
            setTimeout(type, 80);
        }
    }
    setTimeout(type, 500); 
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

// GSAP Animations
function initGSAP() {
    if(typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#animatedTimelineLine", { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-container", start: "top center", end: "bottom center", scrub: 1 } });

    gsap.utils.toArray('.timeline-node-green').forEach((node) => { 
        gsap.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)", scrollTrigger: { trigger: node, start: "top 75%", toggleActions: "play none none reverse", onEnter: () => node.classList.add('active-node'), onLeaveBack: () => node.classList.remove('active-node') } }); 
    });

    gsap.utils.toArray('.timeline-content-left').forEach((card) => { gsap.fromTo(card, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });
    gsap.utils.toArray('.timeline-content-right').forEach((card) => { gsap.fromTo(card, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }); });

    const sectionsToStagger = ['.stat-box', '#mulniti', '#shakha', '#poricalona', '#regions', '#proshikkhon', '#karyokram', '#sommanona', '#bhobisshot'];
    sectionsToStagger.forEach(sec => {
        gsap.fromTo(`${sec} .gsap-stagger`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)", scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none reverse" } });
    });

    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
        gsap.fromTo(elem, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none reverse" }});
    });

    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        const speed = bg.getAttribute('data-speed');
        gsap.to(bg, { y: () => (ScrollTrigger.maxScroll(window) * speed), ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }});
    });
}

// Horizontal Chart Scroll Animation
const scrollArea = document.getElementById('scrollArea');
const animElements = document.querySelectorAll('.anim-el');
function checkHorizontalScroll() {
    if(!scrollArea) return;
    const areaRect = scrollArea.getBoundingClientRect();
    const triggerPoint = areaRect.left + (areaRect.width * 0.85);
    animElements.forEach(el => {
        const elRect = el.getBoundingClientRect();
        if (elRect.left < triggerPoint) { el.classList.add('active'); } 
        else { el.classList.remove('active'); }
    });
}
if(scrollArea){
    scrollArea.addEventListener('scroll', checkHorizontalScroll);
    window.addEventListener('resize', checkHorizontalScroll);
    setTimeout(checkHorizontalScroll, 500);
}

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
