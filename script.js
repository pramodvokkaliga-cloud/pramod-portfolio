/**
 * =========================================================
 * PRAMOD S. M - PORTFOLIO INTERACTIVE JAVASCRIPT
 * Features: Dynamic Typing, Theme Switcher, Mobile Menu,
 * Skills Filtering, Project Modals, AI Assistant Chatbot,
 * Contact Form Validation & Toast Feedback.
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------
       1. DYNAMIC ROLES TYPING EFFECT
       ----------------------------------------------------- */
    const typedRoleElement = document.getElementById('typed-role');
    const roles = [
        "BE Computer Science Student",
        "Java & Python Developer",
        "Full-Stack Web Developer",
        "Data Structures Enthusiast",
        "Creative Graphic Designer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
        if (!typedRoleElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1800; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    typeEffect();

    /* -----------------------------------------------------
       2. STICKY NAVBAR & ACTIVE LINK OBSERVER
       ----------------------------------------------------- */
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active section detection
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* -----------------------------------------------------
       3. MOBILE NAVIGATION MENU
       ----------------------------------------------------- */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('navbar');

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('mobile-open');
            mobileBtn.classList.toggle('active');
            mobileBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile nav on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('mobile-open');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* -----------------------------------------------------
       4. THEME TOGGLE (DARK / LIGHT MODE)
       ----------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('pramod_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('pramod_portfolio_theme', newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
        });
    }

    /* -----------------------------------------------------
       5. SKILLS FILTERING
       ----------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    /* -----------------------------------------------------
       6. PROJECT DETAILS MODAL POPUP
       ----------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const modalTarget = document.getElementById('modal-content-target');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const openModalButtons = document.querySelectorAll('.open-project-modal');

    const projectData = {
        attendance: {
            title: "Student Attendance Management System",
            tag: "Software Engineering • Java",
            desc: "A desktop and database application engineered to eliminate manual register workflows in colleges. Provides student registration, daily batch attendance logging, percentage calculation, and warning list generation for short attendance.",
            highlights: [
                "Object-oriented architecture with modular separation of concerns.",
                "Automated percentage calculation with instant defaulter flagging (<75%).",
                "Robust file-based and structured database record persistence.",
                "Admin and instructor roles with clean authentication."
            ],
            githubUrl: "https://github.com/pramod-sm/student-attendance-system"
        },
        java: {
            title: "Java Programming Projects Suite",
            tag: "Core Java SE • Clean Code",
            desc: "A comprehensive repository of Java implementations focusing on multi-threading, custom exception handling frameworks, generics, collections API, and real-world system simulations.",
            highlights: [
                "Thread synchronization and producer-consumer implementations.",
                "Banking, library, and inventory management simulation modules.",
                "Extensive JUnit test coverage for algorithmic methods.",
                "Design patterns: Factory, Singleton, and Observer patterns applied."
            ],
            githubUrl: "https://github.com/pramod-sm/java-programming-projects"
        },
        dsa: {
            title: "Data Structures Lab Programs",
            tag: "Algorithms • Computer Science Lab",
            desc: "Highly optimized implementations of foundational and advanced data structures with in-depth complexity benchmarking (Time and Space).",
            highlights: [
                "Linear structures: Singly/Doubly Linked Lists, Stacks, Circular Queues.",
                "Trees & Graphs: Binary Search Trees, AVL Trees, BFS, DFS, Dijkstra.",
                "Sorting & Searching: Quick Sort, Merge Sort, Heap Sort, Binary Search.",
                "Memory leak verification and clean pointer/reference handling."
            ],
            githubUrl: "https://github.com/pramod-sm/data-structures-lab"
        },
        portfolio: {
            title: "Personal Portfolio Website",
            tag: "Frontend Development • UI/UX",
            desc: "Modern, responsive portfolio website featuring a dark glassmorphism design with fiery orange-red glow effects, interactive AI guide assistant, dynamic skill filters, and smooth accessibility.",
            highlights: [
                "Custom CSS tokens, glassmorphic backdrop-filter blurs, and neon gradients.",
                "Fully responsive layout crafted for mobile, tablet, and widescreen monitors.",
                "Integrated AI assistant drawer for instant visitor queries.",
                "Zero external bloated framework dependencies — pure HTML, CSS, and JS."
            ],
            githubUrl: "https://github.com/pramod-sm/portfolio-website"
        }
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projKey = btn.getAttribute('data-project');
            const data = projectData[projKey];
            if (!data) return;

            modalTarget.innerHTML = `
                <div class="modal-project-header">
                    <div>
                        <span class="pill-tag">${data.tag}</span>
                        <h3 class="modal-project-title" style="margin-top: 0.5rem;">${data.title}</h3>
                    </div>
                </div>
                <p class="modal-project-desc">${data.desc}</p>
                <div class="modal-highlight-box">
                    <h4 class="modal-highlight-title"><i class="fa-solid fa-star"></i> Key Architecture Highlights</h4>
                    <ul class="modal-highlight-list">
                        ${data.highlights.map(h => `<li><i class="fa-solid fa-check"></i> <span>${h}</span></li>`).join('')}
                    </ul>
                </div>
                <div class="modal-actions">
                    <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fa-brands fa-github"></i>
                        <span>View Repository</span>
                    </a>
                </div>
            `;

            projectModal.classList.add('open');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModalBtn && projectModal) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.classList.remove('open');
            projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('open');
                projectModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    /* -----------------------------------------------------
       7. RESUME PREVIEW MODAL
       ----------------------------------------------------- */
    const resumePreviewBtn = document.getElementById('preview-resume-modal-btn');
    const resumeModal = document.getElementById('resume-preview-modal');
    const closeResumeModalBtn = document.getElementById('close-resume-modal-btn');

    if (resumePreviewBtn && resumeModal) {
        resumePreviewBtn.addEventListener('click', () => {
            resumeModal.classList.add('open');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });

        if (closeResumeModalBtn) {
            closeResumeModalBtn.addEventListener('click', () => {
                resumeModal.classList.remove('open');
                resumeModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('open');
                resumeModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // Escape key closes open modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('open')) {
                projectModal.classList.remove('open');
                document.body.style.overflow = '';
            }
            if (resumeModal && resumeModal.classList.contains('open')) {
                resumeModal.classList.remove('open');
                document.body.style.overflow = '';
            }
            if (aiDrawer && aiDrawer.classList.contains('open')) {
                aiDrawer.classList.remove('open');
            }
        }
    });

    /* -----------------------------------------------------
       8. AI ASSISTANT CHATBOT DRAWER
       ----------------------------------------------------- */
    const aiNavBtn = document.getElementById('ai-chat-nav-btn');
    const floatingAiBtn = document.getElementById('floating-ai-btn');
    const aiDrawer = document.getElementById('ai-chat-drawer');
    const closeAiDrawerBtn = document.getElementById('close-ai-drawer');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiUserInput = document.getElementById('ai-user-input');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const promptChips = document.querySelectorAll('.ai-prompt-chip');

    function toggleAiDrawer() {
        if (!aiDrawer) return;
        const isOpen = aiDrawer.classList.toggle('open');
        aiDrawer.setAttribute('aria-hidden', !isOpen);
        if (isOpen && aiUserInput) {
            aiUserInput.focus();
        }
    }

    if (aiNavBtn) aiNavBtn.addEventListener('click', toggleAiDrawer);
    if (floatingAiBtn) floatingAiBtn.addEventListener('click', toggleAiDrawer);
    if (closeAiDrawerBtn) closeAiDrawerBtn.addEventListener('click', toggleAiDrawer);

    function addChatMessage(text, sender = 'bot') {
        if (!aiChatMessages) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ${sender}`;
        msgDiv.innerHTML = `<div class="ai-msg-bubble"><p>${text}</p></div>`;
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function generateAiResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('skill') || q.includes('technology') || q.includes('stack') || q.includes('java') || q.includes('python')) {
            return "🚀 <strong>Pramod's Key Skills:</strong><br>• Languages: Java, Python, JavaScript<br>• Core: Data Structures & Algorithms, Object-Oriented Programming (OOP)<br>• Web: HTML5, CSS3, Modern Responsive UI<br>• Tools: Git, GitHub, VS Code & Graphic Design.";
        } else if (q.includes('project') || q.includes('attendance') || q.includes('work')) {
            return "📂 <strong>Featured Projects:</strong><br>1. <strong>Student Attendance Management System:</strong> Java & OOP based institutional attendance tracking.<br>2. <strong>Java Programming Projects:</strong> Multi-threading & modular software modules.<br>3. <strong>Data Structures Lab:</strong> Trees, Graphs, Sorting & Searching algorithms.<br>4. <strong>Personal Portfolio:</strong> Responsive dark glassmorphism website.";
        } else if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('be') || q.includes('cse')) {
            return "🎓 <strong>Education:</strong><br>Pramod is currently pursuing his <strong>Bachelor of Engineering (BE) in Computer Science & Engineering</strong> in Bangalore, India, maintaining a strong focus on software engineering and algorithms.";
        } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('linkedin')) {
            return "✉️ <strong>Contact Pramod:</strong><br>• Email: <a href='mailto:pramod.sm.dev@example.com' style='color: #ff5e18;'>pramod.sm.dev@example.com</a><br>• LinkedIn: <a href='https://linkedin.com/in/pramod-sm' target='_blank' style='color: #ff5e18;'>linkedin.com/in/pramod-sm</a><br>• Location: Bangalore, Karnataka, India.";
        } else if (q.includes('resume') || q.includes('cv')) {
            return "📄 You can download Pramod's full resume using the 'Download CV' button in the hero or resume sections, or preview it directly in the browser!";
        } else if (q.includes('goal') || q.includes('career') || q.includes('about')) {
            return "🎯 <strong>Career Goal:</strong><br>To become a skilled software developer and build useful, reliable, and innovative software solutions.";
        } else {
            return `Thanks for asking! Pramod is a CSE student specializing in Java, Python, Data Structures, Web Development, and Graphic Design. Feel free to explore his projects or send him a message through the contact form!`;
        }
    }

    if (aiChatForm && aiUserInput) {
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = aiUserInput.value.trim();
            if (!text) return;

            addChatMessage(text, 'user');
            aiUserInput.value = '';

            // Bot typing simulation
            setTimeout(() => {
                const response = generateAiResponse(text);
                addChatMessage(response, 'bot');
            }, 400);
        });
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            addChatMessage(prompt, 'user');
            setTimeout(() => {
                const response = generateAiResponse(prompt);
                addChatMessage(response, 'bot');
            }, 350);
        });
    });

    /* -----------------------------------------------------
       9. CONTACT FORM VALIDATION & SUBMISSION
       ----------------------------------------------------- */
    const contactForm = document.getElementById('portfolio-contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submit-contact-btn');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

            if (!nameInput.value.trim()) {
                document.getElementById('name-error').textContent = 'Please enter your name.';
                isValid = false;
            }

            if (!emailInput.value.trim()) {
                document.getElementById('email-error').textContent = 'Please enter your email.';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!subjectInput.value.trim()) {
                document.getElementById('subject-error').textContent = 'Please enter a subject.';
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                document.getElementById('message-error').textContent = 'Please enter your message.';
                isValid = false;
            }

            if (!isValid) return;

            // Simulate sending feedback
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>`;
                contactForm.reset();
                showToast("Thank you! Your message has been sent successfully.", "success");
            }, 1200);
        });
    }

    /* -----------------------------------------------------
       10. COPY EMAIL BUTTONS
       ----------------------------------------------------- */
    const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
    copyEmailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email') || 'pramod.sm.dev@example.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied "${email}" to clipboard!`, 'success');
            }).catch(() => {
                showToast(`Email: ${email}`, 'info');
            });
        });
    });

    /* -----------------------------------------------------
       11. BACK TO TOP BUTTON
       ----------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* -----------------------------------------------------
       12. TOAST NOTIFICATION HELPER
       ----------------------------------------------------- */
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
        if (type === 'success') iconHtml = '<i class="fa-solid fa-circle-check"></i>';
        if (type === 'error') iconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';

        toast.innerHTML = `${iconHtml} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    /* -----------------------------------------------------
       13. DYNAMIC COPYRIGHT YEAR
       ----------------------------------------------------- */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
