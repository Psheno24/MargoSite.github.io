const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (event) => {
  phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Удаляем все, что не цифры
});


// Функция для блокировки прокрутки только на мобильных устройствах
function preventScroll(event) {
    if (window.innerWidth <= 768) {  // Проверка на мобильные устройства
      event.preventDefault(); // Останавливает любые действия по свайпу
    }
  }
  
  const checkbox = document.querySelector('.checkbox');
  const body = document.body;
  const menuLinks = document.querySelectorAll('.menu-items a'); // Все ссылки меню
  const menuButton = document.querySelector('.buttonContainer button'); // Кнопка в меню
  
  // Функция закрытия меню
  const closeMenu = () => {
    checkbox.checked = false; // Снимаем галочку
    body.classList.remove('no-scroll'); // Возвращаем прокрутку
    document.removeEventListener('touchmove', preventScroll); // Разрешаем свайпы
  };
  
  // Запрещаем прокрутку при открытом меню
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      body.classList.add('no-scroll');
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      closeMenu();
    }
  });
  
  // Разрешаем прокрутку при клике на любой пункт меню или кнопку
  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  
  menuButton.addEventListener('click', closeMenu); // Для кнопки
  




document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    const images = imageContainer.querySelectorAll("img");
    let currentIndex = 0;
    let timer;
  
    // Функция для переключения изображения
    const switchImage = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    };
  
    // Автоматическая смена изображения
    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      switchImage(currentIndex);
    };
  
    // Сброс таймера
    const resetTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextImage, 5000); // Интервал в 5 секунд
    };
  
    // Инициализация
    switchImage(currentIndex);
    resetTimer();
  
    // Обработка кликов по imageContainer
    imageContainer.addEventListener("click", () => {
      nextImage(); // Переключить на следующее изображение
      resetTimer(); // Перезапустить таймер
    });
  });
  



document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel__wrapper");
  const slides = document.querySelectorAll(".carousel__slide");
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updatesecondCarousel() {
    const offset = -100 * currentIndex; // Смещение на 100% для каждой группы
    wrapper.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Возвращаемся к последнему
    updatesecondCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Переход к первому
    updatesecondCarousel();
  });
});

// Инициализация элементов
const carousel = document.querySelector(".secondCarousel");
const wrapper = document.querySelector(".secondCarousel__wrapper");
const slides = document.querySelectorAll(".secondCarousel__slide");
const prevButton = document.querySelector(".secondCarousel__prev");
const nextButton = document.querySelector(".secondCarousel__next");
let currentIndex = 0;

// Получаем количество слайдов
const totalSlides = slides.length;

// Функция для обновления слайда
function updateCarousel() {
  // Позиционируем wrapper с учетом индекса
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Функция для перехода на следующий слайд
function nextSlide() {
  // Перемещаемся к следующему слайду и зацикливаем
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

// Функция для перехода на предыдущий слайд
function prevSlide() {
  // Перемещаемся к предыдущему слайду и зацикливаем
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Обработчики событий для кнопок
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Функция для обработки свайпа
let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    nextSlide(); // Свайп влево (вперёд)
  } else if (endX - startX > 50) {
    prevSlide(); // Свайп вправо (назад)
  }
});

// Обновление карусели при загрузке
window.addEventListener("load", updateCarousel);

// Чтобы карусель корректно работала после ресайза окна
window.addEventListener("resize", updateCarousel);

// Найти элементы для управления
const laptop = document.querySelector(".laptop");
const laptopBlock = document.querySelector(".laptop-block");

// Настройки Intersection Observer
const observerOptions = {
  root: null, // Используем окно браузера
  rootMargin: "-40% 0px", // Смещаем точку срабатывания на середину экрана
  threshold: 0, // Реагируем, когда хотя бы минимальная часть блока видна
};

// Функция, которая будет вызвана, когда элемент пересечет порог
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      laptop.classList.remove("laptop--closed"); // Убрать закрытое состояние
      laptopBlock.style.transform = "scale(0)"; // Открыть верхнюю часть
    } else {
      laptop.classList.add("laptop--closed"); // Вернуть в закрытое состояние
      laptopBlock.style.transform = "scale(1)"; // Закрыть верхнюю часть
    }
  });
};

// Создаем наблюдатель
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Наблюдаем за контейнером
observer.observe(document.querySelector(".laptopContainer"));






// Инициализация EmailJS с публичным ключом
emailjs.init("zq7v07VJEBawgYzDZ");

// Открытие и закрытие модального окна
const openFormMenu = document.getElementById("openFormMenu");
const openFormButton = document.getElementById("openFormButton");
const openFormBottom = document.getElementById("openFormBottom");
const closeForm = document.getElementById("closeForm");
const modal = document.getElementById("modal");

// Модальные уведомления для успеха и ошибки
const successNotification = document.getElementById("successNotification");
const errorNotification = document.getElementById("errorNotification");

// Открытие формы
function openForm() {
  modal.style.display = "flex";
  document.body.classList.add("modal-open"); // Блокировка прокрутки страницы
}

// Закрытие формы
function closeFormHandler() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open"); // Восстановление прокрутки страницы
}

openFormMenu?.addEventListener("click", openForm);
openFormButton?.addEventListener("click", openForm);
openFormBottom?.addEventListener("click", openForm);

closeForm?.addEventListener("click", closeFormHandler);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeFormHandler();
  }
});

// Нормализация имени тарифа (опционально)
function normalizeTariffName(tariffName) {
  return tariffName
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[А-ЯЁ]/g, (char) => char.toLowerCase());
}

// Получение выбранных тарифов
function getSelectedTariffs(tariffName) {
  const tariffValue = document.getElementsByClassName(`${tariffName}-traffic`)[0].value;
  const trafficData =  tariffValue ? JSON.parse(tariffValue) : {};
  const price = trafficData.price ? parseInt(trafficData.price) : 0;

  return {
    name: trafficData.name,
    price,
  };
}

document.querySelectorAll(".traffic-editor").forEach((element) => {
  element.addEventListener("change", function() {
    updateTotalPrice();
  })
});

// Обновление итоговой цены
function updateTotalPrice() {
  const childTariff = getSelectedTariffs('child').price;
  const adultTariff = getSelectedTariffs('adult').price;
  let totalPrice = 0;
  let totalPriceWithoutDiscount = 0;

  totalPriceWithoutDiscount = childTariff + adultTariff;
  totalPrice = totalPriceWithoutDiscount;

  // Если оба тарифа выбраны, применяем скидку 10%
  const hasDiscount = childTariff > 0 && adultTariff > 0;
  if (hasDiscount) {
    totalPrice *= 0.9; // 10% скидка
  }

  // Показ итоговой цены
  const totalPriceElement = document.getElementById("totalPriceValue");
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice; // Обновляем только значение цены
  }

  const totalPriceWithoutDiscountElement = document.getElementById("totalPriceWithoutDiscount");
  const saleBackgroundElement = document.getElementById("saleBackground");

  // Логика управления видимостью цены без скидки и скидки
  if (totalPriceWithoutDiscountElement) {
    if (hasDiscount) {
      // Показать цену без скидки и скидку
      totalPriceWithoutDiscountElement.innerHTML = `<span style="text-decoration: line-through;">${totalPriceWithoutDiscount}₽</span>`;
      saleBackgroundElement.style.display = "block";
    } else {
      // Скрыть цену без скидки и скидку
      totalPriceWithoutDiscountElement.innerHTML = "";
      saleBackgroundElement.style.display = "none";
    }
  }

  return {
    totalPrice,
    totalPriceWithoutDiscount,
    hasDiscount,
  };
}

// Обработка формы
const form = document.getElementById("contactForm");
form?.addEventListener("submit", function (event) {
  event.preventDefault();

  // Собираем данные
  const childTariffs = getSelectedTariffs("child");
  const adultTariffs = getSelectedTariffs("adult");
  const { totalPrice, totalPriceWithoutDiscount, hasDiscount } = updateTotalPrice();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    childTariffs: `${childTariffs.name} - ${childTariffs.price}р`,
    adultTariffs: `${adultTariffs.name}- ${adultTariffs.price}р`,
    totalPrice: totalPrice,
    totalPriceWithoutDiscount: totalPriceWithoutDiscount,
    hasDiscount: hasDiscount
  };

  // Отправка через EmailJS
  emailjs
    .send("service_cs9p1tr", "template_z0w7jzg", formData)
    .then((response) => {
      console.log("Success", response);
      modal.style.display = "none"; // Закрыть модальное окно
      showNotification(successNotification, "Заявка успешно отправлена!");
    })
    .catch((error) => {
      console.error("Error", error);
      showNotification(errorNotification, "Произошла ошибка при отправке. Попробуйте еще раз.");
    });
});

// Показ уведомления
function showNotification(notificationElement, message) {
  notificationElement.textContent = message;
  notificationElement.style.display = "block";
  
  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 3000); // Скрытие уведомления через 3 секунды
}

// Остановка выбора нескольких тарифов в каждой категории
const childTariffs = document.querySelectorAll('input[name="childTariff"]');
const adultTariffs = document.querySelectorAll('input[name="adultTariff"]');

childTariffs.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    childTariffs.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
    updateTotalPrice();
  });
});

adultTariffs.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    adultTariffs.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
    updateTotalPrice();
  });
});

// Элемент кнопки отправки
const submitButton = document.getElementById("submitButton");
// Чекбокс для согласия
const approvalCheckbox = document.querySelector('input[name="approval"]');

// Функция для управления активностью кнопки отправки
function toggleSubmitButton() {
  if (approvalCheckbox.checked) {
    submitButton.removeAttribute("disabled"); // Активировать кнопку
  } else {
    submitButton.setAttribute("disabled", "disabled"); // Сделать кнопку неактивной
  }
}

// Добавление обработчика событий для изменения состояния чекбокса
approvalCheckbox.addEventListener("change", toggleSubmitButton);

// Инициализация кнопки при загрузке страницы
toggleSubmitButton();



/* Margo emailjs.init("zq7v07VJEBawgYzDZ");
.send("service_cs9p1tr", "template_z0w7jzg", formData) */

/* Sergo emailjs.init("B9zMyupnCHE8Qs3DQ");
.send("service_v6ppbhz", "template_3cp8efa", formData) */