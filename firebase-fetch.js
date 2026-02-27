import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWUHPPePrycgoXJjpIsg30oVuE7Y2ToOk",
  authDomain: "scout-website-33ef5.firebaseapp.com",
  projectId: "scout-website-33ef5",
  storageBucket: "scout-website-33ef5.firebasestorage.app",
  messagingSenderId: "674795288662",
  appId: "1:674795288662:web:80eb755ecaff69cf3fa3f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function applyDynamicData() {
    try {
        const docSnap = await getDoc(doc(db, "websiteData", "mainContent"));
        if (docSnap.exists()) {
            const d = docSnap.data();
            
            // Update Texts (Only replaces if Admin Panel has saved data)
            if(d.heroTitle && document.getElementById("dyn-hero-title")) document.getElementById("dyn-hero-title").innerText = d.heroTitle;
            if(d.heroSubtitle && document.getElementById("dyn-hero-subtitle")) document.getElementById("dyn-hero-subtitle").innerText = d.heroSubtitle;
            if(d.stat1 && document.getElementById("dyn-stat-1")) document.getElementById("dyn-stat-1").setAttribute('data-target', d.stat1);
            if(d.stat2 && document.getElementById("dyn-stat-2")) document.getElementById("dyn-stat-2").setAttribute('data-target', d.stat2);
            if(d.stat3 && document.getElementById("dyn-stat-3")) document.getElementById("dyn-stat-3").innerText = d.stat3;
            if(d.stat4 && document.getElementById("dyn-stat-4")) document.getElementById("dyn-stat-4").setAttribute('data-target', d.stat4);

            // Update Links
            if(d.linkFB && document.getElementById("dyn-link-fb")) document.getElementById("dyn-link-fb").href = d.linkFB;
            if(d.linkGroup && document.getElementById("dyn-link-group")) document.getElementById("dyn-link-group").href = d.linkGroup;
            if(d.linkBSID && document.getElementById("dyn-link-bsid")) document.getElementById("dyn-link-bsid").href = d.linkBSID;
            if(d.linkMOP && document.getElementById("dyn-link-mop")) document.getElementById("dyn-link-mop").href = d.linkMOP;
            if(d.linkTTL && document.getElementById("dyn-link-ttl")) document.getElementById("dyn-link-ttl").href = d.linkTTL;
        }
    } catch (e) {
        console.log("Using default HTML content (Firebase fetch skipped).");
    }
}

applyDynamicData();
