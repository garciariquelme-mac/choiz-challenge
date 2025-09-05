# Choiz - Evaluación Médica y Recomendación de Tratamientos

Prueba técnica desarrollada con Next.js que permite a los usuarios completar una evaluación médica personalizada para recibir recomendaciones de tratamientos capilares basadas en sus respuestas.

## 🚀 Características

- **Evaluación Médica Interactiva**: Wizard de preguntas con validaciones 
- **Recomendaciones Personalizadas**: Sistema de categorización basado en condiciones médicas
- **Interfaz Responsiva**: Optimizada para mobile y desktop
- **Gestión de Estado**: Context API para manejo de respuestas del usuario
- **Validaciones Dinámicas**: Formularios con validación en tiempo real
- **Componentes Reutilizables**: Arquitectura modular y escalable

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Formularios**: React Hook Form con validaciones personalizadas
- **Estado**: React Context API
- **Imágenes**: Next.js Image Optimization
- **Testing**: Jest, React Testing Library, @testing-library/jest-dom
- **Linting**: ESLint con configuración Next.js

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de la aplicación
│   ├── page.tsx           # Página de inicio
│   ├── medical-evaluation/ # Evaluación médica
│   └── recommendation/     # Página de recomendaciones
├── components/            # Componentes reutilizables
│   ├── forms/             # Componentes de formularios
│   ├── layout/            # Componentes de layout
│   └── ui/                # Componentes de interfaz
├── contexts/              # Contexto de React
├── data/                  # Datos estáticos
├── hooks/                 # Custom hooks
└── types/                 # Definiciones de TypeScript
```

## 🚦 Flujo de la Aplicación

1. **Página de Inicio**: Presentación de la aplicación con modal de bienvenida
2. **Evaluación Médica**: Wizard de preguntas sobre condiciones médicas
3. **Recomendaciones**: Página con tratamientos recomendados basados en las respuestas
4. **FAQs**: Sección de preguntas frecuentes

## 🎯 Sistema de Recomendaciones

La aplicación categoriza a los usuarios en tres grupos basados en sus condiciones médicas:

- **Sin condiciones médicas**: DUTAXIDIL® Cápsulas
- **Con condiciones médicas**: DUTAXIDIL® Gel  
- **Con cáncer de mama/próstata**: Minoxidil® Cápsulas

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/garciariquelme-mac/choiz-challenge.git
   cd choiz-challenge
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Testing
npm test
npm run test:watch
npm run test:coverage

# Linting
npm run lint
```

## 🎨 Diseño y UX

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Responsive**: Adaptación automática a diferentes tamaños de pantalla
- **Accesibilidad**: Componentes con atributos ARIA y navegación por teclado
- **Microinteracciones**: Transiciones suaves y feedback visual

## 🔧 Configuración de Desarrollo

### Estructura de Tipos

Los tipos están organizados en archivos individuales dentro de `src/types/`:

- `question.ts`: Tipos relacionados con preguntas y respuestas
- `treatment.ts`: Tipos de tratamientos
- `ui.ts`: Tipos de componentes de interfaz
- `form.ts`: Tipos de formularios
- `wizard.ts`: Tipos del wizard de preguntas
- `faq.ts`: Tipos relacionados con preguntas frecuentes
- `header.ts`: Tipos del componente Header
- `step.ts`: Tipos de pasos del proceso
- `index.ts`: Exportaciones centralizadas de todos los tipos

### Hooks Personalizados

- `useQuestionForm`: Manejo de formularios de preguntas con validaciones
- `useQuestionWizard`: Lógica del wizard de evaluación médica
- `useTreatmentRecommendation`: Categorización de tratamientos basada en respuestas
- `useFaqs`: Gestión de preguntas frecuentes con fetch de API
- `useAccordion`: Manejo de estado de acordeones expandibles
- `useRecommendationPage`: Lógica de la página de recomendaciones

## 🧪 Testing

El proyecto incluye una suite de tests unitarios configurada con Jest y React Testing Library.

### Configuración de Testing

- **Jest**: Framework de testing con configuración optimizada para Next.js
- **React Testing Library**: Utilidades para testing de componentes React
- **@testing-library/jest-dom**: Matchers adicionales para Jest
- **@types/jest**: Definiciones de tipos para Jest

### Tests Implementados

#### `useTreatmentRecommendation`
Tests completos para el hook de categorización de tratamientos:
- ✅ **Caso 1**: Usuario sin condiciones médicas (3 tests)
- ✅ **Caso 2**: Usuario con condiciones médicas generales (3 tests)  
- ✅ **Caso 3**: Usuario con cáncer de mama/próstata (4 tests)

#### `useRecommendationPage`
Tests completos para el hook de la página de recomendaciones:
- ✅ **Estado inicial**: Inicialización y filtrado de tratamientos (2 tests)
- ✅ **Selección de tratamiento**: Manejo de selección y cierre de secciones (2 tests)
- ✅ **Navegación**: Navegación a última pregunta (1 test)
- ✅ **Categorías**: Diferentes tipos de tratamientos (2 tests)

### Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Cobertura Actual
- **17 tests** ejecutándose exitosamente
- **2 suites de test** principales
- **Cobertura completa** de hooks críticos del sistema

## 📦 Build y Deploy

### Build de Producción

```bash
npm run build
```


## 📝 Notas de Desarrollo

- **Validaciones**: El sistema incluye validaciones para opciones exclusivas y campos requeridos
- **Estado**: Las respuestas se mantienen durante toda la sesión usando Context API
- **Performance**: Optimización de imágenes con Next.js Image
- **SEO**: Metadatos configurados para cada página
- **Testing**: Suite de tests unitarios con Jest y React Testing Library
- **Calidad de Código**: Configuración de ESLint y TypeScript para mantener estándares

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está bajo licencia privada.


---
