# Informe de lecciones aprendidas - Sprint 2

![Portada](../images/Infantem.png)


**Fecha:** 18/04/2025  
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
- [Introducción](#introducción)
- [Análisis de condiciones de fallo](#análisis-de-condiciones-de-fallo)
- [Listado de errores](#listado-de-errores)
- [Metodología de desarrollo y roles del equipo](#metodología-de-desarrollo-y-roles-del-equipo)
- [Análisis individual de errores](#4-análisis-individual-de-errores)

## Introducción
Este documento recoge un análisis detallado de las condiciones de fallo detectadas en el entregable del Sprint 2, así como las acciones planteadas para resolverlas y prevenir que se repitan en futuros sprints.


## Análisis de condiciones de fallo

Durante la revisión del segundo entregable se identificaron incumplimientos en las condiciones T-9 y T-10, de acuerdo con los criterios establecidos en el documento oficial “Deliverable Failure Conditions v2.1”.


#### Condición T-9 – Incorrecta entrega del entregable

Los errores asociados a esta condición están directamente relacionados con el contenido del archivo `revision.md`, que debía recoger información clave para guiar la evaluación del entregable. En concreto, se identificaron los siguientes problemas:

- Las interacciones con los casos de uso se reducen a un simple listado, sin incluir una explicación detallada de cada uno.
- No se incluyeron los datos necesarios para probar correctamente la pasarela de pago (tarjeta de prueba, CVC y fecha de caducidad).
- El vídeo de demostración fue subido al repositorio, pero no se podía visualizar correctamente y no estaba presente en la rama `main` con el correspondiente `tag`, tal y como exigen las normas.

#### Condición T-10 – Fallos en el software entregado

El sistema entregado incurrió en varios errores funcionales que vulneran distintas subcondiciones de la condición T-10, todas relacionadas con la calidad del software y su comportamiento en producción.

En concreto, se detectaron fallos vinculados a:

- Interacciones legales con el sistema que provocan errores HTTP.
- Comportamientos no esperados en funcionalidades clave.
- Ausencia de validaciones en formularios con datos obligatorios.
- Problemas relacionados con el despliegue, incluyendo la falta de elementos requeridos tras la fecha de entrega.

Estos errores serán descritos con mayor nivel de detalle en la sección correspondiente al análisis individual de errores.

##  Listado de errores

A continuación, se recoge un listado de los errores detectados en relación con las condiciones de fallo T-9 y T-10, organizados según el momento en que fueron identificados y por quién.

### Errores identificados por el equipo **antes** de la entrega:

- Imposibilidad de editar recetas una vez creadas.


### Errores identificados por el equipo **después** de la entrega:

- Algunos campos mostraban datos en formatos incoherentes en la interfaz (como la fecha de nacimiento del bebé).
- La interfaz de la pasarela de pago no se visualiza correctamente (superposición entre número de tarjeta y fecha de caducidad).

- El vídeo de demostración no era accesible desde la rama `main` ni estaba vinculado a un `tag`.
- Faltaban validaciones en formularios que provocaban errores HTTP no controlados (por ejemplo, fecha de nacimiento de los bebés).
- Algunas vistas importantes no contenían datos visuales (por ejemplo, imágenes en las recetas).

### Errores identificados por el **revisor del entregable (profesor)**:

- El archivo `revision.md` no incluía una explicación detallada de los casos de uso ni una vinculación clara con las interacciones reales del software.
- Error HTTP 400 al introducir una edad máxima de `9999` en el campo de creación de recetas.
- Imposibilidad de editar recetas una vez creadas.
- Formulario de edición del perfil permite correos con formato incorrecto, generando errores en consola.

- En el formulario de alérgenos no se puede identificar a qué bebé se refiere.
- Fallo en la prueba de pago: el sistema rechaza la tarjeta de prueba utilizada en entorno real.
- La interfaz de la pasarela de pago no se visualiza correctamente.
- El vídeo no fue accesible ni entregado conforme a las normas establecidas (tag y rama `main`).

> Nota: Algunos errores aparecen en más de una categoría porque fueron detectados tanto por el equipo tras la entrega como por el revisor del entregable. Esto indica que no fueron corregidos a tiempo pese a haber sido identificados internamente.


## Metodología de desarrollo y roles del equipo

Durante el Sprint 2 se siguió una metodología de trabajo basada en **Scrum**, adaptada a la dinámica del grupo. Las principales actividades fueron:

- **Sprint Planning** al inicio, donde se definieron objetivos, tareas y su asignación.
- **Reunión intermedia de seguimiento**, en la que se revisó el estado del sprint y se aplicaron medidas correctivas si eran necesarias.
- **Sprint Review** al final, para revisar colectivamente el trabajo desarrollado.
- **Sprint Retrospective** para analizar aciertos y aspectos de mejora del equipo.

### Organización del equipo

El equipo de trabajo está formado por 17 miembros, distribuidos en subgrupos según su especialización. La estructura organizativa incluye:

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
- **Jefe de grupo y vocal**: Felipe Solís Agudo  
- **Vocal adicional**: Álvaro Jiménez Osuna  
- **Miembros**:  
  - Álvaro Jiménez Osuna  
  - Enrique García Abadía  
  - Ángela López Oliva  
  - Felipe Solís Agudo  
  - David Vargas Muñiz  
  - Antonio Jiménez Ortega  
  - Javier Santos Martín

#### Backend
- **Jefe de grupo y vocal**: Josué Rodríguez López  
- **Vocal adicional**: David Fuentelsaz Rodríguez  
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

- **Estado del error**: Resuelto.

### Error 2: El sistema de pago estaba configurado en modo real durante la entrega, sin que se documentara esta configuración

- **Origen técnico**: La pasarela de pago se encontraba activa en modo real (`live`) en el momento de la entrega. Sin embargo, el evaluador utilizó una tarjeta de pruebas, lo que provocó el rechazo de la transacción con el mensaje: *“Se ha rechazado tu tarjeta. La solicitud se ha hecho en el modo real, pero nos consta que has usado una tarjeta de prueba.”* Esto evidencia que el sistema no fue configurado para entorno de test en un contexto donde así se esperaba.

- **Origen en el proceso**: No se realizó una verificación final del entorno de ejecución ni se documentó que la pasarela estaba funcionando en modo real. 

- **Fuente del error**: Luis Giraldo Santiago (responsable de la integración del sistema de pago).

- **Responsable(s)**: Equipo de QA (por no validar el entorno de pago antes de la entrega) y equipo de documentación (por no reflejar esta información en el entregable).

- **Acciones de mitigación**:
  - **Técnica**: Verificar que el entorno de pago esté correctamente ajustado para pruebas (`sandbox`) durante fases de evaluación. 
  - **De proceso**: Incluir en la checklist de revisión final la validación del entorno de pago activo y su documentación clara en el entregable. Coordinar QA y documentación para asegurar que esta información se comunique de forma explícita.

- **Estado del error**: Resuelto.

### Error 3: La interfaz de la pasarela de pago no se visualiza correctamente

- **Origen técnico**: Durante el proceso de pago, al introducir el número de tarjeta completo, este se superponía visualmente con el campo de fecha de caducidad. Este fallo de estilo provocaba una interfaz confusa y poco usable, afectando directamente a la claridad del proceso de pago y a la experiencia del usuario. El error se debía a una falta de ajuste en los estilos del componente de la pasarela, que no redistribuía correctamente los elementos al recibir la entrada.

- **Origen en el proceso**: No se realizaron pruebas de estilo en profundidad tras la integración de la pasarela de pago. Esta vista no fue validada visualmente en distintos estados de interacción, y no se incluyó en el protocolo de revisión final.

- **Fuente del error**: Luis Giraldo Santiago y Antonio Jiménez Ortega, responsables de la implementación del pago en frontend.

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas, por no detectar este error visual antes de la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Ajustar las propiedades del componente utilizado para el formulario de pago, asegurando que cada campo ocupe el espacio necesario sin interferencias. Comprobar el comportamiento en distintos tamaños de pantalla y situaciones de entrada.
  - **De proceso**: Incluir revisiones visuales detalladas de componentes críticos como el pago en el checklist de QA. Validar tanto la funcionalidad como la presentación en distintos navegadores o resoluciones.

- **Estado del error**: Resuelto. 

### Error 4: Edición de bebé: la fecha de nacimiento se muestra en formato `2023,3,1` en modo edición y `202331` en el listado

- **Origen técnico**: El valor de la fecha de nacimiento del bebé se manejaba de forma inconsistente entre distintas vistas. En el formulario de edición se cargaba con el formato `2023,3,1`, mientras que en el listado se mostraba como un string concatenado (`202331`), sin separación de componentes ni formato reconocible. No se aplicó ninguna conversión ni normalización del dato al mostrarlo.

- **Origen en el proceso**: No se realizaron pruebas de visualización completas sobre esta funcionalidad antes de la entrega.

- **Fuente del error**: Grupos de frontend y backend, por la forma en que se renderizaba y enviaba la información respectivamente.

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas. 

- **Acciones de mitigación**:
  - **Técnica**: Asegurar que todos los valores de tipo fecha se convierten al formato ISO `yyyy-mm-dd` antes de mostrarlos en pantalla. 
  - **De proceso**: Añadir revisión visual obligatoria de formularios y listados en el checklist de QA.

- **Estado del error**: Resuelto.   

### Error 5: El vídeo de demostración no era accesible desde la rama `main` ni estaba vinculado a un `tag`

- **Origen técnico**: Aunque el vídeo fue subido al repositorio el mismo día de la entrega, no quedó accesible desde el `tag` `v2.0.0`, el cual era el punto de referencia oficial para la evaluación. El archivo estaba incluido en un commit correcto, pero tras resolver un conflicto, ese contenido no quedó visible desde la versión etiquetada.

- **Origen en el proceso**: No se realizó una validación posterior a la creación del `tag` para asegurar que el vídeo estuviera correctamente accesible desde la rama `main`. Tampoco se comprobó de forma colectiva que el vídeo cumpliera con los criterios establecidos.

- **Fuente del error**: Antonio Jiménez Ortega (responsable de subir el vídeo al repositorio).

- **Responsable(s)**: Todo el equipo, por no verificar en conjunto la accesibilidad del vídeo como parte del proceso de revisión final antes de la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Verificar manualmente que los archivos obligatorios estén presentes y accesibles en la rama `main` y en el `tag` de entrega. Comprobar la funcionalidad del enlace o archivo multimedia.
  - **De proceso**: Incluir en el checklist de entrega la validación explícita de todos los archivos requeridos por parte de QA y del responsable asignado. Establecer una revisión final del repositorio justo después de crear el `tag`.

- **Estado del error**: Resuelto.  


### Error 6: Error 400 al introducir una fecha de nacimiento futura en el formulario del bebé, sin validación previa ni mensaje visible

- **Origen técnico**: Los formularios de creación y edición del bebé permitían introducir una fecha de nacimiento en el futuro. Esta entrada, al enviarse al backend, resultaba en un error HTTP 400 con un mensaje de respuesta indicando que la fecha era inválida. Sin embargo, el frontend no realizaba ninguna validación previa ni mostraba el mensaje de error recibido, por lo que el usuario no recibía retroalimentación alguna.

- **Origen en el proceso**: No se gestionó adecuadamente los errores devueltos por el servidor 
debido a que no se probó a introducir una fecha de nacimiento en el futuro en los formularios de creación y edición de bebés.

- **Fuente del error**: Grupo de frontend (falta de validación y gestión de errores en la interfaz) y backend (respuesta técnica correcta pero sin coordinación con la capa visual).

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas, por no haber identificado el caso durante las pruebas funcionales previas a la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Añadir validaciones en el frontend que impidan introducir fechas de nacimiento posteriores al día actual. Implementar manejo de errores del backend para mostrar mensajes comprensibles y accesibles desde el formulario.
  - **De proceso**: Actualizar los criterios de aceptación de tareas para incluir la validación de fechas lógicas. Incluir casos límite en las pruebas de QA.

- **Estado del error**: Resuelto.

### Error 7: Las recetas no mostraban imágenes en la vista correspondiente

- **Origen técnico**: En la vista de recetas, los elementos visuales que debían mostrar las imágenes asociadas a cada receta aparecían con un placeholder. En particular, las recetas recomendadas por expertos —que deberían incluir siempre una imagen— se mostraban sin contenido visual, lo que afectaba negativamente a la experiencia del usuario.

- **Origen en el proceso**: La funcionalidad relacionada con las imágenes se dejó para el final del sprint, y se priorizaron otras tareas consideradas más urgentes. Como resultado, no se completó adecuadamente la integración ni se revisó visualmente el resultado final.

- **Fuente del error**: Backend (almacenamiento y recuperación de los datos de imagen).

- **Responsable(s)**: Todo el equipo, por no asegurar su integración ni verificar la presencia de imágenes en un componente clave de la interfaz.

- **Acciones de mitigación**:
  - **Técnica**: Asegurar que las recetas recomendadas por expertos tengan siempre una imagen asociada. Implementar comprobaciones en frontend para verificar que se renderiza correctamente. Las recetas creadas por usuarios pueden mantenerse como opcionales en cuanto a imagen.
  - **De proceso**: Incluir en los criterios de revisión visual la comprobación explícita de que las recetas recomendadas contienen imagen. Validar visualmente todos los elementos importantes en cada vista durante QA.

- **Estado del error**: Resuelto  


### Error 8: El archivo `revision.md` no incluía una explicación detallada de los casos de uso ni los datos necesarios para revisar la pasarela de pago

- **Origen técnico**: El archivo `revision.md`, incluido como parte del entregable, se limitaba a enumerar los casos de uso sin explicar cómo estaban implementados ni cómo se relacionaban con las funcionalidades reales del sistema. Además, no incluía los datos necesarios para revisar la pasarela de pago que eran imprescindibles para validar esta funcionalidad en la evaluación.

- **Origen en el proceso**: Esta tarea se dejó para el final del sprint y, debido a la carga de trabajo en otras funcionalidades más críticas, no se completó con el nivel de detalle requerido. La sección correspondiente a la pasarela de pago quedó incompleta y sin verificación previa.

- **Fuente del error**: Antonio Jiménez Ortega, responsable directo de la redacción del archivo.

- **Responsable(s)**: Equipo de documentación, por no revisar el contenido ni asegurar que se cumplían los requisitos mínimos exigidos para la evaluación.

- **Acciones de mitigación**:
  - **Técnica**: Incluir una descripción clara y detallada de cómo cada caso de uso se refleja en el sistema. Añadir también todos los datos requeridos para probar funcionalidades sensibles, como la pasarela de pago.
  - **De proceso**: Asegurar que el `revision.md` se complete con suficiente antelación y que sea revisado por varios miembros del equipo antes de la entrega. Incluir su revisión como ítem obligatorio en el checklist final de QA.

- **Estado del error**: Resuelto

### Error 9: Error 400 al introducir una edad máxima de `9999` en el formulario de creación de recetas, sin validación previa ni mensaje visible

- **Origen técnico**: El formulario de creación de recetas permitía introducir valores extremos en los campos de edad mínima y edad máxima recomendada. En concreto, al introducir `9999` como edad máxima, el backend devolvía un error HTTP 400 indicando que el valor era inválido. Sin embargo, el frontend no realizaba ninguna validación previa ni mostraba el mensaje de error recibido, dejando al usuario sin retroalimentación.

- **Origen en el proceso**: No se gestionaron adecuadamente los errores devueltos por el servidor, debido a que no se probó a introducir valores extremos en los campos de edad durante la validación del formulario de creación de recetas.

- **Fuente del error**: Grupo de frontend (falta de validación y gestión de errores en la interfaz) y backend (respuesta técnica correcta pero sin coordinación con la capa visual).

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas, por no haber identificado el caso durante las pruebas funcionales previas a la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Añadir validaciones en el frontend que impidan introducir edades fuera de un rango lógico (por ejemplo, entre 0 y 36 meses). Implementar el manejo de errores del backend para mostrar mensajes comprensibles y accesibles desde el formulario.
  - **De proceso**: Actualizar los criterios de aceptación de tareas para incluir validaciones de rangos lógicos en formularios. Incluir casos límite en las pruebas de QA.

- **Estado del error**: Resuelto.


### Error 10: El formulario de edición del perfil permite correos con formato incorrecto, generando errores en consola y provocando un error 500 en el backend

- **Origen técnico**: El formulario de edición del perfil de usuario permitía introducir correos electrónicos con un formato incorrecto (por ejemplo, sin `@` o sin dominio). Al enviarse al backend, estos valores no eran interceptados ni validados previamente en el frontend. Como resultado, se producía un fallo en la lógica de persistencia de datos que terminaba con un error HTTP 500 del servidor (`Could not commit JPA transaction`). Este fallo se reflejaba también como error en la consola del navegador, pero sin ningún tipo de retroalimentación visual para el usuario.

- **Origen en el proceso**: No se establecieron validaciones mínimas en los formularios del perfil, ni se consideró el tratamiento de errores graves derivados de entradas inválidas. Este formulario no fue incluido en los tests de QA ni validado durante la revisión previa a la entrega.

- **Fuente del error**: Grupo de frontend (por permitir entradas inválidas sin validación) y backend (por no controlar excepciones en la capa de persistencia).

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas, por no incluir la edición del perfil como parte del recorrido funcional básico a validar antes de la entrega.

- **Acciones de mitigación**:
  - **Técnica**: Añadir validaciones en el frontend mediante expresiones regulares o validadores nativos para asegurar el formato correcto del correo electrónico. En backend, capturar errores de persistencia y devolver un mensaje controlado al cliente sin romper la ejecución.
  - **De proceso**: Incluir todos los formularios de usuario en los criterios de revisión de QA. Establecer un estándar mínimo de validaciones obligatorias para campos sensibles como el email.

- **Estado del error**: Resuelto.

### Error 11: El formulario de alérgenos no se sabe a qué bebé se refiere. 

- **Origen técnico**: El formulario de alérgenos requería que el usuario seleccionara previamente a uno de sus bebés registrados para poder asociar la información correctamente. Sin embargo, esta selección no estaba contemplada en la interfaz, por lo que el formulario no indicaba a qué bebé se estaban asignando los alérgenos. Como resultado, el flujo carecía de sentido funcional y no permitía completar la acción correctamente.

- **Origen en el proceso**: No se definió ni validó el flujo completo de uso para la funcionalidad de alérgenos. Se asumió que el usuario ya habría seleccionado un contexto (el bebé), pero no se implementó esa lógica ni se reflejó en la interfaz ni en el diseño de la navegación.

- **Fuente del error**: Grupo de frontend, por no incluir el mecanismo de selección del bebé antes de mostrar el formulario de alérgenos.

- **Responsable(s)**: Equipo de QA e ingeniería de pruebas, por no haber detectado que la funcionalidad era incoherente sin ese paso previo obligatorio.

- **Acciones de mitigación**:
  - **Técnica**: Añadir un selector obligatorio que permita al usuario elegir al bebé antes de acceder al formulario de alérgenos.
  - **De proceso**: Revisar el flujo completo de las funcionalidades asociadas a cada entidad (en este caso, bebés) para verificar que se implementan todos los pasos necesarios. Incluir validación de coherencia funcional y contexto de uso en QA.

- **Estado del error**: Resuelto.


## 6. Conclusiones

Okay, entiendo. Quieres una conclusión que, aunque se refiera a los problemas del Sprint 2, tenga un estilo y enfoque similar al ejemplo que proporcionaste sobre el Sprint 1, poniendo énfasis en cómo los fallos impactaron la evaluación y la necesidad de mejorar los procesos de control y verificación.

Aquí tienes una propuesta adaptada:

6. Conclusiones

Durante el Sprint 2, se evidenciaron múltiples incumplimientos relacionados tanto con el proceso de entrega (condición T-9) como con la calidad del software (condición T-10), que comprometieron seriamente la evaluación del entregable. A pesar de que el equipo identificó y resolvió posteriormente varios errores funcionales y técnicos, la causa principal de las deficiencias señaladas en la revisión radicó en fallos en la preparación y verificación final del paquete entregado y del propio software.

Errores críticos como un archivo revision.md incompleto (sin explicaciones detalladas ni datos de prueba esenciales como los de la pasarela de pago) y un vídeo de demostración inaccesible según las normas impidieron que el profesorado pudiera evaluar adecuadamente los casos de uso implementados. Sumado a esto, la presencia de errores funcionales, fallos de validación y problemas visuales en producción mermó la fiabilidad de la versión entregada. Como resultado, gran parte del esfuerzo funcional del equipo no pudo ser valorado correctamente.

Este conjunto de incidentes pone de manifiesto la necesidad urgente de establecer mecanismos más rigurosos de revisión y control, no solo sobre el código, sino sobre todo el proceso de empaquetado y entrega, especialmente en las fases previas a la fecha límite. Asimismo, resalta la importancia crítica de validar exhaustivamente, bajo condiciones lo más cercanas posible a la evaluación, tanto las funcionalidades clave como la correcta presentación de toda la documentación y artefactos requeridos.

Para próximos sprints, el equipo ha tomado conciencia de estas deficiencias y se ha comprometido firmemente a aplicar las medidas correctivas detalladas en este informe, tanto a nivel técnico como organizativo (reforzando QA, checklists de entrega y verificación final), con el fin de garantizar entregas futuras más estables, completas, verificadas y estrictamente alineadas con los criterios de evaluación.