document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById("header");
    const pathPrefix = getPathPrefix();

    if (!headerPlaceholder) {
        return;
    }

    fetch(pathPrefix + "header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Header request failed: " + response.status);
            }

            return response.text();
        })
        .then(data => {
            headerPlaceholder.innerHTML = data;
            updateHeaderPaths(pathPrefix);
            setCurrentNavLink();
        })
        .catch(error => {
            console.error("Error loading header:", error);
            headerPlaceholder.innerHTML = `
                <header class="site-header">
                    <div class="header-inner">
                        <div class="logo">
                            <a href="index.html">True North Structural Engineering</a>
                        </div>

                        <nav>
                            <a href="index.html">Home</a>
                            <a href="approach.html">Approach</a>
                            <a href="services.html">Services</a>
                            <a href="portfolio.html">Portfolio</a>
                            <a href="about.html">About</a>
                            <a href="contact.html">Contact</a>
                        </nav>
                    </div>
                    <div class="divider"></div>
                </header>
            `;
            updateHeaderPaths(pathPrefix);
            setCurrentNavLink();
        });
});

function getPathPrefix() {
    return window.location.pathname.includes("/portfolio/") ? "../" : "";
}

function updateHeaderPaths(pathPrefix) {
    if (!pathPrefix) {
        return;
    }

    document.querySelectorAll("#header a[href]").forEach(link => {
        const href = link.getAttribute("href");

        if (!href.startsWith("http") && !href.startsWith("#") && !href.startsWith("../")) {
            link.setAttribute("href", pathPrefix + href);
        }
    });

    document.querySelectorAll("#header img[src]").forEach(image => {
        const src = image.getAttribute("src");

        if (!src.startsWith("http") && !src.startsWith("../")) {
            image.setAttribute("src", pathPrefix + src);
        }
    });
}

function setCurrentNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage || (currentPath.includes("/portfolio/") && linkPage === "portfolio.html")) {
            link.setAttribute("aria-current", "page");
        }
    });
}
