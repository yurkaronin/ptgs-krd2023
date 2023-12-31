// прилипающая шапка
let lastKnownScrollY = 0;
let ticking = false;

function headerChange() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    document.body.classList.add("header-sticky");
  } else {
    document.body.classList.remove("header-sticky");
  }

  ticking = false;
}

function onScroll() {
  lastKnownScrollY = window.scrollY;
  requestTick();
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(headerChange);
  }

  ticking = true;
}

document.addEventListener("DOMContentLoaded", () => {

  headerChange();
  window.addEventListener("scroll", onScroll, { passive: true });

  // показ мобильного меню и кнопки
  const buttonMenu = document.querySelector('.button-menu');
  // const navigation = document.querySelector('.navigation');
  buttonMenu.addEventListener('click', function () {
    buttonMenu.classList.toggle('isActive');
    // navigation.classList.toggle('isActive');
    document.body.classList.toggle('menu-open');
  });


  // Гибридный аккордеон в мобильном меню
  if (document.documentElement.clientWidth <= 1279) {
    // Находим все ссылки с классом .js-accordion-link
    let links = document.querySelectorAll('.js-accordion-link');

    // Добавляем слушатель события 'click' для каждой ссылки
    links.forEach(link => {
      link.addEventListener('click', function (event) {
        // Предотвращаем действие по умолчанию (если это обычная ссылка)
        event.preventDefault();

        // Получаем родительский элемент
        let parent = this.parentElement;

        // Проверяем, есть ли у родителя класс 'active'
        if (parent.classList.contains('menu-accordion-active')) {
          // Если класс есть - удаляем его
          parent.classList.remove('menu-accordion-active');
        } else {
          // Если класса нет - добавляем его
          parent.classList.add('menu-accordion-active');
        }
      });
    });
  };
  // слайдер с логотипами
  if (document.querySelector('.customers__slider .mySwiper')) {
    console.log('Слайдер с логотипами есть!');
    var swiperCustomers = new Swiper(".customers__slider .mySwiper", {
      // slidesPerView: 6,
      spaceBetween: 32,
      navigation: {
        nextEl: ".customers__slider .swiper-button-next",
        prevEl: ".customers__slider .swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        450: {
          slidesPerView: 2
        },
        767: {
          slidesPerView: 2
        },
        1023: {
          slidesPerView: 3
        },
        1279: {
          slidesPerView: 3
        },
        // when window width is >= 640px
        1600: {
          slidesPerView: 3
        }
      }
    });
  }
  // слайдер с фото
  if (document.querySelector('.photo-slider .mySwiper')) {
    console.log('Слайдер с фотографиями есть!');
    var swiperPhotoSlider = new Swiper(".photo-slider .mySwiper", {
      // slidesPerView: 6,
      spaceBetween: 32,
      navigation: {
        nextEl: ".photo-slider .swiper-button-next",
        prevEl: ".photo-slider .swiper-button-prev",
      },
      breakpoints: {
        // when window width is >= 320px
        425: {
          slidesPerView: 2
        },
        // when window width is >= 480px
        767: {
          slidesPerView: 2
        },
        1023: {
          slidesPerView: 2
        },
        1279: {
          slidesPerView: 2
        },
        // when window width is >= 640px
        1600: {
          slidesPerView: 2
        }
      }
    });
  }

  // слайдер с преимуществами
  // Функция для инициализации слайдера
  function initSwiperAdvantages() {
    var swiperAdvantages = new Swiper(".advantages__slider .mySwiper", {
      slidesPerView: 'auto',
      spaceBetween: 24,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      }
    });
  }

  if (document.querySelector('.advantages__slider .mySwiper') && window.innerWidth <= 1600) {
    console.log('Слайдер без класса .advantages__slider--on найден и ширина экрана подходящая!');
    initSwiperAdvantages(); // Инициализируем слайдер с проверкой ширины экрана
  }



  // Аккондиончики в подвале с менюшками
  // Получаем все элементы с классом .footer-accordion
  const accordions = document.querySelectorAll('.footer-accordion');

  // Определяем функцию, которая будет выполняться при клике
  function toggleAccordion(event) {
    // Проверяем, является ли элемент, по которому кликнули, или его родитель, элементом с классом .footer-navigation__link
    let target = event.target;
    while (target != this) {
      if (target.matches('.footer-navigation__link')) {
        // Отменяем действие по умолчанию
        event.preventDefault();
        console.log('111');
        // Добавляем или удаляем активный класс
        this.classList.toggle('active');
        break;
      }
      target = target.parentNode;
    }
  }

  // Добавляем слушателей событий на все .footer-accordion
  if (document.documentElement.clientWidth <= 767) {
    accordions.forEach(function (accordion) {
      accordion.addEventListener('click', toggleAccordion);
    });
  };


  // показ блока поиска в шапке сайта
  // Поиск элемента .js-show-me-header
  var searchLink = document.querySelector('.js-show-me-header');

  // Если элемент найден, то слушаем событие клика
  if (searchLink) {
    searchLink.addEventListener('click', function (event) {
      // Отменяем действие по умолчанию для ссылки
      event.preventDefault();

      // Добавляем или удаляем класс .header-search-active у body
      document.body.classList.toggle('header-search-active');
    });
  }

  // Поиск элемента .close внутри .header-search и слушаем событие клика
  var closeButton = document.querySelector('.header-search .close');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      // Удаляем класс .header-search-active у body
      document.body.classList.remove('header-search-active');
    });
  }

  // анимация бегущих цифр на базе GSAP JS
  // Активация ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Функция для анимации числа
  function animateNumber(target, endValue) {
    let obj = { score: 0 };
    gsap.to(obj, {
      score: endValue,
      duration: 2, // Продолжительность анимации в секундах
      onUpdate: function () {
        target.innerText = Math.ceil(obj.score);
      },
      ease: "power1.out", // Тип анимации, можно изменить по желанию
    });
  }

  // Выбираем все элементы с числами для анимации
  document.querySelectorAll('.animate-number').forEach((span) => {
    // Получаем число из текста каждого элемента
    const numberMatch = span.textContent.match(/\d+/);
    if (numberMatch) {
      const endValue = parseInt(numberMatch[0]);
      // Создаем новый span для числа
      const numberSpan = document.createElement('span');
      numberSpan.textContent = '0';
      // Заменяем число в исходном span на новый span
      span.innerHTML = span.innerHTML.replace(numberMatch[0], numberSpan.outerHTML);
      // Создаем ScrollTrigger для каждого числа
      ScrollTrigger.create({
        trigger: span, // Элемент-триггер для старта анимации
        start: 'top 80%', // Анимация начнется, когда элемент появится на 80% в области видимости
        onEnter: () => animateNumber(span.querySelector('span'), endValue) // Запуск анимации
      });
    }
  });


  // Подключаем Яндекс карту на сайт
  ymaps.ready(function () {
    initMap('.js-map', [61.785247, 92.727469], 3, [
      // Массив данных для геометок большой карты
      {
        coords: [61.785247, 92.727469],
        name: 'Место 1',
        description: 'Краткое описание места 1.',
        link: '#'
      },
      // Дополнительные метки для большой карты
      {
        coords: [55.755814, 37.617635],
        name: 'Место 2',
        description: 'Краткое описание места 2.',
        link: '#'
      },
      {
        coords: [59.934280, 30.335099],
        name: 'Место 3',
        description: 'Краткое описание места 3.',
        link: '#'
      }
      // Добавьте остальные объекты для геометок здесь
    ]);

    initMap('.js-map-2', [55.751574, 37.573856], 3, [
      // Массив данных для геометки маленькой карты
      {
        coords: [55.751574, 37.573856],
        name: 'Уникальное Место',
        description: 'Описание для уникального места.',
        link: '#'
      }
    ]);
  });

  function initMap(mapSelector, centerCoords, zoomLevel, places) {
    if (document.querySelector(mapSelector)) {
      let mapElement = document.querySelector(mapSelector);
      let map = new ymaps.Map(mapElement, {
        center: centerCoords,
        zoom: zoomLevel,
        type: 'yandex#satellite'
      });

      // Включаем перетаскивание карты
      map.behaviors.enable('drag');

      // Создаем шаблон балуна
      var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="balloon">' +
        '<div class="balloon__inner">' +
        '<h3 class="balloon__title">$[properties.name]</h3>' +
        '<p class="balloon__description">$[properties.description]</p>' +
        '<a href="$[properties.link]" class="balloon__button button">' +
        '<div class="button__icon">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" fill="none">' +
        '<path stroke="#0066B3" stroke-width="2" d="m12 1 4 4m0 0-4 4m4-4H0"></path>' +
        '</svg>' +
        '</div>' +
        '<span class="button__text">Подробнее</span>' +
        '</a>' +
        '</div>' +
        '</div>', {
        // Определяем пустой метод build для предотвращения ошибок
        build: function () {
          this.constructor.superclass.build.call(this);
        },
        // Определяем пустой метод clear для предотвращения ошибок
        clear: function () {
          this.constructor.superclass.clear.call(this);
        }
      }
      );

      // Добавляем метки на карту
      places.forEach(function (place) {
        let placeMark = new ymaps.Placemark(place.coords, {
          name: place.name,
          description: place.description,
          link: place.link
        }, {
          balloonContentLayout: MyBalloonLayout,
          iconLayout: 'default#image',
          iconImageHref: './img/map/balun.svg',
          iconImageSize: [42, 56],
          iconImageOffset: [-19, -44]
        });

        map.geoObjects.add(placeMark);
      });

      // Удаление стандартных элементов управления и отключение прокрутки
      map.controls.remove('geolocationControl');
      map.controls.remove('searchControl');
      map.controls.remove('trafficControl');
      map.controls.remove('typeSelector');
      map.behaviors.disable(['scrollZoom']);
    }
  };

  // Доработки версии скриптов валидации формы
  // Работа с модальными окнами
  const handleClickOrTouch = (element, callback) => {
    const touchendListener = (e) => {
      e.preventDefault();
      element.removeEventListener('touchend', touchendListener);
      callback(e);
    };

    element.addEventListener('click', callback);
    element.addEventListener('touchstart', (e) => {
      e.preventDefault();
      element.addEventListener('touchend', touchendListener);
    });
  };

  const setupBodyClickListener = () => {
    document.removeEventListener('click', bodyClickListener);

    function bodyClickListener(event) {
      let activeModal = document.querySelector('.modal.active');
      if (activeModal && (!event.target.closest('.modal__body') || event.target.closest('.js-close-modal'))) {
        activeModal.classList.remove('active');
        document.removeEventListener('click', bodyClickListener);
      }
    }

    document.addEventListener('click', bodyClickListener);
  };

  let showDialogButtons = document.querySelectorAll('[data-target]');
  showDialogButtons.forEach(button => {
    handleClickOrTouch(button, function (event) {
      event.preventDefault();
      event.stopPropagation();

      let targetClass = event.currentTarget.getAttribute('data-target');
      let modal = document.getElementById(targetClass);

      if (modal) {
        modal.classList.add('active');
        setupBodyClickListener();
      }
    });
  });

  // Закрытие активного модального окна
  const closeActiveModal = () => {
    let activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
    }
  };

  // Показать модальное окно с сообщением об успешной отправке
  const showSuccessModal = () => {
    let successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.classList.add('active');
      setupBodyClickListener();
    }
  };

  // Настройки маски для телефона
  const maskOptions = {
    mask: '+{7}(000)000-00-00'
  };

  // Находим все элементы ввода с типом 'tel'
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    IMask(input, maskOptions);
    input.setAttribute('pattern', '\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}');
    input.setAttribute('title', 'Номер телефона должен содержать 11 цифр');
  });

  // Находим все формы на странице
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Проверка валидации формы перед отправкой
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      // Закрытие текущего модального окна
      closeActiveModal();

      // Показать модальное окно с сообщением об успешной отправке
      showSuccessModal();
    });
  });



});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
