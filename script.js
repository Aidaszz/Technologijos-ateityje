import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js";

const homeSection = document.querySelector(`.computer`);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let sizee = 600;
window.addEventListener('resize', function(){
  if(window.innerWidth > 1000){
    sizee = 600;
    document.querySelector(`.home canvas`).style.top = `60%`;
    document.querySelector(`.home canvas`).style.left = `70%`;
  }else if(window.innerWidth < 1000 && window.innerWidth > 768){
    sizee = 400;
  }
})
renderer.setSize(sizee, sizee);
homeSection.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
80,
  sizee /sizee,
  0.1,
  1000
);
camera.position.set(5, 10, 150);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 50);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE,
};
const loader = new GLTFLoader();
loader.load(
  `models/gaming_laptop_-_asus_rog.glb`,
  function (gltf) {
    const model = gltf.scene;
    model.position.set(0, 0, 0);

    scene.add(model);
    renderer.render(scene, camera);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let autoRotate = true;

renderer.domElement.addEventListener("mousedown", () => {
  autoRotate = false;
});

renderer.domElement.addEventListener("mouseup", () => {
  autoRotate = true;
});

function render() {
  requestAnimationFrame(render);

  if (autoRotate) {
    scene.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = sizee / sizee;
  camera.updateProjectionMatrix();
  renderer.setSize(sizee, sizee);
}

window.addEventListener("resize", onWindowResize);

render();

window.addEventListener(`scroll`, reveal);

function reveal() {
  let windowHeight = window.innerHeight;
  let revealTop = document
    .querySelector(`.about-div`)
    .getBoundingClientRect().top;
  let revealpoint = 50;

  if (revealTop < windowHeight - revealpoint) {
    document.querySelector(`.about-div`).classList.add(`actives`);
  } else {
    document.querySelector(`.about-div`).classList.remove(`actives`);
  }
}
let menuIcon = document.querySelector(`#menu-icon`);
let navbar = document.querySelector(`.navbar`);

menuIcon.onclick = () => {
  menuIcon.classList.toggle(`bx-x`);
  navbar.classList.toggle(`active`);
};

let sections = document.querySelectorAll(`section`);
let navLinks = document.querySelectorAll(`header nav a`);
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute(`id`);

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove(`active`);
        document
          .querySelector(`header nav a[href*=` + id + `]`)
          .classList.add(`active`);
      });
    }
  });
  let header = document.querySelector(`header`);
  header.classList.toggle(`sticky`, window.scrollY > 100);

  menuIcon.classList.remove(`bx-x`);
  navbar.classList.remove(`active`);
};

const showMoreBtn = document.getElementById(`aboutButton`);

showMoreBtn.addEventListener(`mouseenter`, function () {
  document.querySelector(
    `.circle-spin`
  ).style.borderRight = `0.2rem solid #00abf0`;
  document.querySelector(
    `.circle-spin`
  ).style.borderLeft = `0.2rem solid #00abf0`;
});
showMoreBtn.addEventListener(`mouseleave`, function () {
  document.querySelector(
    `.circle-spin`
  ).style.borderRight = `0.2rem solid white`;
  document.querySelector(
    `.circle-spin`
  ).style.borderLeft = `0.2rem solid white`;
});

const button = document.getElementById("aboutButton");
const divs = document.querySelectorAll(".container > div");
let isShown = false;
let divClicked = false;
let rotationDiff = 0;

let aboutH3 = document.querySelector(`.abouth3`);
let aboutP = document.querySelector(`.aboutP`);
button.addEventListener("click", function () {
  if (!isShown) {
    showDivs();
  } else {
    hideDivs();
  }
});

function showDivs() {
  divs.forEach((div, index) => {
    if (div) {
      setTimeout(() => {
        div.style.opacity = "1";
        div.addEventListener("click", divClickHandler);
      }, index * 500);
      div.style.cursor = `pointer`;
      rotationDiff += 90;
      document.querySelector(
        `.circle-spin`
      ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
    }
  });

  isShown = true;
}

function hideDivs() {
  divs.forEach((div, index) => {
    setTimeout(() => {
      div.style.opacity = "0";
      div.removeEventListener("click", divClickHandler);
    }, index * 500);
    div.style.cursor = `default`;
    rotationDiff -= 90;
    document.querySelector(
      `.circle-spin`
    ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
    aboutH3.textContent = `Technologijos Ateityje`;
    aboutP.textContent = "Keletas ateityje paklausių sričių specialistų.";
  });

  isShown = false;
}

function divClickHandler() {
  if (!divClicked) {
    const clickedDiv = this;
    if (clickedDiv){
    if (clickedDiv.classList.contains("top-left")) {
      rotationDiff += 360;
      document.querySelector(
        `.circle-spin`
      ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
      aboutH3.textContent = `AI (Dirbtinis Intelektas)`;
      aboutP.textContent = `Dirbtinis intelektas yra kompiuterinė sistema, mokanti mąstyti ir spręsti uždavinius. Jis remiasi algoritmais, duomenų analize ir mašininio mokymosi principais.`;
    } else if (clickedDiv.classList.contains("top-right")) {
      rotationDiff += 360;
      document.querySelector(
        `.circle-spin`
      ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
      aboutH3.innerHTML = "Kibernetinė apsauga";
      aboutP.textContent = `Priemonių ir procedūrų kompleksas, skirtas apsaugoti duomenis, informaciją ir elektroninius įrenginius`;
    } else if (clickedDiv.classList.contains("bottom-left")) {
      rotationDiff += 360;
      document.querySelector(
        `.circle-spin`
      ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
      aboutH3.textContent = `Duomenų mokslas`;
      aboutP.textContent = `Studijų sritis, kurioje nagrinėjami didžiuliai duomenų kiekiai, naudojant šiuolaikines priemones ir metodus`;
    } else if (clickedDiv.classList.contains("bottom-right")) {
      rotationDiff += 360;
      document.querySelector(
        `.circle-spin`
      ).style.transform = `translate(-50%, -50%) rotate(${rotationDiff}deg)`;
      aboutH3.textContent = `Natūralios kalbos apdorojimas`;
      aboutP.textContent = `Tiria informacinių technologijų ir kompiuterinių programų pritaikymo visoms natūralios kalbos naudojimo sritims galimybes.`;
    }
  }



    divClicked = true;
    setTimeout(() => {
      divClicked = false;
    }, 50);
  }
}

let li = document.querySelectorAll(`.faq-text li`);
for (let i = 0; i < li.length; i++) {
  li[i].addEventListener(`click`, (e) => {
    let clickedLi;
    if (e.target.classList.contains(`question-arrow`)) {
      clickedLi = e.target.parentElement;
    } else {
      clickedLi = e.target.parentElement.parentElement;
    }
    clickedLi.classList.toggle(`showAnswer`);
  });
}

let boxes = document.querySelectorAll(`.boxes`);
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener(`mouseenter`, function () {
    document.querySelector(
      `.circle-spin`
    ).style.borderRight = `0.2rem solid #00abf0`;
    document.querySelector(
      `.circle-spin`
    ).style.borderLeft = `0.2rem solid #00abf0`;
  });
  boxes[i].addEventListener(`mouseleave`, function () {
    document.querySelector(
      `.circle-spin`
    ).style.borderRight = `0.2rem solid white`;
    document.querySelector(
      `.circle-spin`
    ).style.borderLeft = `0.2rem solid white`;
  });
}


function checkWindowWidth() {
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var isGreaterThan768 = windowWidth > 768;

  if (!isGreaterThan768) {
    if(document.querySelector(`.container > div`).style.opacity < 1){
      document.querySelector(`.top-left`).style.opacity = 1;
      document.querySelector(`.top-right`).style.opacity = 1;
      document.querySelector(`.bottom-left`).style.opacity = 1;
      document.querySelector(`.bottom-right`).style.opacity = 1;
      console.log(`true`);
      document.querySelector(`.contactIcons`).classList.remove(`hidden`);
    }
    aboutH3.textContent = `Technologijos Ateityje`;
  aboutP.textContent = "Keletas ateityje paklausių sričių specialistų.";
  document.querySelector(".top-left").addEventListener(`click`, function(){
    aboutH3.textContent = `AI (Dirbtinis Intelektas)`;
  aboutP.textContent = `Dirbtinis intelektas yra kompiuterinė sistema, mokanti mąstyti ir spręsti uždavinius. Jis remiasi algoritmais, duomenų analize ir mašininio mokymosi principais.`;
}) ;
    
    
  document.querySelector(".top-right").addEventListener(`click`, function(){aboutH3.innerHTML = "Kibernetinė apsauga";
  aboutP.textContent = `Priemonių ir procedūrų kompleksas, skirtas apsaugoti duomenis, informaciją ir elektroninius įrenginius`;
}) 
    
   document.querySelector(`.bottom-left`).addEventListener(`click`, function(){aboutH3.textContent = `Duomenų mokslas`;
   aboutP.textContent = `Studijų sritis, kurioje nagrinėjami didžiuliai duomenų kiekiai, naudojant šiuolaikines priemones ir metodus`;
}) 
    document.querySelector(`.bottom-right`).addEventListener(`click`, function(){
      aboutH3.textContent = `Natūralios kalbos apdorojimas`;
    aboutP.textContent = `Tiria informacinių technologijų ir kompiuterinių programų pritaikymo visoms natūralios kalbos naudojimo sritims galimybes.`;
 
    })
  } else if(isGreaterThan768){
    divClickHandler();
    document.querySelector(`.contactIcons`).classList.add(`hidden`);
}}


window.addEventListener('resize', checkWindowWidth);


checkWindowWidth();

