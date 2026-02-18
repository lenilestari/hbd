document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // 2. Initialize Swiper
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    display: "1", // Show one slide primarily on mobile
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // 3. Audio Control
  const audio = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = document.getElementById("musicIcon");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      musicIcon.textContent = "🎵"; // Muted/Paused
      musicBtn.classList.remove("animate-spin");
    } else {
      audio.play();
      musicIcon.textContent = "⏸️"; // Playing
      musicBtn.classList.add("animate-spin");
    }
    isPlaying = !isPlaying;
  });

  // Attempt autoplay (might be blocked by browser policy)
  document.body.addEventListener(
    "click",
    () => {
      if (!isPlaying) {
        audio.play().catch((e) => console.log("Audio play blocked"));
        isPlaying = true;
        musicIcon.textContent = "⏸️";
        musicBtn.classList.add("animate-spin");
      }
    },
    { once: true },
  );

  // 4. Gift Box Interaction
  window.openGift = function () {
    const giftContainer = document.querySelector(".gift-box-container");
    const giftMessage = document.getElementById("gift-message");

    if (!giftContainer.classList.contains("opened")) {
      giftContainer.classList.add("opened");

      // Fire Confetti
      fireConfetti();

      // Show Message
      setTimeout(() => {
        giftMessage.classList.remove("hidden");
        setTimeout(() => {
          giftMessage.classList.remove("scale-0");
          giftMessage.classList.add("scale-100");
        }, 100);
      }, 600);
    }
  };

  window.closeGift = function () {
    const giftMessage = document.getElementById("gift-message");
    giftMessage.classList.remove("scale-100");
    giftMessage.classList.add("scale-0");
    setTimeout(() => {
      giftMessage.classList.add("hidden");
    }, 500);

    // Reset box? Optional.
    // document.querySelector('.gift-box-container').classList.remove('opened');
  };

  function fireConfetti() {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        }),
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
});
