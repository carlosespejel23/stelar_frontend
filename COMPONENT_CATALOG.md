# Catálogo de componentes — Stellar Frontend

Generado a partir del análisis del paquete Minimal UI y el full-demo de referencia.
Consultar antes de construir cualquier vista.
Última actualización: 2026-03-22

---

## 1. Componentes incluidos en el proyecto (`frontend/src/components/`)

Estos componentes ya están disponibles. Úsalos directamente con `import ... from 'src/components/...'`.

### Formularios (`hook-form/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `FormProvider` | `hook-form/form-provider.tsx` | Wrapper de `FormProvider` de RHF para usar con `useForm()` |
| `Field.Text` | `hook-form/fields.tsx` | Alias namespace para campos RHF — usa `<Field.Text name="x" label="y" />` |
| `RHFTextField` | `hook-form/rhf-text-field.tsx` | Input de texto controlado por RHF + MUI TextField |
| `RHFSelect` | `hook-form/rhf-select.tsx` | Select dropdown controlado por RHF |
| `RHFCheckbox` | `hook-form/rhf-checkbox.tsx` | Checkbox controlado por RHF |
| `RHFRadioGroup` | `hook-form/rhf-radio-group.tsx` | Grupo de radio buttons controlado por RHF |
| `RHFSwitch` | `hook-form/rhf-switch.tsx` | Toggle switch controlado por RHF |
| `RHFAutocomplete` | `hook-form/rhf-autocomplete.tsx` | Autocomplete controlado por RHF (para selects con búsqueda) |
| `RHFDatePicker` | `hook-form/rhf-date-picker.tsx` | Date picker controlado por RHF |
| `RHFSlider` | `hook-form/rhf-slider.tsx` | Slider/range controlado por RHF — útil para RiskWeightsPage |
| `RHFRating` | `hook-form/rhf-rating.tsx` | Rating de estrellas controlado por RHF |
| `HelpText` | `hook-form/help-text.tsx` | Mensaje de error/ayuda debajo de un campo |
| `schemaUtils` | `hook-form/schema-utils.ts` | Helpers de validación Zod (email, file, required, etc.) |

> **Nota**: El full-demo tiene campos adicionales NO presentes aquí: `RHFPhoneInput`, `RHFNumberInput`, `RHFUpload`, `RHFEditor`, `RHFCountrySelect`, `RHFCode`. Copiarlos cuando se necesiten (ver sección 2).

### Animaciones (`animate/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `AnimateBorder` | `animate/animate-border.tsx` | Animación de borde |
| `AnimateCountUp` | `animate/animate-count-up.tsx` | Contador animado (para stats cards) |
| `AnimateLogo` | `animate/animate-logo.tsx` | Reveal del logo |
| `AnimateText` | `animate/animate-text.tsx` | Animación de texto |
| `BackToTopButton` | `animate/back-to-top-button.tsx` | Botón de scroll al top |
| `MotionContainer` | `animate/motion-container.tsx` | Contenedor Framer Motion con stagger |
| `MotionLazy` | `animate/motion-lazy.tsx` | Lazy loading de animaciones |
| `MotionViewport` | `animate/motion-viewport.tsx` | Animación al entrar al viewport |
| `ScrollProgress` | `animate/scroll-progress/scroll-progress.tsx` | Barra de progreso de scroll |
| `useScrollProgress` | `animate/scroll-progress/use-scroll-progress.ts` | Hook del scroll progress |
| **Variants** | `animate/variants/*.ts` | Variantes de animación: `fade`, `slide`, `zoom`, `flip`, `rotate`, `scale`, `bounce`, `path` |

### Navegación (`nav-section/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `NavSectionVertical` | `nav-section/vertical/nav-section-vertical.tsx` | Sidebar vertical (layout principal de Stellar) |
| `NavSectionHorizontal` | `nav-section/horizontal/nav-section-horizontal.tsx` | Nav horizontal (top bar) |
| `NavSectionMini` | `nav-section/mini/nav-section-mini.tsx` | Nav mini/colapsada (solo iconos) |
| `NavCollapse` | `nav-section/components/nav-collapse.tsx` | Ítem colapsable con hijos |
| `NavDropdown` | `nav-section/components/nav-dropdown.tsx` | Dropdown de nav |
| `NavSubheader` | `nav-section/components/nav-subheader.tsx` | Header de sección en el nav |

### Badges y etiquetas (`label/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Label` | `label/label.tsx` | Badge/chip estilizado con variantes de color: `default`, `primary`, `secondary`, `info`, `success`, `warning`, `error` |

> **Uso**: `<Label color="error">Crítico</Label>` — para niveles de riesgo, estados de asistencia, etc.

### Iconos (`iconify/`, `svg-color/`, `flag-icon/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `Iconify` | `iconify/iconify.tsx` | Wrapper de Iconify (acceso a 100K+ iconos) |
| `SvgColor` | `svg-color/svg-color.tsx` | SVG colorizable (usado en iconos del sidebar) |
| `FlagIcon` | `flag-icon/flag-icon.tsx` | Banderas de países |

### Popovers y overlays (`custom-popover/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `CustomPopover` | `custom-popover/custom-popover.tsx` | Popover con posicionamiento inteligente |
| `usePopover` | `custom-popover/hooks.ts` | Hook para manejar estado del popover (open/close/anchor) |

### Carga y pantallas (`loading-screen/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `LoadingScreen` | `loading-screen/loading-screen.tsx` | Pantalla de carga full-screen |
| `SplashScreen` | `loading-screen/splash-screen.tsx` | Splash screen de la app |

### Datos y display

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `SearchNotFound` | `search-not-found/search-not-found.tsx` | Estado vacío cuando no hay resultados de búsqueda |
| `FileThumbnail` | `file-thumbnail/file-thumbnail.tsx` | Preview de archivo con detección de tipo |
| `Scrollbar` | `scrollbar/scrollbar.tsx` | Scrollbar personalizado (envolver tablas y contenido largo) |
| `ProgressBar` | `progress-bar/progress-bar.tsx` | Barra de progreso en top de página (NProgress) |
| `Logo` | `logo/logo.tsx` | Logo de la app |

### Configuración visual (`settings/`)

| Componente | Archivo | Descripción |
|-----------|---------|-------------|
| `SettingsProvider` | `settings/context/settings-provider.tsx` | Provider de configuración de tema/layout |
| `SettingsDrawer` | `settings/drawer/settings-drawer.tsx` | Panel visual de configuración (nav layout, color preset, etc.) |
| `useSettingsContext` | `settings/context/use-settings-context.ts` | Hook para acceder a las settings activas |

---

## 2. Componentes disponibles en full-demo (copiar cuando se necesiten)

Estos componentes existen en `.reference/full-demo/src/components/` pero **NO** están en el proyecto base. Al necesitarlos, copiar el directorio completo a `frontend/src/components/`.

### Tablas y utilidades de lista

| Componente / Hook | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-------------------|-------------------|----------------|-------------------------------|
| `useTable` | `.reference/full-demo/src/components/table/use-table.ts` | Hook que gestiona estado de tabla: página, rowsPerPage, orderBy, order, selected, dense | Todas las listas (StudentList, GroupList, AlertList, etc.) |
| `TableHeadCustom` | `.reference/full-demo/src/components/table/table-head-custom.tsx` | Header de tabla con checkbox de selección múltiple y ordenamiento por columna | Todas las tablas |
| `TableSelectedAction` | `.reference/full-demo/src/components/table/table-selected-action.tsx` | Toolbar que aparece al seleccionar filas (ej. "Eliminar X seleccionados") | StudentList, GroupList |
| `TablePaginationCustom` | `.reference/full-demo/src/components/table/table-pagination-custom.tsx` | Footer de paginación con rows per page y contador | Todas las tablas |
| `TableEmptyRows` | `.reference/full-demo/src/components/table/table-empty-rows.tsx` | Filas vacías para mantener altura consistente | Todas las tablas |
| `TableNoData` | `.reference/full-demo/src/components/table/table-no-data.tsx` | Estado vacío de tabla con ilustración | Todas las tablas |
| `TableSkeleton` | `.reference/full-demo/src/components/table/table-skeleton.tsx` | Skeleton loader para tablas en carga | Todas las tablas |
| `getComparator` | `.reference/full-demo/src/components/table/utils.ts` | Función de comparación para ordenamiento | Tablas con sort local |
| `rowInPage` | `.reference/full-demo/src/components/table/utils.ts` | Slice de datos para paginación local | Tablas con paginación local |
| `emptyRows` | `.reference/full-demo/src/components/table/utils.ts` | Calcula filas vacías para mantener altura | Todas las tablas |

> **Copiar todo el directorio**: `.reference/full-demo/src/components/table/` → `frontend/src/components/table/`

### Gráficos y charts

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `Chart` | `.reference/full-demo/src/components/chart/chart.tsx` | Wrapper de ApexCharts con loading y estilos del tema | DashboardPage, StudentDetailPage, AlertDetailPage |
| `ChartLegends` | `.reference/full-demo/src/components/chart/chart-legends.tsx` | Leyenda de gráficas (custom, fuera del canvas) | DashboardPage |
| `useChart` | `.reference/full-demo/src/components/chart/use-chart.ts` | Hook con opciones base de ApexCharts (merge con defaults del tema) | Todos los charts |
| `ChartSelect` | `.reference/full-demo/src/components/chart/chart-select.tsx` | Selector de período en chart (Semana / Mes / Año) | Widgets con toggle de período |

> **Copiar todo el directorio**: `.reference/full-demo/src/components/chart/` → `frontend/src/components/chart/`

### Carga de archivos (`upload/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `UploadAvatar` | `.reference/full-demo/src/components/upload/upload-avatar.tsx` | Upload de imagen de perfil (crop circular) | StudentFormPage (foto de perfil) |
| `UploadBox` | `.reference/full-demo/src/components/upload/upload-box.tsx` | Caja de drag-and-drop para archivos | ReportsPage (subir documentos) |
| `UploadDefault` | `.reference/full-demo/src/components/upload/upload.tsx` | Upload estándar con preview | Formularios con adjuntos |

### Dialogs y confirmaciones (`custom-dialog/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `ConfirmDialog` | `.reference/full-demo/src/components/custom-dialog/confirm-dialog.tsx` | Dialog de confirmación para acciones destructivas (borrar, descartar alerta, etc.) | StudentList (delete), AlertDetailPage (dismiss alert) |

> **Copiar**: `.reference/full-demo/src/components/custom-dialog/` → `frontend/src/components/custom-dialog/`

### Estado vacío (`empty-content/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `EmptyContent` | `.reference/full-demo/src/components/empty-content/empty-content.tsx` | Estado vacío centrado con ilustración, título, descripción y acción opcional | Todas las listas vacías, sin alertas, sin calificaciones |

> **Copiar**: `.reference/full-demo/src/components/empty-content/` → `frontend/src/components/empty-content/`

### Filtros activos (`filters-result/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `FiltersResult` | `.reference/full-demo/src/components/filters-result/filters-result.tsx` | Muestra chips de filtros activos con botón de limpiar cada uno | StudentList (filtro por grupo/riesgo), AlertList (filtro por nivel) |

> **Copiar**: `.reference/full-demo/src/components/filters-result/` → `frontend/src/components/filters-result/`

### Selector de rango de fechas (`custom-date-range-picker/`)

| Componente / Hook | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-------------------|-------------------|----------------|-------------------------------|
| `DateRangePicker` | `.reference/full-demo/src/components/custom-date-range-picker/custom-date-range-picker.tsx` | Dialog con dos date pickers para seleccionar rango | AttendanceHistoryPage, ReportsPage |
| `useDateRangePicker` | `.reference/full-demo/src/components/custom-date-range-picker/use-date-range-picker.ts` | Hook que maneja estado del rango (startDate, endDate, validation) | AttendanceHistoryPage |

> **Copiar**: `.reference/full-demo/src/components/custom-date-range-picker/` → `frontend/src/components/custom-date-range-picker/`

### Breadcrumbs mejorados (`custom-breadcrumbs/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `CustomBreadcrumbs` | `.reference/full-demo/src/components/custom-breadcrumbs/custom-breadcrumbs.tsx` | Breadcrumbs con link de regreso, heading y action slot | Todas las páginas de detalle y formularios |

> **Copiar**: `.reference/full-demo/src/components/custom-breadcrumbs/` → `frontend/src/components/custom-breadcrumbs/`

### Imagen con fallback (`image/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `Image` | `.reference/full-demo/src/components/image/image.tsx` | `<img>` con lazy loading, fallback, aspect ratio | Foto de perfil de estudiante, ilustraciones |

> **Copiar**: `.reference/full-demo/src/components/image/` → `frontend/src/components/image/`

### Notificaciones toast (`snackbar/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `Snackbar` (toast) | `.reference/full-demo/src/components/snackbar/` | Toast notifications: `toast.success()`, `toast.error()`, `toast.warning()` | Todas las acciones (guardar, eliminar, errores API) |

> **Copiar**: `.reference/full-demo/src/components/snackbar/` → `frontend/src/components/snackbar/`

### Editor de texto enriquecido (`editor/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `Editor` | `.reference/full-demo/src/components/editor/editor.tsx` | Editor WYSIWYG (Tiptap) con toolbar | ReportsPage (descripción), NotesPage (futuro) |

### Campos de formulario adicionales (en `hook-form/` del full-demo)

Los siguientes campos existen en el full-demo pero NO en el starter-kit. Copiar de `.reference/full-demo/src/components/hook-form/` según se necesiten:

| Campo | Archivo en full-demo | Para qué sirve | Vista de Stellar |
|-------|---------------------|----------------|-----------------|
| `RHFPhoneInput` | `hook-form/rhf-phone-input.tsx` | Campo de teléfono internacional | StudentFormPage, UserFormPage |
| `RHFNumberInput` | `hook-form/rhf-number-input.tsx` | Input numérico con +/- (spinner) | RiskWeightsPage (alternativa al slider) |
| `RHFUpload` | `hook-form/rhf-upload.tsx` | Upload controlado por RHF | StudentFormPage (avatar) |
| `RHFCountrySelect` | `hook-form/rhf-country-select.tsx` | Selector de país con banderas | Formularios de dirección |
| `RHFEditor` | `hook-form/rhf-editor.tsx` | Editor WYSIWYG controlado por RHF | Formularios con descripción larga |

### Campos numéricos e inputs especiales

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `NumberInput` | `.reference/full-demo/src/components/number-input/number-input.tsx` | Input numérico standalone con botones +/- | GradeEntryPage (alternativa) |
| `PhoneInput` | `.reference/full-demo/src/components/phone-input/phone-input.tsx` | Input de teléfono con selector de país | StudentFormPage |

### Galería de imágenes (`lightbox/`)

| Componente | Ruta en full-demo | Para qué sirve | Vista de Stellar donde usarlo |
|-----------|-------------------|----------------|-------------------------------|
| `Lightbox` | `.reference/full-demo/src/components/lightbox/lightbox.tsx` | Visor fullscreen de imágenes con navegación | StudentDetailPage (galería), ReportsPage (adjuntos) |

---

## 3. Patrones de vistas del full-demo

### Patrón: Lista con tabla paginada (UserListView)

**Referencia**: `.reference/full-demo/src/sections/user/view/user-list-view.tsx`

Estructura estándar de lista con tabla:

```
UserListView (o StudentListView, GroupListView, etc.)
├── CustomBreadcrumbs + botón "Agregar"
├── Tabs de estado (ej. "Todos | Activo | Inactivo") con Badge de conteo
├── {Entity}TableToolbar — barra con:
│   ├── TextField de búsqueda
│   ├── Botón de filtro (Popover con opciones)
│   └── Download CSV (opcional)
├── FiltersResult — chips de filtros activos (si hay filtros)
├── TableSelectedAction — "X seleccionados — Eliminar"
├── Scrollbar > TableContainer > Table
│   ├── TableHeadCustom — headers con sort + checkbox
│   ├── TableBody
│   │   ├── {Entity}TableRow (por cada fila)
│   │   ├── TableEmptyRows
│   │   └── TableNoData
│   └── TablePaginationCustom
└── ConfirmDialog — "¿Eliminar X estudiantes?"
```

**Archivos companion**:
- `{entity}-table-row.tsx` — renderiza una fila con acciones (popover con editar/eliminar)
- `{entity}-table-toolbar.tsx` — barra de búsqueda y filtros
- `{entity}-table-filters-result.tsx` — chips de filtros activos

**Referencia de secciones similares**:
- `.reference/full-demo/src/sections/user/` — lista de usuarios
- `.reference/full-demo/src/sections/invoice/` — lista de facturas con tabs de estado
- `.reference/full-demo/src/sections/order/` — lista de órdenes con DataGrid

### Patrón: Formulario de creación/edición (UserNewEditForm)

**Referencia**: `.reference/full-demo/src/sections/user/user-new-edit-form.tsx`

```
CreateEditView
├── CustomBreadcrumbs (con ruta de regreso)
└── Grid container
    ├── Left column (xs=12 md=4)
    │   └── Card (avatar upload + info básica)
    └── Right column (xs=12 md=8)
        └── Card > FormProvider > Stack
            ├── Campos del formulario (RHF fields)
            ├── Divider
            └── LoadingButton type="submit"
```

**Archivos**:
- `{entity}-create-view.tsx` — page wrapper de creación
- `{entity}-edit-view.tsx` — page wrapper de edición
- `{entity}-new-edit-form.tsx` — formulario compartido (recibe `currentData?`)

### Patrón: Dashboard con stats (OverviewAnalyticsView)

**Referencia**: `.reference/full-demo/src/sections/overview/analytics/view/overview-analytics-view.tsx`

```
DashboardView
└── DashboardContent maxWidth="xl"
    └── Grid container spacing={3}
        ├── Row 1: KPI cards (xs=12 sm=6 md=3)
        │   └── AnalyticsWidgetSummary x4
        ├── Row 2: Chart grande + Chart pie (md=8 + md=4)
        │   ├── AnalyticsWebsiteVisits (área/líneas)
        │   └── AnalyticsCurrentVisits (dona)
        ├── Row 3: Tabla de items recientes
        └── Row 4: Widgets secundarios
```

**Referencia educativa**: `.reference/full-demo/src/sections/overview/course/view/overview-course-view.tsx`
— tiene patrones específicos de e-learning: `CourseWidgetSummary`, `CourseHoursSpent`, `CourseProgress`.

### Patrón: Vista de detalle con tabs (UserProfileView)

**Referencia**: `.reference/full-demo/src/sections/user/view/user-profile-view.tsx`

```
DetailView (StudentDetailPage)
├── ProfileCover (hero card con avatar, nombre, rol)
├── Tabs (controlados por query param ?tab=...)
│   ├── Tab "Calificaciones"
│   ├── Tab "Asistencia"
│   ├── Tab "Alertas"
│   └── Tab "Información"
└── TabPanel content (renderiza según tab activo)
    └── Componentes específicos por tab
```

---

## 4. Componentes a crear desde cero (específicos de Stellar)

Estos componentes son del dominio académico y no tienen equivalente en el paquete.

| Componente | Descripción | Vista donde se usa |
|-----------|-------------|-------------------|
| `RiskBadge` | `Label` con color predefinido según nivel: LOW=info, MEDIUM=warning, HIGH=error, CRITICAL=error+bold | AlertListPage, StudentDetailPage, StudentTableRow |
| `RiskScoreGauge` | Indicador visual circular del score de riesgo (0-100) con color según nivel | AlertDetailPage, StudentDetailPage |
| `RiskFactorsBreakdown` | Desglose de los 6 factores del algoritmo con barras o radial chart | AlertDetailPage |
| `RiskLevelFilter` | Chips de filtro de nivel de riesgo (TODOS / BAJO / MEDIO / ALTO / CRÍTICO) | AlertListPage |
| `GradeInput` | Input numérico (0-10 ó 0-100 según config del tenant) con validación de rango | GradeEntryPage |
| `GradeSummaryCard` | Card con promedio ponderado del estudiante + desglose por parcial | StudentDetailPage |
| `GradeBatchTable` | Tabla editable de calificaciones por alumno (selector de grupo + materia arriba) | GradeEntryPage |
| `AttendanceStatusChip` | Chip con color según estado: PRESENTE=success, AUSENTE=error, RETARDO=warning, JUSTIFICADO=info | AttendancePage, AttendanceHistoryPage |
| `AttendanceBatchTable` | Tabla con un alumno por fila y botones de estado de asistencia (presente/ausente/retardo/justificado) | AttendancePage |
| `AttendanceCalendar` | Mini calendar heatmap con días de clase y estado de asistencia | StudentDetailPage (tab asistencia) |
| `PercentageBar` | Barra horizontal con porcentaje de asistencia (verde/amarillo/rojo según umbral) | StudentDetailPage, GroupDetailPage |
| `SubjectSelector` | Autocomplete de materia con datos del tenant actual | GradeEntryPage, AttendancePage (filtros) |
| `GroupSelector` | Autocomplete de grupo con datos del tenant actual | GradeEntryPage, AttendancePage, AlertListPage |
| `PeriodSelector` | Select de período académico (1er Parcial, 2do Parcial, etc.) | GradeEntryPage |
| `RiskWeightSlider` | Slider de peso con label y porcentaje, validación de suma = 100% | RiskWeightsPage |
| `NotificationItem` | Ítem de notificación en el drawer lateral con tipo (alerta riesgo, sistema, etc.) | NotificationsDrawer (customizar el existente) |
| `StudentStatusChip` | Chip de estado del estudiante: ACTIVO=success, INACTIVO=default, IRREGULAR=warning | StudentListPage, StudentDetailPage |
| `EnrollmentCard` | Card de inscripción (grupo + materia + período + docente) | StudentDetailPage |
| `AlertTimelineItem` | Ítem de timeline para historial de evaluaciones de riesgo | AlertDetailPage |

---

## 5. Mapeo de vistas de Stellar a componentes del full-demo

### Fase 1: Auth y estructura base

#### Nota importante: 
Reemplazar estilo de vista actual (`auth-split`) por `auth-centered` que esta en full-demo

#### LoginPage
- **Base del full-demo**: `auth/view/jwt/jwt-sign-in-view.tsx` — ya existe en el proyecto
- **Estado**: Ya implementada (vista de auth JWT del starter-kit)
- **Adaptar**: Conectar `POST /api/v1/auth/validate` y `POST /api/v1/auth/login`, ajustar endpoint en `lib/axios.ts`, usar el componente `Stepper` del full-demo para mostrar pasos de autenticación ("1. Validando credenciales", "2. Mostrar tenants del usuario") durante el proceso de login, si fase 1 no es valida no avanzar al paso 2, texto en español
- **Desde cero**: Nada — solo conexión al backend real y ajustes visuales

#### RegisterPage
- **Base del full-demo**: `auth/view/jwt/jwt-sign-up-view.tsx` — ya existe
- **Estado**: Ya implementada
- **Adaptar**: Conectar `POST /api/v1/auth/register`, campos específicos de Stellar (nombre, escuela, etc.)
- **Desde cero**: Campos adicionales del formulario de registro del tenant

#### ForgotPasswordPage / ResetPasswordPage
- **Base del full-demo**: `.reference/full-demo/src/sections/auth/amplify/amplify-forgot-password-view.tsx`
- **Copiar**: Estructura del formulario (email input, instrucciones)
- **Adaptar**: Usar endpoints JWT del backend, texto en español
- **Desde cero**: Lógica de token de reset si difiere del demo

#### DashboardLayout (sidebar + header + notificaciones)
- **Base**: `layouts/dashboard/layout.tsx` — ya existe en el proyecto
- **Adaptar**: `nav-config-dashboard.tsx` con ítems de Stellar; `notifications-drawer/` con tipos de notificación del backend
- **Desde cero**: `workspaces-popover.tsx` si se implementa multi-tenant en UI; `NotificationItem` customizado

---

### Fase 2: CRUD académico

#### StudentListPage (`/dashboard/students`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/view/user-list-view.tsx`
- **Copiar**: tabla paginada, toolbar de búsqueda, tabs de estado, selección múltiple, ConfirmDialog
- **Componentes a copiar**: `table/` completo, `custom-breadcrumbs/`, `empty-content/`, `filters-result/`, `custom-dialog/`
- **Adaptar**: columnas → nombre, matrícula, grupo, promedio, % asistencia; endpoint a `GET /api/v1/students`
- **Desde cero**: columna con `RiskBadge`, `StudentStatusChip`, filtro por grupo/riesgo

#### StudentFormPage (`/dashboard/students/new` y `/dashboard/students/:id/edit`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/user-new-edit-form.tsx`
- **Copiar**: layout dos columnas (avatar + campos), `FormProvider`, `LoadingButton`
- **Adaptar**: campos → nombre, apellido, matrícula, email, fecha de nacimiento, CURP; endpoints `POST/PUT /api/v1/students`
- **Desde cero**: `StudentStatusChip` en el formulario, campo CURP con validación

#### StudentDetailPage (`/dashboard/students/:id`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/view/user-profile-view.tsx`
- **Copiar**: `ProfileCover`, Tabs con query params, layout de dos columnas
- **Adaptar**: tabs → Calificaciones, Asistencia, Alertas, Información; datos de `GET /api/v1/students/:id/dashboard`
- **Desde cero**: `GradeSummaryCard`, `AttendanceCalendar`, `RiskScoreGauge`, `PercentageBar`, `EnrollmentCard`

#### GroupListPage (`/dashboard/groups`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/view/user-list-view.tsx`
- **Copiar**: mismo patrón de tabla paginada
- **Adaptar**: columnas → nombre, nivel, turno, docente titular, N° alumnos; endpoint `GET /api/v1/groups`
- **Desde cero**: columna con badge de nivel (BÁSICA/MEDIA/SUPERIOR)

#### GroupFormPage (`/dashboard/groups/new` y `/:id/edit`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/user-new-edit-form.tsx`
- **Copiar**: layout de formulario con `FormProvider`
- **Adaptar**: campos → nombre, nivel educativo, turno, período académico, docente; `POST/PUT /api/v1/groups`
- **Desde cero**: selector de docente titular (`RHFAutocomplete` con fetch de usuarios)

#### SubjectListPage / SubjectFormPage (`/dashboard/subjects`)
- **Base del full-demo**: mismo patrón que GroupListPage / GroupFormPage
- **Adaptar**: campos específicos de materia (nombre, código, créditos, nivel, tipo)
- **Desde cero**: selector de categoría de materia

---

### Fase 3: Calificaciones y asistencia

#### GradeEntryPage (`/dashboard/grades`)
- **Base del full-demo**: No hay equivalente directo — patrón más cercano: filtros en top + tabla editable
- **Copiar**: `RHFAutocomplete` para selección de grupo/materia; tabla MUI básica
- **Adaptar**: tabla con una fila por alumno, columnas por parcial
- **Desde cero**: `GradeInput` (input numérico con validación de rango), `GradeBatchTable`, `GroupSelector`, `SubjectSelector`, `PeriodSelector`, lógica de guardado batch (`POST /api/v1/grades/batch`), indicador de guardado pendiente

> **Esta es la vista más compleja de la Fase 3.** No hay patrón directo en el full-demo.

#### AttendancePage (`/dashboard/attendance`)
- **Base del full-demo**: Patrón similar a GradeEntryPage (selector + tabla editable)
- **Copiar**: tabla MUI con una fila por alumno
- **Desde cero**: `AttendanceBatchTable`, `AttendanceStatusChip`, botones de estado por fila (chip group), `GroupSelector`, `SubjectSelector`, selector de fecha (`RHFDatePicker`), guardado batch (`POST /api/v1/attendance/batch`), botón "Marcar todos como presentes"

#### AttendanceHistoryPage (`/dashboard/attendance/history`)
- **Base del full-demo**: `.reference/full-demo/src/sections/order/view/order-list-view.tsx` (lista con filtros de fecha)
- **Copiar**: tabla con filtros, `DateRangePicker`, paginación
- **Componentes a copiar**: `custom-date-range-picker/`
- **Adaptar**: columnas → alumno, grupo, materia, fecha, estado; endpoint `GET /api/v1/attendance`
- **Desde cero**: `AttendanceStatusChip`, filtro por grupo/materia/alumno, exportar CSV

---

### Fase 4: Analytics y dashboard

#### DashboardPage (`/dashboard`)
- **Base del full-demo**: `.reference/full-demo/src/sections/overview/analytics/view/overview-analytics-view.tsx`
- **Referencia educativa**: `.reference/full-demo/src/sections/overview/course/view/overview-course-view.tsx`
- **Copiar**: grid de KPI cards, charts de área/líneas, tabla de items recientes
- **Componentes a copiar**: `chart/` completo
- **Adaptar**: KPIs → total alumnos, % asistencia, promedio general, alertas activas; endpoint `GET /api/v1/stats/dashboard`
- **Desde cero**: widget de alertas recientes (lista con `RiskBadge`), widget de distribución de riesgo (dona con 4 niveles)

#### AlertListPage (`/dashboard/alerts`)
- **Base del full-demo**: `.reference/full-demo/src/sections/invoice/view/invoice-list-view.tsx` (tabs de estado + tabla)
- **Copiar**: tabs con conteo por nivel (TODOS/BAJO/MEDIO/ALTO/CRÍTICO), tabla paginada, toolbar
- **Adaptar**: columnas → alumno, grupo, score, nivel, última evaluación, estado; endpoint `GET /api/v1/alerts`
- **Desde cero**: `RiskBadge`, `RiskLevelFilter`, columna de score con `PercentageBar`

#### AlertDetailPage (`/dashboard/alerts/:id`)
- **Base del full-demo**: `.reference/full-demo/src/sections/invoice/view/invoice-details-view.tsx` (detalles con cards)
- **Copiar**: layout de detalle con cards laterales, breadcrumbs, botones de acción
- **Adaptar**: info del alumno, nivel de riesgo, acciones (descartar, reevaluar)
- **Desde cero**: `RiskScoreGauge`, `RiskFactorsBreakdown`, `AlertTimelineItem` (historial), panel de recomendaciones

#### RiskWeightsPage (`/dashboard/settings/risk-weights`)
- **Base del full-demo**: `.reference/full-demo/src/sections/account/account-general.tsx` (formulario de settings)
- **Copiar**: Card con formulario, `LoadingButton` de guardar
- **Desde cero**: `RiskWeightSlider` x6 (uno por factor), validación de suma = 100%, indicador visual de suma actual

---

### Fase 5: Reportes y configuración

#### ReportsPage (`/dashboard/reports`)
- **Base del full-demo**: No hay equivalente directo
- **Copiar**: Layout de grid con cards, tabla de reportes generados
- **Desde cero**: Card de "Generar reporte" por tipo, selector de filtros (grupo/materia/período/fechas), estado del reporte (pendiente/listo/error), botón de descarga

#### TenantSettingsPage / AcademicConfigPage (`/dashboard/settings`)
- **Base del full-demo**: `.reference/full-demo/src/sections/account/` (múltiples tabs de settings)
- **Copiar**: layout de tabs de configuración, Cards por sección
- **Adaptar**: settings de Stellar → nombre del tenant, logo, configuración académica, períodos

#### UsersPage / RolesPage (`/dashboard/settings/users`)
- **Base del full-demo**: `.reference/full-demo/src/sections/user/view/user-list-view.tsx`
- **Copiar**: mismo patrón de lista con tabla
- **Adaptar**: columnas → nombre, email, rol, último acceso; endpoints de users del tenant

---

## 6. Guía de uso del catálogo

### Flujo para construir cualquier vista nueva

1. **Consulta este catálogo** → identifica si existe una base en el full-demo.
2. **Lee el archivo de referencia** en `.reference/full-demo/src/sections/...`
3. **Copia los componentes necesarios** del full-demo a `frontend/src/components/`.
4. **Crea la estructura de archivos** en `frontend/src/sections/{modulo}/view/`.
5. **Agrega la ruta** en `routes/paths.ts` + `routes/sections/dashboard.tsx`.
6. **Agrega el ítem al nav** en `layouts/nav-config-dashboard.tsx`.
7. **Crea la página wrapper** en `pages/dashboard/{modulo}.tsx`.
8. **Conecta al API real** — reemplaza mock data por llamadas a `axiosInstance`.

### Reglas de prioridad de componentes

1. **Ya existe en `frontend/src/components/`** → úsalo directamente.
2. **Existe en full-demo pero no en el proyecto** → copia el directorio completo a `frontend/src/components/`.
3. **No existe en el paquete** → construye desde cero en `frontend/src/components/`.

### Componentes a copiar en el primer sprint (Fase 2)

Antes de empezar a construir las vistas del CRUD académico, copiar estos directorios:

```bash
# Copiar de .reference/full-demo/src/components/ → frontend/src/components/
table/                    # useTable, TableHeadCustom, TablePaginationCustom, etc.
custom-breadcrumbs/       # CustomBreadcrumbs
empty-content/            # EmptyContent
filters-result/           # FiltersResult
custom-dialog/            # ConfirmDialog
snackbar/                 # toast.success, toast.error
image/                    # Image con lazy loading
```

Para la Fase 3 (calificaciones/asistencia), agregar:
```bash
custom-date-range-picker/ # DateRangePicker, useDateRangePicker
number-input/             # NumberInput
```

Para la Fase 4 (analytics), agregar:
```bash
chart/                    # Chart, useChart, ChartLegends, ChartSelect
upload/                   # UploadAvatar (foto de perfil)
```
