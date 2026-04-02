import React, { useState, useEffect, useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'

interface ChangePasswordFormProps {
  supabaseUrl: string
  supabaseAnonKey: string
}

export function ChangePasswordForm({ supabaseUrl, supabaseAnonKey }: ChangePasswordFormProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

  // Verificar que las credenciales de Supabase estén configuradas
  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="card" style={{ background: '#21262c', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(255, 77, 79, 0.2)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem', textTransform: 'none' }}>Error de Configuración</h2>
          <p style={{ color: '#ff7875' }}>
            Las credenciales de Supabase no están configuradas. Por favor, contacta al administrador.
          </p>
        </div>
      </div>
    )
  }

  const supabase = useMemo(() => createClient(supabaseUrl, supabaseAnonKey), [supabaseUrl, supabaseAnonKey])

  useEffect(() => {
    // Verificar si hay un token de recuperación en la URL
    const checkRecoveryToken = async () => {
      // Verificar que estamos en el cliente
      if (typeof window === 'undefined') {
        return
      }

      try {
        // Supabase maneja automáticamente el token del hash fragment
        // Verificamos si hay una sesión válida
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          setError('Error al verificar el token. Por favor, usa el enlace del email.')
          setIsValidToken(false)
          return
        }

        // Si hay una sesión, el token es válido
        if (session) {
          setIsValidToken(true)
          // Limpiar el hash de la URL para seguridad
          window.history.replaceState(null, '', window.location.pathname)
        } else {
          // Verificar si hay un token en el hash fragment
          const hashParams = new URLSearchParams(window.location.hash.substring(1))
          const accessToken = hashParams.get('access_token')
          const type = hashParams.get('type')

          if (accessToken && type === 'recovery') {
            // Intentar establecer la sesión con el token
            const { error: exchangeError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: '', // No necesario para recovery
            })

            if (exchangeError) {
              setError(
                'El token ha expirado o no es válido. Por favor, solicita un nuevo enlace de recuperación.',
              )
              setIsValidToken(false)
            } else {
              setIsValidToken(true)
              // Limpiar el hash de la URL
              window.history.replaceState(null, '', window.location.pathname)
            }
          } else {
            setError('Token de recuperación no válido o faltante. Por favor, usa el enlace del email.')
            setIsValidToken(false)
          }
        }
      } catch {
        setError('Error al verificar el token. Por favor, intenta de nuevo.')
        setIsValidToken(false)
      }
    }

    checkRecoveryToken()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isValidToken) {
      setError('Token de recuperación no válido.')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)

    try {
      // Verificar que todavía tenemos una sesión válida
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        throw new Error('La sesión ha expirado. Por favor, solicita un nuevo enlace de recuperación.')
      }

      // Actualizar la contraseña
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) {
        throw updateError
      }

      // Cerrar la sesión después de cambiar la contraseña
      await supabase.auth.signOut()

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al cambiar la contraseña. El token puede haber expirado.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card" style={{ background: '#21262c', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <svg
              style={{ margin: '0 auto', height: '3rem', width: '3rem', color: '#4ade80' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem', textTransform: 'none' }}>¡Contraseña cambiada!</h2>
          <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
            Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
          <a
            href="/"
            className="btn-primary"
            style={{ display: 'inline-block' }}>
            Volver al inicio
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ background: '#21262c', padding: '2.5rem', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', textAlign: 'center', textTransform: 'none' }}>Cambiar Contraseña</h2>

      {error && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 77, 79, 0.2)', border: '1px solid rgba(255, 77, 79, 0.5)', borderRadius: '8px' }}>
          <p style={{ color: '#ff7875', fontSize: '0.875rem', margin: 0 }}>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#ccc', marginBottom: '0.5rem' }}>
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff', outline: 'none' }}
            placeholder="Mínimo 6 caracteres"
            required
            disabled={loading || isValidToken === false}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#ccc', marginBottom: '0.5rem' }}>
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#fff', outline: 'none' }}
            placeholder="Repite la contraseña"
            required
            disabled={loading || isValidToken === false}
          />
        </div>

        <button
          type="submit"
          disabled={loading || isValidToken === false}
          className="btn-primary"
          style={{ width: '100%', marginTop: '0.5rem', opacity: (loading || isValidToken === false) ? 0.5 : 1, cursor: (loading || isValidToken === false) ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  )
}
