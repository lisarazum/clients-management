// запись контактов в объект
export function addContactsArray(array, userContactType, userContactValue) {
  let type;
  let value;
  let contactArr = Array.from(userContactType).map((elem, index) => {
    type = elem.value;
    value = Array.from(userContactValue)[index].value;
    array.push({
      type: type,
      value: value
    });
  });
}

// добавление svg иконкам соц-сетей
export const createSocialIconPhone = function(item, icon, value) {
  item.innerHTML = `
    <button class="btn-reset">
      <span class="tooltip">
        <a href="tel:${value}" class="phone-link">${value}</a>
      </span>
      <svg class="table-main__svg">
        <use xlink:href="./img/sprite.svg#${icon}"></use>
      </svg>
    </button>
  `;
  return item.innerHTML;
}
export const createSocialIconMail = function(item, icon, value) {
  item.innerHTML = `
    <button class="btn-reset">
      <span class="tooltip">
        <a href="mailto:${value}" class="phone-link">${value}</a>
      </span>
      <svg class="table-main__svg">
        <use xlink:href="./img/sprite.svg#${icon}"></use>
      </svg>
    </button>
  `;
  return item.innerHTML;
}
export const createSocialIcons = function(item, icon, value, social) {
  item.innerHTML = `
    <button class="btn-reset">
      <span class="tooltip">
        ${social} <a href="${value}"> ${value}</a>
      </span>
      <svg class="table-main__svg">
        <use xlink:href="./img/sprite.svg#${icon}"></use>
      </svg>
    </button>
  `;
  return item.innerHTML;
}

// форматирование даты и времени, шоб красииииииво было
export const formatDate  = function(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yyyy = date.getFullYear();
  return dd + '.' + mm + '.' + yyyy;
}
export const formatTime = function(date) {
  let hh = date.getHours();
  if (hh < 10) hh = '0' + hh;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  return hh + ':' + minutes;
}

// открытие модалки
export function openModal(modal, overlay) {
  modal.classList.add('is-active')
  overlay.classList.add('is-active')
}

// закрытие модалки
export function closeModal(modal, overlay) {
  modal.classList.remove('is-active')
  overlay.classList.remove('is-active')
}
// function inputmask
export function getcontact(select) {
  
  select.forEach((el) => {
    if (el.value === 'telephone') {
      let input = el.nextElementSibling
      inputMaskTel(input)
    }
    el.addEventListener('change', () => {
      if (el.value === 'telephone') {
        let input = el.nextElementSibling
        inputMaskTel(input)
      } else if (el.value === 'dop telephone') {
        let input = el.nextElementSibling
        inputMaskDopTel(input)
      } else if (el.value === 'email') {
        let input = el.nextElementSibling
        inputMaskEmail(input)
      } else if (el.value === 'vk') {
        let input = el.nextElementSibling
        inputMaskVk(input)
      } else if (el.value === 'facebook') {
        let input = el.nextElementSibling
        inputMaskFacebook(input)
      }
    })
  })
}

// inputmask
export function inputMaskTel(input) {
  let im = new Inputmask('+7 999 999 99 99')
  im.mask(input)
}
export function inputMaskDopTel(input) {
  let im = new Inputmask('999 99 99')
  im.mask(input)
}
export function inputMaskEmail(input) {
  let im = new Inputmask({ alias: "email"})
  im.mask(input)
}
export function inputMaskVk(input) {
  let im = new Inputmask({ regex: "https://.*" })
  im.mask(input)
}
export function inputMaskFacebook(input) {
  let im = new Inputmask({ regex: "https://.*" })
  im.mask(input)
}

