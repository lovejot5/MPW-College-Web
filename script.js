/* ================= MOBILE MENU ================= */
function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.classList.toggle("show");
    btn.classList.toggle("active");
    btn.blur();
}

/* Close menu on outside click */
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
    const scrollBox = document.getElementById("newsScroll");

    if (!list || !scrollBox) return;

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
                            ${item.isNew ? `<span class="badge-new">NEW</span>` : ""}
                        </div>
                        <div class="news-meta">
                            ${new Date(item.date).toDateString()}
                        </div>
                    </a>
                `;
                list.appendChild(li);
            });

            /* duplicate for infinite scroll */
            list.innerHTML += list.innerHTML;
        });

    let pause = false;

    const autoScroll = setInterval(() => {
        if (pause) return;

        scrollBox.scrollTop += 1;
        if (scrollBox.scrollTop >= scrollBox.scrollHeight / 2) {
            scrollBox.scrollTop = 0;
        }
    }, 35);

    ["mouseenter", "touchstart"].forEach(evt =>
        scrollBox.addEventListener(evt, () => pause = true)
    );

    ["mouseleave", "touchend"].forEach(evt =>
        scrollBox.addEventListener(evt, () => pause = false)
    );
});

/* ================= NOTICE PAGINATION ================= */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("noticeContainer");
    if (!container) return;

    fetch("data/notices.json")
        .then(res => res.json())
        .then(data => {
            let index = 0;

            function render() {
                const n = data[index];

                container.innerHTML = `
                    <div class="notice-card fade">
                        <div class="notice-header">
                            <img src="${n.author.icon}">
                            <div>
                                <strong>${n.author.name}</strong><br>
                                <span>${new Date(n.date).toDateString()}</span>
                            </div>
                            ${n.isNew ? `<span class="badge-new">NEW</span>` : ""}
                        </div>

                        <h3>${n.title}</h3>
                        <p>${n.description}</p>

                        ${n.images.length ? `
                        <div class="notice-images">
                            ${n.images.map(img => `<img src="${img}">`).join("")}
                        </div>` : ""}

                        ${n.buttons.length ? `
                        <div class="notice-actions">
                            ${n.buttons.map(b =>
                                `<a href="${b.url}" target="_blank">${b.text}</a>`
                            ).join("")}
                        </div>` : ""}

                        <div class="notice-pagination">
                            <button id="prev" ${index === 0 ? "disabled" : ""}>Previous</button>
                            <span>${index + 1} / ${data.length}</span>
                            <button id="next" ${index === data.length - 1 ? "disabled" : ""}>Next</button>
                        </div>
                    </div>
                `;

                document.getElementById("prev")?.onclick = () => {
                    if (index > 0) { index--; render(); }
                };

                document.getElementById("next")?.onclick = () => {
                    if (index < data.length - 1) { index++; render(); }
                };
            }

            render();
        });
});
