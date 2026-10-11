/**
 * ZENVIX AUTOMATION - Demo Request Installer Wizard
 * 3-step retro installer wizard using only checkboxes, radio buttons, and action buttons.
 * State kept in memory only. No tracking, storage, or backend calls.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDemoWizard();
});

function initDemoWizard() {
  const wizardContainer = document.getElementById("demo-wizard");
  if (!wizardContainer) return;

  // In-memory wizard state
  const state = {
    step: 1,
    selectedServices: [],
    preferredTime: "",
    meetingMode: ""
  };

  // DOM elements
  const stepPanes = [
    document.getElementById("wizard-step-1"),
    document.getElementById("wizard-step-2"),
    document.getElementById("wizard-step-3")
  ];
  const progressSteps = [
    document.getElementById("progress-step-1"),
    document.getElementById("progress-step-2"),
    document.getElementById("progress-step-3")
  ];
  const errorBanner = document.getElementById("wizard-error-banner");

  const btnNext1 = document.getElementById("wizard-next-1");
  const btnBack2 = document.getElementById("wizard-back-2");
  const btnNext2 = document.getElementById("wizard-next-2");
  const btnBack3 = document.getElementById("wizard-back-3");
  const btnReset = document.getElementById("wizard-reset");
  const btnSendWhatsApp = document.getElementById("wizard-send-whatsapp");

  // Summary elements on Step 3
  const summaryServices = document.getElementById("summary-services");
  const summaryTime = document.getElementById("summary-time");
  const summaryMode = document.getElementById("summary-mode");

  // Service checkboxes
  const serviceCheckboxes = wizardContainer.querySelectorAll('input[name="services"]');
  // Preferred time radios
  const timeRadios = wizardContainer.querySelectorAll('input[name="preferred-time"]');
  // Meeting mode radios
  const modeRadios = wizardContainer.querySelectorAll('input[name="meeting-mode"]');

  /**
   * Display accessible error message
   */
  function showError(msg) {
    if (!errorBanner) return;
    if (msg) {
      errorBanner.textContent = msg;
      errorBanner.classList.add("is-visible");
      errorBanner.setAttribute("role", "alert");
      errorBanner.focus();
    } else {
      errorBanner.textContent = "";
      errorBanner.classList.remove("is-visible");
      errorBanner.removeAttribute("role");
    }
  }

  /**
   * Render active step pane and progress header
   */
  function updateStepView() {
    showError(null);

    stepPanes.forEach((pane, idx) => {
      if (pane) {
        pane.classList.toggle("is-active", idx + 1 === state.step);
      }
    });

    progressSteps.forEach((stepEl, idx) => {
      if (stepEl) {
        stepEl.classList.remove("is-active", "is-complete");
        if (idx + 1 === state.step) {
          stepEl.classList.add("is-active");
          stepEl.setAttribute("aria-current", "step");
        } else if (idx + 1 < state.step) {
          stepEl.classList.add("is-complete");
          stepEl.removeAttribute("aria-current");
        } else {
          stepEl.removeAttribute("aria-current");
        }
      }
    });

    // If step 3, populate summary and update WhatsApp link
    if (state.step === 3) {
      populateSummary();
    }
  }

  /**
   * Populate summary values and build WhatsApp URL
   */
  function populateSummary() {
    if (summaryServices) {
      summaryServices.textContent = state.selectedServices.join(", ");
    }
    if (summaryTime) {
      // Ensure IST appears only once
      summaryTime.textContent = state.preferredTime + " IST";
    }
    if (summaryMode) {
      summaryMode.textContent = state.meetingMode;
    }

    // Build the required WhatsApp message:
    // Hi Zenvix, I’d like to request a demo.
    // Interested in: <selected services>
    // Preferred time: <time slot> IST
    // Meeting mode: <mode>
    // My name is: 
    const messageLines = [
      "Hi Zenvix, I’d like to request a demo.",
      "Interested in: " + state.selectedServices.join(", "),
      "Preferred time: " + state.preferredTime + " IST",
      "Meeting mode: " + state.meetingMode,
      "My name is: "
    ];
    const fullMessage = messageLines.join("\n");

    if (btnSendWhatsApp) {
      const waNumber = (typeof CONFIG !== "undefined" && CONFIG.whatsappNumber) ? CONFIG.whatsappNumber : "918509352128";
      const targetUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(fullMessage);
      btnSendWhatsApp.setAttribute("href", targetUrl);
      btnSendWhatsApp.setAttribute("target", "_blank");
      btnSendWhatsApp.setAttribute("rel", "noopener noreferrer");
    }
  }

  // --- Step 1 Navigation ---
  if (btnNext1) {
    btnNext1.addEventListener("click", () => {
      const checked = Array.from(serviceCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      if (checked.length === 0) {
        showError("Please select at least one service before proceeding to Step 2.");
        return;
      }

      state.selectedServices = checked;
      state.step = 2;
      updateStepView();
    });
  }

  // --- Step 2 Navigation ---
  if (btnBack2) {
    btnBack2.addEventListener("click", () => {
      state.step = 1;
      updateStepView();
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener("click", () => {
      const selectedTime = Array.from(timeRadios).find(r => r.checked);
      const selectedMode = Array.from(modeRadios).find(r => r.checked);

      if (!selectedTime) {
        showError("Please select a preferred time window.");
        return;
      }

      if (!selectedMode) {
        showError("Please select a preferred meeting mode.");
        return;
      }

      state.preferredTime = selectedTime.value;
      state.meetingMode = selectedMode.value;
      state.step = 3;
      updateStepView();
    });
  }

  // --- Step 3 Navigation ---
  if (btnBack3) {
    btnBack3.addEventListener("click", () => {
      state.step = 2;
      updateStepView();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      // Clear selections
      state.selectedServices = [];
      state.preferredTime = "";
      state.meetingMode = "";
      state.step = 1;

      serviceCheckboxes.forEach(cb => { cb.checked = false; });
      timeRadios.forEach(r => { r.checked = false; });
      modeRadios.forEach(r => { r.checked = false; });

      updateStepView();
    });
  }

  // Initialize view
  updateStepView();
}
