/* The supplied educational document stays readable without a framework runtime. */
const chapters = [...document.querySelectorAll('.folder')]
const chapterLinks = [...document.querySelectorAll('[data-chapter]')]
const icons = [
  '<path d="m12 3 8 5v8l-8 5-8-5V8z"/><path d="m4 8 8 5 8-5M12 13v8"/>',
  '<path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9 9 0 1 1 19 0Z"/><path d="M7 9h9M7 13h6"/>',
  '<path d="M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6"/>',
  '<path d="m4 20 4-1L21 6l-4-4L4 15zM14 5l4 4"/>',
  '<path d="M4 7h16v14H4zM3 3h18v4H3zM9 12l2 2 4-4"/>',
  '<path d="M4 5h16v15H4zM4 9h16M14 13h6v4h-6zM7 5V3h10v2"/>',
  '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
]
chapters.forEach((chapter, i) => {
  chapter.querySelectorAll('.sec h3').forEach((title) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('stroke', 'currentColor')
    svg.setAttribute('stroke-width', '1.5')
    svg.setAttribute('aria-hidden', 'true')
    svg.classList.add('section-icon')
    svg.innerHTML = icons[i]
    title.appendChild(svg)
  })
})
function showChapter() {
  const id = location.hash.slice(1)
  const target = document.getElementById(id)
  const active =
    target?.closest('.folder') ||
    (target?.classList.contains('folder') ? target : null) ||
    null
  document.body.classList.toggle('reading-chapter', Boolean(active))
  if (!active) {
    chapters.forEach((chapter) => chapter.classList.remove('active'))
    chapterLinks.forEach((link) => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    })
    document.title = 'Freelance Studio Kit · Ashley Rodríguez'
    requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0 })
      readingProgress()
    })
    return
  }
  const index = chapters.indexOf(active)
  chapters.forEach((chapter) =>
    chapter.classList.toggle('active', chapter === active),
  )
  chapterLinks.forEach((link) => {
    const selected = link.dataset.chapter === active.id
    link.classList.toggle('active', selected)
    if (selected) link.setAttribute('aria-current', 'step')
    else link.removeAttribute('aria-current')
  })
  const previous = document.getElementById('previous-chapter')
  const next = document.getElementById('next-chapter')
  previous.href = '#f' + Math.max(1, index)
  previous.setAttribute('aria-disabled', String(index === 0))
  next.href = index === 6 ? '#indice' : '#f' + (index + 2)
  next.textContent = index === 6 ? 'Volver al kit ↗' : 'Siguiente módulo →'
  const titles = [
    'Empieza aquí',
    'Bases y clientes',
    'Propuestas y acuerdos',
    'Producción creativa',
    'Entrega y cierre',
    'Finanzas freelance',
    'Ponlo en práctica',
  ]
  document.title = `${String(index + 1).padStart(2, '0')} · ${titles[index]} | Freelance Studio Kit`
  requestAnimationFrame(() => {
    if (target && target.closest('.folder') === active)
      target.scrollIntoView({ block: 'start' })
    else window.scrollTo({ top: 0 })
    readingProgress()
  })
}
window.addEventListener('hashchange', showChapter)
showChapter()
document
  .getElementById('print-kit')
  .addEventListener('click', () => window.print())
const readingBar = document.createElement('div')
readingBar.className = 'chapter-progress'
readingBar.setAttribute('aria-hidden', 'true')
document.body.appendChild(readingBar)
function readingProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  readingBar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1})`
}
window.addEventListener('scroll', readingProgress, { passive: true })
window.addEventListener('resize', readingProgress)
readingProgress()

// Keep wide data tables readable on small screens.
document.querySelectorAll('.sec table').forEach((table) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'table-scroll'
  wrapper.tabIndex = 0
  wrapper.setAttribute('role', 'region')
  wrapper.setAttribute(
    'aria-label',
    'Tabla de datos: desplaza para ver todas las columnas',
  )
  table.parentNode.insertBefore(wrapper, table)
  wrapper.appendChild(table)
  if ((table.rows[0]?.cells.length || 0) >= 5) table.classList.add('wide-table')
})
