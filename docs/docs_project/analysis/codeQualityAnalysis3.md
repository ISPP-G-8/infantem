# Análisis de la Calidad del Código con SonarQube 3

![Portada](../../images/Infantem.png)

**Fecha:** 10/04/2025  
**Grupo 8:** Infantem  
**Sprint 3**

## Integrantes del Grupo
<div style="display: flex; justify-content: space-between; gap: 2px;">
  <div>
    <ul style="padding-left: 0; list-style: none;">
      <li>Álvaro Jiménez Osuna</li>
      <li>Ángela López Oliva</li>
      <li>Antonio Jiménez Ortega</li>
      <li>Daniel del Castillo Piñero</li>
      <li>David Fuentelsaz Rodríguez</li>
      <li>David Vargas Muñiz</li>
      <li>Enrique García Abadía</li>
      <li>Felipe Solís Agudo</li>
      <li>Javier Santos Martín</li>
    </ul>
  </div>

  <div>
    <ul style="padding-left: 0; list-style: none;">
      <li>Javier Ulecia García</li>
      <li>José García de Tejada Delgado</li>
      <li>Jose Maria Morgado Prudencio</li>
      <li>Josué Rodríguez López</li>
      <li>Lucía Noya Cano</li>
      <li>Luis Giraldo Santiago</li>
      <li>Miguel Galán Lerate</li>
      <li>Paula Luna Navarro</li>
    </ul>
  </div>
</div>

---

## Colaboradores del documento
- Paula Luna Navarro  
  - Recopilación de resultados y creación del documento

---

## Introducción
Este documento presenta el análisis de la calidad del código del proyecto Infantem durante el **Sprint 3**, basado en el escaneo de SonarQube a fecha del 10 de abril de 2025. Se han identificado métricas clave, problemas y recomendaciones para su mejora.

---

## Aspectos Positivos
- ✔️ **Integración continua con SonarQube.**  
- ✔️ **Separación de responsabilidades por carpetas (`frontend`, `src`).**  
- ✔️ **Métricas claras y seguimiento del progreso de cobertura.**  
- ✔️ **Ausencia de hotspots de seguridad.**

---

## Métricas Clave de SonarQube

**Fecha del análisis:** *10/04/2025*   
**Análisis:** [Ver en SonarCloud](https://sonarcloud.io/project/overview?id=ISPP-G-8_infantem)  

| Métrica                         | Valor                     |
|----------------------------------|---------------------------|
| **Calidad del código**          | 🔴 *Failed*               |
| **Cobertura de pruebas**        | *15.3%* (Requerido ≥ 80%) |
| **Cobertura de condiciones**    | *69.2%*                   |
| **Líneas sin cubrir**           | *800*                     |
| **Bugs detectados**             | *16*                      |
| **Code Smells**                 | *44*                      |
| **Vulnerabilidades**            | *0*                       |
| **Security Hotspots**           | *0*                       |
| **Código duplicado**            | *16.8%*                   |
| **Debt Ratio**                  | *0.2%*                    |
| **Tiempo para solucionar deuda**| *3h 20min*                |

---

## Áreas de Mejora

### 1. **Calidad general fallida**
- Cobertura del 15.3% (< 80%) en 928 líneas nuevas.
- Duplicación elevada: 16.8% (10.3% tras merge).

### 2. **Código duplicado**
- 1.018 líneas duplicadas en 47 bloques.
- Especialmente en `frontend` con un 23.2% de duplicación.

### 3. **Baja cobertura**
- 800 líneas sin cubrir.
- Cobertura por carpeta:
  - `frontend`: 0.0%
  - `src`: 76.8%

### 4. **Issues**
- 60 issues nuevos.
- Severidad:
  - 🟠 Medium: 37
  - 🟡 Low: 23
  - 🔵 Info: 1

### 5. **Bugs recurrentes**
- Problemas detectados con hooks de React (`useState`, `useEffect`, `useAuth`) en funciones que no cumplen convención de nombre.
- Variables asignadas y no utilizadas.
- Uso de operadores no seguros (`||` en vez de `??`).
- Comentarios `TODO` pendientes.

---

## Plan de Acción

✅ **Cobertura**
- Aumentar testeo en componentes de `frontend`, actualmente sin cobertura.
- Añadir pruebas para mejorar el 15.3% actual.

✅ **Código duplicado**
- Refactorizar bloques redundantes en:
  - `stripe-checkout.tsx`, `calendar/index.tsx`, `intakeDetail.tsx`, `baby/index.tsx`.

✅ **Code Smells y Bugs**
- Eliminar imports y asignaciones innecesarias.
- Usar `??` en vez de `||`.
- Asegurar que funciones que usan hooks React cumplen la convención.

✅ **Documentación y revisiones**
- Resolver comentarios `TODO`.
- Validar nombres de paquetes según estándares (`^[a-z_]+(\.[a-z_][a-z0-9_]*)*$`).

---

## Comparativa con el Sprint Anterior (Sprint 2 vs Sprint 3)

Se presenta a continuación una comparativa entre los análisis de SonarQube realizados en **Sprint 2 (27/03/2025)** y **Sprint 3 (10/04/2025)**:

| Métrica                        | Sprint 2                | Sprint 3                | Observación |
|-------------------------------|--------------------------|--------------------------|-------------|
| **Calidad del código**        | 🔴 *Failed*              | 🔴 *Failed*              | Sin cambios, aún en progreso |
| **Cobertura de pruebas**      | *52.5%*                  | *15.3%*                  | 🔻 Disminuye por incorporación de nuevo código sin tests (frontend) |
| **Cobertura de condiciones**  | *42.8%*                  | *69.2%*                  | 🔺 Mejora significativa |
| **Líneas sin cubrir**         | *426*                    | *800*                    | 🔺 Aumento proporcional al nuevo código añadido |
| **Bugs detectados**           | *4*                      | *16*                     | 🔺 Mayor volumen de código = más detección |
| **Vulnerabilidades**          | *0*                      | *0*                      | ✅ Sin cambios |
| **Security Hotspots**         | *3 (0% revisados)*       | *0*                      | ✅ Eliminados |
| **Código duplicado**          | *0.1%*                   | *16.8%*                  | 🔺 Asociado a plantillas comunes y componentes repetidos del frontend |
| **Debt Ratio**                | *0.0%*                   | *0.2%*                   | Aumento leve esperado |
| **Tiempo de corrección (debt)** | N/D                    | *3h 20min*               | Nuevo valor generado |
| **Complejidad ciclomática**   | *531*                    | No analizada             | N/D |
| **Issues nuevos**             | *+277*                   | *+60*                    | 🔽 Se redujeron significativamente |

---


## Comparativa entre Sprints

A continuación se presenta una comparativa de las métricas clave de calidad del código analizadas en los tres primeros sprints mediante **SonarQube**:

| Métrica                       | Sprint 1 | Sprint 2 | Sprint 3 |
|------------------------------|----------|----------|----------|
| **Calidad del Código**       | 🟢 A     | 🔴 Failed| 🔴 Failed|
| **Cobertura de Pruebas**     | 0.0%     | 52.5%    | 15.3%    |
| **Cobertura de Condiciones** | -        | 42.8%    | 69.2%    | 
| **Bugs Detectados**          | 4        | 4        | 16       |
| **Código Duplicado**         | 0.9%     | 0.1%     | 16.8%    |
| **Hotspots de Seguridad**    | 0        | 3        | 0        |
| **Code Smells**              | 0        | 277      | 60       |
| **Debt Ratio**               | 0.0%     | 0.0%     | 0.2%     |
| **Líneas sin cubrir**        | -        | 426      | 800      |

> (EXPLICACIÓN) **Cobertura de condiciones**: mide cuántas de las posibles decisiones lógicas (`if`, `else`, `switch`...) han sido comprobadas por los tests. Es útil para asegurar que se evalúan todos los caminos posibles del código.

---

### 🧾 Observaciones Clave

- La reducción en la **cobertura de pruebas** no refleja una bajada en calidad, sino el crecimiento del proyecto: se ha añadido mucho código nuevo (especialmente en frontend) que aún no tiene tests automatizados.
- Se ha mejorado la **cobertura de condiciones** y se han **resuelto todos los hotspots de seguridad**.
- La duplicación ha aumentado principalmente por componentes de interfaz reutilizados; se puede mitigar con refactorizaciones progresivas.
- La cantidad de **nuevos issues se ha reducido**, lo cual es una señal positiva en términos de mantenimiento.

---

### 🎯 Recomendaciones

- Añadir pruebas automatizadas para los nuevos componentes de frontend, lo cual Configurar la recogida de tests de frontend en SonarCloud para reflejar adecuadamente la cobertura completa del proyecto.

    - Ajustar el archivo sonar-project.properties para incluir el path correcto de cobertura (frontend/coverage/lcov.info) y asegurarse de que los tests de frontend están generando dicho reporte.

- Añadir pruebas automatizadas para los nuevos componentes de frontend, lo cual permitirá recuperar y superar la cobertura previa.

- Refactorizar código duplicado identificado en: calendar/index.tsx, stripe-checkout.tsx, intakeDetail.tsx, baby/index.tsx, etc.

- Eliminar code smells y errores comunes como:

  -  Imports no utilizados, uso de operadores no seguros (|| en vez de ??), hooks mal utilizados.

- Completar tareas pendientes indicadas por comentarios TODO y corregir convenciones de nombre de paquetes.

---

## Conclusión
El análisis de SonarQube muestra avances en métricas de condiciones cubiertas, pero también evidencia puntos críticos como **baja cobertura de pruebas en frontend**, **alta duplicación de código** y múltiples **code smells**. Se recomienda priorizar la refactorización y aumento de cobertura para mejorar la calidad de cara al próximo Sprint.

**Enlace al análisis:**  
[🔗 Ver análisis en SonarCloud](https://sonarcloud.io/project/overview?id=ISPP-G-8_infantem)
