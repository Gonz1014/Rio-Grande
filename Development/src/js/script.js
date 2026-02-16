// ===============================
// Smooth Scrolling
// ===============================
let lenis;
const initSmoothScrolling = () => {
  // Check if device is mobile (touch device or small screen)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768 ||
    'ontouchstart' in window;

  // Only initialize Lenis on non-mobile devices
  if (!isMobile) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
};

// ===============================
// Smooth Scroll to Links
// ===============================
const setupLenisSmoothScrollLinks = () => {
  const lenisTargetElements = document.querySelectorAll(".lenis-scroll-to");

  lenisTargetElements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      const target = ele.getAttribute("href");

      if (target) {
        lenis.scrollTo(target, {
          offset: -100,
          duration: 1.7,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      }
    });
  });
};

// ===============================
// Dark Mode Handler
// ===============================
const DarkMode = {
  init() {
    this.elements = {
      darkIcon: document.getElementById("theme-toggle-dark-icon"),
      lightIcon: document.getElementById("theme-toggle-light-icon"),
      toggleBtn: document.getElementById("theme-toggle"),
    };

    this.setInitialTheme();
    this.bindEvents();
  },

  setInitialTheme() {
    const isDark =
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      this.elements.lightIcon?.classList.remove("hidden");
      document.documentElement?.classList.add("dark");
    } else {
      this.elements.darkIcon?.classList.remove("hidden");
      document.documentElement?.classList.remove("dark");
    }
  },

  bindEvents() {
    if (this.elements.toggleBtn) {
      this.elements.toggleBtn.addEventListener("click", () =>
        this.toggleTheme()
      );
    }
  },

  toggleTheme() {
    this.elements.darkIcon.classList.toggle("hidden");
    this.elements.lightIcon.classList.toggle("hidden");

    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("color-theme", isDark ? "dark" : "light");
  },
};

// ===============================
// Animations
// ===============================
const Animations = {
  initHeroGradient() {
    const wrapper = document.getElementById("hero-gradient-wrapper");
    const bg = document.getElementById("hero-gradient");
    if (wrapper && bg) {
      gsap
        .to(wrapper, {
          scale: 0.6,
          repeat: -1,
          duration: 3,
          yoyo: true,
          ease: Linear.easeNone,
        })
        .play();

      gsap
        .to(bg, {
          repeat: -1,
          duration: 3,
          rotation: 360,
          ease: Linear.easeNone,
        })
        .play();
    }
  },

  initPointerAnimation() {
    const pointer = document.querySelector(".pointer");

    if (window.innerWidth >= 1023) {
      ["mousemove", "mouseenter"].forEach((eventType) => {
        document.addEventListener(eventType, (e) => {
          gsap.to(pointer, {
            duration: 0.8,
            left: e.clientX,
            top: e.clientY,
            ease: "expo.out",
          });
        });
      });
    }
  },

  initTextReveal() {
    const splitTypes = document.querySelectorAll(".reveal-text");
    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: "words" });
      gsap.from(text.words, {
        scrollTrigger: {
          trigger: char,
          start: "top 34%",
          end: "top -10%",
          scrub: window.innerWidth >= 768,
          pin: window.innerWidth >= 768 ? ".about" : false,
          pinSpacing: window.innerWidth >= 768,
        },
        opacity: 0.2,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      });
    });
  },

  initTextReveal2() {
    const splitTypes = document.querySelectorAll(".reveal-text-2");
    splitTypes.forEach((char) => {
      const text = new SplitType(char, { types: "words" });
      gsap.from(text.words, {
        scrollTrigger: {
          trigger: char,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0.2,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      });
    });
  },

  initHorizontalScroll() {
    const servicesWrapper = document.querySelector(".service-wrapper");
    if (!servicesWrapper) return;

    // Only run on desktop (768px and above)
    if (window.innerWidth < 768) return;

    // Calculate the total scrollable width
    const calculateScrollAmount = () => {
      const containerWidth = servicesWrapper.parentElement.offsetWidth;
      const scrollWidth = servicesWrapper.scrollWidth;
      return -(scrollWidth - containerWidth);
    };

    // Create the animation
    const scrollAnimation = gsap.to(servicesWrapper, {
      x: calculateScrollAmount,
      duration: 3,
      ease: "none",
    });

    // Set up ScrollTrigger
    ScrollTrigger.create({
      trigger: ".service-section",
      start: "top top",
      end: () => `+=${Math.abs(calculateScrollAmount())}`,
      pin: true,
      animation: scrollAnimation,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    // Refresh ScrollTrigger on resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  },

  initCtaImageReveal() {
    const ctaImage = document.getElementById("cta-img");
    if (!ctaImage) {
      return;
    }
    gsap.from(ctaImage, {
      scale: 0,
      rotation: -45,
      duration: 2.1,
      ease: "elastic.out(1.4, 1.2)",
      scrollTrigger: {
        trigger: ctaImage,
        start: "top 70%",
        end: "top 30%",
        scrub: false,
      },
    });
  },

  initImageHorizontalScroll() {
    const imageContainer = document.getElementById(
      "extra-large-image-container"
    );

    if (!imageContainer) {
      return;
    }

    ScrollTrigger.addEventListener("refreshInit", () => { });

    gsap.to(imageContainer, {
      x: () =>
        -(imageContainer.scrollWidth - document.documentElement.clientWidth),
      ease: "none",
      pin: true,
      scrollTrigger: {
        trigger: imageContainer,
        pin: false,
        start: "top 90%",
        end: () =>
          `+=${imageContainer.scrollWidth - document.documentElement.clientWidth
          }`,
        scrub: 1,
        invalidateOnRefresh: false,
        anticipatePin: 1,
      },
    });

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  },

  initSectionTitles() {
    const titles = document.querySelectorAll(".text-appear");
    titles.forEach((title) => {
      const titleText = new SplitType(title, { types: "lines" });
      titleText.lines.forEach((lines) => {
        const lineText = new SplitType(lines, { types: "words" });
        gsap.from(lineText.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 59%",
            end: "top 30%",
            scrub: false,
          },
          y: 120,
          rotation: 21,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    });
  },

  initSectionTitles2() {
    const titles = document.querySelectorAll(".text-appear-2");
    titles.forEach((title) => {
      const titleText = new SplitType(title, { types: "lines" });
      titleText.lines.forEach((lines) => {
        const lineText = new SplitType(lines, { types: "words" });
        gsap.from(lineText.words, {
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            end: "top 30%",
            scrub: false,
          },
          y: 120,
          rotation: 21,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    });
  },

  initRevealElements() {
    const elements = document.querySelectorAll(".reveal-me");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 95,
        rotation: 2,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  },

  initRevealElementsV2() {
    const elements = document.querySelectorAll(".reveal-me-2");
    elements.forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 95%",
          end: "top 50%",
          scrub: false,
        },
        opacity: 0,
        y: 95,
        rotation: 2,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  },

  initZoomAnimation() {
    const zoomElem = document.querySelector(".zoom-image");
    if (zoomElem) {
      gsap.to(zoomElem, {
        scale: 3.2,
        ease: "expoScale",
        scrollTrigger: {
          trigger: zoomElem,
          start: "top 20%",
          end: "top -30%",
          pin: true,
          scrub: 1,
        },
      });
    }
  },
  initVideoAnimation() {
    const videoElem = document.querySelector(".video-wrapper");
    if (!videoElem) return;
    gsap.to(videoElem, {
      scale: 1,
      scrollTrigger: {
        trigger: ".video-parents",
        start: "top 80%",
        end: "top 0%",
        scrub: 1,
      },
    });
  },
  initScaleSmallAnimation() {
    const bigToSmallImg = document.querySelector(".scale-small-img");
    if (!bigToSmallImg) return;
    gsap.to(bigToSmallImg, {
      scale: 0.8,
      scrollTrigger: {
        trigger: bigToSmallImg,
        start: "top 50%",
        end: "top 0%",
        scrub: 1,
        ease: "power4.inOut",
      },
    });
  },
  initScaleSmallAnimation2() {
    const bigToSmallImg = document.querySelector(".scale-hero-img");
    if (!bigToSmallImg) return;
    gsap.to(bigToSmallImg, {
      scale: 0.94,
      duration: 0.8,
      scrollTrigger: {
        trigger: bigToSmallImg,
        start: "top 7%",
        end: "top 0%",
        scrub: 1,
        ease: "power4.inOut",
      },
    });
  },
  initBlogCardScaleAnimation() {
    const blogCards = document.querySelectorAll(".blog-card");

    if (blogCards.length > 0) {
      blogCards[0].classList.add("active-card");
    }

    blogCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        blogCards.forEach((c) => c.classList.remove("active-card"));

        this.classList.add("active-card");
      });
    });
  },
  initAboutImageScaleAnimation() {
    const aboutImages = document.querySelectorAll(".about-image");

    if (aboutImages.length > 0) {
      aboutImages[0].classList.add("about-active-image");
    }

    aboutImages.forEach((image) => {
      image.addEventListener("mouseenter", function () {
        aboutImages.forEach((elem) =>
          elem.classList.remove("about-active-image")
        );

        this.classList.add("about-active-image");
      });
    });
  },
  initRandomImageAnimation() {
    const heroHeading = document.getElementById("hero-button");
    const decorativeImages = document.querySelectorAll(".decorative-image");

    const imagePaths = [
      "/images/home-4/random-1.png",
      "/images/home-4/random-2.png",
      "/images/home-4/random-3.png",
      "/images/home-4/random-4.png",
      "/images/home-4/random-5.png",
      "/images/home-4/random-6.png",
    ];

    const translations = [
      { x: "-50%", y: "-8%" },
      { x: "50%", y: "-8%" },
      { x: "0%", y: "-8%" },
      { x: "0%", y: "-8%" },
      { x: "-50%", y: "-8%" },
      { x: "0%", y: "-8%" },
    ];

    if (heroHeading && decorativeImages) {
      heroHeading.addEventListener("mouseenter", () => {
        decorativeImages.forEach((img, index) => {
          const randomPath =
            imagePaths[Math.floor(Math.random() * imagePaths.length)];
          const translation = translations[index % translations.length];

          gsap.to(img, {
            duration: 0.7,
            x: translation.x,
            y: translation.y,
            opacity: 0,
            onComplete: () => {
              img.src = randomPath;

              gsap.set(img, {
                x: translation.x,
                y: translation.y,
                opacity: 0,
                scale: 0,
              });

              gsap.to(img, {
                duration: 0.7,
                opacity: 1,
                scale: 1,
              });
            },
          });
        });
      });

      heroHeading.addEventListener("mouseleave", () => {
        decorativeImages.forEach((img, index) => {
          const translation = translations[index % translations.length];

          gsap.to(img, {
            duration: 0.7,
            x: translation.x,
            y: translation.y,
            opacity: 0,
            onComplete: () => {
              img.src = img.dataset.originalSrc || img.src;

              gsap.set(img, { x: "0%", y: "0%", opacity: 0, scale: 0 });

              gsap.to(img, {
                duration: 0.7,
                opacity: 1,
                scale: 1,
              });
            },
          });
        });
      });

      decorativeImages.forEach((img) => {
        img.dataset.originalSrc = img.src;
      });
    }
  },
  careerImageGalleryAnimation() {
    const careerImage1 = document.getElementById("career-image-1");
    const careerImage2 = document.getElementById("career-image-2");
    const careerImage3 = document.getElementById("career-image-3");
    const careerImage4 = document.getElementById("career-image-4");

    if (!careerImage1 || !careerImage2 || !careerImage3 || !careerImage4)
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: careerImage1,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.from(careerImage1, {
      duration: 0.8,
      x: -100,
      opacity: 0,
    })
      .from(
        careerImage2,
        {
          duration: 0.8,
          x: 100,
          opacity: 0,
        },
        "-=0.3"
      ) // Start 0.3 seconds before the previous animation ends
      .from(
        careerImage3,
        {
          duration: 0.8,
          y: 100,
          opacity: 0,
        },
        "-=0.3"
      )
      .from(
        careerImage4,
        {
          duration: 0.8,
          y: -100,
          opacity: 0,
        },
        "-=0.3"
      );
  },
  startHeroImageAnimation() {
    const heroImage1 = document.getElementById("hero-1");
    const heroImage2 = document.getElementById("hero-2");
    const heroImage3 = document.getElementById("hero-3");
    const heroImage4 = document.getElementById("hero-4");

    if (!heroImage1 || !heroImage2 || !heroImage3 || !heroImage4) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroImage1,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    tl.from(heroImage1, {
      duration: 0.8,
      x: -300,
      opacity: 0,
    })
      .from(
        heroImage2,
        {
          duration: 0.8,
          x: 100,
          opacity: 0,
        },
        "-=0.3"
      ) // Start 0.3 seconds before the previous animation ends
      .from(
        heroImage3,
        {
          duration: 0.8,
          y: 100,
          opacity: 0,
        },
        "-=0.3"
      )
      .from(
        heroImage4,
        {
          duration: 0.8,
          y: -100,
          opacity: 0,
        },
        "-=0.3"
      );
  },
  initHeroImagesAnimationV2() {
    const heroImage1 = document.getElementById("hero-image-1");
    const heroImage2 = document.getElementById("hero-image-2");
    const heroImage3 = document.getElementById("hero-image-3");
    const heroButton = document.getElementById("hero-button-02");

    // GSAP animations for hover effect
    if (heroButton && heroImage1 && heroImage2 && heroImage3) {
      // Hover animation
      heroButton.addEventListener("mouseenter", () => {
        gsap.to(heroImage1, {
          duration: 0.5,
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
        });
        gsap.to(heroImage2, {
          duration: 0.5,
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
        });
        gsap.to(heroImage3, {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
        });
      });

      // Hover out animation (revert to original state)
      heroButton.addEventListener("mouseleave", () => {
        gsap.to(heroImage1, {
          duration: 0.7,
          x: -320,
          opacity: 0.8,
          rotate: -20,
          ease: "power2.out",
        });
        gsap.to(heroImage2, {
          duration: 0.7,
          x: 280,
          opacity: 0.8,
          rotate: 20,
          ease: "power2.out",
        });
        gsap.to(heroImage3, {
          duration: 0.6,
          scale: 0,
          opacity: 0.8,
          rotate: -17,
          ease: "power2.out",
        });
      });
    }
  },
  initTableHoverAnimation() {
    const preview = document.querySelector("#preview");
    const previewImg = document.querySelector("#preview-img");
    const rows = document.querySelectorAll("#projects .row");

    rows.forEach((row) => {
      const imgSrc = row.getAttribute("data-img");

      row.addEventListener("mouseenter", () => {
        previewImg.src = imgSrc;

        gsap.to(preview, {
          duration: 0.3,
          scale: 1,
          rotate: 15,
          ease: "power2.out",
        });
      });

      row.addEventListener("mousemove", (e) => {
        const offsetX = preview.offsetWidth / 2;
        const offsetY = preview.offsetHeight / 2;

        preview.style.left = `${e.pageX - offsetX}px`;
        preview.style.top = `${e.pageY - offsetY}px`;
      });

      row.addEventListener("mouseleave", () => {
        gsap.to(preview, {
          duration: 0.3,
          scale: 0,
          rotate: -15,
          ease: "power2.out",
        });
      });
    });
  },
  initSocialProofSvgAnimation() {
    TweenMax.to("#master", 40, {
      rotation: 360,
      svgOrigin: "326 326",
      ease: Linear.easeNone,
      repeat: -1,
    });
    TweenMax.to("#master > g", 40, {
      rotation: -360,
      transformOrigin: "center center",
      ease: Linear.easeNone,
      repeat: -1,
    });
  },
};

// ===============================
// Components
// ===============================
const Components = {
  initCircleText(selector = ".text", angleStep = 10.3) {
    const text = document.querySelector(selector);
    if (!text) return;

    const rotateChar = (char, i) =>
      `<span style="transform:rotate(${i * angleStep}deg)">${char}</span>`;

    requestAnimationFrame(() => {
      text.innerHTML = Array.from(text.textContent.trim())
        .map(rotateChar)
        .join("");
    });
  },

  initCircleTextV2(selector = ".text-2", angleStep = 10.3) {
    const text = document.querySelector(selector);
    if (!text) return;

    const rotateChar = (char, i) =>
      `<span style="transform:rotate(${i * angleStep}deg)">${char}</span>`;

    requestAnimationFrame(() => {
      text.innerHTML = Array.from(text.textContent.trim())
        .map(rotateChar)
        .join("");
    });
  },

  initScrollingMarquee() {
    const marqueeInner = document.querySelector(".marquee-inner");
    if (!marqueeInner) return;

    // Store original content
    const originalContent = marqueeInner.innerHTML;

    // Create a seamless loop by duplicating content multiple times
    marqueeInner.innerHTML =
      originalContent + originalContent + originalContent;

    // Get the width of one set of items
    const contentWidth = marqueeInner.offsetWidth / 3;

    // Create the animation with seamless loop
    gsap.to(marqueeInner, {
      x: -contentWidth * 2,
      duration: 25,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        // Reset position instantly when animation repeats
        gsap.set(marqueeInner, { x: 0 });
      },
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener(
      "resize",
      () => {
        if (resizeTimeout) {
          window.cancelAnimationFrame(resizeTimeout);
        }

        resizeTimeout = window.requestAnimationFrame(() => {
          const newContentWidth = marqueeInner.offsetWidth / 3;
          gsap.set(marqueeInner, { x: 0 });
          gsap.to(marqueeInner, {
            x: -newContentWidth * 2,
            duration: 25,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(marqueeInner, { x: 0 });
            },
          });
        });
      },
      { passive: true }
    );

    // Optimize for mobile
    if ("ontouchstart" in window) {
      marqueeInner.style.willChange = "transform";
      gsap.set(marqueeInner, {
        force3D: true,
        backfaceVisibility: "hidden",
      });
    }
  },

  initFAQ() {
    const items = document.querySelectorAll(".accordion-item");
    const itemsV4 = document.querySelectorAll(".accordion-itemV4");
    const itemsV5 = document.querySelectorAll(".accordion-itemV5");

    // Regular FAQ
    const closeAll = () => {
      items.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const body = item.querySelector(".accordion-body");
        header.classList.remove("open", "active");
        body.style.height = "0";
        item.style.borderColor = "transparent";
        item.style.paddingBottom = "0";
      });
    };

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const isOpen = header.classList.contains("open");
        closeAll();
        if (!isOpen) {
          header.classList.add("open", "active");
          const body = item.querySelector(".accordion-body");
          body.style.height = `${body.scrollHeight}px`;
          item.style.border = "1px solid black";
          item.style.paddingBottom = "40px";
        }
      });
    });

    // FAQ V4
    const removeOpen = (activeIndex) => {
      itemsV4.forEach((item, index) => {
        if (index !== activeIndex) {
          const header = item.querySelector(".accordion-headerV4");
          const body = item.querySelector(".accordion-bodyV4");
          header.classList.remove("open", "active");
          body.style.height = "0";
          body.style.marginBottom = "0";
          item.setAttribute("data-active", "false");
        }
      });
    };

    itemsV4.forEach((item, index) => {
      const header = item.querySelector(".accordion-headerV4");
      const body = item.querySelector(".accordion-bodyV4");

      item.setAttribute("data-active", "false");

      header.addEventListener("click", () => {
        const isOpen = header.classList.toggle("open");
        removeOpen(index);

        if (isOpen) {
          body.style.height = `${body.scrollHeight}px`;
          header.classList.add("active");
          item.setAttribute("data-active", "true");
          body.style.marginBottom = "20px";
        } else {
          body.style.height = "0";
          header.classList.remove("active");
          item.setAttribute("data-active", "false");
          body.style.marginBottom = "0";
        }
      });
    });

    // Faq V5

    // Regular FAQ
    const closeAll2 = () => {
      itemsV5.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const body = item.querySelector(".accordion-body");
        header.classList.remove("open", "active");
        body.style.height = "0";
        item.style.paddingBottom = "0";
      });
    };

    itemsV5.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", () => {
        const isOpen = header.classList.contains("open");
        closeAll2();
        if (!isOpen) {
          header.classList.add("open", "active");
          const body = item.querySelector(".accordion-body");
          body.style.height = `${body.scrollHeight}px`;

          item.style.paddingBottom = "40px";
        }
      });
    });
  },

  initCounter() {
    const section = document.querySelector("#counter");
    if (!section) return;

    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        counters.forEach((counter, index) => {
          const updateCounter = () => {
            const maxValue = +counter.getAttribute("data-value");
            const currentCount = +counter.innerText || 0;
            const increment = Math.ceil(maxValue / 100);

            if (currentCount < maxValue) {
              counter.innerText = Math.min(currentCount + increment, maxValue);
              setTimeout(updateCounter, 20);
            }
          };

          counter.innerText = "0";
          updateCounter();

          const parent = counter.parentElement;
          parent.style.opacity = "0";
          parent.style.transform = "translateY(20px)";

          setTimeout(() => {
            parent.style.transition = "all 0.7s ease";
            parent.style.opacity = "1";
            parent.style.transform = "translateY(0)";
          }, index * 200);
        });

        observer.unobserve(section);
      },
      { threshold: 0.17 }
    );

    observer.observe(section);
  },

  initTeam() {
    const tabMembers = document.querySelectorAll(".tab-member");
    const teamDetails = document.querySelector(".our-team-details");
    let isAnimating = false;

    function updateTeamMember(selectedTab) {
      if (isAnimating) return;
      isAnimating = true;

      teamDetails.classList.add("transitioning");

      setTimeout(() => {
        const newTitle = selectedTab.querySelector("h3").textContent;
        const newRole = selectedTab.querySelector("p").textContent;
        const newImage = selectedTab.querySelector("img").src;

        teamDetails.querySelector("h2").textContent = newTitle;
        teamDetails.querySelector("p").textContent = newRole;
        teamDetails.querySelector("img").src = newImage;

        // Force browser reflow
        void teamDetails.offsetWidth;

        teamDetails.classList.remove("transitioning");

        setTimeout(() => {
          isAnimating = false;
        }, 400);
      }, 300);
    }

    tabMembers.forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("tab-active") || isAnimating) return;

        // Remove active class from current active tab
        document.querySelector(".tab-active")?.classList.remove("tab-active");

        tab.classList.add("tab-active");

        updateTeamMember(tab);
      });
    });
  },

  initPricingToggle() {
    const toggle = document.getElementById("toggle");
    const monthlyOption = document.getElementById("monthlyOption");
    const yearlyOption = document.getElementById("yearlyOption");
    const monthlyCharge = document.getElementById("monthlyCharge");
    const yearlyCharge = document.getElementById("yearlyCharge");
    let isYearly = false;

    if (toggle) {
      monthlyOption.classList.add("active");

      toggle.addEventListener("click", () => {
        isYearly = !isYearly;
        toggle.classList.toggle("yearly");
        monthlyOption.classList.toggle("active");
        yearlyOption.classList.toggle("active");

        monthlyCharge.style.display = isYearly ? "none" : "block";
        yearlyCharge.style.display = isYearly ? "block" : "none";
      });
    }
  },

  initCtaSlider() {
    const ctaInlineSlider = document.querySelector(".cta-inline-slider");
    let currentSlide = 0;
    const totalSlides = 3;

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      if (ctaInlineSlider) {
        ctaInlineSlider.style.transform = `translateY(-${currentSlide * 100
          }px)`;
      }
    }

    setInterval(nextSlide, 3000);
  },

  initHeadroom() {
    const myElement = document.getElementById("header");
    if (myElement) {
      const headroom = new Headroom(myElement);
      headroom.init();
    }
  },

  initMarquees() {
    new InfiniteMarquee({
      element: ".marquee-container",
      speed: 120000,
      smoothEdges: true,
      direction: "left",
      pauseOnHover: true,
      gap: "30px",
      duplicateCount: 1,
      mobileSettings: {
        direction: "top",
        speed: 150000,
      },
      on: {
        beforeInit: () => console.log("Not Yet Initialized"),
        afterInit: () => console.log("Initialized"),
      },
    });

    new InfiniteMarquee({
      element: ".marquee-reverse-container",
      speed: 120000,
      smoothEdges: true,
      direction: "right",
      pauseOnHover: true,
      gap: "30px",
      duplicateCount: 1,
      mobileSettings: {
        direction: "right",
        speed: 150000,
      },
      on: {
        beforeInit: () => console.log("Not Yet Initialized"),
        afterInit: () => console.log("Initialized"),
      },
    });
  },

  initSkewMarquee() {
    const skewMarquee = document.getElementById("skew-Marquee");
    if (skewMarquee) {
      gsap.from(skewMarquee, {
        scrollTrigger: {
          trigger: skewMarquee,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
        },
        y: 200,
        skewX: "0deg",
        skewY: "0deg",
        rotation: 0,
        duration: 3,
      });
    }
  },

  initVideoPlayPause() {
    if (!document.querySelector(".custom-modal")) {
      const modalHTML = `
        <div class="custom-modal">
          <div class="modal-overlay"></div>
          <div class="modal-container">
            <div class="modal-content">
              <button class="modal-close">&times;</button>
              <div class="video-container"></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    // Selectors
    const modal = document.querySelector(".custom-modal");
    const overlay = document.querySelector(".modal-overlay");
    const content = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".modal-close");
    const videoIframeContainer = document.querySelector(".video-container");

    //  open the modal a specific video
    function openModal(videoLink) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Animation
      gsap.set([overlay, content], { opacity: 0 });
      gsap.set(content, { scale: 0.8, y: 40 });

      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
      }).to(
        content,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1"
      );

      const videoId = videoLink.split("v=")[1];

      videoIframeContainer.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;
    }

    //  close the modal
    function closeModal() {
      const tl = gsap.timeline();

      tl.to(content, {
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.2"
      );

      tl.eventCallback("onComplete", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        videoIframeContainer.innerHTML = ""; // Clear  iframe
      });
    }

    function initVideoSections() {
      const videoSections = document.querySelectorAll(".video-section");

      videoSections.forEach((section) => {
        const videos = section.querySelectorAll(".hero-video");

        videos.forEach((video) => {
          video.addEventListener("click", (e) => {
            e.preventDefault();
            const videoLink = video.getAttribute("href");
            openModal(videoLink);
          });
        });
      });
    }

    initVideoSections();

    // Close modal events
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
  },

  initHeroShowCaseVideo() {
    const videoWrapperArea = document.getElementById("heroToggleShowCaseVideo");
    const video = document.getElementById("hero-show-case-video");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    gsap.set(pauseIcon, { scale: 0, opacity: 0 });

    if (!videoWrapperArea) return;

    videoWrapperArea.addEventListener("click", function () {
      if (video.paused) {
        video.play();

        gsap.to(playIcon, {
          scale: 1.8,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        });

        gsap.to(pauseIcon, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(pauseIcon, {
          scale: 0,
          opacity: 0,
          delay: 0.4,
          duration: 0.6,
          ease: "power2.inOut",
        });
      } else {
        video.pause();

        gsap.to(pauseIcon, {
          opacity: 0,
          scale: 0,
          duration: 0.9,
          ease: "power2.out",
        });

        gsap.to(playIcon, {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        });
      }
    });
  },
};

// ===============================
// Menu Handler
// ===============================
const MenuHandler = {
  init() {
    this.elements = {
      menu: document.querySelector(".menu"),
      overflow: document.querySelector(".menu-overflow"),
      items: document.querySelectorAll(".menu-list"),
      anchors: document.querySelectorAll(".menu-list-item"),
      dropdownAnchors: document.querySelectorAll(".menu-list-item-anchor"),
      openBtn: document.querySelector(".menu-open"),
      closeBtn: document.querySelector(".menu-close"),
    };

    // Create a smoother timeline with custom ease
    this.timeline = gsap.timeline({
      paused: true,
      defaults: {
        ease: "custom",
        duration: 0.8,
      },
    });

    // Define custom ease for smoother animation
    gsap.registerEase("custom", function (progress) {
      return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    });

    this.setupInitialState();
    this.createTimeline();
    this.bindEvents();
  },

  setupInitialState() {
    // Enhanced initial state with more subtle transforms
    gsap.set(this.elements.menu, {
      pointerEvents: "none",
      autoAlpha: 0,
    });
    gsap.set(this.elements.overflow, {
      pointerEvents: "none",
      autoAlpha: 0,
      y: -30,
      rotate: -1,
      scale: 0.98,
    });
    gsap.set(this.elements.items, {
      autoAlpha: 0,
      y: -10,
      scale: 0.95,
    });
    gsap.set(this.elements.closeBtn, {
      autoAlpha: 0,
      y: -10,
      scale: 0.95,
    });
  },

  createTimeline() {
    // Smoother timeline with overlapping animations
    this.timeline
      // Background fade in
      .to(
        this.elements.menu,
        {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )

      // Overflow container animation
      .to(
        this.elements.overflow,
        {
          autoAlpha: 1,
          pointerEvents: "auto",
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.6,
          ease: "custom",
        },
        0.1
      )

      // Menu items stagger with smoother timing
      .to(
        this.elements.items,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: {
            amount: 0.4,
            ease: "power2.out",
          },
          duration: 0.7,
          ease: "custom",
        },
        0.2
      )

      // Close button fade in
      .to(
        this.elements.closeBtn,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        0.3
      )
      // Open button animation
      .to(
        this.elements.openBtn,
        {
          autoAlpha: 0,
          y: -10,
          scale: 0.95,
          duration: 0.5,
          delay: 0.3,
          ease: "back.out(1.7)",
        },
        0.1
      )

      // Body state
      .to(
        "body",
        {
          overflow: "hidden",
          pointerEvents: "none",
          duration: 0.1,
        },
        0
      );
  },

  bindEvents() {
    if (this.elements.openBtn) {
      this.elements.openBtn.addEventListener("click", () => this.open());
    }

    if (this.elements.closeBtn) {
      this.elements.closeBtn.addEventListener("click", () => this.close());
    }

    this.elements.dropdownAnchors.forEach((elem) => {
      elem.addEventListener("click", () => this.handleDropdownClick(elem));
    });
  },

  handleDropdownClick(clickedElem) {
    if (window.screen.width >= 768) {
      this.elements.dropdownAnchors.forEach((elem) => {
        elem.classList.remove("active");
      });
      clickedElem.classList.add("active");
    } else {
      clickedElem.classList.toggle("active");
    }
  },

  open() {
    // Add subtle scale to the opening animation
    gsap.set(this.elements.overflow, { scale: 0.98 });
    this.elements.openBtn.classList.add("opacity-0");
    this.timeline.timeScale(1).play();
    this.elements.menu.style.pointerEvents = "auto";
  },

  close() {
    // Faster close animation
    this.elements.openBtn.classList.remove("opacity-1");
    gsap.to(this.elements.openBtn, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    this.timeline.timeScale(1.2).reverse();
    this.elements.menu.style.pointerEvents = "none";
  },
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core functionality
  initSmoothScrolling();
  setupLenisSmoothScrollLinks();
  DarkMode.init();
  MenuHandler.init();

  // Initialize components
  Components.initCircleText();
  Components.initCircleTextV2();
  Components.initScrollingMarquee();
  Components.initFAQ();
  Components.initCounter();
  Components.initTeam();
  Components.initPricingToggle();
  Components.initCtaSlider();
  Components.initHeadroom();
  Components.initMarquees();
  Components.initSkewMarquee();
  Components.initVideoPlayPause();
  Components.initHeroShowCaseVideo();

  // Initialize animations
  Animations.initHeroGradient();
  Animations.initPointerAnimation();
  Animations.initTextReveal();
  Animations.initTextReveal2();
  Animations.initHorizontalScroll();
  Animations.initImageHorizontalScroll();
  Animations.initCtaImageReveal();
  Animations.initSectionTitles();
  Animations.initSectionTitles2();
  Animations.initRevealElements();
  Animations.initRevealElementsV2();
  Animations.initZoomAnimation();
  Animations.initVideoAnimation();
  Animations.initScaleSmallAnimation();
  Animations.initScaleSmallAnimation2();
  Animations.initBlogCardScaleAnimation();
  Animations.initAboutImageScaleAnimation();
  Animations.initRandomImageAnimation();
  Animations.careerImageGalleryAnimation();
  Animations.startHeroImageAnimation();
  Animations.initHeroImagesAnimationV2();
  Animations.initTableHoverAnimation();
  Animations.initSocialProofSvgAnimation();

  // Initialize sliders
  initializeSliders();
});

// Initialize sliders separately for better organization
function initializeSliders() {
  // User Review slide----------
  new Swiper(".user-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1500,
    allowTouchMove: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // User Review slide V2----------
  new Swiper(".user-swiper-v2", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 1500,
    allowTouchMove: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    pagination: {
      el: ".swiper-pagination-v2",
      clickable: true,
    },
  });

  // testimonial slide-----------------
  new Swiper("#reviewer", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 700,
    // effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Custom 3D Slider
  const slider = document.querySelector("#custom-3d-slider");

  if (slider) {
    const slides = slider.querySelectorAll(".slide");
    let currentIndex = 0;
    let intervalId;

    function updateSlider() {
      const totalSlides = slides.length;
      const gap = 20; // Space between slides
      const slideWidth = slides[0].offsetWidth;

      slides.forEach((slide, index) => {
        const offset = index - currentIndex;
        const zIndex = totalSlides - Math.abs(offset);

        let xPos = offset * (slideWidth + gap);
        let scale = 1 - Math.abs(offset) * 0.2;
        let opacity = 1 - Math.abs(offset) * 0.1;
        let zPos = -Math.abs(offset) * 100;

        if (offset === 0) {
          scale = 1.2;
          zPos = 0;
        }

        slide.style.transform = `translateX(${xPos}px) translateZ(${zPos}px) scale(${scale})`;
        slide.style.opacity = opacity;
        slide.style.zIndex = zIndex;
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }

    function startSlider() {
      intervalId = setInterval(nextSlide, 2500);
    }

    function stopSlider() {
      clearInterval(intervalId);
    }

    // Start the slider initially
    updateSlider();
    startSlider();

    //  Pause on hover,
    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", () => {
        stopSlider(); // Pause sliding
      });

      slide.addEventListener("mouseleave", () => {
        startSlider(); // Resume sliding
      });
    });
  }
  // ai-slide-------------------
  new Swiper(".ai-swiper-container", {
    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });

  new Swiper(".cardSwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: false,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
      },
      1430: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
      },
    },
  });
}

// ----------------------
