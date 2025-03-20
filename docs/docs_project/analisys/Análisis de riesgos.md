# Plantilla del Sprint 1

![Portada](../../../docs/imagenes/Infantem.png)


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
1. Riesgos
    1.1. Riesgos Técnicos
    1.2. Riesgos Legales y Regulatorios
    1.3. Riesgos de Negocio
    1.4. Riesgos Operativos
2. Tabla de priorización de riesgos
3. Análisis sobre la evolución de los riesgos



## 1. Riesgos

En esta sección se identifican y analizan los riesgos asociados con el desarrollo y funcionamiento de la aplicación. Los riesgos han sido clasificados en cuatro categorías principales:

- Riesgos Técnicos: Problemas relacionados con la infraestructura, seguridad, precisión de datos y rendimiento del sistema.
- Riesgos Legales y Regulatorios: Desafíos relacionados con normativas y regulaciones que afectan el almacenamiento de datos y la responsabilidad médica.
- Riesgos de Negocio: Factores que pueden afectar la viabilidad económica de la aplicación, la adopción por parte de los usuarios y la competencia en el mercado.
- Riesgos Operativos: Riesgos relacionados con la gestión del contenido, atención al usuario y reputación de la aplicación.

Cada riesgo ha sido evaluado en función de su probabilidad de ocurrencia y su impacto, generando un factor de riesgo que permite priorizar su gestión y mitigación.


### 1.1. Riesgos Técnicos

#### Seguridad de la información y privacidad
- **Riesgo**: La aplicación maneja datos sensibles de bebés y sus padres, como peso, talla, historial de alimentación y posibles alergias. Un fallo en la seguridad podría exponer información médica privada.
- **Mitigación**: Implementar encriptación de datos, autenticación multifactor y conformidad con normativas como GDPR o HIPAA si aplica.
- **Probabilidad**: 8
- **Impacto**: 10
- **Factor**: 80



#### Fiabilidad y precisión de datos
- **Riesgo**: Los datos inexactos o recomendaciones erróneas pueden impactar negativamente la salud infantil.
- **Mitigación**: Validación estricta de datos ingresados, supervisión de contenido por profesionales de salud y actualizaciones constantes basadas en evidencia científica.
- **Probabilidad**:2
- **Impacto**: 8
- **Factor**: 16

#### Escalabilidad y rendimiento
- **Riesgo**: A medida que crece el número de usuarios, la infraestructura podría no soportar la demanda, afectando la disponibilidad del servicio.
- **Mitigación**: Uso de arquitecturas escalables en la nube (AWS, Google Cloud) y pruebas de carga con datos reales antes del lanzamiento.
- **Probabilidad**: 6
- **Impacto**: 9
- **Factor**: 54


#### Algoritmos de recomendación y personalización
- **Riesgo**: Si los algoritmos que generan recomendaciones de alimentación no están bien calibrados, podrían ofrecer sugerencias inadecuadas para la edad o condición del bebé.
- **Mitigación**: Validación continua de los algoritmos por especialistas en nutrición y pruebas con datos reales antes de implementar cambios en producción.
- **Probabilidad**: 6
- **Impacto**: 9
- **Factor**: 54

### 1.2. Riesgos Legales y Regulatorios

#### Cumplimiento normativo
- **Riesgo**: Requerimientos legales para almacenamiento de datos de salud y consentimiento parental pueden variar según la región.
- **Mitigación**: Asesoría legal para garantizar conformidad con regulaciones locales e internacionales (GDPR en Europa, COPPA en EE.UU.).
- **Probabilidad**: 3
- **Impacto**: 7
- **Factor**: 21

#### Responsabilidad médica
- **Riesgo**: Si un usuario sigue una recomendación de la app y su bebé sufre una reacción adversa, podrían surgir demandas legales.
- **Mitigación**: Inclusión de disclaimers claros, validación por nutricionistas certificados y opción de consulta con profesionales antes de aplicar cambios en la dieta.
- **Probabilidad**: 5
- **Impacto**: 10
- **Factor**: 50

#### Gestión de consentimiento y control parental
- **Riesgo**: Recopilación de información infantil sin un sistema de consentimiento verificable.
- **Mitigación**: Implementación de mecanismos de verificación parental y derecho a eliminación de datos por parte de los tutores.
- **Probabilidad**: 2
- **Impacto**: 7
- **Factor**: 14


### 1.3. Riesgos de Negocio
#### Adopción y retención de usuarios
- **Riesgo**: Los padres pueden no confiar en la aplicación o preferir métodos tradicionales (consultas médicas presenciales).
- **Mitigación**: Campañas de concienciación, testimonios de expertos y padres, y una interfaz intuitiva para fomentar la confianza.
- **Probabilidad**: 4
- **Impacto**: 8
- **Factor**: 32

#### Modelo de monetización
- **Riesgo**: Si el modelo Freemium no genera suficientes conversiones a suscripciones premium, la sostenibilidad económica podría verse afectada.
- **Mitigación**: Evaluación de precios, pruebas A/B para estrategias de conversión y diversificación de ingresos (consultas online, publicidad segmentada).
- **Probabilidad**: 5
- **Impacto**: 10
- **Factor**: 50

#### Competencia
- **Riesgo**: Existen otras aplicaciones de nutrición infantil en el mercado con funcionalidades similares.
- **Mitigación**: Diferenciación a través del enfoque en la etapa previa a la alimentación complementaria y alianzas estratégicas con pediatras o instituciones de salud.
- **Probabilidad**: 10
- **Impacto**: 5
- **Factor**: 50


#### Dependencia de profesionales para generar contenido
- **Riesgo**: La aplicación requiere nutricionistas y pediatras para generar contenido fiable. Si el equipo no se mantiene activo, la calidad del servicio podría disminuir.
- **Mitigación**: Creación de un sistema de colaboración con universidades y organismos de salud para asegurar la actualización y validez del contenido.
- **Probabilidad**: 8
- **Impacto**: 8
- **Factor**: 64

#### Riesgo de baja adopción del modelo de pago
- **Riesgo**: Si los usuarios no perciben un valor suficiente en la versión Premium, podrían optar por la versión gratuita, afectando los ingresos esperados.
- **Mitigación**: Ofrecer una prueba gratuita del servicio Premium, promociones periódicas y mejorar la propuesta de valor con contenido exclusivo o asesorías más personalizadas.
- **Probabilidad**: 5
- **Impacto**: 8
- **Factor**: 40


### 1.4. Riesgos Operativos
#### Mantenimiento y actualización del contenido
- **Riesgo**: La ciencia de la nutrición infantil evoluciona constantemente, lo que puede volver obsoletas las recomendaciones de la app.
- **Mitigación**: Creación de un comité de voluntarios expertos en nutrición dispuestos a promocionar la correcta alimentación infantil mediante nuestro sistema y actualizaciones periódicas basadas en nuevos estudios.
- **Probabilidad**: 3
- **Impacto**: 4
- **Factor**: 12

#### Soporte y atención al cliente
- **Riesgo**: Usuarios con problemas en la app pueden abandonar el servicio si no reciben asistencia adecuada.
- **Mitigación**: Implementación de un sistema de soporte eficiente (chatbots, FAQ, asistencia humana en horarios clave).
- **Probabilidad**:4
- **Impacto**: 7
- **Factor**: 28

#### Riesgos de reputación y confianza
- **Riesgo**: Un fallo grave en la plataforma, una recomendación errónea o problemas de seguridad pueden dañar la reputación de la aplicación y disminuir la confianza de los usuarios.
- **Mitigación**: Estrategia de comunicación de crisis, monitoreo constante de redes sociales y canales de soporte para responder rápidamente a quejas o incidentes.
- **Probabilidad**: 2
- **Impacto**: 4
- **Factor**: 8

#### Riesgo de desactualización de la base de datos de alergias y dietas especiales
- **Riesgo**: La app detecta alergias y recomienda dietas específicas, pero si la base de datos no se actualiza con nuevas investigaciones, los consejos podrían quedar obsoletos.
- **Mitigación**: Implementación de un equipo de actualización de contenido y colaboración con entidades médicas para recibir información actualizada.
- **Probabilidad**: 3
- **Impacto**: 5
- **Factor**: 15


## 2. Tabla de priorización de riesgos
**(ordenada de mayor a menor prioridad)**

| #     | Riesgo                                                                         | Factor | Prioridad |
|-------|--------------------------------------------------------------------------------|:------:|:---------:|
| 1.1.1 | Seguridad de la información y privacidad                                       | 80     | 1         |
| 1.3.4 | Dependencia de profesionales para generar contenido                            | 64     | 2         |
| 1.1.3 | Escalabilidad y rendimiento                                                    | 54     | 3         |
| 1.1.4 | Algoritmos de recomendación y personalización                                  | 54     | 4         |
| 1.2.2 | Responsabilidad médica                                                         | 50     | 5         |
| 1.3.2 | Modelo de monetización                                                         | 50     | 6         |
| 1.3.3 | Competencia                                                                    | 50     | 7         |
| 1.3.5 | Riesgo de baja adopción del modelo de pago                                     | 40     | 8         |
| 1.3.1 | Adopción y retención de usuarios                                               | 32     | 9         |
| 1.4.2 | Soporte y atención al cliente                                                  | 28     | 10        |
| 1.2.1 | Cumplimiento normativo                                                         | 21     | 11        |
| 1.1.2 | Fiabilidad y precisión de datos                                                | 16     | 12        |
| 1.4.4 | Riesgo de desactualización de la base de datos de alergias y dietas especiales | 15     | 13        |
| 1.2.3 | Gestión de consentimiento y control parental                                   | 14     | 14        |
| 1.4.3 | Riesgos de reputación y confianza                                              | 8      | 15        |
| 1.4.1 | Mantenimiento y actualización del contenido                                    | 12     | 16        |

## 3. Análisis sobre la evolución de lo riesgos
### Riesgo # 1
- **Fecha de Identificación**: 27/02/2025
- **Descripción del Riesgo**: No hemos tenido una buena organización de las tareas lo que se ha visto reflejado en un retraso en el desarrollo de la aplicación.
- **Categoría**:  Operativo
- **Probabilidad de Ocurrencia**: Media
- **Impacto**: Alto
- **Responsable**:: Riesgo General
- **Estrategia de Mitigación**: 
    - Implementación de un sistema de gestión de tareas más eficiente
    - Reuniones de seguimiento semanal
    - Mejorar la comunicación en plataformas adecuadas
    - Optimización de la asignación de tareas
    - Monitoreo y corrección continua
    - Revisión constante de la planificación
    - Mejorar la documentación interna
- **Estado**: Mitigado
- **Fecha de Resolución**: 18/03/2025
- **Notas / Observaciones**: A día de hoy, el equipo ha mejorado considerablemente su organización, logrando trabajar de manera más eficiente y efectiva. Como resultado, el caos que anteriormente afectaba al equipo ha desaparecido.
Este riesgo ha sido resuelto con éxito gracias a la implementación del plan de mitigación, siendo el factor más determinante la optimización en la asignación de tareas.
- **Lecciones aprendidas**:Hemos aprendido la importancia de una buena gestión y comunicación dentro del equipo así como la importancia que tiene un trabajo bien hecho y seguido.
### Riesgo # 2
- **Fecha de Identificación**: 18/03/2025
- **Descripción del Riesgo**: Nuestro plan de prueba de Google Cloud finalizó, impidiendo que los usuarios pilotos realizarán la evaluación.
- **Categoría**:  Técnico
- **Probabilidad de Ocurrencia**: Alta
- **Impacto**: Alto
- **Responsable**: Miguel Galán Lerate
- **Estrategia de Mitigación**: Se está valorando la opción de usar render o seguir usando Google Cloud, ya sea con otro código de activación o bien con un plan pagado.
- **Estado**: Pendiente
- **Fecha de Resolución**: No aplica
- **Notas / Observaciones**: Pendiente de mitigación.
- **Lecciones aprendidas**:Es importante anticipar la expiración de los planes gratuitos y contar con una estrategia de contingencia para evitar interrupciones en el servicio.

