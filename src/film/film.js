(async () => {
    const movieId = new URLSearchParams(window.location.search).get('id');
    const PLACEHOLDER_IMAGE = "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg";

    if (!movieId) {
        alert('ID фильма не указан.');
        return;
    }

    try {

        const response = await fetch("src/backend/database.json");
        if (!response.ok) throw new Error(`Ошибка загрузки данных: ${response.status}`);

        const database = await response.json();
        const movie = database.find(item => item.id == movieId);

        if (!movie) {
            alert('Фильм не найден.');
            return;
        }


        const app = document.getElementById("app");

        const header = document.createElement("div");
        header.className = "header";

        const titleSection = document.createElement("div");
        titleSection.className = "title-section";

        const title = document.createElement("h1");
        title.textContent = movie.title;

        const subtitle = document.createElement("h2");
        subtitle.className = "subtitle";
        subtitle.textContent = `Original title: ${movie.title} (${movie.year})`;

        titleSection.appendChild(title);
        titleSection.appendChild(subtitle);
        header.appendChild(titleSection);


        const movieInfo = document.createElement("div");
        movieInfo.className = "movie-info";

        const poster = document.createElement("div");
        poster.className = "poster";

        const image = document.createElement("img");
        image.src = movie.image || PLACEHOLDER_IMAGE;
        image.alt = "Постер фильма";
        image.onerror = () => image.src = PLACEHOLDER_IMAGE;

        const trailer = document.createElement("iframe");
        trailer.className = "trailer";
        trailer.src = movie.video;
        trailer.title = "Трейлер фильма";
        trailer.frameBorder = "0";
        trailer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        trailer.allowFullscreen = true;

        poster.appendChild(image);
        poster.appendChild(trailer);

        const details = document.createElement("div");
        details.className = "details";

        const year = document.createElement("div");
        year.className = "title";
        year.textContent = `Год: ${movie.year}`;

        const director = document.createElement("div");
        director.className = "subtitle";
        director.textContent = `Режиссёр: ${movie.director}`;

        const genresContainer = document.createElement("div");
        genresContainer.className = "tags";
        movie.genre.forEach(genre => {
            const genreElement = document.createElement("span");
            genreElement.className = "tag";
            genreElement.textContent = genre;
            genresContainer.appendChild(genreElement);
        });

        const castContainer = document.createElement("div");
        castContainer.className = "cast";

        const castTitle = document.createElement("div");
        castTitle.textContent = "В ролях:";
        castContainer.appendChild(castTitle);

        movie.cast.forEach(actor => {
            const actorElement = document.createElement("div");
            actorElement.className = "actor";
            actorElement.textContent = actor;
            castContainer.appendChild(actorElement);
        });

        const rating = document.createElement("div");
        rating.className = "rating";
        rating.textContent = `${movie.rating}/10`;

        details.appendChild(year);
        details.appendChild(director);
        details.appendChild(genresContainer);
        details.appendChild(castContainer);
        details.appendChild(rating);


        movieInfo.appendChild(poster);
        movieInfo.appendChild(details);

        app.appendChild(header);
        app.appendChild(movieInfo);
    } catch (error) {
        console.error("Ошибка загрузки данных о фильме:", error);
        alert("Не удалось загрузить данные о фильме.");
    }
})();
