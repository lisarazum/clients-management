let overlay = document.querySelector('.overlay')

// форма добавления нового контакта
const modalOpenBtn = document.querySelector('.main-section__btn'),
      modalForm = document.querySelector('#new-client'),
      modalFormClose = document.querySelector('.newClient-close'),
      modalFormCancel = document.querySelector('.newClient-cancel');

modalOpenBtn.addEventListener('click', () => {
  openModal(modalForm, overlay)
  const contactSelect = document.querySelectorAll('.contacts__select')
  getcontact(contactSelect)
})

modalFormClose.addEventListener('click', () => {
  closeModal(modalForm, overlay)
})

overlay.addEventListener('click', () => {
  closeModal(modalForm, overlay)
})

modalFormCancel.addEventListener('click', () => {
  closeModal(modalForm, overlay)
})

// форма удаления
const modalDeleteForm = document.querySelector('#delete-client');
const modalDeleteFormClose = document.querySelector('.deleteClient-close');
const modalDeleteFormCancel = document.querySelector('.deleteClient-cancel');
const modalDeleteFormDelete = document.querySelector('.deleteClient-delete');

export const deleteUser = async function(item, id) {
  openModal(modalDeleteForm, overlay)

  modalDeleteFormClose.addEventListener('click', () => {
    closeModal(modalDeleteForm, overlay)
  })
  modalDeleteFormCancel.addEventListener('click', () => {
    closeModal(modalDeleteForm, overlay)
  })
  overlay.addEventListener('click', () => {
    closeModal(modalDeleteForm, overlay)
  })

  modalDeleteFormDelete.addEventListener('click', async () => {

    async function serverDeleteClient() {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
      })
    
      let data = await response.json()
      return data
    }
    
    await serverDeleteClient()
    modalDeleteFormDelete.classList.remove('is-loading')
    item.remove()

    closeModal(modalDeleteForm, overlay)
  })
}

/////////////////////////////////////////////////////////////////////////////////////////
// форма изменения клиента
const modalChangeForm = document.querySelector('#change-client');
modalChangeForm.innerHTML = ''
export const changeUser = async (item, id, name, surname, lastname, contacts) => {

  // отрисовка формы изменения клиента
  let modalHeader = document.createElement('div')
  modalHeader.classList.add('modal__client')
  let modalContacts = document.createElement('div')
  modalContacts.classList.add('modal__contacts', 'contacts', 'modal-form__container', 'contacts__container', 'contacts__change-container')
  let modalAddBtn = document.createElement('button')
  modalAddBtn.classList.add('btn-reset', 'modal-form__add-contact', 'modal-form__add-change-contact')
  let modalFooter = document.createElement('div')
  modalFooter.classList.add('modal__bottom')

  modalHeader.innerHTML = `
    <div class="modal__top">
        <button class="btn-reset modal-form__close changeClient-close">
          <svg>
            <use xlink:href="img/sprite.svg#close"></use>
          </svg>
        </button>
    </div>
    <div class="modal-form__container">
      <h2 class="modal-form__title">Изменить данные
      <span class="modal-form__title-ID">ID: ${id}</span></h2>
      <form class="change-client">
        <input type="date" name="date-create" style="display: none;">
        <input type="date" name="date-change" style="display: none;">
        <input type="number" name="id" style="display: none;">
        <div class="modal-form__block">
          <label class="change-client__label modal-form__label">
            <input type="text" name="surname" placeholder=" " value="${surname}" id="newClientSurname" class="input-reset modal-form__input change-client__input" required>
            <span class="label-text">Фамилия<span>*</span></span>
          </label>
        </div>
        <div class="modal-form__block">
          <label class="change-client__label modal-form__label">
            <input type="text" name="name" placeholder=" " value="${name}" id="newClientName" class="input-reset modal-form__input change-client__input" required>
            <span class="label-text">Имя<span>*</span></span>
          </label>
        </div>
        <div class="modal-form__block">
          <label class="change-client__label modal-form__label"> 
            <input type="text" name="patronomic" placeholder=" " value="${lastname}" id="newClientLastname" class="input-reset modal-form__input change-client__input">
            <span class="label-text">Отчество</span>
          </label>
        </div>
      </form>
    </div>
  `
  modalAddBtn.innerHTML = `
      <svg class="modal-form__add-contact-svg">
        <use xlink:href="./img/sprite.svg#circle-add"></use>
      </svg>
      Добавить контакт`
  modalFooter.innerHTML = `
    <div class="modal-form__container">
      <button type="submit" class="btn-reset modal-form__save changeClient-save">
        Сохранить
      </button>
      <button class="btn-reset modal-form__cancel changeClient-delete">
        Удалить
      </button>
    </div>`

    // отрисовка контактов пользователя
    let userContacts = [];
    for (let i = 0; i < contacts.length; i++) {
      userContacts.push(contacts[i])
      let modalOneContact = document.createElement('div')
      if (userContacts[i].type == "vk") {
        modalOneContact.innerHTML = `
        <div class="contacts__block">
          <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
            <option value="telephone">Телефон</option>
            <option value="dop telephone">Доп. телефон</option>
            <option value="email">Email</option>
            <option value="vk" selected>Vk</option>
            <option value="facebook">Facebook</option>
          </select>
          <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
          <button class="btn-reset contacts__delete">
            <svg class="contacts__delete-svg">
              <use xlink:href="./img/sprite.svg#tinyClose"></use>
            </svg>
          </button>
        </div>`
      } else if (userContacts[i].type == "facebook") {
        modalOneContact.innerHTML = `
          <div class="contacts__block">
            <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
              <option value="telephone">Телефон</option>
              <option value="dop telephone">Доп. телефон</option>
              <option value="email">Email</option>
              <option value="vk">Vk</option>
              <option value="facebook" selected>Facebook</option>
            </select>
            <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
            <button class="btn-reset contacts__delete">
              <svg class="contacts__delete-svg">
                <use xlink:href="./img/sprite.svg#tinyClose"></use>
              </svg>
            </button>
          </div>
        `
      } else if (userContacts[i].type == "telephone") {
        modalOneContact.innerHTML = `
          <div class="contacts__block">
            <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
              <option value="telephone" selected>Телефон</option>
              <option value="dop telephone">Доп. телефон</option>
              <option value="email">Email</option>
              <option value="vk">Vk</option>
              <option value="facebook">Facebook</option>
            </select>
            <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
            <button class="btn-reset contacts__delete">
              <svg class="contacts__delete-svg">
                <use xlink:href="./img/sprite.svg#tinyClose"></use>
              </svg>
            </button>
          </div>
        `
      } else if (userContacts[i].type == "dop telephone") {
        modalOneContact.innerHTML = `
          <div class="contacts__block">
            <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
              <option value="telephone">Телефон</option>
              <option value="dop telephone" selected>Доп. телефон</option>
              <option value="email">Email</option>
              <option value="vk">Vk</option>
              <option value="facebook">Facebook</option>
            </select>
            <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
            <button class="btn-reset contacts__delete">
              <svg class="contacts__delete-svg">
                <use xlink:href="./img/sprite.svg#tinyClose"></use>
              </svg>
            </button>
          </div>
        `
      } else if (userContacts[i].type == "email") {
        modalOneContact.innerHTML = `
          <div class="contacts__block">
            <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
              <option value="telephone">Телефон</option>
              <option value="dop telephone">Доп. телефон</option>
              <option value="email" selected>Email</option>
              <option value="vk">Vk</option>
              <option value="facebook">Facebook</option>
            </select>
            <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
            <button class="btn-reset contacts__delete">
              <svg class="contacts__delete-svg">
                <use xlink:href="./img/sprite.svg#tinyClose"></use>
              </svg>
            </button>
          </div>
        `
      } else {
        modalOneContact.innerHTML = `
        <div class="contacts__block">
          <select name="contactType" class="contacts__select change-user__select" value="{$userContacts[i].type}">
            <option value="telephone">Телефон</option>
            <option value="dop telephone">Доп. телефон</option>
            <option value="email">Email</option>
            <option value="vk">Vk</option>
            <option value="facebook">Facebook</option>
            <option value="other" selected>Другое</option>
          </select>
          <input type="text" class="contacts__input change-user__input change-client__input" value="${userContacts[i].value}" placeholder="Введите данные контакта">
          <button class="btn-reset contacts__delete">
            <svg class="contacts__delete-svg">
              <use xlink:href="./img/sprite.svg#tinyClose"></use>
            </svg>
          </button>
        </div> `
      }

      modalContacts.appendChild(modalOneContact)
    }

    modalChangeForm.appendChild(modalHeader)
    modalChangeForm.appendChild(modalContacts)
    modalChangeForm.appendChild(modalAddBtn)
    modalChangeForm.appendChild(modalFooter)
    
  modalChangeForm.classList.toggle('is-active')
  overlay.classList.toggle('is-active')

  // клики по форме изменения клиента
  const modalChangeFormClose = document.querySelector('.changeClient-close');
  const modalChangeFormSave = document.querySelector('.changeClient-save');
  const modalChangeFormDelete = document.querySelector('.changeClient-delete');

  modalChangeFormClose.addEventListener('click', () => {
    closeModal(modalChangeForm, overlay)
    modalChangeForm.innerHTML = ''
  })
  
  overlay.addEventListener('click', () => {
    closeModal(modalChangeForm, overlay)
    modalChangeForm.innerHTML = ''
  })

  modalAddBtn.addEventListener('click', () => {
    let contactHTML = document.createElement('div')
    contactHTML.classList.add('contacts__block')
    contactHTML.innerHTML = `
    <select name="contactType" class="contacts__select change-user__select">
      <option value="telephone">Телефон</option>
      <option value="telephone" >Доп. телефон</option>
      <option value="email">Email</option>
      <option value="vk">Vk</option>
      <option value="facebook">Facebook</option>
    </select>
    <input type="text" class="contacts__input change-user__input change-client__input" placeholder="Введите данные контакта">
    <button class="btn-reset contacts__delete change-user__delete">
      <svg class="contacts__delete-svg">
        <use xlink:href="./img/sprite.svg#tinyClose"></use>
      </svg>
    </button>`
    modalContacts.appendChild(contactHTML) 
    deleteContact()
    const contactSelect = document.querySelectorAll('.change-user__select')
    getcontact(contactSelect)
  })

  deleteContact()
  // подключение БД
  const response = await fetch('http://localhost:3000/api/clients')
  const serverData = await response.json()
  let arrList = [];

  if (serverData) {
    arrList = serverData
  } 

  modalChangeFormSave.addEventListener('click', async function (event) {
      
    // validation
    const changeClientInputs = document.querySelectorAll('.change-client__input')
    let validationResult = false
    removeError()
    createError(changeClientInputs)
    function validation() {
      for (let i = 0; i <= changeClientInputs.length; i++) {
        if (changeClientInputs[i].classList.contains('is-invalid')) {
          validationResult = false
        } else {
          validationResult = true
        }
      }
    }
  
    validation()
  
    if (validationResult !== true) {
      return
    }

    
    const newClientSurname = document.querySelector('#newClientSurname'),
          newClientName = document.querySelector('#newClientName'),
          newClientLastname = document.querySelector('#newClientLastname');
    
    // запись контактов в объект
    const userContactType = document.querySelectorAll('.change-user__select'),
          userContactValue = document.querySelectorAll('.change-user__input');
    let userContacts = [];
    addContactsArray(userContacts, userContactType, userContactValue)

    async function serverChangeClient() {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: newClientName.value,
          surname: newClientSurname.value,
          lastName: newClientLastname.value,
          contacts: userContacts
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    
      let data = await response.json()
      for (let i = 0; i < arrList.length; i++) {
        if (arrList[i].id === id) {
          arrList[i] = data
        }
      }
      render(arrList)
    }

    await serverChangeClient()

    closeModal(modalChangeForm, overlay)

    deleteContact()
    modalChangeForm.innerHTML = ''
  })

  // удаление клиента из формы изменения
  modalChangeFormDelete.addEventListener('click', () => {
    modalDeleteForm.classList.add('is-active')
    modalChangeForm.classList.remove('is-active')

    modalDeleteFormClose.addEventListener('click', () => {
      modalDeleteForm.classList.remove('is-active')
      modalChangeForm.classList.add('is-active')
    })
  
    modalDeleteFormCancel.addEventListener('click', () => {
      modalDeleteForm.classList.remove('is-active')
      modalChangeForm.classList.add('is-active')
    })
  
    overlay.addEventListener('click', () => {
      closeModal(modalDeleteForm, overlay)
      modalChangeForm.innerHTML = ''
    })

    modalDeleteFormDelete.addEventListener('click', async () => {
      async function serverDeleteClient() {
        const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'DELETE',
        })
      
        let data = await response.json()
        return data
      }
      
      await serverDeleteClient()
      
      item.remove()
  
      modalChangeFormClose.classList.remove('is-active')
      closeModal(modalDeleteForm, overlay)
      modalChangeForm.innerHTML = ''
    })
  })
}

// добавление поля селектора
const modalAddContact = document.querySelector('.modal-form__add-contact')
const modalContactBlock = document.querySelector('.contacts__container')

modalAddContact.addEventListener('click', () => {
  let contactHTML = document.createElement('div')
  contactHTML.classList.add('contacts__block')
  contactHTML.innerHTML = `
  <select name="contactType" class="contacts__select">
    <option value="telephone" selected>Телефон</option>
    <option value="telephone" >Доп. телефон</option>
    <option value="email">Email</option>
    <option value="vk">Vk</option>
    <option value="facebook">Facebook</option>
  </select>
  <input type="text" class="contacts__input new-client__input" placeholder="Введите данные контакта">
  <button class="btn-reset contacts__delete">
    <svg class="contacts__delete-svg">
      <use xlink:href="./img/sprite.svg#tinyClose"></use>
    </svg>
  </button>`
  modalContactBlock.appendChild(contactHTML) 
  const contactSelect = document.querySelectorAll('.contacts__select')
  getcontact(contactSelect)
  
  deleteContact()
})



// удаление поля селектора
function deleteContact() {
  const deleteContactBtn = document.querySelectorAll('.contacts__delete')

  deleteContactBtn.forEach(el => {
    el.addEventListener('click', () => {
      el.parentElement.remove()
    })
  })
}

deleteContact()

import { addContactsArray } from "./function.js";
import { openModal } from "./function.js";
import { closeModal } from "./function.js";
import { getcontact } from "./function.js";

import { removeError } from './validation.js'
import { createError } from './validation.js'

import { render } from './main.js'