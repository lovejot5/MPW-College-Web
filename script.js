function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    const btn = document.getElementById("menuBtn");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
        btn.innerHTML = "☰";   // hamburger
    } else {
        menu.style.display = "flex";
        btn.innerHTML = "✕";   // cross
    }
}
