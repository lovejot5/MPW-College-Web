function toggleMenu(btn) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
    btn.classList.toggle("active");

    // REMOVE FOCUS AFTER CLICK (fix blue flash)
    btn.blur();
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/news.json")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("newsList");
            if (!list) return;
            list.innerHTML = "";
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.title;
                list.appendChild(li);
            });
        });
});
