/* ================= MOBILE MENU ================= */
function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.toggle("show");
    btn.classList.toggle("active");

    // remove focus (blue flash fix)
    btn.blur();
}

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
    const menu = document.getElementById("menu");
    const btn = document.querySelector(".menu-btn");

    if (!menu || !btn) return;

    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("show");
        btn.classList.remove("active");
    }
});

/* ================= NEWS SCROLLER ================= */
document.addEventListener("DOMContentLoaded", () => {

    const newsList = document.getElementById("newsList");
    const newsGlass = document.getElementById("newsGlass");
    let startY = 0;

    if (!newsList || !newsGlass) return;

    /* ===== FETCH NEWS (CORRECT PATH) ===== */
    fetch("data/news.json")
        .then(res => {
            if (!res.ok) throw new Error("news.json not found");
            return res.json();
        })
        .then(data => {
            const now = new Date();
            newsList.innerHTML = "";

            data.forEach(item => {
                const date = new Date(item.date);
                const diffDays = (now - date) / (1000 * 60 * 60 * 24);
                const isNew = diffDays <= 7;

                const li = document.createElement("li");
                li.className = "news-item";

                li.innerHTML = `
                    <a href="${item.url}">
                        <div class="news-title">
                            ${item.title}
                            ${isNew ? '<span class="badge-new">NEW</span>' : ''}
                        </div>
                        <div class="news-meta">
                            ${date.toDateString()}
                        </div>
                    </a>
                `;

                newsList.appendChild(li);
            });

            /* Duplicate list for infinite scroll */
            newsList.innerHTML += newsList.innerHTML;
        })
        .catch(err => {
            console.error(err);
            newsList.innerHTML = `
                <li class="news-item">
                    <div class="news-title">No news available</div>
                </li>
            `;
        });

    /* ===== PAUSE ON HOVER ===== */
    newsGlass.addEventListener("mouseenter", () =>
        newsGlass.classList.add("paused")
    );

    newsGlass.addEventListener("mouseleave", () =>
        newsGlass.classList.remove("paused")
    );

    /* ===== TOUCH SUPPORT ===== */
    newsGlass.addEventListener("touchstart", e => {
        startY = e.touches[0].clientY;
        newsGlass.classList.add("paused");
    });

    newsGlass.addEventListener("touchend", e => {
        const endY = e.changedTouches[0].clientY;
        if (Math.abs(endY - startY) < 30) {
            newsGlass.classList.remove("paused");
        }
    });

});
