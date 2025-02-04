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
      isPreloaderShown = true; // Отметка о том, что прелоадер уже показан
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

let x = Math.random() * screenWidth; // Начальная позиция X
let y = Math.random() * screenHeight; // Начальная позиция Y
let dx = 1 + Math.random() * 2; // Скорость по X (фиксированная)
let dy = 1 + Math.random() * 2; // Скорость по Y (фиксированная)
let rotation = 0; // Угол вращения
let rotationSpeed = 0.5; // Скорость вращения

// Функция для обновления позиции и вращения
function updateAstronaut() {
  // Обновляем позицию
  x += dx;
  y += dy;

  // Проверяем столкновение с правым/левым краем
  if (x + astronaut.offsetWidth >= screenWidth || x <= 0) {
    dx = -dx; // Изменяем направление движения
    rotationSpeed = -rotationSpeed; // Меняем направление вращения
  }

  // Проверяем столкновение с верхним/нижним краем
  if (y + astronaut.offsetHeight >= screenHeight || y <= 0) {
    dy = -dy; // Изменяем направление движения
    rotationSpeed = -rotationSpeed; // Меняем направление вращения
  }

  // Обновляем вращение
  rotation += rotationSpeed;

  // Применяем новые значения
  astronaut.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
}

// Запускаем анимацию
function animateAstronaut() {
  updateAstronaut();
  requestAnimationFrame(animateAstronaut); // Рекурсивно вызываем функцию
}

// Запускаем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  createStars(100); // Создаем 100 звезд
  animateAstronaut(); // Запускаем анимацию космонавта
});

// Обновляем размеры экрана при изменении окна браузера
window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  // При изменении размера окна корректируем позицию космонавта
  if (x + astronaut.offsetWidth > screenWidth) x = screenWidth - astronaut.offsetWidth;
  if (y + astronaut.offsetHeight > screenHeight) y = screenHeight - astronaut.offsetHeight;
});