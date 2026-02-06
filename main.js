const sliderArrowsBtns = document.querySelectorAll(".slider-arrows__arrow");
const sliderArrowsItems = document.querySelectorAll(".slider-arrows__item");
const sliderDots = document.querySelectorAll(".slider-dot"); // если есть
let currentIndex = 0;

// Показываем первый слайд при загрузке
showSlide(currentIndex);

function showSlide(index) {
    // Скрываем все слайды
    sliderArrowsItems.forEach(item => {
        item.classList.remove('active');
        item.classList.add('hide');
    });
    
    // Показываем нужный слайд
    sliderArrowsItems[index].classList.remove('hide');
    sliderArrowsItems[index].classList.add('active');
    
    // Обновляем точки (если есть)
    if (sliderDots.length > 0) {
        sliderDots.forEach(dot => dot.classList.remove('active'));
        sliderDots[index].classList.add('active');
    }
    
    // Обновляем текущий индекс
    currentIndex = index;
}

function nextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= sliderArrowsItems.length) {
        newIndex = 0; // Возвращаемся к первому слайду
    }
    showSlide(newIndex);
}

function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
        newIndex = sliderArrowsItems.length - 1; // Переходим к последнему слайду
    }
    showSlide(newIndex);
}

// Назначаем обработчики на кнопки
sliderArrowsBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Определяем, какая кнопка была нажата
        if (btn.classList.contains('slider-arrows__arrow-right') || 
            btn.classList.contains('next')) {
            nextSlide();
        } else if (btn.classList.contains('slider-arrows__arrow-left') || btn.classList.contains('prev')) {
            prevSlide();
        }
    });
});

// Если есть точки для переключения
if (sliderDots.length > 0) {
    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
        });
    });
}

// CSS для плавных переходов должен быть таким:
/*
.slider-arrows__item {
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}

.slider-arrows__item.active {
    opacity: 1;
    pointer-events: all;
}
*/
// ______________________________________________________________________


// Получаем элементы с правильными селекторами
const sliderDotsItems = document.querySelectorAll(".slider-dots__item");
const sliderDotsNavItems = document.querySelectorAll(".slider-dots__nav-item");
let currentDotIndex = 0;
let autoSlideInterval = null;
const SLIDE_INTERVAL = 3000; // 3 секунды

// Функция для показа слайда
function showDotSlide(index) {
    // 1. Скрываем все слайды
    sliderDotsItems.forEach(item => {
        item.classList.add('hide');
    });
    
    // 2. Показываем выбранный слайд
    sliderDotsItems[index].classList.remove('hide');
    
    // 3. Обновляем навигационные точки
    sliderDotsNavItems.forEach(navItem => {
        navItem.classList.remove('slider-dots__nav-item--active');
    });
    sliderDotsNavItems[index].classList.add('slider-dots__nav-item--active');
    
    // 4. Обновляем текущий индекс
    currentDotIndex = index;
}

// Функция для перехода к следующему слайду
function nextDotSlide() {
    let nextIndex = currentDotIndex + 1;
    if (nextIndex >= sliderDotsItems.length) {
        nextIndex = 0; // Возвращаемся к первому слайду
    }
    showDotSlide(nextIndex);
}

// Функция для запуска автопереключения
function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval); // Очищаем предыдущий интервал
    }
    autoSlideInterval = setInterval(nextDotSlide, SLIDE_INTERVAL);
}

// Функция для остановки автопереключения
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Инициализация
function initSlider() {
    // Показываем первый слайд при загрузке
    showDotSlide(0);
    
    // Запускаем автопереключение
    startAutoSlide();
    
    // Назначаем обработчики на навигационные точки
    sliderDotsNavItems.forEach((navItem, index) => {
        navItem.addEventListener("click", () => {
            // Останавливаем автопереключение при клике
            stopAutoSlide();
            
            // Показываем выбранный слайд
            showDotSlide(index);
            
            // Перезапускаем автопереключение через 5 секунд
            setTimeout(startAutoSlide, 5000);
        });
    });
    
    // Останавливаем автопереключение при наведении на слайдер
    const sliderContainer = document.querySelector(".slider-dots");
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Опционально: кнопка "Start drinking" тоже переключает слайды
    // const startDrinkingBtn = document.querySelector(".slider-dots__btn");
    // if (startDrinkingBtn) {
    //     startDrinkingBtn.addEventListener("click", () => {
    //         stopAutoSlide();
    //         nextDotSlide();
    //         setTimeout(startAutoSlide, 5000);
    //     });
    // }
}

// Запускаем слайдер когда DOM загружен
document.addEventListener('DOMContentLoaded', initSlider);

// Если нужно управлять автопереключением извне
// window.sliderControls = {
//     start: startAutoSlide,
//     stop: stopAutoSlide,
//     next: nextDotSlide,
//     show: showDotSlide
// };


// ==================== BURGER
const menuIcon = document.querySelector(".menu-icon"),
    header = document.querySelector(".header");
    

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle("menu-icon--active");
    header.classList.toggle("header--mobile");
});

