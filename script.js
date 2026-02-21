/* ================= MOBILE MENU ================= */
function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
    btn.classList.toggle("active");
}

/* ================= LOAD NEWS (JSON) ================= */
document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});

function loadNews() {
    fetch("data/news.json")
        .then(response => response.json())
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
        .catch(error => {
            console.error("Error loading news:", error);
        });
}
