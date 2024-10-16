

(async() => {
    const section = document.getElementById('movies-list')

    const respons = await fetch('src/backend/database.json')
    const database = await respons.json();

    const list = database.map((item) => `
        <li class="liast item">
            <p>${item.title}</p>
        </li>
`)

    section.innerHTML = list
})()