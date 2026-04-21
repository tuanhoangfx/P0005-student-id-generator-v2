import { colorThemes, randomNames, schoolDomainMap } from './modules/constants.js'
import { renderCard } from './modules/renderer.js'
import { copyText, randomDate, randomInt, randomPick, randomStudentId, sanitizeLocalPart } from './modules/utils.js'

const byId = (id) => document.getElementById(id)

const elements = {
  school: byId('school-name'),
  studentName: byId('student-name'),
  studentId: byId('student-id'),
  dob: byId('dob'),
  course: byId('course'),
  validTo: byId('valid-to'),
  schoolEmail: byId('school-email'),
  canvas: byId('card-canvas'),
  randomAllBtn: byId('random-all-btn'),
  randomNameBtn: byId('random-name-btn'),
  randomIdBtn: byId('random-id-btn'),
  randomDobBtn: byId('random-dob-btn'),
  randomValidToBtn: byId('random-validto-btn'),
  randomColorBtn: byId('random-color-btn'),
  downloadBtn: byId('download-btn'),
  copySchoolBtn: byId('copy-school-btn'),
  copyEmailBtn: byId('copy-email-btn'),
  autoVerifyBtn: byId('auto-verify-btn'),
  photoInput: byId('student-photo-input'),
  randomFacesBtn: byId('random-faces-btn'),
}

const requiredKeys = ['school', 'studentName', 'studentId', 'dob', 'course', 'validTo', 'schoolEmail', 'canvas']
for (const key of requiredKeys) {
  if (!elements[key]) {
    // eslint-disable-next-line no-console
    console.error('[P0005] Missing required element:', key)
    throw new Error(`Missing required element: ${key}`)
  }
}

const state = {
  theme: colorThemes[0],
  photo: null,
}

const getFormData = () => ({
  school: elements.school.value,
  studentName: elements.studentName.value,
  studentId: elements.studentId.value,
  dob: elements.dob.value,
  course: elements.course.value,
  validTo: elements.validTo.value,
  schoolEmail: elements.schoolEmail.textContent ?? '',
})

const refreshCard = () => {
  renderCard({
    canvas: elements.canvas,
    form: getFormData(),
    theme: state.theme,
    photo: state.photo,
  })
}

const updateEmail = () => {
  const name = elements.studentName.value || 'student'
  const school = elements.school.value
  const domain = schoolDomainMap[school] || 'student.edu'
  elements.schoolEmail.textContent = `${sanitizeLocalPart(name)}@${domain}`
}

const randomizeAll = () => {
  elements.studentName.value = randomPick(randomNames)
  elements.studentId.value = randomStudentId()
  elements.dob.value = randomDate(1997, 2006)
  elements.validTo.value = randomDate(2029, 2030)
  elements.school.selectedIndex = randomInt(0, elements.school.options.length - 1)
  elements.course.selectedIndex = randomInt(0, elements.course.options.length - 1)
  updateEmail()
  refreshCard()
}

const readPhotoFile = (file) => {
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const img = new Image()
    img.onload = () => {
      state.photo = img
      refreshCard()
    }
    img.src = String(reader.result)
  }
  reader.readAsDataURL(file)
}

elements.randomAllBtn?.addEventListener('click', randomizeAll)
elements.randomNameBtn?.addEventListener('click', () => {
  elements.studentName.value = randomPick(randomNames)
  updateEmail()
  refreshCard()
})
elements.randomIdBtn?.addEventListener('click', () => {
  elements.studentId.value = randomStudentId()
  refreshCard()
})
elements.randomDobBtn?.addEventListener('click', () => {
  elements.dob.value = randomDate(1997, 2006)
  refreshCard()
})
elements.randomValidToBtn?.addEventListener('click', () => {
  elements.validTo.value = randomDate(2029, 2030)
  refreshCard()
})
elements.randomColorBtn?.addEventListener('click', () => {
  state.theme = randomPick(colorThemes)
  refreshCard()
})
elements.downloadBtn?.addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = `${elements.studentId.value || 'student-id'}.png`
  link.href = elements.canvas.toDataURL('image/png')
  link.click()
})
elements.copySchoolBtn?.addEventListener('click', () => {
  void copyText(elements.school.value, 'ten truong')
})
elements.copyEmailBtn?.addEventListener('click', () => {
  void copyText(elements.schoolEmail.textContent || '', 'email')
})

elements.autoVerifyBtn?.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('Tinh nang Auto Verify can extension tren studentidcard.me. Ban local van hoat dong tao va tai card.')
})

elements.randomFacesBtn?.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('Ban local khong goi API face ben thu ba. Hay upload anh bang nut Choose Face.')
})

elements.photoInput?.addEventListener('change', (event) => {
  const input = event.target
  if (!(input instanceof HTMLInputElement)) return
  readPhotoFile(input.files?.[0])
})

elements.school.addEventListener('change', () => {
  updateEmail()
  refreshCard()
})

;[elements.studentName, elements.studentId, elements.dob, elements.course, elements.validTo].forEach((el) => {
  el?.addEventListener('input', () => {
    updateEmail()
    refreshCard()
  })
  el?.addEventListener('change', () => {
    updateEmail()
    refreshCard()
  })
})

randomizeAll()
