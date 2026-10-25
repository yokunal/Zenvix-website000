/**
 * ZENVIX AUTOMATION - 1990s Retro AI Chat Simulator
 * Interactive WhatsApp Bot Experience (Aria AI for Star Gym & Fitness)
 * High-contrast, keyboard-interactive, voice-enabled with Web Speech synthesis.
 */

(function () {
  "use strict";

  // Pre-configured rich responses
  const RESPONSES = {
    greeting: {
      text: "Hello! Welcome to <strong>Star Gym &amp; Fitness</strong>! 💪 I am <strong>Aria</strong>, your 24/7 AI membership concierge across our 9 branches. How can I help you reach your fitness goals today?",
      spoken: "Hello! Welcome to Star Gym and Fitness. I'm Aria, your 24/7 AI membership concierge. How can I help you today?"
    },

    pricing: {
      html: `
        <p>Here are our verified membership plans across all 9 Star Gym branches:</p>
        <div class="chat-pricing-table">
          <div class="chat-plan-card">
            <div class="chat-plan-title">MONTHLY PASS</div>
            <div class="chat-plan-price">₹1,499</div>
            <div class="chat-plan-cycle">per month</div>
            <div class="chat-plan-desc">Full gym floor, cardio equipment &amp; locker access</div>
          </div>
          <div class="chat-plan-card is-featured">
            <span class="chat-plan-badge">★ POPULAR</span>
            <div class="chat-plan-title">QUARTERLY</div>
            <div class="chat-plan-price">₹3,999</div>
            <div class="chat-plan-cycle">for 3 months</div>
            <div class="chat-plan-desc">Save 15% + 1 Free certified trainer assessment</div>
          </div>
          <div class="chat-plan-card">
            <span class="chat-plan-badge" style="background:#1f2f55;">👑 VIP ANNUAL</span>
            <div class="chat-plan-title">ANNUAL VIP</div>
            <div class="chat-plan-price">₹11,999</div>
            <div class="chat-plan-cycle">for 12 months</div>
            <div class="chat-plan-desc">Unlimited steam, sauna + personalized diet chart</div>
          </div>
        </div>
        <p style="margin-top: 8px;">
          💡 <em>Tip: You can try out our equipment first with a <strong>Free 1-Day Trial Demo Session</strong> before joining!</em>
        </p>
      `,
      spoken: "Here are our current membership plans: Monthly pass at 1,499 rupees, Quarterly transformation at 3,999 with a free trainer assessment, and our Annual VIP plan at 11,999 rupees including custom diet charts and steam access."
    },

    demo: {
      text: "We would love to host you! 🏋️ You can experience our facility with a <strong>Free 1-Day VIP Workout Demo Session</strong>.<br><br>Which branch would you prefer? We have branches in <strong>Siliguri City Mall</strong>, <strong>Hill Cart Road</strong>, and <strong>Sevoke Road</strong>. Preferred time: Morning (6-10 AM) or Evening (5-9 PM)?",
      spoken: "We would love to host you! Would you like to book a free one-day trial workout demo session? Which branch and time works best for you?"
    },

    pass: {
      html: `
        <p>Your VIP Trial Session has been scheduled! Here is your digital entry pass:</p>
        <div class="chat-vip-ticket">
          <div class="ticket-header">
            <span class="ticket-title">★ STAR GYM &amp; FITNESS // VIP DEMO PASS ★</span>
            <span class="ticket-status-tag">CONFIRMED</span>
          </div>
          <div class="ticket-grid">
            <div class="ticket-cell">
              <strong>PASS NUMBER:</strong>
              <span>#SG-DEMO-8842</span>
            </div>
            <div class="ticket-cell">
              <strong>GUEST NAME:</strong>
              <span>Rohit S. (Prospect)</span>
            </div>
            <div class="ticket-cell">
              <strong>BRANCH LOCATION:</strong>
              <span>City Mall, Siliguri (#3)</span>
            </div>
            <div class="ticket-cell">
              <strong>RESERVED SLOT:</strong>
              <span>Tomorrow @ 6:00 PM IST</span>
            </div>
            <div class="ticket-cell" style="grid-column: span 2;">
              <strong>SESSION PERKS:</strong>
              <span>Full Floor Trial + Free Body-Fat Assessment + Locker</span>
            </div>
          </div>
          <div class="ticket-barcode" aria-hidden="true"></div>
        </div>
        <p style="margin-top: 8px; font-size: 0.88rem; color: #1b6e3f; font-weight: 600;">
          ✅ A confirmation SMS &amp; WhatsApp pass has been dispatched to your mobile. See you on the gym floor!
        </p>
      `,
      spoken: "Your free VIP trial demo session is officially confirmed! Pass number SG-DEMO-8842 has been generated and dispatched to your WhatsApp. See you on the gym floor!"
    },

    branches: {
      text: "📍 <strong>Star Gym &amp; Fitness Branch Network:</strong><br>• <strong>Siliguri Hub 1:</strong> City Mall, 3rd Floor (Opp. Cinepolis)<br>• <strong>Siliguri Hub 2:</strong> Hill Cart Road, Near Mahananda Bridge<br>• <strong>Siliguri Hub 3:</strong> Sevoke Road, 2nd Mile<br>• <em>+ 6 other regional partner clubs</em><br><br>⏰ <strong>Timings:</strong> Mon–Sat: 5:30 AM – 10:00 PM | Sun: 6:00 AM – 1:00 PM.",
      spoken: "Star Gym operates across 9 branches in India, open Monday to Saturday from 5:30 AM to 10:00 PM, and Sundays 6:00 AM to 1:00 PM."
    },

    default: {
      text: "Thanks for reaching out! As Star Gym's AI assistant, I can help you with <strong>membership prices</strong>, <strong>booking free trial workouts</strong>, or <strong>trainer facilities</strong>. Click one of the quick options below or send us a message on WhatsApp for instant support!",
      spoken: "Thanks for reaching out! I can help you with membership prices, booking free trial workouts, or branch timings. How can I help you today?"
    }
  };

  // Full automated demo conversation sequence
  const AUTO_DEMO_STEPS = [
    {
      role: "user",
      text: "Hi! I want to check membership plans and pricing for Star Gym.",
      delay: 500
    },
    {
      role: "ai",
      type: "pricing",
      delay: 1400
    },
    {
      role: "user",
      text: "Can I book a demo session first before joining?",
      delay: 4200
    },
    {
      role: "ai",
      type: "demo",
      delay: 1500
    },
    {
      role: "user",
      text: "Yes please! Book a demo session for tomorrow at 6 PM at the Siliguri City Mall branch.",
      delay: 4000
    },
    {
      role: "ai",
      type: "pass",
      delay: 1800
    }
  ];

  function initChatSimulator(container) {
    if (!container) return;

    const chatViewport = container.querySelector(".retro-chat-viewport");
    const typingIndicator = container.querySelector(".chat-typing-box");
    const avatarBox = container.querySelector(".chat-avatar-box");
    const btnVoice = container.querySelector(".btn-voice");
    const btnAutoPlay = container.querySelector(".btn-autoplay");
    const btnReset = container.querySelector(".btn-reset");
    const chatInput = container.querySelector(".chat-text-input");
    const btnSend = container.querySelector(".chat-send-btn");
    const promptChips = container.querySelectorAll(".chat-prompt-chip");

    let voiceEnabled = true;
    let isAutoPlaying = false;
    let autoPlayTimeout = null;
    let availableVoices = [];

    // Pre-cache voices
    if ("speechSynthesis" in window) {
      const fetchVoices = () => {
        availableVoices = window.speechSynthesis.getVoices() || [];
      };
      fetchVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = fetchVoices;
      }
    }

    function getCurrentTimeStr() {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minsStr = mins < 10 ? "0" + mins : mins;
      return hours + ":" + minsStr + " " + ampm;
    }

    function stopSpeech() {
      if ("speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      if (avatarBox) avatarBox.classList.remove("is-talking");
    }

    function speakText(text) {
      if (!voiceEnabled || !text || !("speechSynthesis" in window)) {
        return;
      }

      stopSpeech();

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.05;

        if (availableVoices.length > 0) {
          const naturalVoice = availableVoices.find(
            v =>
              (v.lang.startsWith("en-IN") || v.lang.startsWith("en-GB") || v.lang.startsWith("en-US")) &&
              (v.name.includes("Female") || v.name.includes("Zira") || v.name.includes("Google") || v.name.includes("Samantha"))
          ) || availableVoices.find(v => v.lang.startsWith("en"));

          if (naturalVoice) utterance.voice = naturalVoice;
        }

        utterance.onstart = () => {
          if (avatarBox) avatarBox.classList.add("is-talking");
        };
        utterance.onend = () => {
          if (avatarBox) avatarBox.classList.remove("is-talking");
        };
        utterance.onerror = () => {
          if (avatarBox) avatarBox.classList.remove("is-talking");
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }

    function appendMessage(sender, htmlContent, textContent, timestamp) {
      const row = document.createElement("div");
      row.className = "chat-msg-row " + sender;

      const label = document.createElement("span");
      label.className = "chat-sender-label";
      label.textContent = sender === "user" ? "YOU (PROSPECT)" : "ARIA AI // STAR GYM CONCIERGE";
      row.appendChild(label);

      const card = document.createElement("div");
      card.className = "chat-bubble-card";
      if (htmlContent) {
        card.innerHTML = htmlContent;
      } else {
        card.innerHTML = textContent;
      }
      row.appendChild(card);

      const timeEl = document.createElement("span");
      timeEl.className = "chat-timestamp";
      timeEl.textContent = timestamp || getCurrentTimeStr();
      row.appendChild(timeEl);

      chatViewport.appendChild(row);
      chatViewport.scrollTop = chatViewport.scrollHeight;
    }

    function showTyping(show) {
      if (!typingIndicator) return;
      typingIndicator.style.display = show ? "inline-flex" : "none";
      if (show) {
        chatViewport.scrollTop = chatViewport.scrollHeight;
      }
    }

    function respondWith(responseKey) {
      const res = RESPONSES[responseKey] || RESPONSES.default;
      showTyping(true);

      setTimeout(() => {
        showTyping(false);
        if (res.html) {
          appendMessage("ai", res.html, null);
        } else {
          appendMessage("ai", null, res.text);
        }
        if (res.spoken) {
          speakText(res.spoken);
        }
      }, 700);
    }

    function handleUserInput(rawText) {
      const text = rawText ? rawText.trim() : "";
      if (!text) return;

      appendMessage("user", null, text);
      if (chatInput) chatInput.value = "";

      const lower = text.toLowerCase();
      if (lower.includes("price") || lower.includes("plan") || lower.includes("cost") || lower.includes("fee") || lower.includes("charge")) {
        respondWith("pricing");
      } else if (lower.includes("pass") || lower.includes("confirm") || lower.includes("ticket") || lower.includes("6 pm") || lower.includes("rohit")) {
        respondWith("pass");
      } else if (lower.includes("demo") || lower.includes("trial") || lower.includes("book") || lower.includes("join") || lower.includes("workout")) {
        respondWith("demo");
      } else if (lower.includes("branch") || lower.includes("where") || lower.includes("location") || lower.includes("timing") || lower.includes("hour")) {
        respondWith("branches");
      } else {
        respondWith("default");
      }
    }

    function runAutoPlayDemo() {
      if (isAutoPlaying) return;
      isAutoPlaying = true;
      resetChat(false);

      if (btnAutoPlay) {
        btnAutoPlay.innerHTML = `<span>❚❚</span> <span>Playing...</span>`;
      }

      let stepIndex = 0;

      function nextStep() {
        if (!isAutoPlaying || stepIndex >= AUTO_DEMO_STEPS.length) {
          isAutoPlaying = false;
          if (btnAutoPlay) {
            btnAutoPlay.innerHTML = `<span>▶</span> <span>Auto-Play Demo</span>`;
          }
          return;
        }

        const step = AUTO_DEMO_STEPS[stepIndex++];
        autoPlayTimeout = setTimeout(() => {
          if (step.role === "user") {
            appendMessage("user", null, step.text);
            nextStep();
          } else {
            showTyping(true);
            setTimeout(() => {
              showTyping(false);
              const res = RESPONSES[step.type];
              if (res.html) {
                appendMessage("ai", res.html, null);
              } else {
                appendMessage("ai", null, res.text);
              }
              if (res.spoken) speakText(res.spoken);
              nextStep();
            }, 800);
          }
        }, step.delay);
      }

      nextStep();
    }

    function resetChat(addGreeting = true) {
      if (autoPlayTimeout) clearTimeout(autoPlayTimeout);
      isAutoPlaying = false;
      stopSpeech();
      chatViewport.innerHTML = "";
      if (btnAutoPlay) {
        btnAutoPlay.innerHTML = `<span>▶</span> <span>Auto-Play Demo</span>`;
      }

      if (addGreeting) {
        appendMessage("ai", null, RESPONSES.greeting.text, "10:14 AM");
        speakText(RESPONSES.greeting.spoken);
      }
    }

    // Attach Event Listeners
    if (btnVoice) {
      btnVoice.addEventListener("click", () => {
        voiceEnabled = !voiceEnabled;
        if (voiceEnabled) {
          btnVoice.innerHTML = `<span>🔊</span> <span>Voice: ON</span>`;
          btnVoice.classList.add("is-active");
          btnVoice.setAttribute("aria-pressed", "true");
        } else {
          stopSpeech();
          btnVoice.innerHTML = `<span>🔇</span> <span>Voice: MUTED</span>`;
          btnVoice.classList.remove("is-active");
          btnVoice.setAttribute("aria-pressed", "false");
        }
      });
    }

    if (btnAutoPlay) {
      btnAutoPlay.addEventListener("click", () => {
        if (isAutoPlaying) {
          if (autoPlayTimeout) clearTimeout(autoPlayTimeout);
          isAutoPlaying = false;
          btnAutoPlay.innerHTML = `<span>▶</span> <span>Auto-Play Demo</span>`;
          stopSpeech();
        } else {
          runAutoPlayDemo();
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        resetChat(true);
      });
    }

    if (btnSend && chatInput) {
      btnSend.addEventListener("click", () => {
        handleUserInput(chatInput.value);
      });

      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleUserInput(chatInput.value);
        }
      });
    }

    if (promptChips) {
      promptChips.forEach(chip => {
        chip.addEventListener("click", () => {
          const action = chip.getAttribute("data-action");
          if (action === "pricing") {
            appendMessage("user", null, "What are your gym membership plans and pricing?");
            respondWith("pricing");
          } else if (action === "demo") {
            appendMessage("user", null, "I would like to book a free demo workout session!");
            respondWith("demo");
          } else if (action === "pass") {
            appendMessage("user", null, "Confirm my booking for Siliguri City Mall branch tomorrow at 6 PM.");
            respondWith("pass");
          } else if (action === "branches") {
            appendMessage("user", null, "Where are your branches located and what are your timings?");
            respondWith("branches");
          }
        });
      });
    }

    // Initialize with greeting
    resetChat(true);
  }

  // Auto-init on page load
  document.addEventListener("DOMContentLoaded", () => {
    const chatWindows = document.querySelectorAll(".retro-chat-window");
    chatWindows.forEach(win => {
      initChatSimulator(win);
    });
  });
})();
