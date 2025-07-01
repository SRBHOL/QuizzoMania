const questions = [
  {
    text: "What is the hottest planet in our solar system?",
    options: { a: "Mercury", b: "Venus", c: "Mars", d: "Jupiter" },
    correct: "b"
  },
  {
    text: "What is the name of NASA’s most powerful space telescope launched in 2021",
    options: { a: "Spitzer", b: "Hubble", c: "James Webb", d: "Galileo" },
    correct: "c"
  },
  {
    text: "What is the name of the region beyond Neptune filled with icy bodies and dwarf planets?",
    options: { a: "Oort Cloud", b: "Kuiper Belt", c: "Van Allen Belt", d: "Asteroid Belt" },
    correct: "b"
  },
  {
    text: "What is a supernova?",
    options: { a: "A type of comet", b: "A planet exploding", c: "A black hole forming", d: "A massive star exploding" },
    correct: "d"
  },
  {
    text: "Which planet is known for having the most extreme winds in the solar system?",
    options: { a: "Mars", b: "Neptune", c: "Venus", d: "Earth" },
    correct: "b"
  },
  {
    text: "What do we call a system of millions or billions of stars, held together by gravity?",
    options: { a: "Galaxy", b: "Constellation", c: "Nebula", d: "Cluster" },
    correct: "a"
  },
  {
    text: "Which phase of the Moon occurs when the side facing Earth is fully illuminated?",
    options: { a: "New Moon", b: "Half Moon", c: "Crescent Moon", d: "Full Moon" },
    correct: "d"
  },
  {
    text: "Which of the following is considered an 'ice giant' planet?",
    options: { a: "Mars", b: "Jupiter", c: "Uranus", d: "Venus" },
    correct: "c"
  },
  {
    text: "What is the name given to the path an object takes as it revolves around another object in space?",
    options: { a: "Axis", b: "Rotation", c: "Orbit", d: "Trajectory" },
    correct: "c"
  },
  {
    text: "Which planet is known for its prominent ring system?",
    options: { a: "Jupiter", b: "Uranus", c: "Neptune", d: "Saturn" },
    correct: "d"
  }
  
];

let current = 0;
let userAnswers = Array(questions.length).fill(null);
const home = document.getElementById("homePage");
const quiz = document.getElementById("quizSection");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

startBtn.onclick = () => {
  home.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  document.getElementById("progressIndicator").textContent =
  `Question ${current + 1} of ${questions.length}`;

  const q = questions[current];
  document.getElementById("questionText").textContent = `${current + 1}. ${q.text}`;
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";

  for (let key in q.options) {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${key}" ${userAnswers[current] === key ? "checked" : ""}>
      ${key.toUpperCase()}. ${q.options[key]}
    `;
    optionsContainer.appendChild(label);
  }

  prevBtn.disabled = current === 0;
  nextBtn.classList.toggle("hidden", current === questions.length - 1);
  submitBtn.classList.toggle("hidden", current !== questions.length - 1);

  quiz.classList.remove("fade-question");
  void quiz.offsetWidth;
  quiz.classList.add("fade-question");
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  userAnswers[current] = selected ? selected.value : null;
}

nextBtn.onclick = () => {
  saveAnswer();
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
};

prevBtn.onclick = () => {
  saveAnswer();
  if (current > 0) {
    current--;
    showQuestion();
  }
};


submitBtn.onclick = () => {
  saveAnswer();
  showResult();
};

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let score = 0;
  let summary = "<h2>Quiz Results</h2><ul>";

  questions.forEach((q, i) => {
    const ans = userAnswers[i];
    if (ans === null) {
      summary += `<li>Q${i + 1}: <span style="color:gray">Unanswered</span> (0) | Correct: ${q.correct.toUpperCase()}</li>`;
    } else if (ans === q.correct) {
      score += 10;
      summary += `<li>Q${i + 1}: <span style="color:green">Correct</span> (+10)</li>`;
    } else {
      score -= 5;
      summary += `<li>Q${i + 1}: <span style="color:red">Wrong</span> (-5) | Correct: ${q.correct.toUpperCase()}</li>`;
    }
  });

  summary += `</ul><h3>Total Score: ${score}</h3>`;

  let message = "";
  if (score < 50) {
    message = "<strong>Oh no,They are going to invade us!</strong>";
  } else if (score < 80) {
    message = "<strong>We have to protect Earth!</strong>";
  } else {
    message = "<strong>Only you can save us!</strong>";
  }

  summary += `<p class="result-message">${message}</p>`;
  summary += `<button id="restartBtn" class="restart-button">Restart Quiz</button>`;

  result.innerHTML = summary;
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "restartBtn") {
    location.reload();
  }
});

function toggleMusic() {
  const music = document.getElementById("bg-music");
  music.paused ? music.play() : music.pause();
}

