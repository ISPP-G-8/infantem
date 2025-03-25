# POLÍTICAS Y PROCEDIMIENTOS
![Portada](../../../frontend/assets/Documentos/Infantem.png)


**Fecha:** 11/03/2025  
**Grupo 8:** Infantem  
**Sprint 1**

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





## Índice
- [Colaboradores del documento](#colaboradores-del-documento)
- [Disclaimer](#disclaimer)
- [Política de commits](#política-de-commits)
- [Política de ramas](#política-de-ramas)
- [Política de Pull Request](#política-de-pull-request)
- [Política de Issues](#política-de-issues)
- [Política de versionado](#política-de-versionado)
- [Políticas de las tareas](#políticas-de-las-tareas)


## Colaboradores del documento
- Luis Giraldo
  - Creó el documento en md.


## Disclaimer 

Se entiende que tanto código, como commits, como ramas… serán redactados en inglés, no se ha añadido en todos los campos.

También que se tratará de hacer un código lo más limpio posible para facilitar la tarea al resto de compañeros.


## Política de commits

Esta política sigue el estándar de Conventional Commits para asegurar que los mensajes de commit sean claros, consistentes y permitan el rastreo eficiente de cambios y su relación con issues.

### Estructura de un commit

Cada mensaje de commit debe seguir la siguiente estructura:
`<tipo>: <mensaje del commit> [Refs #X | Closes #X]`

- `<tipo>`: Describe el tipo de cambio realizado. Este debe ser uno de los tipos permitidos (ver más abajo).
- `<mensaje del commit>`: Un resumen breve y claro del cambio realizado, en inglés.
- `[Refs #X | Closes #X]`: (Solo si hay una issue en GitHub asociada a la tarea) Referencia a un issue de GitHub. Refs #X indica una referencia sin cerrar el issue, mientras que Closes #X indica que el commit cierra el issue al hacer el merge del PR.

### Tipos de commits

1. **feat**: Para añadir nuevas funcionalidades.
2. **fix**: Para solucionar errores.
3. **docs**: Para añadir o modificar documentación.
4. **test**: Para añadir o modificar test

##### Ejemplos

- fix: Set a min-width for responsiveness Refs #9
- feat: Add JWT-based authentication Closes #2
- docs: Update setup instructions Refs #19

##### Notas

- Empezar el mensaje del commit con un verbo en imperativo.
- No es estrictamente necesario añadir un body al commit.
- Limitar el mensaje de commit a 72 caracteres para que se puedan leer en cualquier pantalla
- Tratar de hacer los commits tan atómicos como sea posible


## Política de ramas

La estructura de ramas a seguir es similar a Git Flow, pero con un enfoque más relajado.

### Estructura de una rama de desarrollo

Todos los nombres de estas ramas deben seguir una estructura común. Se dividen en tres categorías principales:

- **Features (feat/)**:  Para las tareas relacionadas con una nueva funcionalidad, crearemos una rama específica para cada una.
  - **Formato**: feat/nombre-de-la-feature
  - **Ejemplo**: feat/add-register

- **Documentación (docs)**: Se utilizará una sola rama para subir todo lo relacionado con la documentación del repositorio (por ejemplo, la actualización del README.md).
  - **Formato**: docs
  - **Ejemplo**: docs

- **Fix (fix/)**: Son ramas de corta duración para la corrección de errores. La idea es **fusionarlas rápidamente** y eliminarlas una vez solucionado el problema.
  - Si el error ocurre en una **feature que aún tiene su rama abierta**, no es necesario crear una rama de fix; la corrección se realiza directamente en la rama de la feature.
  - Se usa una rama de fix únicamente para corregir errores detectados en funcionalidades **ya fusionadas**, cuyas ramas originales han sido cerradas.
  - **Formato**: fix/nombre-del-bug
  - **Ejemplo**: fix/bug-when-fetching-users

### Integración 

Las ramas (normalmente desarrolladas por una o pocas personas) deben integrarse en la rama develop, donde se comprobará que los cambios funcionan correctamente con el resto del proyecto.

De manera regular, cuando develop se considere estable, se fusionará con main. La rama main debe permanecer siempre estable y representar la versión de referencia del proyecto durante el desarrollo.

#### Ejemplos de ramas

- feat/register 
- fix/bug-when-fetching-users 
- docs 
- develop 
- main


## Política de Pull Request

### Estructura de una Pull Request

La idea es tratar de documentar la Pull Request lo mejor posible, no todos los campos son imprescindibles pero cuanto mejor esté documentada la Pull Request más fácil será de revisar para el resto de compañeros.

- **Nombre descriptivo**: Usar un título claro y conciso que indique el propósito del PR.
- **Descripción**: Explicar qué cambios se han realizado y cualquier detalle relevante.
- **Referencia a tareas o issues**: Si el PR está relacionado con una tarea o issue, menciónalo en la descripción (Closes #123) de la misma forma que hacíamos en los commits.
- **Pruebas**: Asegúrate de haber probado los cambios.

### Revisión de una Pull Request

No es estrictamente necesario solicitar un revisor en todos los casos. Por ejemplo, en cambios sencillos como la corrección de un bug, no es imprescindible. Sin embargo, en Pull Requests relacionadas con una nueva funcionalidad completa o en modificaciones importantes, es recomendable solicitar la revisión y aprobación de un compañero.


## Política de Issues

La idea será trabajar con issues, y que estén bien documentadas para que sea fácil reconocer que es lo que el creador de la issue quería que hiciésemos pero no demasiado estricta ni con una plantilla definida porque sería contraproducente el tiempo y las ganas invertidas.

### Creación de un Issue

La idea es tratar de documentar la Pull Request lo mejor posible, no todos los campos son imprescindibles pero cuanto mejor esté documentada la Pull Request más fácil será de revisar para el resto de compañeros.

- **Título claro y descriptivo** (Obligatorio): 
Debe resumir el problema o tarea de manera concisa. 
- **Etiquetas correspondientes**: Añadir una o varias etiquetas (bug, feature, documentation, etc.) para clasificar la issue correctamente. 
- **Descripción del problema o tarea**: Debe explicar de manera clara el propósito del issue, pero sin necesidad de seguir un formato específico. Puede incluir contexto, capturas de pantalla, logs o cualquier detalle relevante.

### Definition of Done (DoD)

Un issue se considerará **completado** cuando:

- Se haya implementado o corregido lo que describe el issue.
- Se hayan realizado las pruebas necesarias para verificar que funciona correctamente.
- Se haya creado un Pull Request (si es necesario) y, en caso de cambios importantes, haya sido aprobado por al menos un compañero.



## Política de versionado

El proyecto seguirá una estrategia de versionado basada en el esquema vX.Y.Z, donde cada número tiene un significado específico:
- **X (Major)**: Se incrementa cuando hay cambios incompatibles con versiones anteriores (breaking changes) o una reestructuración significativa del sistema.
- **Y (Minor)**: Se incrementa cuando se agregan nuevas funcionalidades de manera retrocompatibles.
- **Z (Patch)**: Se incrementa cuando se realizan cambios pequeños sin cambios en la funcionalidad o correcciones de errores.

### Integración con CI/CD

Cada versión etiquetada en la rama de producción main activará un workflow de Release automática.

Ver [Análisis CDCI](../../docs_project/analisys/Análisis%20CDCI.md)


## Políticas de las tareas

Una vez que se ha terminado una tarea y está en In Review, se puede dar dos casos:

### Tarea Hija

Para saber si tu tarea es hija en tu tarea mirar la derecha y tiene que tener un apartado llamado Relationships relleno, como el de la imagen. 

![Portada](../../../frontend/assets/Documentos/TareaHija.png)

Una vez acabada la tarea y llevada a In Review, se deberá notificar al responsable de la siguiente tarea:
- En el caso de desarrollo Frontend, avisar a la persona encargada de test de frontend.
- En el caso de test Frontend, avisar al encargado de la calidad del frontend.
- En el caso de la calidad del Frontend, llevar la tareas desarrollo y test a Done, dejar su tarea en In Review, poner por el canal general de Discord que ha acabado con su tarea y hacer una Pull Request.
- En el caso de desarrollo Backend, avisar a la persona encargada de test de backend.
- En el caso de test Backend, avisar al encargado de la calidad del backend.
- En el caso de la calidad del Backend, llevar la tareas desarrollo y test a Done, dejar su tarea en In Review, poner por el canal general de Discord que ha acabado con su tarea y hacer una Pull Request.

### Tarea sin padres
En caso de que tu tarea no es hija, entonces deberá  dejar tu tarea en In Review y poner por el canal general de Discord que ha acabado con su tarea y hacer una Pull Request.




