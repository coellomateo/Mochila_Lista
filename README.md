# Mochila Lista: tu mochila armada según tu horario

## Problema
Estudiantes de colegio que olvidan materiales para clase (calculadora, regla, uniforme de deportes, cuaderno de una materia, dinero para una actividad). Pasa porque el horario cambia cada día, cada materia pide cosas distintas y la mochila se arma de memoria la noche anterior o por la mañana. Observación inicial: lo he vivido yo y lo veo en mi curso, donde compañeros piden prestada la calculadora o la regla casi cada semana. No tengo estadísticas; preguntaré a 5–10 compañeros qué olvidan más para respaldarlo.

## Solución
Crearé una app móvil con React Native y Expo que convierte el horario del estudiante en una lista de verificación nocturna. El estudiante registra una vez sus materias, los materiales de cada una y los días en que las tiene. Después la app genera sola la lista de "Mañana": solo los materiales de las materias del día siguiente, sin repetir los que sirven para varias materias (la regla de Matemática y Dibujo aparece una sola vez). Al marcar cada ítem guardado, una barra de progreso llega a "¡Mochila lista!". Diferencia: no es una app de tareas ni un calendario; no organiza qué estudiar sino qué llevar, y trabaja sola después de configurarla.

## Objetivos
- Permitir registrar materias con su color y su lista de materiales
- Permitir asignar cada materia a los días de lunes a viernes
- Generar la lista del siguiente día de clases sin materiales repetidos (el viernes y el fin de semana muestran el lunes)
- Permitir marcar ítems como guardados, agregar extras puntuales y mostrar el progreso en porcentaje
- Guardar materias, horario y estado de la lista en el teléfono para que persistan al cerrar la app

## Habilidades
- React Native con Expo y TypeScript
- Componentes reutilizables con props tipadas
- Estado local con useState y useMemo
- Hook personalizado para guardar datos
- Navegación con Expo Router
- Estilos y temas claro y oscuro
- Persistencia local con AsyncStorage

## Alcance inicial
Pestaña Mañana: lista generada para el siguiente día de clases, agrupada por materia, con casillas, barra de progreso y botón para agregar un extra puntual (ej. "$2 rifa").
Pestaña Horario: semana de lunes a viernes donde se asignan o quitan materias por día.
Pestaña Materias: listado de materias con acceso a crear o editar una.
Pantalla Detalle de materia: nombre, color, materiales y días.
Lógica: una función pura getSiguienteDiaDeClases(fecha) que lleva el viernes y el fin de semana al lunes, y la unión de materiales sin duplicados.
Datos guardados en el teléfono, y modo claro y oscuro.

## Restricciones
- Sin cuentas de usuario ni inicio de sesión
- Sin servidor ni base de datos en la nube; los datos viven solo en el teléfono
- Sin notificaciones push ni recordatorios automáticos
- Sin compartir horarios con compañeros
- Sin inteligencia artificial ni lectura de horarios desde fotos
- Solo días de clase de lunes a viernes, sin calendario de fechas ni feriados
- Riesgo principal: calcular bien "el siguiente día de clases". Plan: escribir esa función aparte, probarla con casos simples (viernes, sábado, miércoles) y revisar la documentación de Date antes de unirla a la interfaz
