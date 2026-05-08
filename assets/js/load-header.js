document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById("header");

    if (!headerPlaceholder) {
        return;
    }

    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Header request failed: " + response.status);
            }

            return response.text();
        })
        .then(data => {
            headerPlaceholder.innerHTML = data;
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
                            <a href="about.html">About</a>
                            <a href="contact.html">Contact</a>
                        </nav>
                    </div>
                    <div class="divider"></div>
                </header>
            `;
            setCurrentNavLink();
        });
});

function setCurrentNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });
}
