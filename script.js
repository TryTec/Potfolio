
// Utility to set text content for elements with data-lang-kh
function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-kh]');
    elements.forEach(el => {
        const text = el.getAttribute('data-lang-' + lang);
        if (text !== null) {
            // replace placeholder title element content where appropriate
            if (el.tagName.toLowerCase() === 'title') {
                document.title = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // update HTML lang attribute for accessibility and screen readers
    document.documentElement.lang = (lang === 'kh') ? 'km' : 'en';
    // save preference
    try { localStorage.setItem('siteLanguage', lang); } catch (e) { }
}

// Initialize language from localStorage or page default
(function initLanguage() {
    let lang = 'kh'; // default to Khmer
    try {
        const saved = localStorage.getItem('siteLanguage');
        if (saved === 'en' || saved === 'kh') lang = saved;
    } catch (e) { }
    applyLanguage(lang);
})();

// Go to top button behavior
const btn = document.getElementById('gotop');
window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Ensure dynamic title is also set initially (if present)
// If <title> has data-lang attributes, apply them
const titleEl = document.querySelector('title');
if (titleEl && titleEl.hasAttribute('data-lang-kh')) {
    const saved = (function () { try { return localStorage.getItem('siteLanguage'); } catch (e) { return null; } })() || 'kh';
    const t = titleEl.getAttribute('data-lang-' + saved);
    if (t) document.title = t;
}

(function () {
    const BTN = document.getElementById('lang-toggle-btn');
    const LABEL = document.getElementById('lang-label');
    const FLAG = document.getElementById('lang-flag');
    const STORAGE_KEY = 'siteLanguage';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-lang-kh]').forEach(el => {
            const text = el.getAttribute('data-lang-' + lang);
            if (text !== null) {
                if (el.tagName.toLowerCase() === 'title') {
                    document.title = text;
                } else {
                    el.textContent = text;
                }
            }
        });
        document.documentElement.lang = (lang === 'kh') ? 'km' : 'en';
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { }
        // update toggle appearance and ARIA
        if (lang === 'en') {
            BTN.classList.add('switch-en');
            BTN.setAttribute('aria-pressed', 'true');
            LABEL.textContent = 'ភាសាខ្មែរ';
            FLAG.src = 'images/kh.svg';
        } else {
            BTN.classList.remove('switch-en');
            BTN.setAttribute('aria-pressed', 'false');
            LABEL.textContent = 'English';
            FLAG.src = 'images/en.svg';
        }
    }

    function toggleLanguage() {
        const current = (function () { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } })() || 'kh';
        const next = current === 'kh' ? 'en' : 'kh';
        applyLanguage(next);
    }

    // Initialize from storage or default to Khmer
    (function init() {
        let lang = 'kh';
        try { const saved = localStorage.getItem(STORAGE_KEY); if (saved === 'en' || saved === 'kh') lang = saved; } catch (e) { }
        applyLanguage(lang);
    })();

    // Click and keyboard support
    BTN.addEventListener('click', toggleLanguage);
    BTN.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLanguage(); } });
})();