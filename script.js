// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden'; // Ensure it's hidden
        setTimeout(() => {
            preloader.style.display = 'none';
            triggerConfetti();
        }, 600);
    }, 1500);
});

function triggerConfetti() {
    // Check if confetti library is loaded
    if (typeof confetti === 'undefined') return;

    const duration = 3000;
    const end = Date.now() + duration;
    
    const colors = ['#006A4E', '#F42A41', '#FFD700', '#ffffff'];
    
    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// WebGL Background
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x006A4E,
        transparent: true,
        opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        
        // Optimized mouse interaction to prevent indefinite acceleration
        particlesMesh.rotation.y += mouseX * 0.01; 
        particlesMesh.rotation.x += mouseY * 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        if(window.innerWidth > 0 && window.innerHeight > 0) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
}

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Added small delay for smooth outline following
    setTimeout(() => {
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
    }, 50);
});

document.querySelectorAll('a, button, .glass-card, .activity-card, .award-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    // Cross-browser scroll calculation
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if(progressBar) progressBar.style.width = scrolled + '%';
    
    // Navbar
    const navbar = document.getElementById('navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Timeline progress
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate how much of the section has been scrolled past
            const totalHeight = rect.height;
            const scrolledPast = windowHeight - rect.top;
            // Start progress when section enters, end when bottom leaves (roughly)
            let progress = (scrolledPast / (totalHeight + windowHeight)) * 100;
            
            // Clamp between 0 and 100
            progress = Math.min(100, Math.max(0, progress));
            
            document.getElementById('timelineProgress').style.height = progress + '%';
        }
    }
});

// Reveal on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Counter animation
            if (entry.target.querySelector('.counter')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    // Only animate if not already animated
                    if (counter.classList.contains('animated')) return;
                    counter.classList.add('animated');

                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const start = 0;
                    const startTime = performance.now();
                    
                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Ease-out easing function
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        
                        const current = Math.floor(start + (target - start) * easeOut);
                        counter.innerText = current.toLocaleString('bn-BD');
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString('bn-BD');
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                });
            }
            // Stop observing once revealed (optional)
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('active');
}

if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
if(closeMenu) closeMenu.addEventListener('click', toggleMenu);
if(overlay) overlay.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// Back to Top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 3D Card Tilt Effect - BUG FIX: smoother movement
document.querySelectorAll('.card-3d').forEach(card => {
    const inner = card.querySelector('.card-3d-inner');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Reduced rotation intensity for smoother feel
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        // Directly set style, CSS hover transition removed in style block
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0) rotateY(0)';
    });
});
