(async () => {
  const moviesList = document.getElementById("movies-list");
  const carouselList = document.getElementById("carousel-list");

  const PLACEHOLDER_IMAGE = "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

  try {
      const response = await fetch("src/backend/database.json");
      const database = await response.json();

      const moviesItems = database.map(item => `
          <li class="movies-list-item" data-title="${item.title}">
              <img class="movies-list-item-image" src="${item.image || PLACEHOLDER_IMAGE}" alt="${item.title}" onerror="this.src='${PLACEHOLDER_IMAGE}'">
              <h2 class="movies-list-item-title">${item.title} | ${item.year}</h2>
          </li>
      `).join("");

      moviesList.innerHTML = moviesItems;

      const chunkArray = (array, chunkSize) => {
          const result = [];
          for (let i = 0; i < array.length; i += chunkSize) {
              result.push(array.slice(i, i + chunkSize));
          }
          return result;
      };

      const carouselGroups = chunkArray(database, 6);

      // Заполнение карусели
      const carouselItems = carouselGroups.map((group, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <div class="card-group">
                  ${group.map(item => `
                      <div class="card">
                          <img src="${item.image || PLACEHOLDER_IMAGE}" class="card-img-top" alt="${item.title}" onerror="this.src='${PLACEHOLDER_IMAGE}'">
                          <div class="card-body">
                              <p class="rating">⭐ ${item.rating || 'N/A'}</p>
                              <h5 class="card-title">${item.title}</h5>
                              <button class="watchlist-button">+Watchlist</button>
                              <button class="trailer-button">▷Trailer</button>
                          </div>
                      </div>
                  `).join('')}
              </div>
          </div>
      `).join("");

      carouselList.innerHTML = carouselItems;

      const movieItems = document.querySelectorAll(".movies-list-item");
      movieItems.forEach(item => {
          item.addEventListener("click", () => {
              const title = item.getAttribute("data-title");
              const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
              window.location.href = `/${formattedTitle}`;
          });
      });

      const carouselItemsList = document.querySelectorAll(".carousel-item");
      carouselItemsList.forEach(item => {
          item.addEventListener("click", () => {
              const title = item.querySelector('.card-title').textContent;
              const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
              window.location.href = `/${formattedTitle}`;
          });
      });

  } catch (error) {
      console.error("Error fetching or processing the data:", error);
      moviesList.innerHTML = "<p>Failed to load movies list.</p>";
      carouselList.innerHTML = "<p>Failed to load carousel items.</p>";
  }
})();
