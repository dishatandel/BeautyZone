/* FILE 3 — script.js */
/* ==========================================
   CONFIGURABLE VARIABLES (REPLACE AS NEEDED)
   ================================---------- */
// Configured with your actual WhatsApp number including country code (91)
const WHATSAPP_NUMBER = "919448058807";

// Configured with your direct Google Maps link
const MAP_LOCATION = "https://maps.app.goo.gl/UtAEBZQkp7xiomSX6";

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. MOBILE NAVIGATION & STICKY NAVBAR
       ========================================== */
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle Mobile Menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    // Close Mobile Menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });

    // Sticky Navbar shadow on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(63, 48, 53, 0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    /* ==========================================
       2. ACTIVE NAVIGATION LINK ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll("section[id]");

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const correspondingLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add("active");
                } else {
                    correspondingLink.classList.remove("active");
                }
            }
        });
    }
    window.addEventListener("scroll", scrollActive);

    /* ==========================================
       3. STATS COUNTER ANIMATION
       ========================================== */
    const statNumbers = document.querySelectorAll(".stat-number");
    let counted = false;

    function startCounters() {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const speed = target / 50;

            function updateCount() {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
    }

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    startCounters();
                    counted = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    /* ==========================================
       4. TESTIMONIAL SLIDER
       ========================================== */
    const track = document.getElementById("testimonialTrack");
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        const dotsContainer = document.getElementById("sliderDots");
        let currentIndex = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                moveToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function moveToSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots(currentIndex);
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % slides.length;
                moveToSlide(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(currentIndex);
            });
        }

        // Auto slide every 6 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        }, 6000);
    }

    /* ==========================================
       5. APPOINTMENT FORM POPUP & WHATSAPP REDIRECT
       ========================================== */
    const bookingForm = document.getElementById("bookingForm");
    const successPopup = document.getElementById("successPopup");
    const popupProceedBtn = document.getElementById("popupProceedBtn");
    
    let generatedWhatsAppUrl = "";

    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let isValid = true;

            // Form Fields
            const fullName = document.getElementById("fullName");
            const phone = document.getElementById("phone");
            const serviceSelect = document.getElementById("serviceSelect");
            const prefDate = document.getElementById("prefDate");
            const prefTime = document.getElementById("prefTime");
            const message = document.getElementById("message");

            // Simple Validation Checks
            if (!fullName.value.trim()) {
                fullName.parentElement.classList.add("error");
                isValid = false;
            } else {
                fullName.parentElement.classList.remove("error");
            }

            if (!phone.value.trim() || phone.value.length < 10) {
                phone.parentElement.classList.add("error");
                isValid = false;
            } else {
                phone.parentElement.classList.remove("error");
            }

            if (!serviceSelect.value) {
                serviceSelect.parentElement.classList.add("error");
                isValid = false;
            } else {
                serviceSelect.parentElement.classList.remove("error");
            }

            if (!prefDate.value) {
                prefDate.parentElement.classList.add("error");
                isValid = false;
            } else {
                prefDate.parentElement.classList.remove("error");
            }

            if (!prefTime.value) {
                prefTime.parentElement.classList.add("error");
                isValid = false;
            } else {
                prefTime.parentElement.classList.remove("error");
            }

            if (isValid) {
                // Construct WhatsApp Message
                const waMessage = `Hello BeautyZone, I would like to book an appointment.%0A%0A*Name:* ${encodeURIComponent(fullName.value)}%0A*Phone:* ${encodeURIComponent(phone.value)}%0A*Service:* ${encodeURIComponent(serviceSelect.value)}%0A*Date:* ${encodeURIComponent(prefDate.value)}%0A*Time:* ${encodeURIComponent(prefTime.value)}%0A*Message:* ${encodeURIComponent(message.value || 'None')}`;
                
                generatedWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

                // Show the success popup modal
                if (successPopup) {
                    successPopup.classList.add("active");
                    document.body.classList.add("no-scroll");
                }
            }
        });
    }

    // When clicking the button inside the success popup, redirect to WhatsApp
    if (popupProceedBtn) {
        popupProceedBtn.addEventListener("click", () => {
            if (generatedWhatsAppUrl) {
                window.open(generatedWhatsAppUrl, '_blank');
            }
            if (successPopup) {
                successPopup.classList.remove("active");
            }
            document.body.classList.remove("no-scroll");
            if (bookingForm) {
                bookingForm.reset();
            }
        });
    }

    // Close popup if clicking outside the modal box
    if (successPopup) {
        successPopup.addEventListener("click", (e) => {
            if (e.target === successPopup) {
                successPopup.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        });
    }

    /* ==========================================
       6. CONTACT & FLOATING WHATSAPP LINKS
       ========================================== */
    const floatingWhatsapp = document.getElementById("floatingWhatsapp");
    const contactWhatsappBtn = document.getElementById("contactWhatsappBtn");
    const footerWhatsappBtn = document.getElementById("footerWhatsappBtn");
    const contactCallBtn = document.getElementById("contactCallBtn");
    const contactMapBtn = document.getElementById("contactMapBtn");

    const generalWaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello BeautyZone, I would like to know more about your beauty and bridal services.")}`;

    if (floatingWhatsapp) floatingWhatsapp.setAttribute("href", generalWaUrl);
    if (contactWhatsappBtn) contactWhatsappBtn.setAttribute("href", generalWaUrl);
    if (footerWhatsappBtn) footerWhatsappBtn.setAttribute("href", generalWaUrl);

    // Call Button Action
    if (contactCallBtn) {
        contactCallBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = `tel:+${WHATSAPP_NUMBER}`;
        });
    }

    // Google Maps Directions URL
    if (contactMapBtn) {
        contactMapBtn.setAttribute("href", MAP_LOCATION);
    }

    /* ==========================================
       7. BACK TO TOP BUTTON & FOOTER YEAR
       ========================================== */
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTop.classList.add("active");
        } else {
            backToTop.classList.remove("active");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Dynamic Copyright Year
    const currentYearSpan = document.getElementById("currentYear");
    if (currentYearSpan) {
        currentYearSpan.innerText = new Date().getFullYear();
    }

});