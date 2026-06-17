export const SECONDS_PER_SLIDE = 50

export interface Option {
  value: string
  label: string
  desc?: string
}

export interface Question {
  id: string
  type: string
  label: string
  placeholder?: string
  required?: boolean
  options?: Option[]
}

export interface Slide {
  id: number
  section: string
  emoji: string
  title: string
  subtitle: string
  questions: Question[]
}

export const slides: Slide[] = [
  // ===== 1. INFORMACIÓN GENERAL =====
  {
    id: 1,
    section: 'Información general',
    emoji: '🏠',
    title: '¡Hola! Cuéntanos sobre ti',
    subtitle:
      'Este formulario es anónimo y tarda menos de 10 minutos. Tu opinión es clave para mejorar la experiencia.',
    questions: [
      {
        id: 'q1_box',
        type: 'text',
        label: '¿A qué box perteneces?',
        placeholder: 'Nombre de tu box',
        required: true,
      },
      {
        id: 'q1_categoria',
        type: 'radio',
        label: '¿En qué categoría compites?',
        required: true,
        options: [
          { value: 'escalado', label: 'Escalado', desc: '' },
          { value: 'intermedio', label: 'Intermedio', desc: '' },
        ],
      },
      {
        id: 'q1_primera_vez',
        type: 'radio',
        label: '¿Era tu primera competición/liga online?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
        ],
      },
      {
        id: 'q1_como_conociste',
        type: 'radio',
        label: '¿Cómo conociste TimeCup?',
        required: true,
        options: [
          { value: 'mi_box', label: 'Mi box', desc: '' },
          { value: 'instagram', label: 'Instagram', desc: '' },
          { value: 'amigos', label: 'Amigos', desc: '' },
          { value: 'otro_atleta', label: 'Otro atleta', desc: '' },
          { value: 'otro', label: 'Otro', desc: '' },
        ],
      },
    ],
  },
  // ===== 2. EXPERIENCIA GENERAL =====
  {
    id: 2,
    section: 'Experiencia general',
    emoji: '⭐',
    title: '¿Cómo fue tu experiencia?',
    subtitle: 'Cuéntanos qué tal lo viviste en general.',
    questions: [
      {
        id: 'q2_valoracion',
        type: 'stars',
        label: 'Valora tu experiencia general en TimeCup',
        required: true,
      },
      {
        id: 'q2_recomiendas',
        type: 'nps',
        label: '¿Recomendarías TimeCup a otros atletas?',
        required: true,
      },
    ],
  },
  // ===== 3. FORMATO DE LIGA =====
  {
    id: 3,
    section: 'Formato de liga',
    emoji: '🏆',
    title: 'El formato de la liga',
    subtitle: 'Valora el formato, la frecuencia y la estructura de la competición.',
    questions: [
      {
        id: 'q3_frecuencia',
        type: 'radio',
        label: '¿Qué te parece un WOD cada dos semanas?',
        required: true,
        options: [
          { value: 'mucho_tiempo', label: 'Mucho tiempo entre wods', desc: '' },
          { value: 'bien', label: 'Está bien', desc: '' },
          { value: 'poco_tiempo', label: 'Poco tiempo entre wods', desc: '' },
        ],
      },
      {
        id: 'q3_duracion',
        type: 'radio',
        label: '¿La duración de la temporada te pareció correcta?',
        required: true,
        options: [
          { value: 'muy_corta', label: 'Muy corta', desc: '' },
          { value: 'correcta', label: 'Correcta', desc: '' },
          { value: 'muy_larga', label: 'Demasiado larga', desc: '' },
        ],
      },
      {
        id: 'q3_presencial',
        type: 'radio',
        label: '¿Te gusta que haya evento presencial final?',
        required: true,
        options: [
          { value: 'si_muchisimo', label: 'Sí, muchísimo', desc: '' },
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
          { value: 'no', label: 'No', desc: '' },
        ],
      },
      {
        id: 'q3_repetir',
        type: 'radio',
        label: '¿Participarías en otra temporada?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'prob_si', label: 'Probablemente sí', desc: '' },
          { value: 'no_lo_se', label: 'No lo sé', desc: '' },
          { value: 'no', label: 'No', desc: '' },
        ],
      },
    ],
  },
  // ===== 4. WODS Y EVENTO PRESENCIAL =====
  {
    id: 4,
    section: 'WODs y evento presencial',
    emoji: '🏋️',
    title: 'Los WODs y el evento final',
    subtitle: 'Tu experiencia con los entrenamientos y el evento presencial.',
    questions: [
      {
        id: 'q4_nivel_wods',
        type: 'radio',
        label: '¿Qué te ha parecido el nivel de los WODs?',
        required: true,
        options: [
          { value: 'muy_facil', label: 'Demasiado fácil', desc: '' },
          { value: 'facil', label: 'Fácil', desc: '' },
          { value: 'adecuado', label: 'Adecuado', desc: '' },
          { value: 'dificil', label: 'Difícil', desc: '' },
          { value: 'muy_dificil', label: 'Demasiado difícil', desc: '' },
        ],
      },
      {
        id: 'q4_explicaciones',
        type: 'scale5',
        label: '¿Las explicaciones de los WODs eran claras?',
        required: true,
      },
      {
        id: 'q4_evento',
        type: 'scale5',
        label: '¿Cómo valorarías el evento final?',
        required: true,
      },
      {
        id: 'q4_ambiente',
        type: 'scale5',
        label: '¿Qué te pareció el ambiente del evento?',
        required: true,
      },
      {
        id: 'q4_mejora_evento',
        type: 'textarea',
        label: '¿Qué mejorarías del evento presencial?',
        placeholder: 'Cuéntanos qué cambiarías o qué faltó...',
        required: false,
      },
    ],
  },
  // ===== 5. APP: VALORACIÓN Y FUNCIONALIDADES =====
  {
    id: 5,
    section: 'App y funcionalidades',
    emoji: '📱',
    title: 'La app: valoración y funcionalidades',
    subtitle: 'Tu experiencia con la plataforma y qué te gustaría ver en la próxima versión.',
    questions: [
      {
        id: 'q5_app_valoracion',
        type: 'scale5',
        label: '¿Cómo valorarías la aplicación/plataforma?',
        required: true,
      },
      {
        id: 'q5_mejora_app',
        type: 'textarea',
        label: '¿Qué mejorarías de la app/plataforma?',
        placeholder: 'Cuéntanos qué echarías en falta o qué cambiarías...',
        required: false,
      },
      {
        id: 'q5_funcionalidades',
        type: 'checkbox',
        label: '¿Qué funcionalidades te gustaría añadir en la app?',
        required: true,
        options: [
          { value: 'chat', label: 'Chat entre atletas/equipos', desc: '' },
          { value: 'estadisticas', label: 'Estadísticas personales', desc: '' },
          { value: 'clasificacion_box', label: 'Clasificación por boxes', desc: '' },
          { value: 'social', label: 'Feed/social tipo comunidad', desc: '' },
          { value: 'otro', label: 'Otro', desc: '' },
        ],
      },
      {
        id: 'q5_social',
        type: 'radio',
        label: '¿Usarías más la app si tuviese funciones sociales/comunidad?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'quiza', label: 'Quizá', desc: '' },
        ],
      },
      {
        id: 'q5_mas_importante',
        type: 'textarea',
        label: '¿Qué es lo MÁS importante que debería mejorar la app?',
        placeholder: 'La mejora que más impacto tendría para ti...',
        required: false,
      },
    ],
  },
  // ===== 6. RETOS, LOGROS Y GAMIFICACIÓN =====
  {
    id: 6,
    section: 'Retos y gamificación',
    emoji: '🎮',
    title: 'Retos, logros y gamificación',
    subtitle: '¿La gamificación te motiva a competir más?',
    questions: [
      {
        id: 'q6_logros',
        type: 'radio',
        label: '¿Te gusta desbloquear logros durante la temporada?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
        ],
      },
      {
        id: 'q6_retos_opcionales',
        type: 'radio',
        label: '¿Te gusta tener retos opcionales además de los WODs oficiales?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
        ],
      },
      {
        id: 'q6_retos_fueraTemporada',
        type: 'radio',
        label: '¿Te gustaría que hiciéramos retos fuera de temporada?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
        ],
      },
    ],
  },
  // ===== 7. CATEGORÍAS Y DIVISIONES =====
  {
    id: 7,
    section: 'Categorías y divisiones',
    emoji: '📊',
    title: 'Categorías y divisiones',
    subtitle: 'Ayúdanos a definir mejor el sistema de categorías.',
    questions: [
      {
        id: 'q7_estandares',
        type: 'radio',
        label: '¿Qué te parecen los estándares actuales de tu categoría?',
        required: true,
        options: [
          { value: 'muy_exigentes', label: 'Demasiado exigentes, lo bajaría', desc: '' },
          { value: 'exigentes_gustan', label: 'Exigentes, pero me gustan', desc: '' },
          { value: 'adecuados', label: 'Adecuados', desc: '' },
          { value: 'bajos', label: 'Bajos', desc: '' },
          { value: 'muy_bajos', label: 'Demasiado bajos, los subiría', desc: '' },
        ],
      },
      {
        id: 'q7_ascensos',
        type: 'radio',
        label: '¿Te interesaría un sistema de ascensos/descensos entre divisiones?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'no_lo_se', label: 'No lo sé', desc: '' },
        ],
      },
      {
        id: 'q7_independientes',
        type: 'radio',
        label: '¿Crees que las categorías femeninas, masculinas y mixtas deberían ser independientes?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
        ],
      },
    ],
  },
  // ===== 8. COMUNIDAD Y CRECIMIENTO =====
  {
    id: 8,
    section: 'Comunidad',
    emoji: '🤝',
    title: 'Comunidad y crecimiento',
    subtitle: 'Queremos que TimeCup sea algo más que una competición.',
    questions: [
      {
        id: 'q8_interaccion',
        type: 'radio',
        label: '¿Te gustaría que hubiese más interacción entre equipos y boxes?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
          { value: 'me_da_igual', label: 'Me da igual', desc: '' },
        ],
      },
      {
        id: 'q8_organice',
        type: 'checkbox',
        label: '¿Te gustaría que TimeCup organizase...?',
        required: true,
        options: [
          { value: 'quedadas', label: 'Quedadas', desc: '' },
          { value: 'eventos_extra', label: 'Eventos presenciales extra', desc: '' },
          { value: 'liga_anual', label: 'Liga anual completa', desc: '' },
          { value: 'merch_drops', label: 'Merch drops', desc: '' },
          { value: 'otro', label: 'Otro', desc: '' },
        ],
      },
      {
        id: 'q8_merch',
        type: 'radio',
        label: '¿Te gustaría merch oficial de TimeCup?',
        required: true,
        options: [
          { value: 'si', label: 'Sí', desc: '' },
          { value: 'no', label: 'No', desc: '' },
        ],
      },
    ],
  },
  // ===== 9. PREGUNTA FINAL =====
  {
    id: 9,
    section: 'Pregunta final',
    emoji: '🚀',
    title: 'Para acabar...',
    subtitle: 'Las preguntas más importantes del formulario. Tómate tu tiempo.',
    questions: [
      {
        id: 'q9_un_cambio',
        type: 'textarea',
        label: 'Si pudieras cambiar UNA sola cosa para la próxima temporada, ¿qué sería?',
        placeholder: 'Una cosa, la más importante para ti...',
        required: false,
      },
      {
        id: 'q9_perfecta',
        type: 'textarea',
        label: 'Si TimeCup fuese "la liga perfecta", ¿qué tendría?',
        placeholder: 'Descríbenos tu visión de la liga ideal...',
        required: false,
      },
      {
        id: 'q9_extra',
        type: 'textarea',
        label: 'Déjanos cualquier comentario extra',
        placeholder: 'Cualquier cosa que no hayamos preguntado y quieras compartir...',
        required: false,
      },
    ],
  },
]
