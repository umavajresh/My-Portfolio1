// --- Mobile Menu Toggle ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// --- Scroll Progress Indicator ---
window.onscroll = function() {
    updateScrollProgress();
    revealSections();
    handleBackToTop();
    updateActiveNavLink();
};

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
}

// --- Reveal Sections on Scroll ---
function revealSections() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add("active");
        }
    });
}

// --- Back to Top Button ---
const backToTopBtn = document.getElementById("back-to-top");

function handleBackToTop() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Project Filtering ---
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
            if (filter === "all" || card.getAttribute("data-category") === filter) {
                card.style.display = "block";
                setTimeout(() => card.style.opacity = "1", 10);
            } else {
                card.style.opacity = "0";
                setTimeout(() => card.style.display = "none", 300);
            }
        });
    });
});

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavLink() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
}

// --- Contact Form - Generate Mailto ---
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const subject = `Portfolio Inquiry from ${name}`;
    const body = `Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`;
    window.location.href = `mailto:umavajresh9@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// --- Certificate Modal Popup ---
const certificateThumbs = document.querySelectorAll(".certificate-thumb");
const certificateModal = document.getElementById("certificate-modal");
const certificateModalImage = document.getElementById("certificate-modal-image");
const certificateModalClose = document.getElementById("certificate-modal-close");

function openCertificateModal(src, alt) {
    certificateModalImage.src = src;
    certificateModalImage.alt = alt;
    certificateModal.classList.add("open");
}

function closeCertificateModal() {
    certificateModal.classList.remove("open");
    certificateModalImage.src = "";
    certificateModalImage.alt = "";
}

certificateThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        openCertificateModal(thumb.src, thumb.alt);
    });
});

certificateModalClose.addEventListener("click", closeCertificateModal);
certificateModal.addEventListener("click", (event) => {
    if (event.target === certificateModal) {
        closeCertificateModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && certificateModal.classList.contains("open")) {
        closeCertificateModal();
    }
});

// Initial reveal call
revealSections();