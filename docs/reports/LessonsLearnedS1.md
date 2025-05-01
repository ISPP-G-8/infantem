# Informe de lecciones aprendidas - Sprint 1

![Portada](../images/Infantem.png)

**Fecha:** 19/04/2025  
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

- David Fuentelsaz Rodríguez: Elaboró el documento.
- Enrique García Abadía: Elaboró el documento.
- Paula Luna Navarro: Revisó el documento.
- Daniel del Castillo Piñero: Revisó el documento.
- Josué Rodríguez López: Revisó el documento.
- Felipe Solís Agudo: Revisó el documento.
- Luis Giraldo Santiago: Revisó el documento.

## Índice

- [Introducción](#1-introducción)
- [Análisis de condiciones de fallo](#2-análisis-de-condiciones-de-fallo)
- [Listado de problemas](#3-lista-de-errores-y-su-relación-con-las-condiciones-de-fallo)
- [Metodología de desarrollo y roles del equipo](#4-metodología-de-desarrollo-y-roles-del-equipo)
- [Análisis de los problemas](#5-análisis-individual-de-errores)
- [Conclusión](#6-conclusiones)

## 1. Introducción

Este documento recoge un análisis detallado de las condiciones de fallo detectadas en el entregable del Sprint 1, así como las acciones que se planteadas para resolverlas.

## 2. Análisis de condiciones de fallo

Durante la revisión del segundo entregable se identificaron incumplimientos en la condición T-10, de acuerdo con los criterios establecidos en el documento oficial “Deliverable Failure Conditions v2.1”.

#### Condición T-10 – Fallos en el software entregado

El sistema entregado incurrió en varios errores funcionales que vulneran distintas subcondiciones de la condición T-10, todas relacionadas con la calidad del software y su comportamiento en producción. Según lo indicado por el profesorado, no fueron capaces de ejecutar ninguna de las acciones indicadas como casos de uso en el documento revision.md del Sprint 1.

En concreto, se detectaron fallos vinculados a:

- Interacciones legales con el sistema que provocan errores HTTP.
- Comportamientos no esperados en funcionalidades clave.
- Ausencia de validaciones en formularios con datos obligatorios.
- Problemas relacionados con el despliegue, incluyendo la falta de elementos requeridos tras la fecha de entrega.

Estos errores serán descritos con mayor nivel de detalle en la sección correspondiente al listado de errores.

## 3. Lista de errores y su relación con las condiciones de fallo

A continuación, se recoge un listado de los errores detectados en relación con la condición de fallo T-10, organizados según el momento en que fueron identificados y por quién.

### Errores identificados por el equipo **antes** de la entrega:

- Las recetas registradas no se muestran correctamente en el buscador.
- La pestaña de recetas favoritas no muestra nada.
- Varias URI de la aplicación fueron hard codeadas en el frontend y algunas no se corrigieron antes de la entrega.

### Errores identificados por el equipo **después** de la entrega:

- La versión del despliegue disponible para la corrección no era la adecuada.

### Errores identificados por el **revisor del entregable (profesor)**:

- Imposibilidad de registrar bebés.
- Las validaciones de formularios no ofrecían información de los errores.
- En el formulario de alergenos no se comprende correctamente a que bebe va dirigido.
- Imposibilidad de dar de alta recetas.

Más adelante se explicara el porqué de la aparición de estos últimos errores detectados por el revisor del entregable.

Cada uno de estos errores será analizado en profundidad en la sección 4.

## 4. Metodología de desarrollo y roles del equipo

Durante el Sprint 1 se siguió una metodología de trabajo basada en **Scrum**, adaptada a la dinámica del grupo. Las principales actividades fueron:

- **Sprint Planning** al inicio, donde se definieron objetivos, tareas y su asignación.
- **Reunión intermedia de seguimiento**, en la que se revisó el estado del sprint y se aplicaron medidas correctivas si eran necesarias.
- **Sprint Review** al final, para revisar colectivamente el trabajo desarrollado.
- **Sprint Retrospective** para analizar aciertos y aspectos de mejora del equipo.

### Organización del equipo

El equipo "Infantem" está formado por 17 miembros, distribuidos en subgrupos según su especialización. La estructura organizativa incluye:

- **Directores de Proyecto**:

  - **Luis Giraldo Santiago**
  - **Daniel del Castillo Piñero**  
    Responsables de la planificación general, definición de tareas y coordinación entre grupos.

- **Vocales de Grupos**: Encargados de distribuir la información en los grupos de trabajo y representantes de los mismos en reuniones específicas:

  - **Frontend**: Felipe Solís Agudo, Álvaro Jiménez Osuna
  - **Backend**: Josué Rodríguez López, David Fuentelsaz Rodríguez
  - **Full-Stack**: Daniel del Castillo Piñero, Luis Giraldo Santiago
  - **QA e Ingeniería de pruebas**: Enrique García Abadía
  - **Documentación**: Paula Luna Navarro

---

### Grupos funcionales

#### Frontend

- **Vocales**: Álvaro Jiménez Osuna, Felipe Solís Agudo
- **Miembros**:
  - Álvaro Jiménez Osuna
  - Enrique García Abadía
  - Ángela López Oliva
  - Felipe Solís Agudo
  - David Vargas Muñiz
  - Antonio Jiménez Ortega
  - Javier Santos Martín

#### Backend

- **Vocales**: Josué Rodríguez López, David Fuentelsaz Rodríguez
- **Miembros**:
  - David Fuentelsaz Rodríguez
  - Javier Ulecia García
  - José García de Tejada Delgado
  - José María Morgado Prudencio
  - Josué Rodríguez López
  - Miguel Galán Lerate
  - Lucía Noya Cano
  - Paula Luna Navarro

#### Full-Stack

- **Miembros y Vocales**:
  - Daniel del Castillo Piñero
  - Luis Giraldo Santiago

#### QA e Ingeniería de Pruebas

- **Vocales**: Enrique García Abadía, Javier Santos Martín
- **Miembros**:
  - Enrique García Abadía
  - Antonio Jiménez Ortega
  - Felipe Solís Agudo
  - Álvaro Jiménez Osuna
  - David Vargas Muñiz
  - Javier Santos Martín
  - David Fuentelsaz Rodríguez
  - José García de Tejada Delgado
  - Josué Rodríguez López
  - Miguel Galán Lerate

#### Documentación

- **Vocal**: Paula Luna Navarro
- **Miembros**:
  - Paula Luna Navarro
  - José María Morgado Prudencio
  - Lucía Noya Cano
  - Ángela López Oliva
  - Javier Ulecia García

## 5. Análisis individual de errores

Para una mejor comprensión, los errores se agrupan en tres grandes categorías: aquellos derivados de problemas en el despliegue, planificación y otros de índole funcional. Esta clasificación responde al análisis del feedback recibido, que señala que durante la corrección el despliegue no contaba con la versión que correspondía con el tag de la entrega, lo cual generó múltiples fallos funcionales.

Tras verificar el tag correspondiente al despliegue del Sprint 1 y probar su funcionamiento en condiciones controladas, se concluye que probablemente el fallo se debió a un error en el despliegue, ya que actualmente dicha versión opera correctamente.

### Error 1: Las recetas registradas no se muestran en el buscador

- **Origen técnico**: La interfaz no muestra recetas registradas por el usuario ni recetas predefinidas.
- **Origen en el proceso**: Detectado antes de la entrega, no se resolvió por falta de tiempo.
- **Fuente**: Felipe Solís Agudo.
- **Responsables**: Equipo de Frontend.
- **Acciones de mitigación**:
  - _Técnica_: Establecer correctamente la comunicación con el backend para recuperar recetas del usuario.
  - _Proceso_: Priorizar mejor las tareas para evitar exclusiones de funcionalidad crítica.
- **Estado**: Resuelto.

### Error 2: Pestaña de recetas favoritas sin funcionalidad

- **Origen técnico**: La vista queda cargando infinitamente al acceder.
- **Origen en el proceso**: Detectado antes de la entrega.
- **Fuente**: Equipo de Frontend.
- **Responsables**: Equipo de Frontend.
- **Acciones de mitigación**:
  - _Técnica_: Implementar lógica y visualización de recetas favoritas.
  - _Proceso_: Garantizar la asignación de todas las tareas planificadas al inicio del sprint.
- **Estado**: Resuelto.

### Error 3: URIs codificadas de forma fija en el frontend

- **Origen técnico**: Presencia de enlaces codificados manualmente.
- **Origen en el proceso**: Detectado antes de la entrega.
- **Fuente**: Equipo de Frontend.
- **Responsables**: Equipo de Frontend.
- **Acciones de mitigación**:
  - _Técnica_: Eliminar referencias hardcoded y utilizar configuraciones dinámicas.
  - _Proceso_: Incrementar la revisión de código y control de calidad previo a entregas.
- **Estado**: Resuelto.

### Error 4: Problemas en el despliegue

- **Origen técnico**: El sistema desplegado no correspondía con la versión adecuada.
- **Origen en el proceso**: Detectado inmediatamente tras la entrega.
- **Fuente**: Miguel Galán Lerate.
- **Responsables**: Miguel Galán Lerate y equipo de desarrollo.
- **Acciones de mitigación**:
  - _Técnica_: Reemplazar la versión desplegada por la correspondiente al tag correcto.
  - _Proceso_: Establecer una revisión final del despliegue antes de cada entrega.
- **Estado**: Resuelto.

#### Error 4.1: Imposibilidad de registrar bebés

- **Origen técnico**: El formulario de alta de bebés no enviaba correctamente los datos al backend.
- **Origen en el proceso**: Detectado por el revisor del entregable.
- **Fuente**: Revisión docente.
- **Responsables**: Equipo de Backend.
- **Acciones de mitigación**:
  - _Técnica_: Corregir la lógica de backend y asegurar la persistencia de datos.
  - _Proceso_: Verificar exhaustivamente los formularios críticos antes de la entrega.
- **Estado**: Resuelto.

#### Error 4.2: Falta de validación con mensajes claros

- **Origen técnico**: Formularios sin retroalimentación adecuada para el usuario ante errores.
- **Origen en el proceso**: Detectado por el revisor del entregable.
- **Fuente**: Revisión docente.
- **Responsables**: Equipo de Frontend.
- **Acciones de mitigación**:
  - _Técnica_: Incluir validaciones visuales y mensajes informativos.
  - _Proceso_: Integrar pruebas de experiencia de usuario antes de cada entrega.
- **Estado**: Resuelto.

#### Error 4.3: Confusión en el formulario de alérgenos

- **Origen técnico**: El formulario no indicaba de forma clara a qué bebé se refería.
- **Origen en el proceso**: Detectado por el revisor del entregable.
- **Fuente**: Revisión docente.
- **Responsables**: Equipos de Backend y Frontend.
- **Acciones de mitigación**:
  - _Técnica_: Añadir identificación explícita del bebé asociado.
  - _Proceso_: Ampliar las pruebas funcionales desde una perspectiva del usuario.
- **Estado**: Resuelto.

#### Error 4.4: Imposibilidad de dar de alta recetas

- **Origen técnico**: La funcionalidad no estaba correctamente implementada o generaba errores.
- **Origen en el proceso**: Detectado por el revisor del entregable.
- **Fuente**: Revisión docente.
- **Responsables**: Equipo de Backend.
- **Acciones de mitigación**:
  - _Técnica_: Revisar e implementar correctamente el flujo de alta de recetas.
  - _Proceso_: Priorizar funcionalidades esenciales desde los primeros días del sprint.
- **Estado**: Resuelto.

### Error 5: Problemas de planificación y organización

#### Error 5.1: Desglose de tareas ineficiente
- **Origen técnico**: las tareas fueron divididas en desarrollo, testeo y comprobación de calidad, cada una de estos pasos asociados a una persona distinta. Esto generó que el equipo no tuviera una visión global de la tarea e interrupciones constantes en el proceso de desarrollo, ya que cada miembro del equipo no podía avanzar en la tarea hasta que el anterior no la había terminado. Como consecuencia, hubo momentos en los que gran parte del equipo estaba parado a la espera de que el anterior terminara su parte.
- **Origen en el proceso**: Detectado antes de la entrega.
- **Fuente**: Equipo de Vocales y Directores de Proyecto.
- **Responsables**: Directores de Proyecto.
- **Acciones de mitigación**:
  - _Técnica_: no aplica.
  - _Proceso_: formar parejas de trabajo para asegurar que el desarrollo de las tareas críticas no se vea afectado por la falta de disponibilidad de un miembro del equipo y asignar tareas de desarrollo y testeo a la misma pareja.
- **Estado**: Resuelto.

#### Error 5.2: Tareas no asignadas correctamente

- **Origen técnico**: Las tareas del primer sprint fueron asignadas de forma unilateral por los directores del proyecto en un contexto en el que el equipo no estaba acostumbrado a trabajar de forma conjunta y sin conocer el nivel de habilidad técnica de cada miembro. Como consecuencia, se asignaron tareas más complejas a miembros del equipo que no tenían la experiencia suficiente para llevarlas a cabo, lo que generó retrasos en el desarrollo y problemas de calidad en el entregable obligando a dedicar recursos a refactorizar el código.
- **Origen en el proceso**: Detectado antes de la entrega.
- **Fuente**: Equipo de Vocales y Directores de Proyecto.
- **Responsables**: Directores de Proyecto.
- **Acciones de mitigación**:
  - _Técnica_: no aplica.
  - _Proceso_: las tareas las asignarán los vocales de cada grupo que están más familiarizados con la eficacia de cada miembro del equipo.
- **Estado**: Resuelto.

## 6. Conclusiones

Durante el Sprint 1 se evidenciaron múltiples errores funcionales y técnicos que comprometieron seriamente la calidad percibida del entregable. A pesar de que muchos de estos errores fueron detectados y corregidos posteriormente, la causa principal del suspenso fue el fallo en el despliegue de la aplicación.

El sistema evaluado por el profesorado no coincidía con la versión correcta indicada por el tag de entrega. Esto impidió que se ejecutaran los casos de uso básicos y provocó la aparición de errores que no estaban presentes en la versión esperada. Como resultado, gran parte del trabajo funcional completado por el equipo no pudo ser valorado adecuadamente.

Este incidente pone de manifiesto la necesidad urgente de establecer mecanismos más rigurosos de revisión y control en el proceso de despliegue, especialmente en los momentos previos a una entrega. Asimismo, resalta la importancia de validar en condiciones reales todas las funcionalidades clave, asegurando que el entorno productivo sea representativo del estado real del desarrollo.

Para próximos sprints, el equipo ha tomado conciencia de estas deficiencias y se ha comprometido a aplicar medidas correctivas tanto a nivel técnico como organizativo, con el fin de garantizar entregas más estables, verificadas y alineadas con los criterios de evaluación.
