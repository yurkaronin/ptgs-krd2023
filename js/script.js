console.log('Файл подключён!');
document.addEventListener("DOMContentLoaded", () => {
  console.log('Загрузка странички завершена!');
});

// техническая часть - УДАЛИТЬ НА ПРОДАКШЕНЕ!
// получить в консоли элемент, по которому кликнули
document.addEventListener('click', e => console.log(e.target));
