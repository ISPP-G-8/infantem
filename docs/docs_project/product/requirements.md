# Requisitos

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
- [Requisitos funcionales](#requisitos-funcionales)
- [Requisitos de información](#requisitos-de-información)
- [Reglas de negocio](#reglas-de-negocio)

## Colaboradores del documento
- Luis Giraldo
  - Creó el documento en md.



## Requisitos funcionales

| Requisito | Descripción |
|-----------|-------------|
| RF-01 | Los usuarios deben poder registrarse con correo electrónico y contraseña. |
| RF-02 | Los usuarios deben poder actualizar sus datos personales (nombre, email, foto de perfil). |
| RF-03 | Se debe permitir añadir información del bebé (nombre, fecha de nacimiento, peso, talla, alergias, etc.). |
| RF-04 | Se debe permitir la eliminación de la cuenta y los datos asociados. |
| RF-05 | Los usuarios deben poder visualizar su historial de alimentación registrado. |
| RF-06 | Se debe permitir la descarga del historial de alimentación en formato PDF. |
| RF-07 | El usuario debe poder registrar los alimentos introducidos en la dieta del bebé. |
| RF-08 | La app debe almacenar un historial de alimentos consumidos. |
| RF-09 | La app debe permitir registrar síntomas tras la introducción de nuevos alimentos |
| RF-10 | Debe sugerir recetas y menús según la edad del bebé y los alimentos permitidos |
| RF-11 | La app debe permitir registrar los percentiles del bebé periódicamente.|
| RF-12 | Se deben comparar los datos con tablas oficiales de crecimiento. |
| RF-13 | El usuario debe recibir alertas si hay desviaciones en el crecimiento. |
| RF-14 | Se debe permitir la visualización de estadísticas y gráficos de evolución |
| RF-15 | La app debe ofrecer planes de alimentación adaptados a la edad del bebé. |
| RF-16 | Todas las recomendaciones estarán basadas en evidencia científica. |
| RF-17 | Los usuarios deben recibir información sobre nutrientes esenciales para sus bebés |
| RF-18 | La app debe generar alertas ante posibles alergias o intolerancias y recomendar la visita al médico |
| RF-19 | Se debe poder registrar alergias diagnosticadas y ajustar las recomendaciones de alimentación |
| RF-20 | Los usuarios premium podrán disponer de planes de alimentación para dietas sin gluten, sin lactosa, veganas, etc. |
| RF-21 | Se debe poder generar informes de crecimiento y alimentación para compartir con pediatras  |
| RF-22 | Los profesionales deben poder revisar los datos de crecimiento y alimentación con profesionales de la salud |
| RF-23 | La app debe permitir configurar recordatorios para la introducción de nuevos alimentos (disponible en el plan premium). |
| RF-24 | Se debe permitir hacer seguimiento de vacunas y chequeos médicos. |
| RF-25 | La app debe ofrecer un modelo freemium con acceso gratuito y funcionalidades premium. |
| RF-26 | Se debe incluir un sistema de suscripción con pago mensual o anual. |
| RF-27 | Los usuarios premium tendrán acceso a reportes detallados sobre nutrientes esenciales y recomendaciones basadas en métricas avanzadas. |
| RF-28 | La app debe incluir publicidad segmentada de productos relacionados con la alimentación infantil para los usuarios del plan gratuito. |
| RF-29 | Los usuarios deben poder ver el estado de su suscripción y la fecha de vencimiento. |
| RF-30 | Se debe permitir la cancelación o renovación de la suscripción en cualquier momento. |
| RF-31 | Los usuarios podrán agregar múltiples perfiles de bebfés si tienen más de un hijo |
| RF-32 | Se debe permitir a los usuarios agregar notas personalizadas en cada registro de alimentos. |
| RF-33 | Se debe incluir una base de datos de alimentos con información nutricional para facilitar el registro. |
| RF-34 | Se debe permitir a los usuarios filtrar su historial de alimentación por fechas y tipo de alimento. |
| RF-35 | Los usuarios deben recibir alertas cuando sea recomendable introducir un nuevo grupo de alimentos según la edad del bebé. |
| RF-36 | Para los usuarios premium se debe permitir la configuración de preferencias alimenticias (ej. vegetariana, sin lactosa, sin huevo, etc.). |
| RF-37 | Se debe incluir una funcionalidad de preguntas frecuentes con información respaldada por pediatras y nutricionistas. |
| RF-38 | La app debe permitir guardar recetas favoritas para facilitar su acceso en el futuro. |
| RF-39 | Se debe incluir una funcionalidad de búsqueda para encontrar recetas. |
| RF-40 | Se debe implementar un sistema de soporte al cliente dentro de la app para resolver dudas o problemas técnicos. |
| RF-41 | Se debe incluir una funcionalidad de búsqueda para encontrar rápidamente alimentos o síntomas registrados. |
| RF-42 | Los usuarios premium tendrán la opción de registrar antecedentes familiares de alergias para ajustar recomendaciones |
| RF-43 | Los usuarios premium podrán ajustar el plan basado en intolerancias o preferencias dietéticas específicas |
| RF-44 | A los usuarios se les mostrará sugerencias de productos específicos según necesidades nutricionales del bebé. |
| RF-45 | Posibilidad de registrar datos sin conexión y sincronizar automáticamente cuando se recupere la conexión. |
| RF-46 | Los usuarios premium tendrán acceso a recetas y guías descargables para consulta sin internet. |
| RF-47 | El usuario recibirá notificaciones para controles de crecimiento y citas médicas. |

## Requisitos de información

| Requisito | Descripción |
|-----------|-------------|
| RI-01 | El sistema debe guardar la siguiente información sobre los usuarios: nombre, apellidos, nombre de usuario, correo electrónico y contraseña. |
| RI-02 | El sistema debe guardar la siguiente información sobre el bebé: nombre, fecha de nacimiento, sexo, peso, altura, perímetro cefálico, vacunas aplicadas, alergias, preferencia alimenticia (como dietas especiales, veganas, sin gluten), enfermedades pasadas, alimentos que se pueden incluir en las dietas, alimentos que no se incluyen en las dietas, registro de ingesta de alimento y registro de sueño. |
| RI-03 | El sistema debe guardar la siguiente información sobre el registro de sueño: fecha de inicio, fecha de fin, veces que se despierta a mitad de sueño y tipo de sueño.  |
| RI-04 | El sistema debe guardar información sobre recetas: edad del bebé recomendada, ingredientes, pasos a seguir, categoría de alimentos y alérgenos. |
| RI-05 | El sistema debe guardar información sobre el aporte nutricional requerido en cada etapa del desarrollo: rango de edad, fuente de alimentación, macronutrientes y micronutrientes. |
| RI-06 | El sistema debe almacenar la siguiente información sobre los hitos del crecimiento del bebé: nombre del hito, fecha, descripción. |
| RI-07 | El sistema debe almacenar la siguiente información sobre las enfermedades pasadas: nombre de la enfermedad, fecha de inicio, fecha de fin, descripción de síntomas, observaciones extra. |
| RI-08 | El sistema debe almacenar la siguiente información sobre el registro de ingesta de alimentos: alimento consumido, cantidad, fecha y observaciones. |
| RI-09 | El sistema debe almacenar la siguiente información sobre los productos del marketplace: nombre, precio, descripción, link y proveedor.|
| RI-10 | El sistema debe almacenar la siguiente información sobre los alérgenos: nombre y descripción. |
| RI-11 | El sistema debe almacenar la siguiente información sobre las vacunas: tipo de vacuna y fecha de administración. |


## Reglas de negocio

| Requisito | Descripción |
|-----------|-------------|
| RN-01 | Para registrar a un bebé será necesario registrarse como usuario de la aplicación.|
| RN-02 | Solo los pediatras registrados y validados podrán ofrecer consultas dentro de la plataforma. |
| RN-03 | Solo los usuarios con una suscripción Premium podrán acceder a funciones avanzadas.  |
| RN-04 | Un pediatra no podrá aceptar más de 10 consultas por día para garantizar la calidad del servicio. |
| RI-05 | Las tarifas de las consultas deberán pagarse por adelantado, el sistema no permitirá agendar citas sin el pago correspondiente. |
| RI-06 | Las consultas sólo podrán ser reprogramadas con al menos 24 horas de antelación |
| RI-07 | Los anuncios publicitarios no serán visibles para usuarios premium. |
| RI-08 | Las recetas guardadas como favoritas tendrán una limitación máxima de 10 por usuario en la versión gratuita. |