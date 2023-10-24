console.log('Файл подключён!');
document.addEventListener("DOMContentLoaded", () => {
  console.log('Загрузка странички завершена!');

  // показ мобильного меню и кнопки
  const buttonMenu = document.querySelector('.button-menu');
  // const navigation = document.querySelector('.navigation');
  buttonMenu.addEventListener('click', function () {
    buttonMenu.classList.toggle('isActive');
    // navigation.classList.toggle('isActive');
    document.body.classList.toggle('menu-open');
  });


// Гибридный аккордеон в мобильном меню
// Находим все ссылки с классом .js-accordion-link
let links = document.querySelectorAll('.js-accordion-link');

// Добавляем слушатель события 'click' для каждой ссылки
links.forEach(link => {
    link.addEventListener('click', function(event) {
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




});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
