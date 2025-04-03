# Analisis sobre la evolucion de las soluciones implementadas

![Portada](../../images/Infantem.png)


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

---

## Colaboradores del documento
- Luis Giraldo
  - Actualizó el documento para el sprint 3.

- Jose Morgado
  - Analizó las soluciones propuestas en las incidencias del backend.


## 1. Introduccion

En esta sección se estudia la evolución de las incidencias detectadas durante el Sprint 2, examinando tanto su origen como su impacto en el desarrollo del proyecto. Se analizan los problemas reportados, las áreas afectadas y la frecuencia con la que han ocurrido, con el objetivo de comprender mejor su naturaleza y determinar patrones recurrentes.

Además, se evalúa el efecto de las soluciones propuestas, midiendo su eficacia a través de métricas relevantes. Esto incluye la comparación del estado inicial y final de las incidencias, el análisis de las mejoras obtenidas y la identificación de posibles ajustes adicionales para optimizar el proceso.

Este análisis permitirá extraer aprendizajes clave y establecer buenas prácticas para prevenir futuros problemas, asegurando una mejora continua en la calidad del código y la eficiencia del desarrollo.

## 2. Frontend

En este apartado se estudia la evolucion de las incidencias que han tenido lugar en el frontend:


# 3. Backend

En este apartado se estudia la evolucion de las incidencias que han tenido lugar en el frontend:


### 3.1 Incidencia 1:

- Incidencia: No se complian los estandares minimos de calidad en el codigo.

- Solucion aportada: Se reescribio gran parte del codigo desde cero.

- Metrica usada para su evaluacion: Analisis de calidad de SonarQube.

- Evolucion de la incidencia:

### 3.2 Incidencia 2:

- Incidencia: Hubo un problema de comunicación entre backend y frontend al refactorizar las recetas para añadir filtros, lo que llevó a cambiar los endpoints sin actualizar el frontend.

- Solucion aportada: Actualizar el frontend.

- Metrica usada para su evaluacion: Funcionamiento de los filtros en el frontend.

- Evolucion de la incidencia: Los filtros siguen presentando fallos y no funcionan completamente bien.

### 3.3 Incidencia 3:

- Incidencia: A última hora surgió un problema que impedía borrar un bebé debido a un fallo en la relación entre *Intake* e *IntakeSymptoms*.

- Solucion aportada: Depuración y corrección del código para asegurar su estabilidad y calidad.

- Metrica usada para su evaluacion: Funcionamiento del delete de la entidad baby.

- Evolucion de la incidencia: El error se ha solucionado y el delete en la entidad bebe funciona correctamente.

### 3.4 Incidencia 4:

- Incidencia: Falta de tests.

- Solucion aportada: Implementar mas tests en las distintas entidades.

- Metrica usada para su evaluacion: Numero de tests implementados.

- Evolucion de la incidencia: El número de tests ha aumentado, pero aún quedan muchos por desarrollar.

### 3.5 Incidencia 5:

- Incidencia: Nos enteramos tarde de que el requisito de validacion de email debia ser entregado en el Sprint 2.

- Solucion aportada: Reestructuracion de las tareas para priorizar el requisito faltante.

- Metrica usada para su evaluacion: Entrega del requisito.

- Evolucion de la incidencia: El requisito se entrego correctamente.
