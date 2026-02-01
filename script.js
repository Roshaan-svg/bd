
      // --- LOADING SCRIPT ---
      let width = 0;
      const progressBar = document.getElementById("progress");
      const percentage = document.getElementById("percentage");

      // Start loading automatically
      window.onload = function () {
        let interval = setInterval(() => {
          if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              nextStep("loading-screen", "welcome-screen");
            }, 500); // Wait half a second before switching
          } else {
            width++;
            progressBar.style.width = width + "%";
            percentage.innerText = width + "%";
          }
        }, 30); // Speed of loading (smaller = faster)
      };

      // --- NAVIGATION FUNCTION ---
      function nextStep(currentId, nextId) {
        document.getElementById(currentId).classList.remove("active");
        document.getElementById(nextId).classList.add("active");
      }

      // --- CAKE INTERACTION ---
      function decorateCake() {
        // Change Cake Image (Optional: Use a decorated cake image)
        // document.getElementById('cake-img').src = 'decorated-cake.png';

        // Show Buntings
        document.getElementById("bunting-overlay").style.display = "block";

        // Falling confetti (simple CSS or JS logic can be added here)

        // Change Button to "Light Candle"
        const btnContainer = document.getElementById("cake-buttons");
        btnContainer.innerHTML =
          '<button class="btn" onclick="lightCandle()">🔥 Light the Candle</button>';
      }

      function lightCandle() {
        // Show Candle & Flame
        document.getElementById("candle").style.display = "block";
        document.getElementById("flame").style.display = "block";

        // Show Message
        document.getElementById("birthday-msg").style.opacity = "1";

        // Trigger Confetti Pop (The "Phuwara")
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Play music if added
        // document.getElementById('bg-music').play();

        // Change Button to "Pop Balloons"
        const btnContainer = document.getElementById("cake-buttons");
        setTimeout(() => {
          btnContainer.innerHTML =
            "<button class=\"btn\" onclick=\"nextStep('cake-screen', 'balloon-screen')\">🎈 Pop the Balloons</button>";
        }, 2000);
      }

      // --- BALLOON POPPING ---
      let balloonsPopped = 0;
      function popBalloon(element, index) {
        const balloon = element.querySelector(".balloon");
        const string = element.querySelector(".string");
        const text = element.querySelector(".hidden-text");

        // Animation: Pop effect
        if (balloon.style.opacity !== "0") {
          balloon.style.transition = "transform 0.2s, opacity 0.2s";
          balloon.style.transform = "scale(1.5)";
          balloon.style.opacity = "0";

          setTimeout(() => {
            string.style.opacity = "0"; // Hide string
            text.style.opacity = "1"; // Show text
          }, 200);

          // Small confetti burst at balloon position
          // (Advanced: Calculate position, but simple pop works for now)

          balloonsPopped++;
          if (balloonsPopped === 4) {
            document.getElementById("balloon-next").style.display = "block";
          }
        }
      }

      // --- MESSAGE ENVELOPE ---
      function openMessage() {
        document.getElementById("envelope").style.display = "none";
        document.getElementById("message-card").style.display = "block";
        document.getElementById("msg-next").style.display = "inline-block";
      }

      // --- FINAL GIFT ---
      function openGift() {
        const giftBox = document.getElementById("gift-box");
        giftBox.style.display = "none";

        const reveal = document.getElementById("final-reveal");
        reveal.style.display = "flex";
        reveal.style.animation = "fadeIn 1s";

        // Final Confetti Rain
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        var random = function (min, max) {
          return Math.random() * (max - min) + min;
        };

        var interval = setInterval(function () {
          var timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          // since particles fall down, start a bit higher than random
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 },
            }),
          );
          confetti(
            Object.assign({}, defaults, {
              particleCount,
              origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 },
            }),
          );
        }, 250);
      }