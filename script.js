const passwords = {
  happy: {
    password: "Yes",
    prompt: "Hey, you seem kinda happy. Tell me if You are (Yes or No)",
  },
  sad: {
    password: "I want to talk",
    prompt:
      "Hey Fizza, Don't be Sad Sweetie. Just say 'I want to talk' and we can Talk",
  },
  mad: {
    password: "Apologize",
    prompt:
      "Hey Fizza, I am sorry if I made you feel like this. Just say 'Apologize' and I will",
  },
};

let currentSection = null;
let currentUserName = "";
let isGrid = false;

function login() {
  const nameInput = document.getElementById("userNameInput").value.trim();
  const name = nameInput.toLowerCase();

  if (!name) {
    alert("Hehe not like this, Tell me your name first");
    return;
  }

  if (name === "fijju") {
    currentUserName = nameInput;
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("welcomePopup").style.display = "block";
    document.getElementById(
      "welcomeTitle"
    ).innerText = `Hi My Sweet ${nameInput} 💖`;

    setupMusicControls();
    document.getElementById("floatingButtons").style.display = "flex";
  } else {
    window.location.href = "notfijju.html";
  }
}

function setupMusicControls() {
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicToggle.textContent = "🔇 Pause Music";
    } else {
      music.pause();
      musicToggle.textContent = "🎵 Play Music";
    }
  });
}

function showSection(id) {
  if (id === "home" || id === "thank") {
    revealSection(id);
    return;
  }

  currentSection = id;
  const sectionInfo = passwords[id];

  document.getElementById("promptTitle").innerText = "💬 Hello My Fijju!";
  document.getElementById("promptMessage").innerText = sectionInfo.prompt;
  document.getElementById("passwordInput").value = "";

  document.getElementById("customPrompt").style.display = "flex";
}

function closeCustomPrompt() {
  document.getElementById("customPrompt").style.display = "none";
}

function submitCustomPassword() {
  const entered = document
    .getElementById("passwordInput")
    .value.trim()
    .toLowerCase();
  const correct = passwords[currentSection]?.password.trim().toLowerCase();

  if (!correct) {
    alert("Section not found!");
    return;
  }

  if (entered === correct) {
    closeCustomPrompt();
    setTimeout(() => {
      revealSection(currentSection);
    }, 300);
  } else {
    closeCustomPrompt();
    setTimeout(() => {
      document.getElementById("wrongPasswordPopup").style.display = "flex";
    }, 200);
  }
}

function revealSection(id) {
  // Hide ALL sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  // Show only the target section
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    target.style.display = "flex";
  } else {
    alert("Could not find section: " + id);
  }
}

function closePopup() {
  document.getElementById("welcomePopup").style.display = "none";
}

function closeWrongPopup() {
  document.getElementById("wrongPasswordPopup").style.display = "none";
}

function scatterCards() {
  const wrapper = document.querySelector(".image-gallery");
  const cards = wrapper.querySelectorAll(".masonry-card.image-card");
  const placedCards = [];

  const padding = 20;
  const horizontalLimit = wrapper.clientWidth - 320;
  let currentYLimit = 2000;

  cards.forEach((card) => {
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    let x,
      y,
      positionFound = false,
      tries = 0;

    while (!positionFound && tries < 500) {
      x = padding + Math.random() * (horizontalLimit - padding * 2);
      y = padding + Math.random() * (currentYLimit - padding * 2);

      const overlaps = placedCards.some((p) => {
        return !(
          x + cardWidth < p.x ||
          x > p.x + p.width ||
          y + cardHeight < p.y ||
          y > p.y + p.height
        );
      });

      if (!overlaps) {
        positionFound = true;
        placedCards.push({ x, y, width: cardWidth, height: cardHeight });
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
        const rotation = Math.random() * 8 - 4;
        card.style.transform = `rotate(${rotation}deg)`;
        card.style.transition = "all 0.4s ease";
      }

      tries++;
    }

    if (!positionFound) currentYLimit += 500;
  });

  wrapper.style.minHeight = `${currentYLimit + 500}px`;
}

function makeCardsDraggable() {
  const cards = document.querySelectorAll(".masonry-card.image-card");

  cards.forEach((card) => {
    let offsetX,
      offsetY,
      isDragging = false;

    card.addEventListener("mousedown", (e) => {
      isDragging = true;
      card.style.cursor = "grabbing";
      offsetX = e.clientX - card.offsetLeft;
      offsetY = e.clientY - card.offsetTop;
      card.style.zIndex = 9999;
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        card.style.left = `${e.clientX - offsetX}px`;
        card.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      card.style.cursor = "grab";
    });
  });
}

window.onload = () => {
  document.getElementById("loginScreen").style.display = "flex";
  document.body.style.zoom = "100%";

  scatterCards();
  makeCardsDraggable();
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".masonry-card");
  cards.forEach((card) => {
    const angle = (Math.random() * 6 - 3).toFixed(2);
    card.style.setProperty("--rotate", `${angle}deg`);
  });

  const shuffleBtn = document.getElementById("shuffleButton");
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      scatterCards();
    });
  }

  const layoutBtn = document.getElementById("layoutToggle");
  const wrapper = document.querySelector(".image-gallery");

  if (layoutBtn && wrapper) {
    layoutBtn.addEventListener("click", () => {
      isGrid = !isGrid;
      const shuffleBtn = document.getElementById("shuffleButton");

      if (isGrid) {
        wrapper.classList.add("grid-layout");
        layoutBtn.textContent = "✨ Scattered Layout";
        if (shuffleBtn) shuffleBtn.style.display = "none";
      } else {
        wrapper.classList.remove("grid-layout");
        scatterCards();
        makeCardsDraggable();
        layoutBtn.textContent = "🪄 Grid Layout";
        if (shuffleBtn) shuffleBtn.style.display = "block";
      }
    });
  }
});

function toggleNav() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}
