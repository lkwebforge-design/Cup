const flavors = [
  { title: "PINK<br><span>BERRY.</span>", name: "Pink Berry", color: "#8b1e24", accent: "#f4dcae", price: "$20", description: "Raspberry, açaí and plant-powered goodness. Your feel-good moment, served by the spoonful.", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1000&q=85", alt: "Pink berry smoothie bowl topped with fresh fruit" },
  { title: "PEACH<br><span>GARDEN.</span>", name: "Peach Garden", color: "#586930", accent: "#f4dcae", price: "$20", description: "Bright, juicy and full of sunshine. A fresh blend for slow mornings and big little plans.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=85", alt: "Fresh colorful bowl with fruit and greens" },
  { title: "BLUE<br><span>MOOD.</span>", name: "Blue Mood", color: "#1b3b6f", accent: "#d8e7ff", price: "$20", description: "A berry-bright pick-me-up with a cool twist. Big blueberry energy, one spoon at a time.", image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1000&q=85", alt: "Blueberry smoothie with a creamy, colorful finish" },
  { title: "STRAWBERRY<br><span>KISS.</span>", name: "Strawberry Kiss", color: "#a2142f", accent: "#ffd9d5", price: "$20", description: "Sweet strawberries, a silky blend and all the happy vibes. A classic with a little extra love.", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1000&q=85", alt: "Fresh strawberry-inspired smoothie bowl" }
];
let currentIndex = 0;
const body = document.body;
const title = document.getElementById("flavor-title");
const image = document.getElementById("bowl-image");
const description = document.getElementById("flavor-description");
const price = document.getElementById("flavor-price");
const count = document.getElementById("slide-count");
const currentFlavor = document.getElementById("current-flavor");
const chips = [...document.querySelectorAll(".flavor-chip")];

function updateSlide(index) {
  currentIndex = (index + flavors.length) % flavors.length;
  const flavor = flavors[currentIndex];
  image.classList.add("changing");
  body.style.setProperty("--bg", flavor.color);
  body.style.setProperty("--accent", flavor.accent);
  title.innerHTML = flavor.title;
  description.textContent = flavor.description;
  price.textContent = flavor.price;
  count.textContent = String(currentIndex + 1).padStart(2, "0");
  currentFlavor.textContent = String(currentIndex + 1).padStart(2, "0");
  chips.forEach((chip, i) => {
    chip.classList.toggle("selected", i === currentIndex);
    if (i === currentIndex) chip.setAttribute("aria-current", "true");
    else chip.removeAttribute("aria-current");
  });
  const nextImage = new Image();
  nextImage.onload = () => {
    image.src = nextImage.src;
    image.alt = flavor.alt;
    requestAnimationFrame(() => image.classList.remove("changing"));
  };
  nextImage.onerror = () => image.classList.remove("changing");
  nextImage.src = flavor.image;
}
document.getElementById("next-btn").addEventListener("click", () => updateSlide(currentIndex + 1));
document.getElementById("prev-btn").addEventListener("click", () => updateSlide(currentIndex - 1));
chips.forEach(chip => chip.addEventListener("click", () => updateSlide(Number(chip.dataset.slide))));
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") updateSlide(currentIndex + 1);
  if (event.key === "ArrowLeft") updateSlide(currentIndex - 1);
});
