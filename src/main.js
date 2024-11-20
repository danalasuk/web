(async () => {
  const PLACEHOLDER_IMAGE = "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

  try {
      const response = await fetch("src/backend/database.json");
      const database = await response.json();

      const singleImageCarousel = document.getElementById("single-image-carousel-inner");
      singleImageCarousel.innerHTML = database.map((item, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
              <iframe 
                  src="${item.video}" 
                  class="card-img-top" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen 
                  title="${item.title}">
              </iframe>
          </div>
      `).join("");
      
      const multiCardCarousel = document.getElementById("carousel-list");
      const chunkedDatabase = [];
      for (let i = 0; i < database.length; i += 6) {
          chunkedDatabase.push(database.slice(i, i + 6));
      }
      multiCardCarousel.innerHTML = chunkedDatabase.map((chunk, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
          <div class="card-group">
              ${chunk.map(item => `
                  <div class="card">
                      <img src="${item.image || PLACEHOLDER_IMAGE}" class="card-img-top" alt="${item.title}">
                      <div class="card-body">
                          <h5 class="card-title">${item.title}</h5>
                          <p class="rating">⭐ ${item.rating}</p>
                          <button class="watchlist-button">+Watchlist</button>
                          <button class="trailer-button" data-video="${item.video}">▷Trailer</button>
                      </div>
                  </div>
              `).join("")}
          </div>
      </div>
  `).join("");
  
  document.addEventListener('click', (event) => {
      if (event.target.classList.contains('trailer-button')) {
          const videoUrl = event.target.getAttribute('data-video');
          if (videoUrl) {
              window.open(videoUrl, '_blank'); 
          } else {
              alert('Трейлер недоступний');
          }
      }
  });

      const movieList = document.getElementById("movies-list");
      movieList.innerHTML = database.map(item => `
          <li class="movies-list-item">
              <img src="${item.image || PLACEHOLDER_IMAGE}" class="movies-list-item-image" alt="${item.title}">
              <h3 class="movies-list-item-title">${item.title} (${item.year})</h3>
              <p>⭐ ${item.rating}</p>
          </li>
      `).join("");

  } catch (error) {
      console.error("Error fetching or processing the data:", error);
  }
})();

document.getElementById('login-button').addEventListener('click', () => {
    window.location.href = '/src/login/login.html'; 
}); 

document.getElementById('register-button').addEventListener('click', () => {
    window.location.href = '/src/registry/registry.html';
});