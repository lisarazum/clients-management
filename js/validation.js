export function removeError() {
  const errors = document.querySelectorAll('.invalid-text')
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

export function createError(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      inputs[i].classList.add('is-invalid')
      let error = document.createElement('span')
      error.className = 'invalid-text'
      error.innerHTML = 'Заполните поле'
      inputs[i].parentElement.append(error)
    } else if (inputs[i].value != '') {
      inputs[i].classList.remove('is-invalid')
    }
  }
}
