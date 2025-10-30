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

  // Initialize input values
  inputs.wrongNumber.value = 0;
  inputs.answered.value = 0;
  inputs.gatekeeper.value = 0;

  // Function to calculate no answer
  function calculateNoAnswer() {
    const total = parseInt(inputs.totalLeads.value) || 0;
    const wrong = parseInt(inputs.wrongNumber.value) || 0;
    const answered = parseInt(inputs.answered.value) || 0;
    const gatekeeper = parseInt(inputs.gatekeeper.value) || 0;

    const noAnswer = total - (wrong + answered + gatekeeper);
    inputs.noAnswer.textContent = noAnswer >= 0 ? noAnswer : 0;
  }

  // Function to update counter value
  function updateCounter(input, increment) {
    const currentValue = parseInt(input.value) || 0;
    const newValue = currentValue + increment;
    if (newValue >= 0) {
      input.value = newValue;
      calculateNoAnswer();
    }
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
