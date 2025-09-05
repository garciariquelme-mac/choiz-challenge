# Lógica de Categorización de Tratamientos

## Pregunta Base
La categorización se basa en las respuestas de la **pregunta número 3 del wizard**: "¿Tienes o has tenido alguna de las siguientes condiciones médicas?"

## Casos de Categorización

### Caso 1: No tiene ninguna condición médica
- **Condición**: El usuario seleccionó "No tengo ninguna de estas condiciones" (`medical_none`)
- **Categoría**: `no_medical_conditions`
- **Tratamiento**: DUTAXIDIL® Cápsulas
- **Imagen**: `hair-blends.png`

### Caso 2: Tiene alguna condición médica
- **Condición**: El usuario seleccionó cualquier condición médica excepto cáncer de mama o próstata
- **Condiciones incluidas**:
  - Presión arterial baja incontrolada
  - Otras enfermedades autoinmunes o reumáticas
  - Problemas de tiroides
  - Enfermedades del corazón
  - Enfermedades de riñón o hígado
  - Problemas de tiroides
  - Otra condición médica
- **Categoría**: `has_medical_conditions`
- **Tratamiento**: DUTAXIDIL® Gel
- **Imagen**: `hair-gel.png`

### Caso 3: Entre las condiciones médicas tiene Cáncer de mama o Cáncer de próstata
- **Condición**: El usuario seleccionó cáncer de mama (`medical_breast_cancer`) o cáncer de próstata (`medical_prostate_cancer`)
- **Prioridad**: Este caso tiene prioridad sobre el Caso 2
- **Categoría**: `cancer_conditions`
- **Tratamiento**: Minoxidil® Cápsulas
- **Imagen**: `hair-blends.png`

## Orden de Evaluación
1. **Primero**: Verificar si seleccionó "No tengo ninguna de estas condiciones"
2. **Segundo**: Verificar si tiene cáncer de mama o próstata
3. **Tercero**: Si no cumple los anteriores, se considera que tiene alguna condición médica

## Ejemplos de Uso

```typescript
// Caso 1: Sin condiciones médicas
selectedOptions: ['medical_none']
// Resultado: no_medical_conditions

// Caso 2: Con problemas de tiroides
selectedOptions: ['medical_thyroid']
// Resultado: has_medical_conditions

// Caso 3: Con cáncer de mama
selectedOptions: ['medical_breast_cancer']
// Resultado: cancer_conditions

// Caso 3: Con cáncer de mama y problemas de tiroides
selectedOptions: ['medical_breast_cancer', 'medical_thyroid']
// Resultado: cancer_conditions (prioridad al cáncer)
```
