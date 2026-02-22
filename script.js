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


/* ================= NEWS AUTO + MANUAL SCROLL ================= */
document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("newsList");
    const container = document.getElementById("newsGlass");

    if (!list || !container) return;

    /* Load news */
    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {

            list.innerHTML = "";

            data.forEach(item => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <a href="${item.url}">
                        <div class="news-title">
                            ${item.title}
                            ${item.isNew ? '<span class="badge-new">NEW</span>' : ''}
                        </div>
                        <div class="news-meta">
                            ${new Date(item.date).toDateString()}
                        </div>
                    </a>
                `;

                list.appendChild(li);
            });
        })
        .catch(() => {
            list.innerHTML = `
                <li>
                    <div class="news-title">No news available</div>
                </li>
            `;
        });

    /* Auto scroll logic */
    let autoScrollInterval = null;
    let userInteracting = false;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (userInteracting) return;

            container.scrollTop += 1;

            if (
                container.scrollTop + container.clientHeight >=
                container.scrollHeight - 2
            ) {
                container.scrollTop = 0;
            }
        }, 40); // smooth & slow
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    /* Pause on interaction */
    container.addEventListener("mouseenter", () => {
        userInteracting = true;
    });

    container.addEventListener("mouseleave", () => {
        userInteracting = false;
    });

    container.addEventListener("touchstart", () => {
        userInteracting = true;
    });

    container.addEventListener("touchend", () => {
        userInteracting = false;
    });

    startAutoScroll();
});
