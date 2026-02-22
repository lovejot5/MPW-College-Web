function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
    btn.classList.toggle("active");

    // REMOVE FOCUS AFTER CLICK (fix blue flash)
    btn.blur();
}

document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-btn");

    if (!menu || !btn) return;

    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
        btn.classList.remove("active");
    }
});

/* ================= LOAD NEWS ================= */
document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});

function loadNews() {
    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {
            const newsList = document.getElementById("newsList");
            if (!newsList) return;

            newsList.innerHTML = "";

            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.title;
                newsList.appendChild(li);
            });
        })
        .catch(err => console.error("News load error:", err));
}
