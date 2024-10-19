(async () => {
  const section = document.getElementById("movies-list");

  const PLACEHOLDER_IMAGE =
    "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

  try {
    const response = await fetch("src/backend/database.json");
    const database = await response.json();

    const list = database
      .map(
        (item) => `
          <li class="movies-list-item" data-title="${item.title}">
            <img class="movies-list-item-image" src="${item.image}" alt="${item.title}" onerror="this.src='${PLACEHOLDER_IMAGE}'">
            <h2 class="movies-list-item-title">${item.title} | ${item.year}</h2>
          </li>`
      )
      .join("");

    section.innerHTML = list;

    const items = document.querySelectorAll(".movies-list-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.getAttribute("data-title");
        const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
        window.location.href = `/${formattedTitle}`;
      });
    });
  } catch (error) {
    console.error("Error fetching or processing the data:", error);
  }
})();
