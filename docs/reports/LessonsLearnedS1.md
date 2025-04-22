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

- Las recetas registradas no se muestran correctamente en el buscador.
- La pestaña de recetas favoritas no muestra nada.
- Varias URI de la aplicacion fueron hard codeadas en el frontend y algunas no se corrigieron antes de la entrega.


### Errores identificados por el equipo **después** de la entrega:

- La version del despliegue disponible para la correccion no era la adecuada.

### Errores identificados por el **revisor del entregable (profesor)**:

- Imposibilidad de registrar bebes
- Validaciones de formularios no ofrecían informacion de los errores.
- En el fromulario de alergenos no se comprende correctamente a que bebe va dirijido.
- Imposibilidad de dar de alta recetas

Mas adelante se explicara el porque de la aparicion de estos ultimos errores detectados por el revisor del entregable.

Cada uno de estos errores será analizado en profundidad en la sección 4.

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

Para analizar los errores encontrados en este Sprint podemos casificarlos en dos clases, errores provocados por problemas en el despliegue y otro tipo de errores. Se a decidido usar esta clasificacion ya que despues de analizar el feedback obtenido por los profesores en la revision, se ha llegado a la conclusion de que en el momento de la correccion, la base de datos del despliegue estaba caida y por eso han surgido gran cantidad de errores en la correccion.

Ademas para comprobar esto, se ha usado el tag del despliegue que se entrego en el Sprint 1 y se han probado todas las funcionalidades disponibles de la aplicación en aquel momento. Despues de probar el despliegue, se ha confirmado que casi con total certeza existio un problema a la hora de desplegar porque actualmenet funciona correctamente el despliegue del Sprint 1.

### Error 1: Las recetas registradas no se muestran correctamente en el buscador.

- **Origen técnico**: En la pantalla de recetas no se muestra ninguna receta por defecto de la aplicacion ni las registradas por el usuario.

- **Origen en el proceso**: Se detecto este error antes de la entrega, no pudiendo resolverlo por falta tiempo y priorización de otras tareas.

- **Fuente del error**: Felipe Solis Agudo, persona asignada a la tarea de implementacion de recomendacion de recetas en frontend.

- **Responsable(s)**: Equipo de frontend por no organizar las tareas de forma eficiente para llegar a los objetivois marcados en el Sprint 1.

- **Acciones de mitigación**:
  - **Técnica**: Implementar en la vista de recetas una conexion con el backend en la que se pida la informacion de las recetas del usuario para mostrarselas. 
  
  - **De proceso**: Mejorar la organizacion de las tareas para no tener que descartar tareas y priorizar otras, generando errores o falta de funcionalidad en la aplicación.

- **Estado del error**: Resuelto.

### Error 2: Pestaña de recetas favoritas.

- **Origen técnico**: Cuando se pulsa el boton de recetas favoritas, se te redirije a una pantalla la cual se mantiene cargando de forma indefinida.

- **Origen en el proceso**: Se detecto este error antes de la entrega a la hora de probar la aplicación.

- **Fuente del error**: Equipo de Frontend.

- **Responsable(s)**: Equipo de Frontend por no asignar esta tarea a nadie en el Sprint 1, imposibilitando su desarrollo.

- **Acciones de mitigación**:
  - **Técnica**: Implementar la vista de recetas favoritas, ademas de poder añadir una propiedad a las recetas para ponerlas en favoritos. 
  
  - **De proceso**: Asegurarse al inicio del Sprint que las tareas que se han fijado esten asignadas a algun miembro del equipo.

- **Estado del error**: Resuelto.

### Error 3: URIs hard codeadas en Frontend.

- **Origen técnico**: Algunas de las URIs de la aplicacion se hard codearon en las pestañas del frontend. Durante la revision previa al despliegue de la aplicacion, se detectaron que algunas de estas URIs aun seguian hard codeadas.

- **Origen en el proceso**: Se detecto este error antes de la entrega, no pudiendo resolverlo por falta tiempo.

- **Fuente del error**: Equipo de Frontend.

- **Responsable(s)**: Equipo de frontend por no asegurarse de eliminar los datos hard codeados en el Frontend previamente de la entrega del Sprint 1

- **Acciones de mitigación**:
  - **Técnica**: Eliminar todos los dtos que se encentren hard codeados en culquier pestaña del frontend. 
  
  - **De proceso**: Asegurarse de asignar mas personas para revisar el codigo generado, para prevenir este tipo de errores.

- **Estado del error**: Resuelto.

### Error 4: Las recetas registradas no se muestran correctamente en el buscador.

- **Origen técnico**: En la pantalla de recetas no se muestra ninguna receta por defecto de la aplicacion ni las registradas por el usuario.

- **Origen en el proceso**: Se detecto este error antes de la entrega, no pudiendo resolverlo por falta tiempo y priorización de otras tareas.

- **Fuente del error**: Felipe Solis Agudo, persona asignada a la tarea de implementacion de recomendacion de recetas en frontend.

- **Responsable(s)**: Equipo de frontend por no organizar las tareas de forma eficiente para llegar a los objetivois marcados en el Sprint 1.

- **Acciones de mitigación**:
  - **Técnica**: Implementar en la vista de recetas una conexion con el backend en la que se pida la informacion de las recetas del usuario para mostrarselas. 
  
  - **De proceso**: Mejorar la organizacion de las tareas para no tener que descartar tareas y priorizar otras, generando errores o falta de funcionalidad en la aplicación.

- **Estado del error**: Resuelto.

### Errores del despliegue

- **Origen técnico**: Casi la totalidad de los casos de uso de la aplicacion no pudieron ser probados por el profesorado ya que a la hora de desplegar, se desplego una version que no correspondia con la que deberia ser entregada en el Sprint 1, generando esto errores no esperados.

- **Origen en el proceso**: Se detectó el fallo en el despliegue justo despues de realizar la entrega y no se pudo solucionar para la entrega del Sprint 1.

- **Fuente del error**: Miguel Galán Lerate, responsable de la gestion del despliegue de la aplicación.

- **Responsable(s)**: Miguel Galán Lerate, por desplegar una version de la aplicacion erronea. Ademas el equipo de desarrollo deberia de haber revisado lo desplegado antes de realizar la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Cambiar la version del despliegue por la que corresponde con el tag adecuado para la entrega. 
  
  - **De proceso**: Asignar a un grupo de personas que se encarguen antes de las entregas de revisar que version de la aplicacion se despliega y que todo funcione como deberia.

- **Estado del error**: Resuelto.






