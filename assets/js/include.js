document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("R3e_UV1x1ocVDQFe0");

    // Function to show toast messages
    function showToast(message, success = true) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.className = `toast show ${success ? 'success' : 'error'}`;

        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Function to load HTML components
    function loadComponent(id, file, callback) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;

                // Execute callback if provided
                if (callback) callback();

                // Attach contact form listener if this is the contact section
                if (id === "contact") {
                    const contactForm = document.getElementById('contactForm');
                    if (contactForm) {
                        contactForm.addEventListener('submit', function (e) {
                            e.preventDefault();
                            emailjs.sendForm('service_8kothdg', 'template_5242vac', this)
                                .then(() => {
                                    showToast("Message sent successfully!", true);
                                    this.reset();
                                })
                                .catch(err => {
                                    console.error(err);
                                    showToast("Failed to send message.", false);
                                });
                        });
                    }
                }
            })
            .catch(err => console.error(err));
    }

    loadComponent("header", "components/header.html", () => {
        // Attach hamburger menu after header is loaded
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });

            // ✅ Close nav when clicking a link
            const navAnchors = navLinks.querySelectorAll("a");
            navAnchors.forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("active"); // hide dropdown
                });
            });
        }

        // ✅ Handle active nav link
        const navAnchors = document.querySelectorAll(".nav-links a");
        navAnchors.forEach(link => {
            link.addEventListener("click", function () {
                navAnchors.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            });
        });
    });



    loadComponent("hero", "components/hero.html");
    loadComponent("skills", "components/skills.html");
    loadComponent("projects", "components/projects.html");
    loadComponent("experience", "components/experience.html");
    loadComponent("contact", "components/contact.html");
    loadComponent("footer", "components/footer.html");
});


