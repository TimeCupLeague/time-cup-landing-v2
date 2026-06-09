;(function () {
  const titleEl = document.getElementById('email-callback-title')
  const leadEl = document.getElementById('email-callback-lead')
  const hintEl = document.getElementById('email-callback-hint')
  const iconOk = document.getElementById('email-callback-icon-success')
  const iconErr = document.getElementById('email-callback-icon-error')
  if (!titleEl || !leadEl || !hintEl || !iconOk || !iconErr) return

  const hash = window.location.hash && window.location.hash.length > 1 ? window.location.hash.slice(1) : ''
  const search =
    window.location.search && window.location.search.length > 1 ? window.location.search.slice(1) : ''
  const params = new URLSearchParams(hash || search)

  const err = params.get('error')
  const errCode = params.get('error_code')
  let errDesc = params.get('error_description')
  if (errDesc) {
    try {
      errDesc = decodeURIComponent(errDesc.replace(/\+/g, ' '))
    } catch {
      errDesc = errDesc.replace(/\+/g, ' ')
    }
  }

  const isError = Boolean(err || errCode)

  function messageForCode(code) {
    switch (code) {
      case 'otp_expired':
        return 'El enlace de confirmación ha caducado o ya no es válido. Solicita un correo nuevo desde la app.'
      case 'flow_state_not_found':
      case 'flow_state_expired':
        return 'La sesión de confirmación no es válida o ha expirado. Vuelve a abrir el enlace desde un correo reciente o pide uno nuevo en la app.'
      case 'access_denied':
        return 'No se pudo completar la confirmación. Vuelve a intentarlo desde el correo o contacta con soporte si el problema continúa.'
      case 'signup_disabled':
        return 'En este momento no se permiten nuevos registros. Prueba más tarde o contacta con la liga.'
      case 'over_email_send_rate_limit':
        return 'Se han enviado demasiados correos. Espera unos minutos y vuelve a solicitar el enlace desde la app.'
      default:
        return null
    }
  }

  if (isError) {
    const custom = errCode && messageForCode(errCode)
    const lead =
      custom ||
      (errDesc && errDesc.trim()) ||
      'No se pudo confirmar el email. Vuelve a abrir el enlace del correo o ponte en contacto con nosotros y te enviaremos un nuevo enlace de confirmación.'
    titleEl.textContent = 'No se pudo confirmar el email'
    leadEl.textContent = lead
    hintEl.textContent =
      'Si el enlace es antiguo, pide de nuevo el correo de confirmación. Si el problema continúa, escríbenos a timecupleague@gmail.com.'
    document.title = 'Error al confirmar el email - TimeCup League'
    const meta = document.querySelector('meta[name="title"]')
    if (meta) meta.setAttribute('content', document.title)
    iconOk.style.display = 'none'
    iconErr.style.display = 'block'
    return
  }

  if (params.get('access_token') || params.get('type')) {
    document.title = 'Email confirmado - TimeCup League'
    const m = document.querySelector('meta[name="title"]')
    if (m) m.setAttribute('content', document.title)
  }
})()
