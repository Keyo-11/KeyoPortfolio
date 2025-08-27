document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("R3e_UV1x1ocVDQFe0");

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

    function loadComponent(id, file, callback) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${file}`);
                return response.text();
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;

                if (callback) callback();

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
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });


            const navAnchors = navLinks.querySelectorAll("a");
            navAnchors.forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("active"); 
                });
            });
        }

        const navAnchors = document.querySelectorAll(".nav-links a");
        navAnchors.forEach(link => {
            link.addEventListener("click", function () {
                navAnchors.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            });
        });

        loadComponent("chatbot", "components/chatbot.html", () => {
            const chatbotToggle = document.getElementById("chatbot-toggle");
            const chatbotBox = document.getElementById("chatbot-box");
            const chatbotClose = document.getElementById("chatbot-close");
            const sendBtn = document.getElementById("send-btn");
            const userInput = document.getElementById("user-input");
            const messages = document.getElementById("chatbot-messages");

            const botResponses = [            
                {
                    keywords: ["academic project", "school project", "capstone", "thesis"],
                    response: `
            📚 <b>Academic Projects</b><br>
            Here’s a quick summary of my academic works:<br><br>
            🔹 <b>Eco-Transition: Paperless System & Data Analytics</b> (Dec 2024) <br><br>
            🔹 <b>SnapNotes</b> (Jul 2024) <br><br>
            🔹 <b>BigBrew Cafe Shop's Ordering System</b> (Dec 2023) <br><br>
            🔹 <b>Bend the Trend Apparel: Inventory System</b> (Dec 2022) <br><br>
            👉 Explore more in the <a href="#projects" class="chatbot-link">Academic Projects Section 🎓</a>.
        `
                },
                {
                    keywords: ["skills", "abilities", "tech"],
                    response: `
            I have strong technical skills in programming (Python, Java, JavaScript, PHP, C++, C#, VB.NET),
            web development (HTML, CSS, Bootstrap, Flask, .NET), and tools like Git, GitHub, and Figma. <br>
            I also bring soft skills like problem-solving, time management, adaptability, and collaboration. <br>
            👉 Learn more in the <a href="#skills" class="chatbot-link">Skills Section 💻</a>.
        `
                },
                {
                    keywords: ["experience", "work", "internship", "education", "career", "job"],
                    response: `
        📌 <b>Work Experience, Internship, & Education</b><br><br>
        🔹 Service Crew – McDonald's SM Lipa City (2024 - 2025)<br>
        🔹 Software Development Intern – LaQuest Philippines Inc. (2025)<br>
        🎓 BS Information Technology – Batangas State University (2021 - 2025)<br><br>
        👉 Learn more in the <a href="#experience" class="chatbot-link">Experience & Education Section 📜</a>.
    `
                },
                {
                    keywords: ["contact", "email", "phone", "linkedin", "facebook", "info", "reach"],
                    response: `
        📩 <b>Here’s my contact info:</b><br><br>
        ✉️ Email: <a href="mailto:jameskeoch@gmail.com" target="_blank">jameskeoch@gmail.com</a><br>
        📱 Phone: +63 994 448 3601 / +63 977 671 3272<br>
        🔗 LinkedIn: <a href="https://www.linkedin.com/in/jameskeoch/" target="_blank">linkedin.com/in/jameskeoch</a><br>
        👍 Facebook: <a href="https://www.facebook.com/jameskeoch.carillo/" target="_blank">facebook.com/jameskeoch.carillo</a><br><br>
        👉 Or you can send me an email directly through the <a href="#contact" class="chatbot-link">Contact Section</a>.
    `
                },
                {
                    keywords: ["yourself", "who are you", "resume", "cv"],
                    response: `
        Hello 👋 I'm <b>James Keoch Carillo</b>, a recent graduate of <b>BS Information Technology</b> with a passion for technology, full-stack development, and data-driven solutions. I enjoy solving technical problems, working with data, and creating innovative systems that address real-world challenges. I’m eager to apply my academic knowledge in IT support, data analysis, and web development while contributing to a dynamic and growth-oriented organization. I am committed to continuous learning and professional development in the ever-evolving tech industry. <br><br>
    `
                },

                {
                    keywords: ["bye", "goodbye", "see you"],
                    response: "Goodbye 👋 Have a great day!"
                },
                {
                    keywords: ["hello", "hi", "hey"],
                    response: "Hello 👋 I'm KeyoBot! How can I help you today?"
                },
                {
                    keywords: ["how are you", "you okay", "doing"],
                    response: "I’m just a bot 🤖 but I’m feeling awesome! Thanks for asking 😄"
                },
                {
                    keywords: ["portfolio", "site", "website"],
                    response: "This portfolio belongs to Keyo 🚀. Feel free to explore my projects and skills!"
                },
                {
                    keywords: ["project", "work", "sample"],
                    response: `You can check out my <a href="#projects" class="chatbot-link">Projects Section 🚧</a> to see what I’ve built!`
                },
                {
                    keywords: ["okay", "thanks", "thank you", "ty", "ok"],
                    response: "You're welcome! 😊 Glad I could help."
                }

            ];

            const fallback = "Hmm 🤔 I’m not sure about that. Try asking about my skills, projects, or contact info!";

            if (messages) {
                let botMsg = document.createElement("div");
                botMsg.className = "bot-msg";
                botMsg.textContent = "Hi, what can I do for you?";
                messages.appendChild(botMsg);
            }

            if (chatbotToggle && chatbotBox && chatbotClose) {
                chatbotToggle.addEventListener("click", () => {
                    chatbotBox.style.display = "flex";
                    chatbotToggle.style.display = "none";
                });

                chatbotClose.addEventListener("click", () => {
                    chatbotBox.style.display = "none";
                    chatbotToggle.style.display = "block";
                });
            }

            if (sendBtn && userInput && messages) {
                sendBtn.addEventListener("click", sendMessage);
                userInput.addEventListener("keypress", (e) => {
                    if (e.key === "Enter") sendMessage();
                });

                function sendMessage() {
                    let msg = userInput.value.trim();
                    if (!msg) return;

                    let userMsg = document.createElement("div");
                    userMsg.className = "user-msg";
                    userMsg.textContent = msg;
                    messages.appendChild(userMsg);

                    userInput.value = "";
                    messages.scrollTop = messages.scrollHeight;

                    const lowerMsg = msg.toLowerCase();
                    let foundResponse = null;

                    for (let entry of botResponses) {
                        if (entry.keywords.some(word => lowerMsg.includes(word))) {
                            foundResponse = entry.response;
                            break;
                        }
                    }

                    setTimeout(() => {
                        let botMsg = document.createElement("div");
                        botMsg.className = "bot-msg";
                        botMsg.innerHTML = foundResponse || fallback;
                        messages.appendChild(botMsg);
                        messages.scrollTop = messages.scrollHeight;

                        const links = botMsg.querySelectorAll(".chatbot-link");
                        links.forEach(link => {
                            link.addEventListener("click", (e) => {
                                e.preventDefault();
                                chatbotBox.style.display = "none";
                                chatbotToggle.style.display = "block";

                                const targetId = link.getAttribute("href");
                                const targetEl = document.querySelector(targetId);
                                if (targetEl) {
                                    targetEl.scrollIntoView({ behavior: "smooth" });
                                }
                            });
                        });
                    }, 500);
                }
            }
        });


    });



    loadComponent("hero", "components/hero.html");
    loadComponent("skills", "components/skills.html");
    loadComponent("projects", "components/projects.html");
    loadComponent("experience", "components/experience.html");
    loadComponent("contact", "components/contact.html");
    loadComponent("footer", "components/footer.html");
});


