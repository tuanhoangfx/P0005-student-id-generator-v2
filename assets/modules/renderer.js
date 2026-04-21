import { formatDate } from './utils.js'

const drawRoundedRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

const drawBarcode = (ctx, value) => {
  if (typeof window.JsBarcode !== 'function') return
  const barcodeCanvas = document.createElement('canvas')
  window.JsBarcode(barcodeCanvas, value, {
    format: 'CODE128',
    displayValue: false,
    width: 2,
    height: 70,
    margin: 0,
  })
  ctx.drawImage(barcodeCanvas, 780, 470, 280, 70)
}

export const renderCard = ({ canvas, form, theme, photo }) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height

  const gradient = ctx.createLinearGradient(0, 0, w, h)
  gradient.addColorStop(0, theme.start)
  gradient.addColorStop(1, theme.end)

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  drawRoundedRect(ctx, 35, 35, w - 70, h - 70, 30)
  ctx.fill()

  ctx.fillStyle = theme.accent
  ctx.font = '800 58px Inter, sans-serif'
  ctx.fillText('STUDENT ID CARD', 60, 95)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 36px Inter, sans-serif'
  ctx.fillText(form.school, 60, 150)

  ctx.font = '700 48px Inter, sans-serif'
  ctx.fillText(form.studentName || 'Student Name', 360, 280)

  ctx.font = '600 30px Inter, sans-serif'
  ctx.fillText(`ID: ${form.studentId || 'N/A'}`, 360, 335)
  ctx.fillText(`DOB: ${formatDate(form.dob)}`, 360, 380)

  ctx.font = '600 28px "Noto Sans JP", Inter, sans-serif'
  ctx.fillText(`Course: ${form.course || 'N/A'}`, 360, 425)

  ctx.font = '500 26px Inter, sans-serif'
  ctx.fillText(`Email: ${form.schoolEmail || 'N/A'}`, 360, 470)
  ctx.fillText(`Valid to: ${formatDate(form.validTo)}`, 360, 510)

  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  drawRoundedRect(ctx, 60, 185, 250, 320, 18)
  ctx.fill()

  if (photo) {
    ctx.drawImage(photo, 72, 198, 226, 296)
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.75)'
    ctx.font = '600 24px Inter, sans-serif'
    ctx.fillText('No photo', 130, 360)
  }

  drawBarcode(ctx, form.studentId || '000000000')
}
