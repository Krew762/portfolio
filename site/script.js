// Глобальная переменная для отслеживания показа прелоадера
let isPreloaderShown = false;

// Открытие портфолио
function openPortfolio() {
  if (!isPreloaderShown) {
    const preloader = document.getElementById('preloader');
    const container = document.getElementById('container');

    // Создаем эффект звездного неба
    createStars(100);

    // Запускаем анимацию
    preloader.classList.add('warp-effect');

    setTimeout(() => {
      preloader.style.display = 'none';
      container.style.opacity = '1';
      isPreloaderShown = true;

      // Автоматическая загрузка последнего проекта на главную страницу
      if (document.location.href.includes('index.html')) {
        loadLastProjectData();
      }
    }, 1000);
  }
}

// Генератор звезд
function createStars(count) {
  const starsContainer = document.querySelector('.stars-container');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = star.style.height = `${Math.random() * 3}px`;
    star.style.animationDelay = `${Math.random() * 1}s`;
    starsContainer.appendChild(star);
  }
}

// Инициализация параметров космонавта
let astronaut = document.querySelector('.astronaut');
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let x = Math.random() * screenWidth;
let y = Math.random() * screenHeight;
let dx = 1 + Math.random() * 2;
let dy = 1 + Math.random() * 2;
let rotation = 0;
let rotationSpeed = 0.5;

// Функция для обновления позиции и вращения
function updateAstronaut() {
  x += dx;
  y += dy;

  if (x + astronaut.offsetWidth >= screenWidth || x <= 0) {
    dx = -dx;
    rotationSpeed = -rotationSpeed;
  }

  if (y + astronaut.offsetHeight >= screenHeight || y <= 0) {
    dy = -dy;
    rotationSpeed = -rotationSpeed;
  }

  rotation += rotationSpeed;
  astronaut.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
}

// Запускаем анимацию
function animateAstronaut() {
  updateAstronaut();
  requestAnimationFrame(animateAstronaut);
}

// Запускаем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  createStars(100);
  animateAstronaut();

  // Закрытие модального окна при клике вне него
  const modal = document.getElementById('project-modal');
  window.onclick = function (event) {
    if (event.target === modal) {
      closeProjectModal();
    }
  };
});

// Обновляем размеры экрана при изменении окна браузера
window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  if (x + astronaut.offsetWidth > screenWidth) x = screenWidth - astronaut.offsetWidth;
  if (y + astronaut.offsetHeight > screenHeight) y = screenHeight - astronaut.offsetHeight;
});

// Модальное окно для проектов
let currentSlideIndex = 0;

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'flex';

  // Загружаем данные проекта
  loadProjectData(projectId);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.style.display = 'none';
}

function loadProjectData(projectId) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slide.remove()); // Очищаем текущие слайды

  const description = document.querySelector('.project-description');

  if (projectId === 'cs2-server') {
    const slide1 = createSlide('assets/mcs.jpg');
    const slide2 = createSlide('assets/cs2-server-2.png');
    document.querySelector('.project-slider').append(slide1, slide2);

    description.innerHTML = `
      <h2>Создание игрового сервера CS2</h2>
      <p>
        Покдлючение Steam токена
        Установка нужных карт на серверную часть
        Установка плагинов (Admin, VIP, LevelRanks и т.д.)
        Настройка всех плагинов для баланса игрового процесса
        Покупка домена и сервера для сайта
        Установка CMS движка с шаблоном (NEO последний используемый шаблон)
        Создание БД для хранения статистики игроков (Убийства, смерти, наиграное время и т.д.)
        Подключение БД к серверу и сайту
        Установка кастомных моделей для оружия и персонажей на серверную часть
        Добавление кастомных моделей для оружия и персонажей в мастерскую Steam
        Настройка для корректного отображения всех моделей
        Создание и настройка Discord сервера
        Составление правил проекта
        Набор персонала (Администрация проекта) для наблюдения за игроками
        Подключение онлайн кассы для сайта для продажи привилегий
        Все плагины, шаблоны, модели и т.д. были получены законно, куплены в Discord сервере разработчиков, либо найдены на сайте csdevs.net.
      </p>`;
  } else if (projectId === 'portfolio-site' || projectId === 'last-project') {
    const slide1 = createSlide('assets/PreloaderSite.jpg');
    const slide2 = createSlide('assets/portfolio-screenshot-2.png');
    const slide3 = createSlide('assets/portfolio-screenshot-3.png');
    document.querySelector('.project-slider').append(slide1, slide2, slide3);

    description.innerHTML = `
      <h2>Создание сайта для портфолио</h2>
      <p>
        Этот сайт был создан с использованием HTML, CSS и JavaScript.
        Включает в себя анимацию, интерактивные элементы и адаптивный дизайн.
      </p>`;
  }

  // Активируем первый слайд
  const newSlides = document.querySelectorAll('.slide');
  newSlides[0].classList.add('active-slide');
  currentSlideIndex = 0;
}

function createSlide(imageSrc) {
  const slide = document.createElement('img');
  slide.src = imageSrc;
  slide.alt = 'Скриншот проекта';
  slide.className = 'slide';
  return slide;
}

// Слайдер
function changeSlide(step) {
  const slides = document.querySelectorAll('.slide');
  slides[currentSlideIndex].classList.remove('active-slide');
  currentSlideIndex = (currentSlideIndex + step + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add('active-slide');
}

// Автоматическая загрузка последнего проекта на главную страницу
function loadLastProjectData() {
  const lastProjectPreview = document.getElementById('last-project-preview');
  const projectCards = Array.from(document.querySelectorAll('.card'));

  // Если нет карточек проектов, выходим
  if (projectCards.length === 0) return;

  // Находим первый проект (самый новый)
  const lastProject = projectCards[0];
  const projectId = lastProject.getAttribute('data-project-id');

  // Создаем карточку для главной страницы
  const cartochka = document.createElement('div');
  cartochka.className = 'cartochka';
  cartochka.innerHTML = `
    <img src="${lastProject.querySelector('img').src}" alt="${lastProject.querySelector('h3').textContent}" class="project-image">
    <h3>${lastProject.querySelector('h3').textContent}</h3>
    <p>${lastProject.querySelector('p').textContent}</p>
  `;
  cartochka.onclick = () => openProjectModal(projectId);

  // Вставляем карточку в блок предпросмотра
  lastProjectPreview.innerHTML = '';
  lastProjectPreview.appendChild(cartochka);
}