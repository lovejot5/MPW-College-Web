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

/* ================= LATEST NEWS AUTO LOOP ================= */
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("newsList");
    const container = document.querySelector(".latest-news-container");

    if (!list || !container) return;

    fetch("data/news.json")
  .then(res => res.json())
  .then(data => {

    list.innerHTML = "";

    const allNews = [...data, ...data]; // duplicate once

    allNews.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="news-title">
                ${item.title}
                ${item.isNew ? '<span class="badge-new">NEW</span>' : ''}
            </div>
            <div class="news-meta">
                ${new Date(item.date).toDateString()}
            </div>
        `;
        list.appendChild(li);
    });
});

            let scrollSpeed = 0.4;

            function autoScroll() {
                container.scrollTop += scrollSpeed;

                if (container.scrollTop >= list.scrollHeight / 2) {
                    container.scrollTop = 0;
                }
            }

            let interval = setInterval(autoScroll, 30);

            container.addEventListener("mouseenter", () => clearInterval(interval));
            container.addEventListener("mouseleave", () => interval = setInterval(autoScroll, 30));

            container.addEventListener("touchstart", () => clearInterval(interval));
            container.addEventListener("touchend", () => interval = setInterval(autoScroll, 30));
        });
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
