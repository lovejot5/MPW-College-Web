function toggleMenu(btn) {
    const menu = document.getElementById("menu");

    menu.classList.toggle("show");
    btn.classList.toggle("active");
}

/* Close menu when clicking any nav link */
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu").classList.remove("show");
        document.getElementById("menuBtn").classList.remove("active");
    });
});

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const btn = document.getElementById("menuBtn");

    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
        btn.classList.remove("active");
    }
});
