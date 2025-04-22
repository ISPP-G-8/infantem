# Informe de lecciones aprendidas - Sprint 1

![Portada](../../images/Infantem.png)


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
- David Fuentelsaz Rodríguez
- Enrique García Abadía
- Paula Luna Navarro: Revisó el documento.


## Índice
- [Introducción](#introduccion)
- [Análisis de condiciones de fallo](#analisis-condiciones-fallo)
- [Listado de problemas](#listado-problemas)
- [Metodología de desarrollo y roles del equipo](#metodologia-roles-equipo)
- [Análisis de los problemas](#analisis-problemas)

## Introducción
Este documento recoge un análisis detallado de las condiciones de fallo detectadas en el entregable del Sprint 1, así como las acciones planteadas para resolverlas y prevenir que se repitan en futuros sprints.


## Análisis de condiciones de fallo

Durante la revisión del segundo entregable se identificaron incumplimientos en la condicion T-10, de acuerdo con los criterios establecidos en el documento oficial “Deliverable Failure Conditions v2.1”.


#### Condición T-10 – Fallos en el software entregado

El sistema entregado incurrió en varios errores funcionales que vulneran distintas subcondiciones de la condición T-10, todas relacionadas con la calidad del software y su comportamiento en producción. Segun lo indicado por el profesorado, no fueron capaces de ejecutar ninguna de las acciones indicadas como casos de uso en el documento revision.md del Sprint 1.

En concreto, se detectaron fallos vinculados a:

- Interacciones legales con el sistema que provocan errores HTTP.
- Comportamientos no esperados en funcionalidades clave.
- Ausencia de validaciones en formularios con datos obligatorios.
- Problemas relacionados con el despliegue, incluyendo la falta de elementos requeridos tras la fecha de entrega.

Estos errores serán descritos con mayor nivel de detalle en la sección correspondiente al listado de errores.

##  Lista de errores y su relación con las condiciones de fallo

A continuación, se recoge un listado de los errores detectados en relación con la condicion de fallo T-10, organizados según el momento en que fueron identificados y por quién.

### Errores identificados por el equipo **antes** de la entrega:

- El sistema de pago no estaba completamente configurado para funcionar con tarjetas reales, pero no se documentó adecuadamente esta limitación.
- Algunos campos mostraban datos en formatos incoherentes en la interfaz (como la fecha del bebé).


### Errores identificados por el equipo **después** de la entrega:

- El vídeo de demostración no era accesible desde la rama `main` ni estaba vinculado a un `tag`.
- Faltaban validaciones en formularios que provocaban errores HTTP no controlados.
- Algunas vistas importantes no contenían datos visuales (por ejemplo, imágenes en las recetas).

### Errores identificados por el **revisor del entregable (profesor)**:

- El archivo `revision.md` no incluía una explicación detallada de los casos de uso ni una vinculación clara con las interacciones reales del software.
- Error HTTP 400 al introducir una edad máxima inválida, sin mensaje de error visible.
- Imposibilidad de editar recetas una vez creadas.
- Formulario de edición del perfil permite correos con formato incorrecto, generando errores en consola.
- En el formulario de alérgenos no se puede identificar a cuál se refiere cada campo.
- Fallo en la prueba de pago: el sistema rechaza la tarjeta de prueba utilizada en entorno real.
- La interfaz de la pasarela de pago no se visualiza correctamente.
- El vídeo no fue accesible ni entregado conforme a las normas establecidas (tag y rama `main`).

Cada uno de estos errores será analizado en profundidad en la siguiente sección.

## 3. Metodología de desarrollo y roles del equipo

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

- **Jefes de Grupo**: Encargados de distribuir tareas, asistir a reuniones de coordinación y supervisar el progreso dentro de su equipo:
  - **Frontend**: Felipe Solís Agudo  
  - **Backend**: Josué Rodríguez López  
  - **Full-Stack**: Daniel del Castillo Piñero  
  - **QA e Ingeniería de pruebas**: Enrique García Abadía  
  - **Documentación**: Paula Luna Navarro

- **Vocales**: Representantes del grupo en reuniones específicas, encargados de trasladar la información al resto del equipo:
  - Álvaro Jiménez Osuna (Frontend)  
  - Felipe Solís Agudo (Frontend)  
  - Josué Rodríguez López (Backend)  
  - David Fuentelsaz Rodríguez (Backend)  
  - Paula Luna Navarro (Documentación)  
  - Enrique García Abadía (QA)  
  - Javier Santos Martín (QA)  
  - Luis Giraldo Santiago (Full-Stack)

---

### Grupos funcionales

#### Frontend
- **Jefe de grupo**: Felipe Solís Agudo  
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
- **Jefe de grupo**: Josué Rodríguez López  
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
- **Jefe de grupo y vocal**: Daniel del Castillo Piñero  
- **Miembros**:  
  - Daniel del Castillo Piñero  
  - Luis Giraldo Santiago

#### QA e Ingeniería de Pruebas
- **Jefe de grupo y vocal**: Enrique García Abadía  
- **Vocal adicional**: Javier Santos Martín  
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
- **Jefa de grupo y vocal**: Paula Luna Navarro  
- **Miembros**:  
  - Paula Luna Navarro  
  - José María Morgado Prudencio  
  - Lucía Noya Cano  
  - Ángela López Oliva  
  - Javier Ulecia García

## 4. Análisis individual de errores

### Error 1: Imposibilidad de editar recetas una vez creadas

- **Origen técnico**: Aunque la funcionalidad de edición de recetas estaba implementada, los botones de editar y eliminar no se mostraban en la interfaz debido a un fallo en la lógica de visibilidad asociada a la propiedad `isOwned`. Este valor determinaba si una receta pertenecía al usuario o no, pero al activarlo correctamente, los botones desaparecían incluso para las recetas propias. Como consecuencia, no era posible acceder a la edición desde la interfaz.

- **Origen en el proceso**: Se detectó el fallo en la lógica de visibilidad cerca de la fecha de entrega y no se resolvió a tiempo.

- **Fuente del error**: David Vargas Muñiz, responsable directo de la implementación de esta funcionalidad.

- **Responsable(s)**: Grupo de frontend, por no resolver el problema de visibilidad de los botones de edición pese a haberlo identificado antes de la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Corregir la lógica de visibilidad basada en `isOwned` para asegurar que los botones se muestren únicamente cuando el usuario sea el propietario de la receta. 
  
  - **De proceso**: Añadir casos de uso relacionados con permisos y control de visibilidad en el checklist de QA. Verificar funcionalidad completa (visual y lógica) para acciones restringidas según usuario.

- **Estado del error**: En progreso  
  - **Justificación**: La funcionalidad está implementada, pero requiere ajustes en la lógica de visibilidad para que esté correctamente operativa.





