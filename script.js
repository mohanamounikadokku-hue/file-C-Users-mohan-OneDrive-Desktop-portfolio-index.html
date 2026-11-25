    // Keep the mobile menu, section indicator, and entrance motion in sync.
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = [...document.querySelectorAll(".nav-link")];
    const pageSections = [...document.querySelectorAll("main section[id]")];

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("open", !isOpen);
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    pageSections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

    document.getElementById("year").textContent = new Date().getFullYear();

    // Replace this example address with your preferred contact email.
    const contactEmail = "mohana@example.com";
    document.getElementById("contact-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const fields = new FormData(form);
      const subject = `Portfolio message from ${fields.get("name")}`;
      const body = `From: ${fields.get("name")} (${fields.get("email")})\n\n${fields.get("message")}`;
      const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      document.getElementById("form-status").textContent = "Your email app should open with the message ready to send.";
      window.location.href = mailto;
    });
