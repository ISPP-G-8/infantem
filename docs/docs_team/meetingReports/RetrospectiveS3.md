## Retrospective - Sprint 3

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
- Antonio Jiménez
  - Creó el documento

- Lucía Noya Cano
  - Actualizó el documento para el Sprint 3

## Índice
- [Riegos identificados](#riegos-identificados)
- [Desarrollo con pinzas](#desarrollo-con-pinzas)
- [Desarrollo conforme](#desarrollo-conforme)
- [Desarrollo orgullo](#desarrollo-orgullo)
- [Aprendizaje de este sprint](#aprendizaje-de-este-sprint)
- [Acciones a tomar para los siguientes sprints](#acciones-a-tomar-para-los-siguientes-sprints)

---

## Riesgos identificados
- **Despliegue continuo automatizado:** La automatización del despliegue mediante workflows puede fallar si no se mantiene actualizada o si hay errores en los scripts, lo cual afectaría la entrega continua.
- **Riesgos de marketing y tracción**: La estrategia de tracción inicial podría no generar el impacto esperado, especialmente si la asignación de roles en marketing no se ejecuta de forma eficaz.
- **Backend:** Retrasos en la subida de los tests y problemas de calidad en los mismos debido a fallos recurrentes en las pruebas.
- **Frontend:** Dificultades en la coordinación con el backend, falta de coordinación interna entre los miembros del equipo frontend y retrasos en algunas tareas clave del sprint.

---

## Desarrollo con pinzas
- Estilos de la pasarela de pago aún pendientes de mejorar.
- Necesidad de unificar criterios en los tests automáticos para mantener la calidad del código.
- **Governify y SLAs**: Se ha integrado la monitorización con Governify, pero puede haber configuraciones iniciales poco pulidas o riesgos legales pendientes de revisar.

---

## Desarrollo conforme
- Pasarela de pago con Stripe completada y funcional.
- Implementación de filtros de recetas finalizada.
- Cobertura de tests completada en varias entidades como Vaccine, User, Disease y Dream.
- **Gestión de usuarios básicos:** Aunque es esencial, no se ha innovado en roles o permisos avanzados.
- **Desempeño positivo del frontend:** Se han resuelto varios errores, mejorado la experiencia de usuario (UX), integrado el feedback de los usuarios piloto y realizado mejoras visuales en los estilos. Además, se ha implementado casi el 100% de las tareas previstas para este sprint.
- **Implementaciones completas:** Se han completado al 100% las implementaciones de alérgenos, marketplace, finalización del calendario, métricas y "métricas premium".
---

## Desarrollo orgullo
- **Desempeño positivo del backend:** Se han alcanzado los objetivos previstos y todo el mundo ha trabajado bien.

- **Documentación robusta completada:** Incluye la documentación interna del equipo y la documentación técnica pública.

- **Swagger API documentada:** Documentación clara y navegable de los endpoints, facilitando la integración externa.

- **Revisión de Términos y Condiciones + SLAs:** Se definieron aspectos legales y de compromiso de servicio clave para garantizar transparencia y profesionalidad.

- **Estrategia inicial de tracción:** Se diseñó una propuesta de marketing para captar usuarios, incluyendo ideas de viralización y crecimiento orgánico.

- **Panel de administración funcional y completo:** Gestión visual de recursos clave como usuarios, sueños, enfermedades y vacunas.

- **Governify y métricas de calidad:** Integración inicial de monitorización de cumplimiento de SLAs. Complementado con métricas en SonarQube y eliminación de bloqueos de calidad.

- **Cobertura de frontend y backend con métricas visibles:** Tests funcionales y unitarios con trazabilidad y cobertura, apoyados por Sonar y Codecov.

- **Workflow de despliegue CI/CD mediante GitHub Actions:** Automatización del ciclo de despliegue y pruebas que permite entregas frecuentes y confiables.

- **Reorganización del repositorio y pantalla de bienvenida:** Setup más intuitivo y profesional, mejorando la experiencia de onboarding de nuevos contribuidores y usuarios técnicos.

---

## Aprendizaje de este sprint
- Se logró una mayor cohesión entre frontend y backend, especialmente en tareas integradas y dependientes.

- Se identificó el valor estratégico de documentar el feedback de usuarios piloto para tomar decisiones de diseño y funcionalidad.

- Quedaron claras las ventajas de contar con un sistema de despliegue continuo, facilitando iteraciones rápidas y seguras.

- Se reforzó el uso de la documentación técnica como pilar del proyecto, asegurando mantenibilidad y escalabilidad.

- Se consolidó el trabajo colaborativo mediante GitHub Projects e Issues, mejorando la organización y trazabilidad.

- **Porcentaje de completado del proyecto:** 90%.

---

## Acciones a tomar para los siguientes sprints
**Dado que lo próximo es la fase de lanzamiento del proyecto, se plantean las siguientes acciones:**

- Preparar la entrega final del proyecto con todo el contenido necesario.

- Realizar pruebas exhaustivas de la aplicación en todos los módulos.

- Cierre de documentación: branding, métricas, APIs, plan de contingencia.

- Plan de tracción de usuarios reales, analizando los primeros datos recogidos.

- Monitorizar rendimiento y errores antes del despliegue oficial.

- Recolectar feedback final de usuarios piloto y sintetizar mejoras post-lanzamiento.

---

Este documento refleja el trabajo realizado durante el sprint y las mejoras a implementar para los siguientes ciclos de desarrollo.

