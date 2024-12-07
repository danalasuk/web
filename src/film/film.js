(async () => {
    // Получаем ID фильма из URL
    const movieId = new URLSearchParams(window.location.search).get('id');
    const PLACEHOLDER_IMAGE = "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

    try {
        // Загружаем данные из database.json
        const response = await fetch("/src/backend/database.json");
        const database = await response.json();

        // Находим фильм по ID
        const movie = database.find(item => item.id == movieId);

        if (!movie) {
            alert('Фильм не найден.');
            return;
        }

        // Заполняем информацию на странице
        document.getElementById("movie-title").textContent = movie.title;
        document.getElementById("movie-original-title").textContent = `Original title: ${movie.title} (${movie.year})`;
        document.getElementById("movie-year").textContent = `Год: ${movie.year}`;
        document.getElementById("movie-director").textContent = `Режиссёр: ${movie.director}`;
        document.getElementById("movie-rating").textContent = `${movie.rating}/10`;

        // Постер фильма
        document.getElementById("movie-image").src = movie.image || PLACEHOLDER_IMAGE;

        // Трейлер фильма
        const movieTrailer = document.getElementById("movie-trailer");
        movieTrailer.src = movie.video;

        // Добавляем жанры
        const genresContainer = document.getElementById("movie-genres");
        movie.genre.forEach(genre => {
            const genreElement = document.createElement("span");
            genreElement.className = "tag";
            genreElement.textContent = genre;
            genresContainer.appendChild(genreElement);
        });

        // Добавляем актёров
        const castContainer = document.getElementById("movie-cast");
        const castTitle = document.createElement("div");
        castTitle.textContent = "В ролях:";
        castContainer.appendChild(castTitle);

        movie.cast.forEach(actor => {
            const actorElement = document.createElement("div");
            actorElement.className = "actor";
            actorElement.textContent = actor;
            castContainer.appendChild(actorElement);
        });
    } catch (error) {
        console.error("Ошибка загрузки данных о фильме:", error);
    }
})();
