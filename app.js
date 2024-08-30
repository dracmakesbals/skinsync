const survey = [
  {
    question: "What is your skin type?",
    options: [
      { label: "Oily", value: "oily" },
      { label: "Dry", value: "dry" },
      { label: "Combination", value: "combination" },
      { label: "Sensitive", value: "sensitive" },
    ],
  },
  {
    question: "Do you want to use a first cleanser?",
    options: [
      { label: "Yes (recommended)", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    question: "Do you prefer an oily or non-oily first cleanser?",
    options: [
      { label: "Oily", value: "oily" },
      { label: "Non-oily", value: "non-oily" },
    ],
    conditional: true, // This question is conditional based on the previous answer
  },
  {
    question: "What kind of sunscreen finish do you prefer?",
    options: [
      { label: "Natural, Non-Silicone", value: "natural" },
      { label: "Smooth, Silicone-Based", value: "silicone" },
      { label: "Tinted for Light Coverage", value: "tinted" },
      { label: "Heavy-Duty for Prolonged Sun Exposure", value: "heavy-duty" },
    ],
  },
  {
    question: "How important is it to avoid white cast?",
    options: [
      { label: "Very Important", value: "very-important" },
      { label: "Somewhat Important", value: "somewhat-important" },
      { label: "Not Important", value: "not-important" },
    ],
  },
  {
    question: "Do you need the sunscreen to be sweat/water resistant?",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    question: "What kind of moisturizer do you prefer?",
    options: [
      { label: "Lightweight Gel", value: "lightweight" },
      { label: "Light Cream", value: "light-cream" },
      { label: "Rich Cream", value: "rich" },
    ],
  },
];

let currentQuestion = 0;
let answers = [];
let selectedOption = null;

const surveyContainer = document.querySelector(".survey-container");
const button = document.querySelector(".button-74");
const heading = document.querySelector(".heading");

function renderSurvey() {
  const question = survey[currentQuestion];

  if (question.conditional && answers[currentQuestion - 1] !== "yes") {
    answers.push(null); // Skip this question
    currentQuestion++;
    renderSurvey();
    return;
  }

  const html = `
    <h2>${question.question}</h2>
    <ul>
      ${question.options
        .map(
          (option) => `
        <li>
          <input type="radio" name="question-${currentQuestion}" value="${option.value}" id="${option.value}">
          <label for="${option.value}">${option.label}</label>
        </li>
      `
        )
        .join("")}
    </ul>
    <button class="next-button">Next</button>
  `;
  surveyContainer.innerHTML = html;
  surveyContainer.style.display = "block";
  surveyContainer.className = "survey-container"; // Ensure it's the default class
  const audio = new Audio("pop1.mp3");

  const options = surveyContainer.querySelectorAll("li");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((opt) => opt.classList.remove("clicked"));
      option.classList.add("clicked");
      selectedOption = option.querySelector("input:checked").value;
    });
  });

  const nextButton = document.querySelector(".next-button");
  nextButton.addEventListener("click", () => {
    audio.play(audio);
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }
    answers.push(selectedOption);
    selectedOption = null; // Reset the selected option
    surveyContainer.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < survey.length) {
        renderSurvey();
      } else {
        displayResults();
      }
      surveyContainer.classList.remove("fade-out"); // Remove fade-out class
      surveyContainer.classList.add("fade-in"); // Add fade-in class
      setTimeout(() => {
        surveyContainer.classList.remove("fade-in"); // Remove fade-in class
      }, 300);
    }, 300);
  });
}

function displayResults() {
  let firstCleanser = "";
  let secondCleanser = "";
  let sunscreen = "";
  let moisturizer = "";

  // Determine First Cleanser
  if (answers[1] === "yes") {
    switch (answers[2]) {
      case "oily":
        firstCleanser = "Inveda Cleansing Oil | MRP 695 | 100 ml";
        break;
      case "non-oily":
        firstCleanser =
          "Garnier Skin Naturals Micellar Cleansing Water | MRP 225 | 125 ml";
        break;
    }
  }

  // Determine Second Cleanser
  switch (answers[0]) {
    case "oily":
      secondCleanser = "Himalaya Purifying Neem Face Wash | MRP 190 | 150 ml";
      break;
    case "dry":
      secondCleanser = "Dermaessentia Cleansing Lotion | MRP 225 | 125 gm";
      break;
    case "combination":
      secondCleanser =
        "Simple Kind To Skin Refreshing Facial Wash | MRP 385 | 150 ml";
      break;
    case "sensitive":
      secondCleanser =
        "Bioderma Sensibio Gentle Soothing Micellar Cleansing Foaming Gel | MRP 449 | 100 ml";
      break;
  }

  // Determine Sunscreen
  switch (answers[3]) {
    case "natural":
      switch (answers[4]) {
        case "very-important":
          sunscreen =
            answers[5] === "yes"
              ? "Biore UV Aqua Rich Watery Essence SPF 50+ PA++++ | MRP 1270 | 50 gms"
              : "Minimalist SPF 50 PA++++ | MRP 399 | 50 ml";
          break;
        case "somewhat-important":
          sunscreen =
            answers[5] === "yes"
              ? "Minimalist SPF 50 PA++++ | MRP 399 | 50 ml"
              : "Cetaphil Sun SPF 50+ Light Gel SPF 50 PA | MRP 1080 | 50 ml";
          break;
        case "not-important":
          sunscreen =
            answers[5] === "yes"
              ? "Cetaphil Sun SPF 50+ Light Gel SPF 50 PA | MRP 1080 | 50 ml"
              : "Cetaphil Sun SPF 50+ Light Gel SPF 50 PA | MRP 1080 | 50 ml";
          break;
      }
      break;
    case "silicone":
      switch (answers[4]) {
        case "very-important":
          sunscreen =
            answers[5] === "yes"
              ? "Re'equil Ultra Matte Dry Touch Sunscreen Gel SPF 50 PA++++ | MRP 780 | 50 ml"
              : "UV Doux Silicone Sunscreen Gel SPF 50 PA+++ | MRP 699 | 50 gms";
          break;
        case "somewhat-important":
          sunscreen =
            answers[5] === "yes"
              ? "UV Doux Silicone Sunscreen Gel SPF 50 PA+++ | MRP 699 | 50 gms"
              : "Acne UV SPF 50 PA+++ | MRP 875 | 50 gms";
          break;
        case "not-important":
          sunscreen =
            answers[5] === "yes"
              ? "Acne UV SPF 50 PA+++ | MRP 875 | 50 gms"
              : "Acne UV SPF 50 PA+++ | MRP 875 | 50 gms";
          break;
      }
      break;
    case "tinted":
      switch (answers[4]) {
        case "very-important":
          sunscreen =
            "Re'equil Sheer Zinc Tinted Mineral Sunscreen SPF 50 PA+++";
          break;
        case "somewhat-important":
          sunscreen =
            "Derma Co 1% Hyaluronic Tinted Sunscreen Gel SPF 50 PA++++ | MRP 499 | 50 gms";
          break;
        case "not-important":
          sunscreen = "Cos IQ Sunscreen SPF 50 | MRP 999 | 100 ml";
          break;
      }
      break;
    case "heavy-duty":
      switch (answers[4]) {
        case "very-important":
          sunscreen =
            "Heliocare 360º Water Gel SPF 50 PA++++ | MRP 2100 | 50 ml";
          break;
        case "somewhat-important":
          sunscreen =
            "Bioderma Photoderm Max Aquafluide SPF 50+ High Protection | MRP 1550 | 40 ml";
          break;
        case "not-important":
          sunscreen =
            "Cetaphil Sun SPF 50+ Light Gel SPF 50 PA | MRP 1080 | 50 ml";
          break;
      }
      break;
  }

  // Determine Moisturizer
  switch (answers[6]) {
    case "lightweight":
      moisturizer = "Neutrogena Hydro Boost Water Gel | MRP 950 | 50 gm";
      break;
    case "light-cream":
      moisturizer =
        "Clinique Moisture Surge 72-Hour Auto-Replenishing Hydrator | MRP 890 | 15 ml";
      break;
    case "rich":
      moisturizer = "Cetaphil Moisturising Cream | MRP 445 | 80 gm";
      break;
  }

  // Display the results
  surveyContainer.innerHTML = `
  <h2 class="results-title">Your Skincare Recommendations:</h2>
  ${
    firstCleanser
      ? `<p class="result-item"><strong>First Cleanser:</strong> ${firstCleanser}</p>`
      : ""
  }
  <p class="result-item"><strong>Second Cleanser:</strong> ${secondCleanser}</p>
  <p class="result-item"><strong>Sunscreen:</strong> ${sunscreen}</p>
  <p class="result-item"><strong>Moisturizer:</strong> ${moisturizer}</p>
  <p class="result-item recommendation-text">Use first cleanser followed by the second cleanser in the evening. Use sunscreen every morning and apply moisturizer twice daily.<p>  
  <button class="restart-button">Restart</button>
`;

  // Apply additional styling
  surveyContainer.style.backgroundColor = "#f9f9f9";
  surveyContainer.style.border = "2px solid #ddd";
  surveyContainer.style.borderRadius = "10px";
  surveyContainer.style.padding = "20px";
  surveyContainer.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.1)";
  surveyContainer.style.maxWidth = "600px";
  surveyContainer.style.margin = "20px auto";
  surveyContainer.style.textAlign = "left";

  // Apply styles to the result items
  const resultsTitle = surveyContainer.querySelector(".results-title");
  resultsTitle.style.fontSize = "2rem";
  resultsTitle.style.marginBottom = "20px";
  resultsTitle.style.color = "#333";

  const resultItems = surveyContainer.querySelectorAll(".result-item");
  resultItems.forEach((item) => {
    item.style.marginBottom = "15px";
    item.style.fontSize = "1.2rem";
    item.style.color = "#555";
  });

  // Apply styles to the restart button
  const restartButton = document.querySelector(".restart-button");
  restartButton.style.backgroundColor = "#fbeee0";
  restartButton.style.border = "2px solid #422800";
  restartButton.style.borderRadius = "30px";
  restartButton.style.boxShadow = "#422800 4px 4px 0 0";
  restartButton.style.color = "#422800";
  restartButton.style.cursor = "pointer";
  restartButton.style.fontSize = "18px";
  restartButton.style.fontWeight = "600";
  restartButton.style.padding = "0 18px";
  restartButton.style.lineHeight = "50px";
  restartButton.style.textAlign = "center";
  restartButton.style.display = "inline-block";
  restartButton.style.margin = "30px 0 0"; // Center it horizontally
  restartButton.style.textDecoration = "none";
  restartButton.style.userSelect = "none";
  restartButton.style.webkitUserSelect = "none";
  restartButton.style.touchAction = "manipulation";

  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    answers = [];
    selectedOption = null;
    surveyContainer.classList.remove("fade-out", "fade-in");
    surveyContainer.innerHTML = "";
    renderSurvey();
  });
}

// Start the survey when the button is clicked
button.addEventListener("click", () => {
  heading.style.display = "none";
  button.style.display = "none";
  renderSurvey();
});

const hamburger = document.querySelector(".hamburger");
const menu_links = document.querySelector("ul");
const links = document.querySelectorAll("ul li");

hamburger.addEventListener("click", () => {
  menu_links.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
});
