(function () {
    const projectsRoot = document.querySelector("[data-projects-root]");

    if (!projectsRoot || !window.TRUE_NORTH_PROJECTS) {
        return;
    }

    const projects = window.TRUE_NORTH_PROJECTS;
    const featuredProject = projects.find(project => project.featured);
    const remainingProjects = projects
        .filter(project => project !== featuredProject)
        .sort((a, b) => b.sortMonth.localeCompare(a.sortMonth) || a.title.localeCompare(b.title));

    projectsRoot.innerHTML = [
        featuredProject ? renderFeaturedProject(featuredProject) : "",
        remainingProjects.length ? renderProjectGrid(remainingProjects) : ""
    ].join("");
})();

function renderFeaturedProject(project) {
    return `
        <article class="featured-project">
            <a class="featured-project-media" href="${project.url}">
                <img src="${project.thumbnail}" alt="${project.thumbnailAlt}" width="2500" height="1667">
            </a>

            <div class="featured-project-content">
                <p class="project-eyebrow">Featured project</p>
                <h2>${project.title}</h2>
                <p>${project.summary}</p>
                <a class="project-link" href="${project.url}">View Project</a>
            </div>
        </article>
    `;
}

function renderProjectGrid(projects) {
    return `
        <section class="project-grid-section" aria-labelledby="more-selected-work">
            <h2 id="more-selected-work">More Selected Work</h2>
            <div class="project-grid">
                ${projects.map(renderProjectCard).join("")}
            </div>
        </section>
    `;
}

function renderProjectCard(project) {
    return `
        <article class="project-card">
            <a href="${project.url}">
                <img src="${project.thumbnail}" alt="${project.thumbnailAlt}" width="2500" height="1667" loading="lazy">
            </a>
            <p class="project-eyebrow">${project.completedLabel}</p>
            <h3><a href="${project.url}">${project.title}</a></h3>
            <p>${project.summary}</p>
        </article>
    `;
}
