/* ================= MOBILE MENU ================= */
function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.toggle("show");
    btn.classList.toggle("active");

    // remove blue focus flash on mobile
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

/* ================= LATEST NEWS (AUTO + MANUAL SCROLL) ================= */
document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("newsList");
    const container = document.querySelector(".latest-news-container");

    if (!list || !container) return;

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

    /* Auto scroll */
    let autoScroll = null;
    let userInteracting = false;

    function startAutoScroll() {
        autoScroll = setInterval(() => {
            if (userInteracting) return;

            container.scrollTop += 1;

            if (
                container.scrollTop + container.clientHeight >=
                container.scrollHeight - 2
            ) {
                container.scrollTop = 0;
            }
        }, 40);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    /* Pause on user interaction */
    container.addEventListener("mouseenter", () => userInteracting = true);
    container.addEventListener("mouseleave", () => userInteracting = false);

    container.addEventListener("touchstart", () => userInteracting = true);
    container.addEventListener("touchend", () => userInteracting = false);

    startAutoScroll();
});

/* ================= NOTICE PAGINATION ================= */
document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("noticeContainer");
    if (!container) return;

    fetch("data/notices.json")
        .then(res => res.json())
        .then(data => {

            let index = 0;

            function renderNotice() {
                const n = data[index];

                container.innerHTML = `
                    <div class="notice-card">

                        <div class="notice-header">
                            <img src="${n.author.icon}" alt="author">
                            <div>
                                <strong>${n.author.name}</strong><br>
                                <span>${new Date(n.date).toDateString()}</span>
                            </div>
                            ${n.isNew ? '<span class="badge-new">NEW</span>' : ''}
                        </div>

                        <h3>${n.title}</h3>
                        <p>${n.description}</p>

                        ${n.images && n.images.length ? `
                            <div class="notice-images">
                                ${n.images.map(img => `<img src="${img}" alt="">`).join("")}
                            </div>
                        ` : ""}

                        ${n.buttons && n.buttons.length ? `
                            <div class="notice-actions">
                                ${n.buttons.map(b =>
                                    `<a href="${b.url}" target="_blank">${b.text}</a>`
                                ).join("")}
                            </div>
                        ` : ""}

                        <div class="notice-pagination">
                            <button id="prev" ${index === 0 ? "disabled" : ""}>Previous</button>
                            <span>${index + 1} / ${data.length}</span>
                            <button id="next" ${index === data.length - 1 ? "disabled" : ""}>Next</button>
                        </div>
                    </div>
                `;

                document.getElementById("prev")?.addEventListener("click", () => {
                    if (index > 0) {
                        index--;
                        renderNotice();
                    }
                });

                document.getElementById("next")?.addEventListener("click", () => {
                    if (index < data.length - 1) {
                        index++;
                        renderNotice();
                    }
                });
            }

            renderNotice();
        })
        .catch(() => {
            container.innerHTML = "<p>No notices available.</p>";
        });
});
