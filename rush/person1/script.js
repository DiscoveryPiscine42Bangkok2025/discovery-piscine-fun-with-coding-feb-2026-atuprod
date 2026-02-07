function getVisibleContactEl() {
    const desktop = document.getElementById("contact-desktop");
    const mobile = document.getElementById("contact-mobile");

    if (desktop && getComputedStyle(desktop).display !== "none") return desktop;
    if (mobile && getComputedStyle(mobile).display !== "none") return mobile;
    return desktop || mobile;
}

function getTargetEl(target) {
    if (target === "contact") return getVisibleContactEl();
    return document.getElementById(target);
}

function setActive(target) {
    document.querySelectorAll(".side-btn").forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`.side-btn[data-target="${target}"]`);
    if (btn) btn.classList.add("active");
}

document.querySelectorAll(".side-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        const el = getTargetEl(target);
        if (!el) return;

        btn.classList.add("pulse");
        setTimeout(() => btn.classList.remove("pulse"), 180);

        setActive(target);

        el.scrollIntoView({ behavior: "smooth", block: "start" });
        const card = el.classList.contains("card")
            ? el
            : el.querySelector(".info-card") || el.querySelector(".card");

        if (card) {
            card.classList.remove("pulse");
            void card.offsetWidth; 
            card.classList.add("pulse");
            setTimeout(() => card.classList.remove("pulse"), 320);
        }
    });
});

function observeSections() {
    const info = document.getElementById("info");
    const skills = document.getElementById("skills");
    const contact = getVisibleContactEl();

    const items = [
        { el: info, key: "info" },
        { el: skills, key: "skills" },
        { el: contact, key: "contact" },
    ].filter(x => x.el);

    const io = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const found = items.find(x => x.el === entry.target);
                if (found) setActive(found.key);
            }
        });
    }, { threshold: 0.35 });

    items.forEach(x => io.observe(x.el));
}

observeSections();

window.addEventListener("resize", () => {
    observeSections();
});
