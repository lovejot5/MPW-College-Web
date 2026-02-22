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

const newsList = document.getElementById("newsList");
const newsGlass = document.getElementById("newsGlass");
let startY = 0;

// ===== FETCH NEWS =====
fetch("news.json")
    .then(res => res.json())
    .then(data => {
        const now = new Date();

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
                        ${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </a>
            `;
            newsList.appendChild(li);
        });

        // duplicate for infinite loop
        newsList.innerHTML += newsList.innerHTML;
    });

// ===== PAUSE ON HOVER =====
newsGlass.addEventListener("mouseenter", () => newsGlass.classList.add("paused"));
newsGlass.addEventListener("mouseleave", () => newsGlass.classList.remove("paused"));

// ===== TOUCH / SWIPE SUPPORT =====
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
