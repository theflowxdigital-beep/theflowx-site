(function ($) {
  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: Cretio
  | Author: Thememarch
  | Version: 1.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  | 1. Preloader  
  | 2. Mobile Menu
  | 3. Dark Mode
  | 4. Sticky Header
  | 5. Dynamic Background
  | 6. Swiper Initialization
  | 7. Modal Video
  | 8. Scroll Up
  | 9. Accordion
  | 10. Countdown Timer
  | 11. Title Animation 
  | 12. Fade Animation
  | 13. Text Color Change 
  | 14. Video Section ParallaxBg
  | 15. Hover Blog Card Animation
  | 16. Hover Price Package 
  | 17. Circle Button Animation
  | 18. Images Left Show Animation
  | 19. PlayVideo Buttons Animation
  | 20. Blog Crad Animation
  | 21. Image Scroll Animation
  | 22. Hero One Animation
  | 23. Services Branding Animation
  | 24. Update Background Image
  | 25. Methodology Animation
  | 26. Slider Text Context
  | 27. Skill Bar Animation
  | 28. Footer Text Animation
  | 29. Isotop Filter
  | 30. About aAimate Stars
  | 31. Contact Stroke TitleAnim
  | 32. Newsletter Content
  | 33. Feature Item HoverAnim
  | 34. Comming Soon Count Down
  */
  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function (e) {
    $(window).trigger("scroll");
    $(window).trigger("resize");
    initPreloader();

  });

  $(window).on("scroll", function () {
    showScrollUp();
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
  gsap.config({
    nullTargetWarn: false,
  });

  const lenis = new Lenis({
    lerp: 0.07
  });

  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    initSwiper();
    modalVideo();
    scrollUp();
    initAccordion();
    funFactCounter();
    initializeTitleAnimation();
    fadeAnimation();
    textColorShiption()
    parallaxBg();
    hoverImagesServiceCard();
    packageContent();
    circleBtnAnim();
    imgAnimLeftShow();
    playVideoBlockAnim();
    blogCardAnim();
    imageScroll();
    heroOne();
    skillBar();
    footerText();
    startCountdown();
    animateStars();
    updateBackgroundImage();
    contactStrokeTitleAnim();
    isotopItems();
    servicesBrandingAnimation();
    methodologyCardContent();
    sliderTextContext();
    newsletterContentAnim();
    featureItemHoverAnim();
  });



  /*--------------------------------------------------------------
    1. Preloader  
  --------------------------------------------------------------*/
  function initPreloader() {
    if ($.exists("#preloader")) {
      const loadingPercent = document.querySelector(".loading-percent");
      const preloader = document.getElementById("preloader");
      const text = document.querySelector("#svgText");

      const length = text.getComputedTextLength();
      text.style.strokeDasharray = length;
      text.style.strokeDashoffset = length;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(preloader, {
            duration: 0.5,
            ease: "power4.inOut",
            opacity: 0,
            onComplete: () => {
              preloader.style.display = "none";
            },
          });
        },
      });

      gsap.to(text, {
        strokeDashoffset: 0,
        duration: 3,
        delay: 0.2,
        opacity: 1,
        ease: "power4.inOut",
      }, 0);

      tl.to(
        loadingPercent,
        {
          innerText: 100,
          duration: 2.5,
          ease: "power4.inOut",
          roundProps: "innerText",
          onUpdate: function () {
            loadingPercent.innerText =
              Math.floor(this.targets()[0].innerText) + "%";
          },
        },
        0
      );
    }
  }

  /*--------------------------------------------------------------
    2. Mobile Menu  
  --------------------------------------------------------------*/
  function mainNav() {
    $(".ak-nav").append('<span class="ak-munu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="ak-munu_dropdown_toggle"></span>'
    );

    $(".ak-munu_toggle").on("click", function () {
      $(this)
        .toggleClass("ak-toggle_active")
        .siblings(".ak-nav_list")
        .slideToggle();
    });

    $(".ak-munu_dropdown_toggle").on("click", function () {
      $(this)
        .toggleClass("active")
        .siblings("ul")
        .slideToggle()
        .parent()
        .toggleClass("active");
    });

    $(".menu-item-has-black-section").append(
      '<span class="ak-munu_dropdown_toggle_1"></span>'
    );

    $(".ak-munu_dropdown_toggle_1").on("click", function () {
      $(this)
        .toggleClass("active")
        .siblings("ul")
        .slideToggle()
        .parent()
        .toggleClass("active");
    });


  }

  /*--------------------------------------------------------------
    3. Dark Mode
  --------------------------------------------------------------*/
  if ($.exists(".mode-toggle")) {
    $("#open").on("click", function () {
      $(this).hide();
      $("#clecel").show();
      $(".setting-mode").css("right", "35px");
      $(".mode-btn").css({
        right: "0",
      });
    });

    $("#clecel").on("click", function () {
      $(this).hide();
      $("#open").show();
      $(".setting-mode").css("right", "0");
      $(".mode-btn").css({
        right: "-40px",
      });
    });

    $(".js-mode-type button").on("click", function () {
      $(this).addClass("active").siblings().removeClass("active");
      let mode_val = $(".js-mode-type button.active").attr("data-mode");
      if (mode_val === "dark") {
        $("body").addClass("dark");
        textColorShiption()
        updateBackgroundImage()
      } else {
        $("body").removeClass("dark");
        textColorShiption()
        updateBackgroundImage()
      }
    });
  }

  /*--------------------------------------------------------------
    4. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    const $header = $(".ak-sticky_header");
    const headerHeight = $header.outerHeight() + 30;
    let lastScrollTop = 0;

    $(window).on("scroll", function () {
      const windowTop = $(window).scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("ak-gescout_sticky");
      } else {
        $header.removeClass("ak-gescout_sticky ak-gescout_show");
      }

      if ($header.hasClass("ak-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("ak-gescout_show");
        } else {
          $header.removeClass("ak-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }


  /*--------------------------------------------------------------
    5. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      const src = $(this).attr("data-src");
      $(this).css("background-image", `url(${src})`);
    });
  }

  /*--------------------------------------------------------------
    6. Swiper Initialization
  --------------------------------------------------------------*/

  function initSwiper() {
    if ($.exists(".partners-logos-slider")) {
      let swiper = new Swiper(".partners-logos-slider", {
        loop: true,
        speed: 500,
        autoplay: false,
        slidesPerView: "auto",
        centeredSlides: false,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
        scrollbar: {
          el: ".partners-logs-scrollbar",
        },
        navigation: {
          nextEl: ".partners-logs-button-next",
          prevEl: ".partners-logs-button-prev",
        },
      });
    }
    if ($.exists(".ak-team-slider")) {
      let swiper = new Swiper(".ak-team-slider", {
        loop: true,
        speed: 500,
        autoplay: false,
        spaceBetween: 15,
        slidesPerView: "4.5",
        breakpoints: {
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 2.5 },
          1200: { slidesPerView: 4.5 },
        },
        pagination: {
          clickable: true,
        },
        scrollbar: {
          el: ".team-logs-scrollbar",
        },
        navigation: {
          nextEl: '.team-logs-button-next',
          prevEl: '.team-logs-button-prev',
        },
        on: {
          onComplete: function () {
            animateSwiperSlides();
          }
        }
      });

      function animateSwiperSlides() {
        gsap.utils.toArray(".swiper-slide .team-img-top").forEach((element) => {
          let img = element.querySelector('img');
          let imgHeight = img.clientHeight;

          gsap.set(element, { overflow: 'hidden' });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              scrub: true,
              pin: false,
              start: "top bottom",
              end: "bottom top",
            },
          });

          tl.fromTo(img, {
            yPercent: -20,
            ease: 'none',
          }, {
            yPercent: 20,
            ease: 'none',
          });
        });
      }

      animateSwiperSlides();
    }
    if ($.exists(".ak-news-blog-slider")) {
      let swiper = new Swiper(".ak-news-blog-slider", {
        loop: true,
        speed: 500,
        autoplay: false,
        spaceBetween: 15,
        slidesPerView: "auto",
        centeredSlides: false,
        breakpoints: {
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
        pagination: {
          clickable: true,
        },
        scrollbar: {
          el: ".news-blog-scrollbar",
        },
        navigation: {
          nextEl: '.news-blog-button-next',
          prevEl: '.news-blog-button-prev',
        },
      });

    }
    if ($.exists(".ak-news-slider")) {
      let swiper = new Swiper(".ak-news-slider", {
        loop: true,
        speed: 500,
        autoplay: false,
        spaceBetween: 20,
        slidesPerView: "auto",
        pagination: {
          clickable: true,
        },
        scrollbar: {
          el: ".news-logs-scrollbar",
        },
        navigation: {
          nextEl: '.news-logs-button-next',
          prevEl: '.news-logs-button-prev',
        },
        on: {
          onComplete: function () {
            animateSwiperSlides();
          }
        }
      });

      function animateSwiperSlides() {
        gsap.utils.toArray(".swiper-slide .news-img-top").forEach((element) => {
          let img = element.querySelector('img');
          let imgHeight = img.clientHeight;

          gsap.set(element, { overflow: 'hidden' });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              scrub: true,
              pin: false,
              start: "top bottom",
              end: "bottom top",
            },
          });

          tl.fromTo(img, {
            yPercent: -20,
            ease: 'none',
          }, {
            yPercent: 20,
            ease: 'none',
          });
        });
      }

      animateSwiperSlides();
    }
    if ($.exists(".testmonial-slider")) {
      let swiper = new Swiper(".testmonial-slider", {
        loop: false,
        speed: 500,
        autoplay: false,
        spaceBetween: 0,
        slidesPerView: "1",
        breakpoints: {
          991: {
            slidesPerView: 2,
          },
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: ".testmonial-button-next",
          prevEl: ".testmonial-button-prev",
        },
      });
    }
    if ($.exists(".testmonial-slider-2")) {
      let swiper = new Swiper(".testmonial-slider-2", {
        loop: true,
        speed: 1000,
        autoplay: false,
        spaceBetween: 0,
        slidesPerView: "1",
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: ".ts-next-2",
          prevEl: ".ts-prev-2",
        },

      });
    }
    if ($.exists(".creactive-portflio-slider")) {
      let swiper = new Swiper(".creactive-portflio-slider", {
        loop: true,
        speed: 1500,
        autoplay: false,
        slidesPerView: "auto",
        runCallbacksOnInit: true,
        parallax: true,
        zoom: {
          maxRatio: 1.2,
          minRation: 1,
        },
        keyboard: {
          enabled: true,
        },

        pagination: {
          el: '.cp-swiper-pagination',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
          },
          formatFractionCurrent: function (number) {
            return String(number).padStart(2, '0');
          },
          formatFractionTotal: function (number) {
            return String(number).padStart(2, '0');
          }
        },

        navigation: {
          nextEl: ".partners-logs-button-next",
          prevEl: ".partners-logs-button-prev",
        },
        on: {
          slideChangeTransitionStart: function () {
            animateSwiperSlides()
          }
        }
      });
      function animateSwiperSlides() {
        let activeSlide = document.querySelector(".swiper-slide-active .cp-hero-title");
        if (activeSlide) {
          let split = new SplitText(activeSlide, { type: "chars, words" });
          gsap.fromTo(
            split.chars,
            { opacity: 0, y: 20, rotateX: 90 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              stagger: 0.05,
              ease: "power2.out",
            }
          );
        }
      }
      animateSwiperSlides()
    }
    if ($.exists(".client-logo-slider")) {
      let swiper = new Swiper(".client-logo-slider", {
        loop: true,
        speed: 500,
        autoplay: false,
        spaceBetween: 0,
        slidesPerView: "auto",
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: ".client-logo-next",
          prevEl: ".client-logo-prev",
        },
      });
    }
    if ($.exists(".marketing-agency-slider")) {
      let swiper = new Swiper(".marketing-agency-slider", {
        speed: 500,
        autoplay: false,
        spaceBetween: 0,
        slidesPerView: "auto",
        effect: "fade",
        on: {
          slideChangeTransitionStart: function () {
            let activeSlide = $(".swiper-slide-active");
            let subTitle = activeSlide.find(".sub-title");
            let mainTitle = activeSlide.find(".main-title");
            let caption = activeSlide.find(".marketing-agency-caption");
            let heroImg = activeSlide.find(".hero-bg-img");

            let tl = gsap.timeline({ defaults: { duration: 1 } });

            tl.fromTo(
              heroImg,
              { opacity: 0, scale: 1.5 },
              { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
            );

            tl.fromTo(
              subTitle,
              { y: 50, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 1.2, ease: "power3.out",

              },
              "-=0.8"
            );

            tl.fromTo(
              mainTitle,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", },
              "-=0.8"
            );

            tl.fromTo(
              caption,
              { x: -100, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
              "-=0.6"
            );
          },
        },
      });
    }
    if ($.exists(".core-features.style2")) {
      let swiper = new Swiper(".core-features.style2", {
        loop: true,
        speed: 500,
        autoplay: false,
        spaceBetween: 30,
        slidesPerView: "5",
        breakpoints: {
          400: { slidesPerView: 1 },
          580: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1199: { slidesPerView: 3 },
          1399: { slidesPerView: 4 },
          1499: { slidesPerView: 5 },
        },
        pagination: {
          clickable: true,
        },
        navigation: {
          nextEl: ".core-features-button-next",
          prevEl: ".core-features-button-prev",
        },
      });
    }
    if ($.exists(".core-features.slider-two")) {
      let swiper = new Swiper(".core-features.slider-two", {
        loop: true,
        speed: 500,
        spaceBetween: 30,
        slidesPerView: "1",
        breakpoints: {
          400: { slidesPerView: 1 },
          580: { slidesPerView: 1 },
          767: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
        },
        pagination: {
          clickable: true,
          el: '.core-features-swiper-pagination',
        },

      });
    }

  }

  /*--------------------------------------------------------------
    7. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on("click", ".ak-video-open", function (e) {
      e.preventDefault();
      const videoId = $(this).attr("href").split("?v=")[1].trim();
      $(".ak-video-popup-container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${videoId}`
      );
      $(".ak-video-popup").addClass("active");
    });

    $(".ak-video-popup-close, .ak-video-popup-layer").on("click", function (e) {
      e.preventDefault();
      $(".ak-video-popup").removeClass("active");
      $("html").removeClass("overflow-hidden");
      $(".ak-video-popup-container iframe").attr("src", "about:blank");
    });
  }

  /*--------------------------------------------------------------
    8. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $(".ak-scrollup").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 0);
    });
  }

  function showScrollUp() {
    const scroll = $(window).scrollTop();
    $(".ak-scrollup").toggleClass("ak-scrollup-show", scroll >= 350);
  }

  /*--------------------------------------------------------------
    9. Accordion
  --------------------------------------------------------------*/
  function initAccordion() {
    if ($.exists(".ak-accordion-item")) {
      $(".ak-accordion-title-content").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .next(".ak-accordion-tab")
          .slideToggle()
          .parent()
          .siblings()
          .find(".ak-accordion-tab")
          .slideUp()
          .prev()
          .removeClass("active");
      });
    }
  }

  /*--------------------------------------------------------------
    10. Countdown Timer
  --------------------------------------------------------------*/
  function funFactCounter() {
    if ($.exists(".funfact.style1")) {
      const count_number = gsap.utils.toArray(".funfact.style1");
      const count_id = gsap.utils.toArray(".amin_auto_count");


      if (count_number && count_id) {
        count_id.forEach((num) => {
          gsap.from(num, {
            scrollTrigger: {
              trigger: count_number,
              start: "top center+=200",
              markers: false,
            },
            delay: 0.3,
            innerText: 0,
            duration: 3,
            snap: {
              innerText: 1,
            },
          });
        });
        gsap.from(count_number, {
          scrollTrigger: {
            trigger: count_number,
            start: "top center+=200",
            markers: false,
          },
          scale: 0.5,
          opacity: 0,
          stagger: 0.2,
          duration: 2,
          ease: "elastic",
          force3D: true,
        });
      }
    }
  }

  /*--------------------------------------------------------------
    11. Title Animation
  --------------------------------------------------------------*/

  function initializeTitleAnimation() {
    if ($.exists(".title-anim")) {
      const cnt_title = document.querySelectorAll(".title-anim");

      cnt_title.forEach((title) => {
        let delay_value = +title.getAttribute("data-delay") || 0;
        const words = title.querySelectorAll(".anim-line-words");

        const anim = gsap.timeline({
          delay: delay_value,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none",
            markers: false
          }
        });

        words.forEach((word, wordIndex) => {
          let duration_value = +title.getAttribute("data-duration") || 1;

          const split = new SplitText(word, {
            type: "chars,words",
          });

          gsap.set(split.words, {
            position: "relative",
            overflow: "hidden"
          })

          const wordDelay = wordIndex * 0.15;

          split.chars.forEach((char, charIndex) => {
            anim.fromTo(char, {
              translateY: "100%"
            }, {
              translateY: "0%",
              duration: duration_value,
              ease: "power2.inOut"
            }, charIndex * 0.02 + wordDelay);
          });
        });
      });
    }
    if ($.exists(".anim-title-2")) {
      function animateFromDataSettings(selector) {
        const element = document.querySelector(selector);
        if (!element) return;
        gsap.from(element.querySelectorAll(".anim-title-2 div"), {
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
          duration: 0.75,
          y: 40,
          opacity: 0,
          ease: "power2.out",
          transformOrigin: "top center -50",
          delay: 0.15,
          rotationX: -80,
          stagger: 0.02,
        });
      }

      animateFromDataSettings(".title-animation-content");
    }
    if ($.exists(".text-animation")) {
      const fadeArray = gsap.utils.toArray(".text-animation");

      fadeArray.forEach((item) => {
        let split_text = item.getAttribute("data-split-text") || "chars";

        let titleSplit = new SplitText(item, { type: "chars,words" });

        let fade_direction = item.getAttribute("data-direction") || "textLeft";

        let ease_value = item.getAttribute("data-ease") || "back.out(1.7)";
        let fade_offset = +item.getAttribute("data-offset") || 50;
        let duration_value = +item.getAttribute("data-duration") || 1;
        let delay_value = +item.getAttribute("data-delay") || 0.15;
        let onscroll_value = +item.getAttribute("data-on-scroll") || 1;
        let stagger = +item.getAttribute("data-stagger") || 0.02;

        gsap.set(item, { perspective: 400 });

        if (fade_direction === "textTop") {
          gsap.set(titleSplit.words, { overflow: "hidden" });
        }

        const animationProps = {
          opacity: 0,
          duration: duration_value,
          delay: delay_value,
          ease: ease_value,
          stagger: stagger,
        };
        let elementsToAnimate = titleSplit.chars;
        switch (split_text) {
          case "chars":
            elementsToAnimate = titleSplit.chars;
            break;
          case "words":
            elementsToAnimate = titleSplit.words;
            break;
          default:
            elementsToAnimate = [item];
        }

        switch (fade_direction) {
          case "textLeft":
            animationProps.x = fade_offset;
            break;
          case "textRight":
            animationProps.x = -fade_offset;
            break;
          case "textTop":
            animationProps.y = fade_offset;
            break;
          case "textBottom":
            animationProps.y = -fade_offset;
            break;

        }
        if (onscroll_value === 1) {
          animationProps.scrollTrigger = {
            trigger: item,
            start: "top 85%",
            scrub: false,
            markers: false,
            onEnter: () => {
              if (item.querySelectorAll(".underline-anim")) {
                item.querySelectorAll(".underline-anim").forEach((line) => {
                  if (line) line.classList.add("active")
                  else return 0;

                });
              }
              else return 0;
            },
          };
        }
        gsap.from(elementsToAnimate, animationProps);

      })

    }
  }

  /*--------------------------------------------------------------
  12. Fade Animation
--------------------------------------------------------------*/
  function fadeAnimation() {
    if ($.exists(".fade-animation")) {
      const fadeArray = gsap.utils.toArray(".fade-animation");
      fadeArray.forEach((item) => {

        let fade_direction = item.getAttribute("data-direction") || "bottom";
        let fade_offset = +item.getAttribute("data-offset") || 50;
        let duration_value = +item.getAttribute("data-duration") || 1.5;
        let delay_value = +item.getAttribute("data-delay") || 0.15;
        let ease_value = item.getAttribute("data-ease") || "power2.out";
        let onscroll_value = +item.getAttribute("data-on-scroll") || 1;


        const animationProps = {
          opacity: 0,
          duration: duration_value,
          delay: delay_value,
          ease: ease_value,
        };

        switch (fade_direction) {
          case "top":
            animationProps.y = -fade_offset;
            break;
          case "left":
            animationProps.x = -fade_offset;
            break;
          case "right":
            animationProps.x = fade_offset;
            break;
          case "bottom":
            animationProps.y = fade_offset;
            break;
          default:
            animationProps.y = fade_offset;
        }

        if (onscroll_value === 1) {
          animationProps.scrollTrigger = {
            trigger: item,
            start: 'top 85%',
            markers: false,
            scrub: false
          };

        }
        gsap.from(item, animationProps,);
      });
    }
  }

  /*--------------------------------------------------------------
   13. Text Color Change
   --------------------------------------------------------------*/
  function textColorShiption() {
    if ($.exists(".text-color-shiption")) {
      const darkMode = gsap.utils.toArray(".dark");

      const textColorShiption = gsap.utils.toArray(".text-color-shiption");

      textColorShiption.forEach((elem) => {
        let colorText = +elem.getAttribute("data-color") || 0;


        const splitTexdsft = new SplitText(elem, {
          type: "chars, words",
          linesClass: "split-line",
        });

        if (darkMode.length !== 0) {
          gsap.set(splitTexdsft.chars, { color: "#656565" });
        } else {
          gsap.set(splitTexdsft.chars, { color: "#c1c1c1" });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            end: "bottom center",
            scrub: true,
            markers: false,
          }
        });
        tl.to(splitTexdsft.chars, {
          color: "var(--black-color)",
          stagger: 0.2,
          ease: 'power2.out',
          duration: 1.2,
        });

        if (colorText !== 0) {
          tl.to(splitTexdsft.chars, {
            color: `${colorText}`,
            stagger: 0.2,
            ease: 'power2.out',
            duration: 1.5,
          }, "2");
        }

      })
    }
  }

  /*--------------------------------------------------------------
  14. Video Section ParallaxBg
  --------------------------------------------------------------*/
  function parallaxBg() {
    if ($.exists(".ak-parallax")) {
      gsap.utils.toArray(".ak-parallax").forEach((element) => {
        if (element.length > 0) return;
        let img = element.querySelector('img') ? element.querySelector('img') : element;

        gsap.set(element, { overflow: 'hidden' });
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            scrub: true,
            pin: false,
            start: "top bottom",
            end: "bottom top",

          },
        });

        tl.fromTo(img, {
          yPercent: -20,
          ease: 'none',

        }, {
          yPercent: 20,
          ease: 'none',
        });

      });

    }
  }

  /*--------------------------------------------------------------
  15. Hover Blog Card Animation
  --------------------------------------------------------------*/
  function hoverImagesServiceCard() {
    if ($(".service-content").length > 0) {
      const $serviceContent = $(".service-content");

      $(".service-card img").each(function () {
        gsap.set(this, { scale: 0.8, opacity: 0 });
      });
      $serviceContent.on("mouseenter", ".service-card", function () {
        const $img = $(this).find("img");
        if ($img.length === 0) return;

        gsap.to($img[0], {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      });

      $serviceContent.on("mouseleave", ".service-card", function () {
        const $img = $(this).find("img");
        if ($img.length === 0) return;

        gsap.to($img[0], {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out"
        });
      });

      $serviceContent.on("mousemove", ".service-card", function (e) {
        const $card = $(this);
        const $img = $card.find("img");
        if ($img.length === 0) return;

        const rect = $card[0].getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 10;
        const y = (e.clientY - rect.top - rect.height / 2) / 10;
        gsap.to($img[0], { x, y, duration: 0.3 });
      });
    }

    if ($(".awards-list").length > 0) {
      const $awardsList = $(".awards-list");
      const $hoverImageContainer = $(".awards-hover-image");
      const $hoverImage = $("#awardsHover");
      if ($hoverImage.length === 0 || $hoverImageContainer.length === 0) return;

      const $elements = $(".awards-card");

      if ($elements.length > 0) {
        const $firstElem = $elements.first();
        const firstImgSrc = $firstElem.find("img").prop("src") || "";
        if (firstImgSrc !== "") {
          $hoverImage.prop("src", firstImgSrc);
          gsap.set($hoverImageContainer[0], { x: 0, y: 0 });
          gsap.to($hoverImageContainer[0], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
          });
        }

        $elements.on("mouseenter", function () {
          const $elem = $(this);
          const imgSrc = $elem.find("img").prop("src") || "";
          if (imgSrc === "") return;

          $hoverImage.prop("src", imgSrc);
          gsap.set($hoverImageContainer[0], { x: 0, y: 0 });
          gsap.to($hoverImageContainer[0], {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
          });
        });

        $elements.on("mouseleave", function () {
          gsap.to($hoverImageContainer[0], {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
          });
        });

        $elements.on("mousemove", function (e) {
          const $elem = $(this);
          const rect = $elem[0].getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 10;
          const y = (e.clientY - rect.top - rect.height / 2) / 10;
          gsap.to($hoverImageContainer[0], { x, y, duration: 0.3 });
        });
      }
    }
  }

  /*--------------------------------------------------------------
  16. Hover Price Package
  --------------------------------------------------------------*/
  function packageContent() {
    const $packageContent = $(".package-content");
    if (!$packageContent.length) return;
    $packageContent.on("mouseenter", ".style2", function () {
      $(".package-content .style2").removeClass("active");
      $(this).addClass("active");
    });
    $packageContent.on("mouseleave", function () {
      $(".package-content .style2").removeClass("active");
      const $defaultItem = $(".package-content .style2").eq(1);
      if ($defaultItem.length) $defaultItem.addClass("active");
    });
  }


  /*--------------------------------------------------------------
  17. Circle Button Animation
  --------------------------------------------------------------*/

  function circleBtnAnim() {
    if ($.exists(".circle-btn-anim")) {
      const strength = 40;
      $(".circle-btn-anim").on("mousemove", function (event) {
        let $circleButton = $(this);
        let bounding = this.getBoundingClientRect();
        const newX = ((event.clientX - bounding.left) / $circleButton.outerWidth()) - 0.5;
        const newY = ((event.clientY - bounding.top) / $circleButton.outerHeight()) - 0.5;
        gsap.to($circleButton, {
          x: newX * strength,
          y: newY * strength,
          ease: "power4.out",
        });

      });

      $(".circle-btn-anim").on("mouseleave", function () {
        let $circleButton = $(this);
        let $btnText = $circleButton.find(".text");
        gsap.to($circleButton, { x: 0, y: 0, ease: "power2.out" });
        if ($btnText.length > 0) {
          gsap.to($btnText, { x: 0, y: 0, ease: "power2.out" });
        }
      });
    }
  }

  /*--------------------------------------------------------------
  18. Images Left Show Animation
  --------------------------------------------------------------*/
  function imgAnimLeftShow() {
    if ($.exists(".img-anim-left-show")) {
      $(".img-anim-left-show").each(function () {
        let $imgReveal = $(this);
        let $image = $imgReveal.find("img");
        let delayValue = parseFloat($imgReveal.attr("data-delay")) || 0.15;

        gsap.timeline({
          delay: delayValue,
          scrollTrigger: {
            trigger: $imgReveal[0],
            start: "top 85%",
            scrub: false,
            markers: false,
          },
        })
          .set($imgReveal, { autoAlpha: 1 })
          .from($imgReveal, {
            xPercent: -100,
            duration: 1.2,
            ease: "power2.out"
          })
          .from($image, {
            xPercent: 100,
            scale: 1.2,
            duration: 1.5,
            ease: "power2.out",
            delay: -1.5
          })
          .fromTo($image, { yPercent: -20 }, {
            yPercent: 20,
            scrollTrigger: {
              trigger: $imgReveal[0],
              scrub: true,
              start: "top bottom",
              end: "bottom top",
              ease: "power2.out"
            }
          });
      });
    }
  }

  /*--------------------------------------------------------------
  19. PlayVideo Buttons Animation
  --------------------------------------------------------------*/
  function playVideoBlockAnim() {
    if ($.exists(".ak-video-block")) {
      gsap.utils.toArray('.ak-video-block').forEach(element => {
        const image = element.querySelector('.video-img');
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            scrub: true,
            pin: false,
            start: "top bottom",
            end: "bottom top",

          },
        });

        tl.fromTo(image, {
          yPercent: -20,
          ease: 'none',
          scale: 1

        }, {
          yPercent: 20,
          ease: 'none',
          scale: 1.2
        });
      });
    }
  }

  /*--------------------------------------------------------------
  20. Blog Crad Animation
  --------------------------------------------------------------*/
  function blogCardAnim() {
    if ($.exists(".blog-card")) {
      const blogCard = gsap.utils.toArray('.blog-card');
      blogCard.forEach(element => {
        const image = element.querySelector('img');
        gsap.fromTo(image, {
          yPercent: -20,
          ease: 'none',
        }, {
          yPercent: 20,
          scrollTrigger: {
            trigger: element,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
            ease: Power2.out,
          }
        });

      });
    }
  }
  /*--------------------------------------------------------------
  21. Image Scroll Animation
  --------------------------------------------------------------*/
  function imageScroll() {
    if ($.exists(".image-scroll")) {
      const imageScroll = gsap.utils.toArray('.image-scroll');
      imageScroll.forEach(element => {
        let data_height = +element.getAttribute("data-height") || 250;
        if (data_height) {
          gsap.set(element, { height: `${data_height}px` });
        }

        const image = element.querySelector('img');
        gsap.fromTo(image, {
          yPercent: -20,
          ease: 'none',
        }, {
          yPercent: 20,
          scrollTrigger: {
            trigger: element,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
            ease: Power2.out,
          }
        });

      });
    }
  }

  /*--------------------------------------------------------------
  22. Hero One Animation
  --------------------------------------------------------------*/
  function heroOne() {
    if ($.exists(".digital-agencye-hero")) {
      let heroTimeline = gsap.timeline({ delay: 3.2 });
      let digitalText = document.querySelectorAll(".digital-agencye-hero .digital");
      let agencyText = document.querySelectorAll(".digital-agencye-hero .agency");
      let heroButtons = gsap.utils.toArray(".digital-agencye-hero .hero-btn");
      const imgReveal = document.querySelectorAll(".hero-right-image");


      if (digitalText.length && agencyText.length && heroButtons.length) {
        let splitDigital = new SplitText(digitalText, { type: "chars,words,lines" });
        let splitAgency = new SplitText(agencyText, { type: "chars,words,lines" });

        heroTimeline.from(splitAgency.chars, {
          duration: 2.5,
          x: -250,
          autoAlpha: 0,
          stagger: 0.02,
          ease: "elastic.out(1, 0.3)",
        });

        heroTimeline.from(splitDigital.chars, {
          duration: 1,
          y: -150,
          autoAlpha: 0,
          stagger: 0.05,
          ease: "bounce.out",
        }, "0.8");

        heroTimeline.from(heroButtons, {
          duration: 1,
          autoAlpha: 0,
          y: -100,
          ease: "bounce.out",
        }, "0.5");


        heroTimeline.to(imgReveal, {
          duration: 2,
          width: "-0%",
          ease: "expo.in",
          delay: .5,
        }, "-=3.5");


      }
    }
  }

  /*--------------------------------------------------------------
  23. Services Branding Animation
  --------------------------------------------------------------*/
  function servicesBrandingAnimation() {
    if ($.exists(".services-branding")) {
      const $servicesBrandingSection = $(".services-branding");

      {
        const $headings = $servicesBrandingSection.find("h2");
        if ($headings.length === 0) return;
        $headings.on("mouseenter", function () {
          const $image = $(this).next();
          gsap.to($image[0], {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        $headings.on("mousemove", function (e) {
          const $image = $(this).next();
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to($image[0], {
            x: x - this.offsetWidth / 2,
            y: y - this.offsetHeight / 2,
            duration: 0.1,
            ease: "power1.out"
          });
        });

        $headings.on("mouseleave", function () {
          const $image = $(this).next();
          gsap.to($image[0], {
            opacity: 0,
            scale: 0.5,
            duration: 0.1,
            ease: "power2.in"
          });
        });

      }
    }
  }

  /*--------------------------------------------------------------
  24. Update Background Image
  --------------------------------------------------------------*/
  function updateBackgroundImage() {
    if ($.exists(".design-company-hero-area")) {
      const body = $('body');
      const section = $('.design-company-hero-area');
      if (body.hasClass('dark') === false) {
        section.css('background-image', 'url("assets/img/bg/design-company-hero-bg.png")');
      } else {
        section.css('background-image', 'url("assets/img/bg/design-company-hero-dark-bg.png")');
      }
    }
  }
  /*--------------------------------------------------------------
  25. Methodology Animation
  --------------------------------------------------------------*/

  function methodologyCardContent() {
    if ($.exists(".methodology-wrapper")) {
      ScrollTrigger.matchMedia({
        "(min-width: 1200px)": function () {
          let pbmitpanels = gsap.utils.toArray(
            ".methodology-wrapper .col"
          );
          const spacer = 0;
          let pbmitheight = pbmitpanels[0].offsetHeight + 125;

          pbmitpanels.forEach((pbmitpanel, i) => {
            gsap.set(pbmitpanel, { left: `${i * 25}%` })
            ScrollTrigger.create({
              trigger: pbmitpanel,
              start: () => "top 125px",
              endTrigger: ".methodology-wrapper",
              end: `bottom top+=${pbmitheight + pbmitpanels.length * spacer}`,

              pin: true,
              pinSpacing: false,
            });
          });
        },
      });
    }
  }

  /*--------------------------------------------------------------
  26. Slider Text Context
    --------------------------------------------------------------*/
  function sliderTextContext() {
    if ($.exists(".slideing-text-content")) {
      const slideingContent = document.querySelector(".slideing-text-content");
      gsap.utils.toArray(".slideing-text").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            xPercent: index === 0 ? -10 : 10,
            ease: "none",
          },
          {
            xPercent: index === 0 ? 10 : -10,
            scrollTrigger: {
              trigger: slideingContent,
              scrub: 2,
              start: "top bottom",
              end: "bottom top",
              markers: false,
              ease: "power2.out",
            },
          }
        );
      });
    }
  }
  /*--------------------------------------------------------------
   27. Skill Bar Animation
   --------------------------------------------------------------*/
  function skillBar() {
    if ($.exists(".ak-skill-fill")) {
      const skillBars = document.querySelectorAll(".ak-skill-fill");
      skillBars.forEach((skillBar) => {
        const percentage = skillBar.dataset.percentage;

        gsap.to(skillBar, {
          width: `${percentage}%`,
          duration: 2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: skillBar,
            start: "top 80%",
          },
        });
      });
    }
  }

  /*--------------------------------------------------------------
   28. Footer Text Animation
   --------------------------------------------------------------*/
  function footerText() {
    if ($.exists(".footer-cta-info")) {
      let footerTitleTwo = document.querySelectorAll(".footer-cta-info .footer-cta-title-two");

      let splitFooterTitleTwo = new SplitText(footerTitleTwo, { type: "chars" });

      let footerTimeline = gsap.timeline({ delay: 1, repeat: -1, yoyo: true });

      footerTimeline.from(splitFooterTitleTwo.chars, {
        duration: 2.5,
        x: -10,
        autoAlpha: 0,
        stagger: 0.02,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }

  /*--------------------------------------------------------------
    29. Isotop Filter
    --------------------------------------------------------------*/
  function isotopItems() {
    if ($.exists(".isotop-items-portfolio")) {

      let $portfolio = $(".isotop-items-portfolio").isotope({});

      $(".isotop-item-menu").on("click", "li", function () {
        let filterValue = $(this).attr("data-filter");
        $portfolio.isotope({
          filter: filterValue,

        });
        $(".isotop-item-menu li").removeClass("is-clicked");
        $(this).addClass("is-clicked");
      });
    }
  }
  /*--------------------------------------------------------------
   30. About aAimate Stars
   --------------------------------------------------------------*/
  function animateStars() {
    gsap.to(".star-1", {
      scrollTrigger: {
        trigger: ".star-content",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      rotation: 360,
      ease: "none",
    });
    gsap.to(".star-2", {
      scrollTrigger: {
        trigger: ".star-content",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      rotation: -360,
      ease: "none",
    });
  }

  /*--------------------------------------------------------------
  31. Contact Stroke TitleAnim
  --------------------------------------------------------------*/
  function contactStrokeTitleAnim() {
    if ($.exists(".contact-title-stroke")) {
      let footerTitleTwo = document.querySelectorAll(".contact-title-stroke");

      gsap.set(footerTitleTwo, { perspective: 600 });

      let splitFooterTitleTwo = new SplitText(footerTitleTwo, { type: "chars,words,lines" });

      const tlds = gsap.timeline({
        scrollTrigger: {
          trigger: footerTitleTwo,
          scrub: false,
          start: "top bottom",
          end: "bottom top",
        },
      });

      tlds.fromTo(
        splitFooterTitleTwo.lines,
        {
          y: 60,
          rotationY: 65,
          opacity: 0,
          transformOrigin: "50% 50% 80px"
        },
        {
          y: 0,
          rotationY: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          transformOrigin: "50% 50% 0px",
          stagger: 0.2,

        }
      );

    }
  }


  /*--------------------------------------------------------------
  32. Newsletter Content
  --------------------------------------------------------------*/
  function newsletterContentAnim() {
    if ($.exists(".newsletter-content")) {
      const cnt_title = document.querySelectorAll(".newsletter-anim");

      cnt_title.forEach((title) => {
        let delay_value = +title.getAttribute("data-delay") || 0;
        const words = title.querySelectorAll(".anim-line-words");

        const anim = gsap.timeline({
          delay: delay_value,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none",
            markers: false,
          },
          onComplete: () => {
            const newsletter_wapper_active = document.querySelectorAll(".newsletter-wapper");
            if (newsletter_wapper_active) {
              newsletter_wapper_active.forEach((line) => {
                return line.classList.add("active")
              });
            }
          }
        });

        words.forEach((word, wordIndex) => {
          let duration_value = +title.getAttribute("data-duration") || 1;

          const split = new SplitText(word, {
            type: "chars,words",
          });

          gsap.set(split.words, {
            position: "relative",
            overflow: "hidden"
          })

          const wordDelay = wordIndex * 0.15;

          split.chars.forEach((char, charIndex) => {
            anim.fromTo(char, {
              translateY: "100%"
            }, {
              translateY: "0%",
              duration: duration_value,
              ease: "power2.inOut"
            }, charIndex * 0.02 + wordDelay);
          });
        });


      });
    }
  }

  /*--------------------------------------------------------------
 33. Feature Item HoverAnim
 --------------------------------------------------------------*/

  function featureItemHoverAnim() {
    if ($.exists(".feature-area")) {
      const $featureArea = $(".feature-area");
      const $featureAreaImg = $(".feature-area-img");
      const $featureItems = $(".feature-item");

      if ($featureAreaImg.length === 0 || $featureItems.length === 0) return;

      const setActiveItem = (item) => {
        $featureItems.removeClass("active");
        $(item).addClass("active");
        const $featureItemBg = $(item).find(".feature-item-bg");
        if ($featureItemBg.length > 0 && $featureItemBg.prop("src") !== "") {
          $featureAreaImg.prop("src", $featureItemBg.prop("src"));
        }
      };

      setActiveItem($featureItems[0]);
      $featureArea.on("mouseenter", ".feature-item", function () {
        setActiveItem(this);
      });
      $featureArea.on("mouseleave", function () {
        setActiveItem($featureItems[0]);
      });
    }
  }

  /*--------------------------------------------------------------
   34. Comming Soon Count Down
   --------------------------------------------------------------*/

  function startCountdown() {
    if ($.exists(".funfact.style1")) {
      const countdownElements = {
        months: document.getElementById("months"),
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
      };
      if (!Object.values(countdownElements).every((el) => el)) {
        return;
      }

      const targetDate = new Date("2025-08-31T00:00:00").getTime();

      const updateCountdown = () => {
        const now = Date.now();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
          clearInterval(interval);
          Object.values(countdownElements).forEach((el) => {
            el.textContent = "0";
          });
          return;
        }

        const msPerMinute = 1000 * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30.44;
        const months = Math.floor(timeRemaining / msPerMonth);
        const days = Math.floor((timeRemaining % msPerMonth) / msPerDay);
        const hours = Math.floor((timeRemaining % msPerDay) / msPerHour);
        const minutes = Math.floor((timeRemaining % msPerHour) / msPerMinute);


        countdownElements.months.textContent = months;
        countdownElements.days.textContent = days;
        countdownElements.hours.textContent = hours;
        countdownElements.minutes.textContent = minutes;
      };

      const interval = setInterval(updateCountdown, 60000);
      updateCountdown();
    }
  }



})(jQuery);
