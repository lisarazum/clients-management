// подключение БД
const response = await fetch('http://localhost:3000/api/clients')
const serverData = await response.json()
let arrList = [];

if (serverData) {
  arrList = serverData
} 

const sortId = document.querySelector('#sortId'),
      sortFIO = document.querySelector('#sortName'),
      sortCreate = document.querySelector('#sortCreate'),
      sortChange = document.querySelector('#sortChange'),
      searchInput = document.querySelector('#headerSearch'),
      $table = document.querySelector('.table-block'),
      newClientAdd = document.querySelector('.newClient-save'),
      newClientModal = document.querySelector('#new-client'),
      newClientInputs = document.querySelectorAll('.new-client__input'),
      userSurname = document.querySelector('#formSurname'),
      userName = document.querySelector('#formName'),
      userLastname = document.querySelector('#formLastname');
  

let overlay = document.querySelector('.overlay')
let sortFlag, sortDirFlag;
// создание строки пользователя
function createUserTr(oneUser) {
  // создание переменных для пользователей таблицы
  const $itemTr = document.createElement('ul'),
        $itemID = document.createElement('li'),
        $itemFIO = document.createElement('li'),
        $itemCreationDate = document.createElement('li'),
        $itemCreationTime = document.createElement('span'),
        $itemUpdatedDate = document.createElement('li'),
        $itemUpdatedTime = document.createElement('span'),
        $itemContacts = document.createElement('li'),
        $itemContactsList = document.createElement('ul'),
        $socialHiddenBtn = document.createElement('button'),
        $itemAction = document.createElement('li'),
        $itemChangeBtn = document.createElement('button'),
        $itemDeleteBtn = document.createElement('button');

  //добавление классов/аттрибутов элементам пользователей таблицы
  $itemTr.classList.add('list-reset', 'table-main');
  $itemID.classList.add('table-main__item', 'table-main-id');
  $itemFIO.classList.add('table-main__item');
  $itemCreationDate.classList.add('table-main__item');
  $itemCreationTime.classList.add('time');
  $itemUpdatedDate.classList.add('table-main__item');
  $itemUpdatedTime.classList.add('time');
  $itemContacts.classList.add('table-main__item');
  $itemContactsList.classList.add('list-reset', 'table-main__contacts');
  $socialHiddenBtn.classList.add('btn-reset', 'social-hidden');
  $itemAction.classList.add('table-main__item', 'table-main-action');
  $itemChangeBtn.classList.add('btn-reset', 'table-main__btn', 'table-main__change-btn');
  $itemDeleteBtn.classList.add('btn-reset', 'table-main__btn', 'table-main__cancel-btn');

  // добавление значений для элементов
  $itemID.textContent = oneUser.id;
  $itemFIO.textContent = oneUser.fio;
  $itemCreationDate.textContent = oneUser.createdDate;
  $itemCreationTime.textContent = oneUser.createdTime;
  $itemUpdatedDate.textContent = oneUser.updatedDate;
  $itemUpdatedTime.textContent = oneUser.updatedTime;

  // создание иконок соц-сетей
  if (oneUser.contacts.length == 0) {
    let $itemContactsItem = document.createElement('li');
    $itemContactsItem.classList.add('table-main__item-contact');
  }
  for (let i = 0; i < oneUser.contacts.length; i++) {
    let $itemContactsItem = document.createElement('li');
    $itemContactsItem.classList.add('table-main__item-contact');
    let contactType = oneUser.contacts[i]['type'];
    if (contactType === 'vk') {
      oneUser.vk = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIcons($itemContactsItem, 'vk', oneUser.vk, 'ВК: ');
      $itemContactsList.appendChild($itemContactsItem);
    } else if (contactType === 'facebook') {
      oneUser.facebook = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIcons($itemContactsItem, 'fb', oneUser.facebook, 'Фэйсбук: ');
      $itemContactsList.appendChild($itemContactsItem);
    } else if (contactType === 'telephone') {
      oneUser.telephone = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIconPhone($itemContactsItem, 'phone', oneUser.telephone);
      $itemContactsList.appendChild($itemContactsItem);
    } else if (contactType === 'dop telephone') {
      oneUser.telephone = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIconPhone($itemContactsItem, 'phone', oneUser.telephone);
      $itemContactsList.appendChild($itemContactsItem);
    } else if (contactType === 'email') {
      oneUser.email = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIconMail($itemContactsItem, 'mail', oneUser.email);
      $itemContactsList.appendChild($itemContactsItem);
    } else if (contactType !== 'vk' && contactType !== 'facebook' && contactType !== 'telephone' && contactType !== 'dop telephone' && contactType !== 'email') {
      let type = `${contactType}: `;
      let value = oneUser.contacts[i]['value'];
      oneUser[oneUser.contacts[i]['type']] = oneUser.contacts[i]['value'];
      $itemContactsItem.innerHTML = createSocialIcons($itemContactsItem, 'person', value, type);
      $itemContactsList.appendChild($itemContactsItem);
    }
  }

  // открытие скрытых иконок соц-сетей
  $socialHiddenBtn.addEventListener('click', function () {
    for (let i = 4; i < oneUser.contacts.length; i++) {
      let hiddenItems = $itemContactsList.childNodes[i];
      hiddenItems.style.display = 'block';
    }
    $socialHiddenBtn.remove();
  });
  // скрытие лишних иконок соц-сетей
  if (oneUser.contacts.length > 4) {
    let amountHiddenItems = $itemContactsList.childNodes.length - 4;
    $socialHiddenBtn.textContent = `+${amountHiddenItems}`;
    for (let i = 4; i < oneUser.contacts.length; i++) {
      let hiddenItems = $itemContactsList.childNodes[i];
      hiddenItems.style.display = 'none';
    }
    $itemContactsList.appendChild($socialHiddenBtn);
  }
  $itemChangeBtn.innerHTML = `
    <span class="loading purple"></span>
    <svg class="table-main__btn-svg change">
      <use xlink:href="./img/sprite.svg#edit"></use>
    </svg>
    Изменить
  `;
  $itemDeleteBtn.innerHTML = `
    <span class="loading orange"></span>
    <svg class="table-main__btn-svg cancel">
      <use xlink:href="./img/sprite.svg#cancel"></use>
    </svg>
    Удалить
  `;

  $itemChangeBtn.addEventListener('click', async function() {
    $itemChangeBtn.classList.add('is-loading')
    const timerId = setTimeout(() => {
      $itemChangeBtn.classList.remove('is-loading')
      changeUser($itemTr, oneUser.id, oneUser.name, oneUser.surname, oneUser.lastName, oneUser.contacts) 
    }, 400)
  })

  $itemDeleteBtn.addEventListener('click', async function() {
    $itemDeleteBtn.classList.add('is-loading')
    const timerId = setTimeout(() => {
      $itemDeleteBtn.classList.remove('is-loading')
      deleteUser($itemTr, oneUser.id) 
    }, 500)
  })

  // добавление в программу
  $itemCreationDate.append($itemCreationTime);
  $itemUpdatedDate.append($itemUpdatedTime);
  $itemContacts.append($itemContactsList);
  $itemAction.append($itemChangeBtn, $itemDeleteBtn);
  $itemTr.append($itemID, $itemFIO, $itemCreationDate, $itemUpdatedDate, $itemContacts, $itemAction);
  return $itemTr;
}

export async function render(arr) {
  let copyArr = [...arr];
  $table.innerHTML = '';
  for (const user of copyArr) {
    user.firstname = user.name.trim();
    user.lastname = user.lastName.trim();
    user.surname = user.surname.trim();
    user.fio = user.surname.charAt(0).toUpperCase() + user.surname.slice(1) + ' ' + user.name.charAt(0).toUpperCase() + user.name.slice(1) + ' ' + user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
    
    user.createdDate = formatDate(new Date(`${user.createdAt}`));
    user.createdTime = formatTime(new Date(`${user.createdAt}`));
    user.updatedDate = formatDate(new Date(`${user.updatedAt}`));
    user.updatedTime = formatTime(new Date(`${user.updatedAt}`));
  }

  //сортировка
  copyArr.sort(function (a, b) {
    let sort = a[sortFlag] < b[sortFlag];
    if (sortDirFlag === false) sort = a[sortFlag] > b[sortFlag];
    if (sort) return -1;
  });

  // вывод списка элементов
  for (const item of copyArr) {
    const $newTr = createUserTr(item);
    $table.append($newTr);
  }
}

render(arrList);

// ф-я cортировки
const sort = (btn, flag) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.childNodes[1].classList.toggle('down');
    sortFlag = `${flag}`;
    sortDirFlag = !sortDirFlag;
    render(arrList);
  });
}

sort(sortId, 'id')
sort(sortFIO, 'fio')
sort(sortCreate, 'createdAt')
sort(sortChange, 'updatedAt')

// фильтрация
searchInput.addEventListener('input', async () => {
  const response = await fetch(`http://localhost:3000/api/clients?search=${searchInput.value}`, {})
  let data = await response.json()
  render(data);
});

// добавление нового клиента
newClientAdd.addEventListener('click', async function (event) {
  // validation
  const newClientInputs = document.querySelectorAll('.new-client__input')
  let validationResult = false
  removeError()
  createError(newClientInputs)
  function validation() {
    newClientInputs.forEach((el) => {
      if (el.classList.contains('is-invalid')) {
        validationResult = false
      } else {
        validationResult = true
      }
    })
  }

  validation()

  if (validationResult == false) {
    return
  }

  
  // запись контактов в объект
  const userContactType = document.querySelectorAll('.contacts__select'),
        userContactValue = document.querySelectorAll('.contacts__input');
  let userContacts = [];
  addContactsArray(userContacts, userContactType, userContactValue)


  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify({
      name: userName.value,
      surname: userSurname.value,
      lastName: userLastname.value,
      contacts: userContacts
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const userTr = await response.json()
  arrList.push(userTr)

  render(arrList);

  newClientInputs.forEach(el => {
    el.value = '';
  });

  userContactValue.forEach(el => {
    el.value = '';
  });

  newClientModal.classList.remove('is-active');
  overlay.classList.remove('is-active');
});


// импорт ф-й
import { addContactsArray } from './function.js'
import { createSocialIconPhone } from './function.js'
import { createSocialIconMail } from './function.js'
import { createSocialIcons } from './function.js'
import { formatDate } from './function.js'
import { formatTime } from './function.js'

import { changeUser } from './modals.js'
import { deleteUser } from './modals.js'

import { removeError } from './validation.js'
import { createError } from './validation.js'
// import { validateInputs } from './validation.js'