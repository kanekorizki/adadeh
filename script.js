const starsContainer = document.querySelector(".stars");
const opening = document.querySelector("#opening");
const scene2 = document.querySelector("#scene2");
const beginButton = document.querySelector("#beginButton");
const targetStar = document.querySelector("#targetStar");
const continueButton = document.querySelector("#continueButton");
const scene3 = document.querySelector("#scene3");
const envelopeButton = document.querySelector("#envelopeButton");
const envelopeMessage = document.querySelector("#envelopeMessage");
const scene4 = document.querySelector("#scene4");
const birthdayLetter = document.querySelector("#birthdayLetter");





// Membuat 70 bintang secara otomatis
for (let i = 0; i < 70; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    // Posisi acak di layar
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    // Ukuran bintang acak
    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Kecepatan dan jeda kedipan
    star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
    );

    star.style.setProperty(
        "--delay",
        (Math.random() * 4) + "s"
    );

    starsContainer.appendChild(star);
}

// Interaksi tombol pembuka
beginButton.addEventListener("click", () => {
    
});

let isTransitioning = false;

beginButton.addEventListener("click", () => {
    // Cegah klik berulang selama animasi
    if (isTransitioning) return;

    isTransitioning = true;
    beginButton.disabled = true;

    // Memulai animasi zoom
    opening.classList.add("zooming");

    // Tunggu sampai animasi zoom selesai
    window.setTimeout(() => {
        opening.classList.remove("active");
        opening.classList.remove("zooming");

        scene2.classList.add("active");

        // Reset posisi scroll agar adegan baru dimulai dari atas
        window.scrollTo(0, 0);
    }, 900);
});
targetStar.addEventListener("click", () => {
    targetStar.textContent = "✦";
    targetStar.classList.add("star-found");

    continueButton.hidden = false;
});

// Transisi Scene 02 menuju Scene 03
continueButton.addEventListener("click", () => {
    scene2.classList.remove("active");
    scene3.classList.add("active");

    window.scrollTo(0, 0);
});

// Interaksi amplop di Scene 03
envelopeButton.addEventListener("click", () => {
    const isOpened = envelopeButton.classList.toggle("opened");

    envelopeButton.querySelector("span").textContent =
        isOpened ? "💌" : "✉";

    envelopeMessage.textContent = isOpened
        ? "Some words are waiting to find their way to you."
        : "A little something, waiting to be opened.";

    document.querySelector("#goToBirthdayButton").hidden = !isOpened;
});

const goToBirthdayButton = document.querySelector("#goToBirthdayButton");
const showLetterButton = document.querySelector("#showLetterButton");

goToBirthdayButton.addEventListener("click", () => {
    scene3.classList.remove("active");
    scene4.classList.add("active");

    startBirthdayAnimation();
    window.scrollTo(0, 0);
});

showLetterButton.addEventListener("click", () => {
    // Untuk tahap ini, tombol menampilkan pesan lanjutan.
    showLetterButton.textContent = "Your words are on their way ✨";
    showLetterButton.disabled = true;
});

function startBirthdayAnimation() {
    const effects = document.querySelector("#birthdayEffects");

    // Bersihkan efek sebelumnya agar tidak menumpuk
    effects.replaceChildren();

    // 1. Confetti yang berjatuhan
    const confettiColors = [
        "#f5d58a",
        "#c1b7ff",
        "#f4a8d4",
        "#ffffff",
        "#a9d9ff"
    ];

    for (let i = 0; i < 65; i++) {
        const piece = document.createElement("span");
        piece.classList.add("confetti");

        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor =
            confettiColors[Math.floor(Math.random() * confettiColors.length)];

        piece.style.setProperty(
            "--fall-time",
            (3 + Math.random() * 3) + "s"
        );

        piece.style.setProperty(
            "--fall-delay",
            (Math.random() * 2) + "s"
        );

        piece.style.setProperty(
            "--drift",
            (Math.random() * 160 - 80) + "px"
        );

        effects.appendChild(piece);
    }

    // 2. Bintang-bintang berkilauan
    for (let i = 0; i < 24; i++) {
        const sparkle = document.createElement("span");
        sparkle.classList.add("sparkle");
        sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 85 + "%";

        sparkle.style.setProperty(
            "--sparkle-size",
            (8 + Math.random() * 12) + "px"
        );

        sparkle.style.setProperty(
            "--twinkle-time",
            (1 + Math.random() * 2) + "s"
        );

        sparkle.style.setProperty(
            "--twinkle-delay",
            (Math.random() * 2) + "s"
        );

        effects.appendChild(sparkle);
    }

    // 3. Kembang api di beberapa titik langit
    const fireworksPositions = [
        { left: "18%", top: "25%" },
        { left: "80%", top: "30%" },
        { left: "72%", top: "60%" },
        { left: "25%", top: "65%" }
    ];

    fireworksPositions.forEach((position, index) => {
        const firework = document.createElement("span");
        firework.classList.add("firework");

        firework.style.left = position.left;
        firework.style.top = position.top;
        firework.style.animationDelay = (index * 0.45) + "s";

        if (index % 2 === 1) {
            firework.style.color = "#c1b7ff";
        }

        effects.appendChild(firework);
    });
}


showLetterButton.addEventListener("click", () => {
    birthdayLetter.hidden = false;
    showLetterButton.hidden = true;

    // Perayaan dimulai kembali saat surat dibuka
    startBirthdayAnimation();

    // Gulir perlahan ke pesan jika dibutuhkan
    birthdayLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
