import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWUHPPePrycgoXJjpIsg30oVuE7Y2ToOk",
  authDomain: "scout-website-33ef5.firebaseapp.com",
  projectId: "scout-website-33ef5",
  storageBucket: "scout-website-33ef5.firebasestorage.app",
  messagingSenderId: "674795288662",
  appId: "1:674795288662:web:80eb755ecaff69cf3fa3f7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        loginSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        loadData();
    } else {
        loginSection.classList.remove("hidden");
        dashboardSection.classList.add("hidden");
    }
});

document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password).catch(() => {
        const err = document.getElementById("error-msg");
        err.innerText = "ভুল ইমেইল বা পাসওয়ার্ড!";
        err.classList.remove("hidden");
    });
});

document.getElementById("logout-btn").addEventListener("click", () => signOut(auth));

async function loadData() {
    const docSnap = await getDoc(doc(db, "websiteData", "mainContent"));
    if (docSnap.exists()) {
        const d = docSnap.data();
        if(d.heroTitle) document.getElementById("hero-title").value = d.heroTitle;
        if(d.heroSubtitle) document.getElementById("hero-subtitle").value = d.heroSubtitle;
        if(d.stat1) document.getElementById("stat-1").value = d.stat1;
        if(d.stat2) document.getElementById("stat-2").value = d.stat2;
        if(d.stat3) document.getElementById("stat-3").value = d.stat3;
        if(d.stat4) document.getElementById("stat-4").value = d.stat4;
        if(d.linkFB) document.getElementById("link-fb").value = d.linkFB;
        if(d.linkGroup) document.getElementById("link-group").value = d.linkGroup;
        if(d.linkBSID) document.getElementById("link-bsid").value = d.linkBSID;
        if(d.linkMOP) document.getElementById("link-mop").value = d.linkMOP;
        if(d.linkTTL) document.getElementById("link-ttl").value = d.linkTTL;
    }
}

document.getElementById("content-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("save-btn");
    btn.innerText = "সেভ হচ্ছে...";

    await setDoc(doc(db, "websiteData", "mainContent"), {
        heroTitle: document.getElementById("hero-title").value,
        heroSubtitle: document.getElementById("hero-subtitle").value,
        stat1: document.getElementById("stat-1").value,
        stat2: document.getElementById("stat-2").value,
        stat3: document.getElementById("stat-3").value,
        stat4: document.getElementById("stat-4").value,
        linkFB: document.getElementById("link-fb").value,
        linkGroup: document.getElementById("link-group").value,
        linkBSID: document.getElementById("link-bsid").value,
        linkMOP: document.getElementById("link-mop").value,
        linkTTL: document.getElementById("link-ttl").value,
    }, { merge: true });

    btn.innerText = "আপডেট করুন";
    document.getElementById("success-msg").classList.remove("hidden");
    setTimeout(() => document.getElementById("success-msg").classList.add("hidden"), 3000);
});
