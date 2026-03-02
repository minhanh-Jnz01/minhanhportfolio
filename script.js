      const lenis = new Lenis({
        duration: 1.2, // Thời gian lướt
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Hàm easing mượt
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // 2. Kích hoạt hiệu ứng "lăn trang" khi click menu
      document.querySelectorAll(".nav-link").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          // Nếu là link nội bộ (có dấu #)
          if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            lenis.scrollTo(targetId); // Lenis xử lý việc cuộn mượt
          }
        });
      });

      // 3. Khởi tạo các thư viện khác
      AOS.init({ duration: 1000, once: true });
      VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });

      new Typed(".typing-text", {
        strings: [
          "Sunflower 🌻",
          "Creative Coder",
          "UI/UX Designer",
          "Future Engineer",
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 1500,
      });
      new Typed(".typing-about-title", {
        strings: ["Girl in Tech", "Problem Solver", "Art Enthusiast"],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true,
      });

      const nav = document.querySelector(".nav");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      });

      const dot = document.querySelector(".cursor-dot");
      const circle = document.querySelector(".cursor-circle");
      window.addEventListener("mousemove", (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        circle.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 500, fill: "forwards" }
        );
      });

      document.querySelectorAll(".hover-target").forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("hovering")
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("hovering")
        );
      });

      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bar = entry.target;
              bar.style.width = bar.style.getPropertyValue("--goal");
            }
          });
        },
        { threshold: 0.5 }
      );
      document
        .querySelectorAll(".prof-bar-inner")
        .forEach((bar) => skillObserver.observe(bar));

      // 4. LOGIC DARK/LIGHT MODE
      const themeBtn = document.getElementById("theme-toggle");
      const htmlEl = document.documentElement;
      const icon = themeBtn.querySelector("i");

      // Check Local Storage
      const currentTheme = localStorage.getItem("theme") || "light";
      htmlEl.setAttribute("data-theme", currentTheme);
      updateIcon(currentTheme);

      themeBtn.addEventListener("click", () => {
        let theme = htmlEl.getAttribute("data-theme");
        let newTheme = theme === "light" ? "dark" : "light";

        htmlEl.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
      });

      function updateIcon(theme) {
        if (theme === "dark") {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      }