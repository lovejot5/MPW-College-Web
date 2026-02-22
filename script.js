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

/* ================= NOTICE PAGINATION ================= */
document.addEventListener("DOMContentLoaded", () => {

    fetch("data/notices.json")
        .then(res => res.json())
        .then(data => {

            let index = 0;
            const container = document.getElementById("noticeContainer");

            function renderNotice() {
                const n = data[index];

                container.innerHTML = `
                    <div class="notice-card">
                        <div class="notice-header">
                            <img src="${n.author.icon}">
                            <div>
                                <strong>${n.author.name}</strong><br>
                                <span>${new Date(n.date).toDateString()}</span>
                            </div>
                            ${n.isNew ? '<span class="badge-new">NEW</span>' : ''}
                        </div>

                        <h3>${n.title}</h3>
                        <p>${n.description}</p>

                        ${n.images.length ? `
                            <div class="notice-images">
                                ${n.images.map(img => `<img src="${img}">`).join("")}
                            </div>` : ""
                        }

                        ${n.buttons.length ? `
                            <div class="notice-actions">
                                ${n.buttons.map(b =>
                                    `<a href="${b.url}" target="_blank">${b.text}</a>`
                                ).join("")}
                            </div>` : ""
                        }

                        <div class="notice-pagination">
                            <button ${index === 0 ? "disabled" : ""} id="prev">Previous</button>
                            <span>${index + 1} / ${data.length}</span>
                            <button ${index === data.length - 1 ? "disabled" : ""} id="next">Next</button>
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
        });
});
