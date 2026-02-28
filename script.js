async function loadDynamicContent() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    } finally {
        initSiteAnimations();
    }
}

function renderData(data) {
    const historyContainer = document.getElementById('dynamic-history');
    if (historyContainer && data.history) {
        historyContainer.innerHTML = data.history.map((item, index) => {
            const isLast = index === data.history.length - 1;
            const contentCard = `
                <div class="glass-card-green timeline-card p-6 rounded-2xl ${item.align === 'left' ? 'border-r-4' : 'border-l-4'} ${item.borderClass} ${item.bgClass}">
                    <span class="${item.textClass} font-bold text-lg ${item.spanBg} px-3 py-1 rounded-lg shadow-sm inline-block mb-2">${item.year}</span>
                    <h3 class="text-xl font-bold mb-2 text-gray-900 font-display">${item.title}</h3>
                    <p class="text-gray-700 leading-relaxed text-sm font-medium">${item.desc}</p>
                </div>
            `;
            return `
                <div class="relative ${!isLast ? 'mb-16' : ''} timeline-row">
                    <div class="timeline-node-green ${item.nodeClass} ${item.anim}" style="${item.nodeStyle}"></div>
                    <div class="grid md:grid-cols-2 gap-10 items-center">
                        ${item.align === 'left' ? `
                            <div class="md:text-right timeline-content-left">${contentCard}</div>
                            <div class="hidden md:block"></div>
                        ` : `
                            <div class="hidden md:block"></div>
                            <div class="timeline-content-right">${contentCard}</div>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }

    const leadersContainer = document.getElementById('dynamic-leaders');
    if (leadersContainer && data.leaders) {
        leadersContainer.innerHTML = data.leaders.map(item => `
            <div class="glass-card-green p-6 rounded-2xl gsap-stagger shadow-md border-t-4 ${item.borderColor}-600 group flex flex-col items-center text-center hover:-translate-y-2 transition-transform ${item.colSpan || ''} ${item.specialBg || ''}">
                <div class="${item.largeImg ? 'w-32 h-32 md:w-40 md:h-40' : 'w-28 h-28 md:w-32 md:h-32'} mb-4 rounded-full overflow-hidden border-4 ${item.borderColor}-100 shadow-md bg-white">
                    <img src="${item.img}" loading="lazy" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-none">
                </div>
                <span class="text-sm md:text-base font-bold ${item.textColor}-700 bg-${item.textColor.replace('text-','')}-50 px-4 py-1.5 rounded-full mb-3 border ${item.borderColor}-100 shadow-sm">${item.year}</span>
                <h3 class="${item.largeImg ? 'text-xl md:text-2xl' : 'text-lg'} font-bold text-gray-900 mb-1 font-display">${item.name}</h3>
                <p class="text-sm ${item.textColor}-600 font-bold mb-2">${item.role}</p>
                <p class="${item.largeImg ? 'text-gray-700 text-sm md:text-base px-4' : 'text-gray-600 text-xs px-2'} font-medium leading-relaxed">${item.desc}</p>
            </div>
        `).join('');
    }

    const branchesContainer = document.getElementById('dynamic-branches');
    if (branchesContainer && data.branches) {
        branchesContainer.innerHTML = data.branches.map(item => `
            <div class="glass-card-green p-6 rounded-2xl text-center gsap-stagger shadow-md group">
                <div class="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 ${item.borderColor} shadow-md">
                    <img src="${item.img}" loading="lazy" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1 font-display">${item.name}</h3>
                <p class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-${item.color}-500 to-${item.color}-700 mb-2 tracking-tight">${item.age}</p>
                <p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p>
            </div>
        `).join('');
    }

    const jamboreesContainer = document.getElementById('dynamic-jamborees');
    if (jamboreesContainer && data.jamborees) {
        jamboreesContainer.innerHTML = data.jamborees.map(item => `
            <tr class="border-b border-gray-100 hover:bg-green-50 transition-colors ${item.bgClass}">
                <td class="py-4 px-6 font-bold text-gray-900 ${item.numClass || ''}">${item.num}</td>
                <td class="py-4 px-6">${item.date}</td>
                <td class="py-4 px-6">${item.loc}</td>
                <td class="py-4 px-6 ${item.specialClass}">${item.special}</td>
            </tr>
        `).join('');
    }

    const renderActivityCard = (item) => `
        <div class="activity-card gsap-stagger group">
            <div class="h-40 overflow-hidden relative cursor-pointer" onclick="openModal('${item.img}')">
                <img src="${item.img}" loading="lazy" alt="${item.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-none">
                <div class="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 pointer-events-none">
                    <span class="bg-white/90 text-green-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg> বড় করুন</span>
                </div>
            </div>
            <div class="p-6 bg-white"><span class="text-[11px] font-bold text-${item.tagColor}-700 bg-${item.tagColor}-100 px-2 py-1 rounded mb-2 inline-block">${item.tag}</span><h3 class="text-lg font-bold text-gray-900 mb-2 font-display">${item.title}</h3><p class="text-gray-700 text-sm font-medium leading-relaxed">${item.desc}</p></div>
        </div>
    `;

    const activitiesTopContainer = document.getElementById('dynamic-activities-top');
    if (activitiesTopContainer && data.activitiesTop) {
        activitiesTopContainer.innerHTML = data.activitiesTop.map(renderActivityCard).join('');
    }
    
    const activitiesBottomContainer = document.getElementById('dynamic-activities-bottom');
    if (activitiesBottomContainer && data.activitiesBottom) {
        activitiesBottomContainer.innerHTML = data.activitiesBottom.map(renderActivityCard).join('');
    }
}

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    if(cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }
    if(cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 300, fill: "forwards" });
    }
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .cursor-pointer, .hero-badge')) {
        if(cursorOutline) {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(0, 106, 78, 0.1)';
        }
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .cursor-pointer, .hero-badge')) {
        if(cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        }
    }
});

function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if(!modal || !modalImg) return;
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
    if(!modal || !modalImg) return;
    
    modal.classList.add('opacity-0');
    modalImg.classList.remove('scale-100');
    modalImg.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalImg.src = '';
    }, 300);
}

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

function initSiteAnimations() {
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
    }, 500);

    setTimeout(() => {
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

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

            const sectionsToStagger = ['.stat-box', '#mulniti', '#shakha', '#poricalona', '#regions', '#proshikkhon', '#karyokram', '#sommanona', '#bhobisshot', '#netritto', '#jamboree'];
            sectionsToStagger.forEach(sec => {
                const el = document.querySelector(sec);
                if(el && el.querySelectorAll('.gsap-stagger').length > 0) {
                    gsap.fromTo(`${sec} .gsap-stagger`, 
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)", scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none reverse" } }
                    );
                }
            });

            gsap.utils.toArray('.gsap-reveal').forEach(elem => {
                gsap.fromTo(elem, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none reverse" }});
            });

            gsap.utils.toArray('.parallax-bg').forEach(bg => {
                const speed = bg.getAttribute('data-speed');
                gsap.to(bg, { y: () => (ScrollTrigger.maxScroll(window) * speed), ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }});
            });
        }
    }, 600); 
}

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

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if(mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.querySelectorAll('.mobile-link').forEach(link => { link.addEventListener('click', () => mobileMenu.classList.remove('open')); });
}

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

function toBengaliNum(num) {
    const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
    return num.toString().replace(/[0-9]/g, x => banglaDigits[x]);
}
function toEnglishNum(str) {
    if(!str) return "0";
    const engDigits = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'৭','৮':'৮','৯':'9'};
    return str.toString().replace(/[০-৯]/g, x => engDigits[x]);
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const targetStr = counter.getAttribute('data-target');
            
            const target = parseFloat(toEnglishNum(targetStr));
            if(isNaN(target)) return;

            const increment = target / 40; 
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) { 
                    counter.innerText = toBengaliNum(Math.ceil(current)); 
                    requestAnimationFrame(updateCounter); 
                } else { 
                    counter.innerText = toBengaliNum(target); 
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.3 });
counters.forEach(counter => counterObserver.observe(counter));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    loadDynamicContent(); // Load content on ready

    // Circular Scroll Progress Ring Logic
    const progressWrap = document.getElementById('progress-wrap');
    const progressPath = document.querySelector('.progress-circle path');
    let pathLength = 0;
    
    if (progressWrap && progressPath) {
        pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength;

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            // Calculate stroke offset
            const scrollPercentage = winScroll / height;
            const drawLength = pathLength * scrollPercentage;
            progressPath.style.strokeDashoffset = pathLength - drawLength;

            // Show/Hide button
            if (winScroll > 300) {
                progressWrap.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                progressWrap.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        progressWrap.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Interactive Map Tooltip Logic
    const hotspots = document.querySelectorAll('.region-hotspot');
    const tooltip = document.getElementById('map-tooltip');
    const tooltipName = document.getElementById('tooltip-name');
    const tooltipCount = document.getElementById('tooltip-count');

    if(hotspots.length > 0 && tooltip) {
        hotspots.forEach(spot => {
            spot.addEventListener('mouseenter', () => {
                const name = spot.getAttribute('data-name');
                const count = spot.getAttribute('data-count');
                
                tooltipName.textContent = name;
                tooltipCount.textContent = count;
                tooltip.classList.remove('hidden');
                
                // Position Tooltip dynamically
                const rect = spot.getBoundingClientRect();
                const containerRect = spot.parentElement.getBoundingClientRect();
                
                tooltip.style.left = `${rect.left - containerRect.left + (rect.width / 2)}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });
            
            spot.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });
        });
    }
});