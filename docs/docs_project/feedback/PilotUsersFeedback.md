# Feedback Usuarios Piloto

![Portada](../../../docs/imagenes/Infantem.png)

**Fecha:** 31/03/2025
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

## Colaboradores del documento
- Paula Luna Navarro: Creación del documento

## Índice

1. [Mejoras y Cambios Necesarios](#-mejoras-y-cambios-necesarios)  
2. [ Categorización y Priorización de Problemas Detectados](#-categorización-y-priorización-de-problemas-detectados)

---
# Mejoras y Cambios Necesarios 

A partir del feedback proporcionado por los usuarios piloto, hemos identificado varias áreas de mejora para optimizar la experiencia de uso de la aplicación. A continuación, se detallan los principales cambios y ajustes necesarios para hacerla más intuitiva, atractiva y funcional.  
## Sprint 2  
## Diseño y Apariencia    
- Incluir más elementos visuales, como imágenes y gráficos, para mejorar la interfaz.  
- Mejorar la organización visual de las cards de bebés para evitar la sobrecarga de información.  
- Optimizar el diseño de la aplicación para que sea más moderna y llamativa.  
- Corregir problemas de visualización en dispositivos móviles.  
- Ajustar los elementos flotantes y mejorar la organización de las secciones.  
- Hacer que la barra de navegación sea más visible y accesible.  

## Navegación y Usabilidad  
- Implementar una **homepage clara y funcional** para mejorar la navegación inicial.  
- Asegurar que todas las opciones de navegación sean claras y comprensibles.  
- Centrar correctamente los elementos del formulario de login.  
- Mejorar el flujo de usuario para evitar pantallas en blanco tras el inicio de sesión.  
- Evitar que los botones de edición y guardado en el perfil no reflejen correctamente los cambios.  
- Corregir bugs en la barra de navegación de la sección de recetas, que redirige erróneamente a la pantalla de creación de recetas.  

## Contenido y Estructura  
- Explicar mejor el propósito de la aplicación desde la pantalla principal para que el usuario entienda su utilidad.  
- Reestructurar los textos de las recetas para facilitar su lectura.  
- Especificar claramente si la edad recomendada en las recetas está en meses o años.  
- Incluir los pasos detallados en cada receta o indicar que estarán disponibles en futuras actualizaciones.  
- Aumentar el tamaño del texto de las recetas para mejorar la accesibilidad.  
- Mejorar la presentación de la información para que sea más clara y atractiva.  

## Funcionalidad  
- Revisar los datos que se solicitan en la ficha del bebé y mantener solo los realmente necesarios.  
- Optimizar la funcionalidad de "Añadir bebé" para que no parezca trivial o un elemento de juego.  
- Explicar mejor el sistema de alérgenos dentro de la aplicación.  
- Incluir una pestaña en la barra de navegación llamada **"Mis bebés"** para acceder fácilmente a esta información.  
- Corregir errores en la edición de información del perfil, asegurando que los cambios se guarden correctamente.  
- Implementar validaciones en la edición de recetas para evitar que puedan guardarse con campos vacíos.  

## Idioma y Accesibilidad  
- Permitir visualizar la contraseña en el login y ofrecer una opción de recuperación de credenciales.  

## Categorización y Priorización de Problemas Detectados

Este apartado recoge y clasifica los errores funcionales, problemas de usabilidad, mejoras visuales y recomendaciones detectadas durante el uso y revisión de la aplicación Infantem. La categorización se ha realizado según tres niveles de prioridad (alta, media y baja), con el objetivo de facilitar su abordaje en próximos sprints de desarrollo. También se incluyen sugerencias de mejora para optimizar la experiencia del usuario y la funcionalidad de la app.

## Sprint 2 
### 🟥 Prioridad Alta

- El botón de búsqueda (lupa) **no funciona correctamente**.
- **No queda claro** cómo funciona la búsqueda de recetas recomendadas según la edad.
- Desde el **móvil**, no se ve el contenido completo de la sección **"Elaboración"** en las recetas. Algunos elementos no están bien estructurados y **dificultan la lectura**.
- No se especifica si la edad recomendada en las recetas es en **meses o años**. **Debe aclararse que es en meses** en toda la aplicación.
- Las recetas necesitan un **formato más estético y mejor estructurado**.
- **Faltan mensajes de error** en los formularios de bebés para que el usuario entienda por qué un dato es inválido.
- No se puede **visualizar la contraseña mientras se escribe**, ni hay **opción de recuperación** en caso de olvido.

---

### 🟧 Prioridad Media

- El formulario permite ingresar un **correo sin "@"**, lo cual puede generar errores.
- En la sección de edición de bebés, permite registrar **fechas futuras (ej. 2027)**, lo cual debería estar restringido.
- La **barra de navegación pasa desapercibida** y no es intuitiva.
- En el **formulario de login**, hay **elementos descentrados**.
- Al registrarse con datos incorrectos, el **mensaje de error no señala en qué campo está el fallo**.

---

### 🟩 Prioridad Baja

- **Añadir más fotos** para hacer la interfaz más atractiva. ✅ (HECHO)
- Evaluar si el campo **“perímetro cefálico”** es necesario en la ficha del bebé.
- **Falta tilde en “Alérgenos”**.

---

### 💡 Recomendaciones

- La app debería **recomendar recetas según la edad del bebé** para una experiencia más personalizada.
- Incluir un **buscador de recetas por ingredientes** para facilitar la exploración.
- Añadir un **calendario en la sección de bebés** para seleccionar fácilmente la fecha de nacimiento.
- **Añadir la opción de eliminar recetas** desde la interfaz de usuario.

---

> *Este sistema de evaluación sirve como guía para valorar la implicación de los usuarios piloto y tomar decisiones sobre futuras iteraciones y pruebas de usuario.*  
