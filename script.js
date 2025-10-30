document.addEventListener("DOMContentLoaded", () => {
  const inputs = {
    totalLeads: document.getElementById("totalLeads"),
    wrongNumber: document.getElementById("wrongNumber"),
    noAnswer: document.getElementById("noAnswer"),
    answered: document.getElementById("answered"),
    gatekeeper: document.getElementById("gatekeeper"),
  };

  const buttons = {
    wrongNumberPlus: document.getElementById("wrongNumberBtnPlus"),
    wrongNumberMinus: document.getElementById("wrongNumberBtnMinus"),
    answeredPlus: document.getElementById("answeredBtnPlus"),
    answeredMinus: document.getElementById("answeredBtnMinus"),
    gatekeeperPlus: document.getElementById("gatekeeperBtnPlus"),
    gatekeeperMinus: document.getElementById("gatekeeperBtnMinus"),
  };

  const generateReportBtn = document.getElementById("generateReport");
  const reportContainer = document.getElementById("report");

  function saveToStorage() {
    localStorage.setItem(
      "leadsReportData",
      JSON.stringify({
        totalLeads: inputs.totalLeads.value,
        wrongNumber: inputs.wrongNumber.value,
        answered: inputs.answered.value,
        gatekeeper: inputs.gatekeeper.value,
      })
    );
  }

  function loadFromStorage() {
    const saved = JSON.parse(localStorage.getItem("leadsReportData") || "{}");
    if (typeof saved.totalLeads !== "undefined") inputs.totalLeads.value = saved.totalLeads;
    if (typeof saved.wrongNumber !== "undefined") inputs.wrongNumber.value = saved.wrongNumber;
    if (typeof saved.answered !== "undefined") inputs.answered.value = saved.answered;
    if (typeof saved.gatekeeper !== "undefined") inputs.gatekeeper.value = saved.gatekeeper;
    calculateNoAnswer();
  }

  // Load values on page load
  loadFromStorage();

  // Validation for total leads (numbers only)
  inputs.totalLeads.addEventListener("input", (e) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = val;
    calculateNoAnswer();
    saveToStorage();
  });

  // Function to calculate no answer
  function calculateNoAnswer() {
    const total = parseInt(inputs.totalLeads.value) || 0;
    const wrong = parseInt(inputs.wrongNumber.value) || 0;
    const answered = parseInt(inputs.answered.value) || 0;
    // Gatekeeper is not included in the no answer calculation
    const noAnswer = total - (wrong + answered);
    inputs.noAnswer.textContent = noAnswer >= 0 ? noAnswer : 0;
  }

  // Function to update counter value
  function updateCounter(input, increment) {
    const currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + increment;
    if (newValue < 0) newValue = 0;
    // Prevent sum of fields from exceeding total leads
    const total = parseInt(inputs.totalLeads.value) || 0;
    const wrong = parseInt(inputs.wrongNumber.value) || 0;
    const answered = parseInt(inputs.answered.value) || 0;
    const gatekeeper = parseInt(inputs.gatekeeper.value) || 0;
    let sum = wrong + answered + gatekeeper;
    if (input === inputs.wrongNumber) sum += increment;
    if (input === inputs.answered) sum += increment;
    if (input === inputs.gatekeeper) sum += increment;
    if (increment > 0 && sum > total) return;
    input.value = newValue;
    calculateNoAnswer();
    saveToStorage();
  }

  // Add event listeners for input changes
  inputs.totalLeads.addEventListener("input", calculateNoAnswer);

  // Add increment/decrement button event listeners
  buttons.wrongNumberPlus.addEventListener("click", () =>
    updateCounter(inputs.wrongNumber, 1)
  );
  buttons.wrongNumberMinus.addEventListener("click", () =>
    updateCounter(inputs.wrongNumber, -1)
  );

  buttons.answeredPlus.addEventListener("click", () => updateCounter(inputs.answered, 1));
  buttons.answeredMinus.addEventListener("click", () => updateCounter(inputs.answered, -1));

  buttons.gatekeeperPlus.addEventListener("click", () => updateCounter(inputs.gatekeeper, 1));
  buttons.gatekeeperMinus.addEventListener("click", () =>
    updateCounter(inputs.gatekeeper, -1)
  );

  // Save gatekeeper changes
  inputs.gatekeeper.addEventListener("input", saveToStorage);

  // Reset button logic
  const resetBtn = document.getElementById("resetFields");
  resetBtn.addEventListener("click", () => {
    inputs.totalLeads.value = "";
    inputs.wrongNumber.value = 0;
    inputs.answered.value = 0;
    inputs.gatekeeper.value = 0;
    inputs.noAnswer.textContent = 0;
    reportContainer.textContent = "";
    localStorage.removeItem("leadsReportData");
  });

  // Generate report function
  generateReportBtn.addEventListener("click", () => {
    const report = `
            #Report
            ${inputs.wrongNumber.value || 0} wrong number
            ${inputs.noAnswer.textContent} no answer
            ${inputs.answered.value || 0} answered
            ${inputs.gatekeeper.value || 0} gatekeeper
            totale leads = "${inputs.totalLeads.value || 0}"
        `;

    reportContainer.textContent = report;
    reportContainer.style.display = "block";
    reportContainer.style.whiteSpace = "pre-line";
  });
});
