const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav_links");


hamburger.onclick = () => {
    navLinks.classList.toggle("active");
};

fetch("https://api.github.com/users/patriq128/repos")
.then(res => res.json())
.then(repos => {

    const container = document.getElementById("projects-container");

    repos
    .filter(repo => !repo.fork)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .forEach(repo => {

        container.innerHTML += `
        <a class="project-card" href="${repo.html_url}" target="_blank">

            <h2>${repo.name}</h2>

            <p>
                ${repo.description || "No description"}
            </p>

            <p>
                Last update: ${new Date(repo.pushed_at).toLocaleDateString()}
            </p>

        </a>
        `;

    });

})
.catch(error => {
    console.error("GitHub API error:", error);
});
