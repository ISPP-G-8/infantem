# Informe de Implementación de la Publicidad

![Portada](../../../frontend/assets/Documentos/Infantem.png)


**Fecha:** 18/02/2025  
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
- [Introducción](#introducción)
- [Comparativa](#comparativa)
- [Opción 1](#opción-1)
- [Opción 2](#opción-2)
- [Conclusiones](#conclusiones)

## Colaboradores del documento
- Luis Giraldo
  - Creó el documento en md.


## Introducción

Este informe presenta un análisis detallado sobre la integración de publicidad en nuestra aplicación. Se exploran y comparan las dos opciones más relevantes, evaluando sus ventajas y consideraciones. Además, se proporciona una guía general para su implementación, facilitando la toma de decisiones en el desarrollo.

1. **Plataforma externa de anuncios**: Uso de servicios como Google AdMob y AdSense para automatizar la publicidad.
2. **Gestión propia de anuncios**: Captación de anunciantes externos y almacenamiento de anuncios en nuestra base de datos.

Cada opción se evaluará en base a aspectos clave como implementación, control sobre los anuncios, monetización, carga del sistema y experiencia del usuario.


## Comparativa

En este apartado se realiza una comparativa entre ambas opciones exponiendo los distintos aspectos que consideramos importantes al tomar la decisión de qué alternativa escoger a la hora de implementar la publicidad:

### Implementación

**Plataforma externa**: Integración sencilla mediante el SDK de Google AdMob y configuración de espacios publicitarios.

**Gestión propia**: Desarrollo de un sistema interno para almacenamiento, recuperación y visualización de anuncios.

### Control sobre los anuncios
**Plataforma externa**: Anuncios generados automáticamente sin control total sobre el contenido mostrado.

**Gestión propia**: Control total sobre los anuncios, permitiendo personalización y segmentación.

### Monetización

**Plataforma externa**: Ingresos inmediatos, pero con comisiones para la plataforma.

**Gestión propia**: Mayores beneficios por anuncio, aunque requiere esfuerzo en captación de anunciantes.

### Carga al sistema

**Plataforma externa**: Reducción de carga, ya que los anuncios son servidos por terceros.

**Gestión propia**: Mayor carga en servidores debido al almacenamiento y gestión de anuncios.

### Experiencia del usuario

**Plataforma externa**: Posible impacto negativo por anuncios no alineados con la temática de la app.

**Gestión propia**: Publicidad más relevante y menos intrusiva.

## Opción 1

### Descripción

Google Ads permite mostrar anuncios en apps y sitios web mediante AdMob (móvil) y AdSense (web). Funciona con un sistema de subasta, optimizando la publicidad según el usuario.

### Ventajas
- Monetización inmediata sin necesidad de buscar anunciantes.
- Segmentación avanzada según el comportamiento del usuario.
- Gestor centralizado para supervisión y optimización de anuncios.
- Variedad de formatos (banners, intersticiales, vídeos recompensados).
- Escalabilidad sin importar el número de usuarios iniciales.

### Desventajas

- Falta de control total sobre los anuncios mostrados.
- Dependencia del volumen de usuarios para obtener ingresos significativos.
- Posible impacto negativo en la experiencia del usuario si no se implementa correctamente.

### Guía de Implementación
- Registro en Google Ads y vinculación con AdMob y AdSense.
- Configuración de anuncios en la app:
  - Registro en AdMob y obtención del App ID.
  - Configuración de bloques publicitarios.
  - Integración del SDK de AdMob.
- Configuración en la web:
  - Registro en AdSense.
  - Inserción de código publicitario.
  - Personalización de formatos.
- Monitoreo y optimización:
  - Uso de filtros para mejorar la relevancia de los anuncios.
  - Evaluación del rendimiento con Google Ads.
  - Pruebas A/B para mejorar la conversión.


## Opción 2

### Descripción

Este modelo consiste en contactar directamente con empresas interesadas en anunciarse en Infantem, negociando acuerdos y mostrando anuncios almacenados en nuestra base de datos.

### Ventajas

- Control total sobre los anuncios y su contenido.
- Mayores beneficios por anuncio sin intermediarios.
- Flexibilidad en formatos y ubicaciones.
- Posibles alianzas estratégicas con empresas del sector.

### Desventajas
- Requiere un equipo comercial para captar anunciantes.
- Mayor carga operativa en negociaciones y facturación.
- Necesidad de una base de usuarios grande para atraer anunciantes.
- Ingresos menos estables en comparación con Google Ads.

### Guía de Implementación

- Captación de anunciantes:
  - Definir perfil del anunciante ideal (sector infantil, maternidad, etc.).
  - Crear un dossier publicitario con métricas de la app.
  - Contacto y negociación de tarifas y condiciones.
  - Formalización de acuerdos publicitarios.
- Implementación en la app:
  - Diseño de un sistema de almacenamiento de anuncios en la base de datos.
  - Creación de un backend para servir anuncios.
  - Desarrollo de un sistema de rotación de anuncios.
  - Implementación de métricas de rendimiento.
- Implementación en la web:
  - Habilitación de espacios publicitarios.
  - Creación de un portal para anunciantes.
  - Automatización de la rotación y caducidad de anuncios.
- Optimización y seguimiento:
  - Informes periódicos de rendimiento.
  - Ajuste de tarifas según demanda y efectividad.
  - Pruebas de ubicación para mejorar la conversión.
  - Exploración de nuevos formatos como anuncios interactivos.


## Conclusiones

Ambas opciones presentan ventajas y desventajas. La **integración con Google Ads** es la solución más rápida y sencilla para generar ingresos desde el inicio, aunque con menos control sobre los anuncios. En cambio, la **gestión propia de anunciantes** ofrece mayor rentabilidad a largo plazo, pero requiere un esfuerzo considerable en captación de clientes y mantenimiento.
La decisión final dependerá de los objetivos estratégicos de Infantem y los recursos disponibles para la gestión de la publicidad.
