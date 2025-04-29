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
- Paula Luna 
  - Reviso el documento

# Índice

- [1. Introducción](#1-introduccion)
- [2. Frontend](#2-frontend)
  - [2.1 Incidencia 1](#21-incidencia-1)
  - [2.2 Incidencia 2](#22-incidencia-2)
  - [2.3 Incidencia 3](#23-incidencia-3)
  - [2.4 Incidencia 4](#24-incidencia-4)
  - [2.5 Incidencia 5](#25-incidencia-5)
- [3. Backend](#3-backend)
  - [3.1 Incidencia 1](#31-incidencia-1)
  - [3.2 Incidencia 2](#32-incidencia-2)
  - [3.3 Incidencia 3](#33-incidencia-3)
  - [3.4 Incidencia 4](#34-incidencia-4)
  - [3.5 Incidencia 5](#35-incidencia-5)


## 1. Introduccion

En esta sección se estudia la evolución de las incidencias detectadas durante el Sprint 2, examinando tanto su origen como su impacto en el desarrollo del proyecto. Se analizan los problemas reportados, las áreas afectadas y la frecuencia con la que han ocurrido, con el objetivo de comprender mejor su naturaleza y determinar patrones recurrentes.

Además, se evalúa el efecto de las soluciones propuestas, midiendo su eficacia a través de métricas relevantes. Esto incluye la comparación del estado inicial y final de las incidencias, el análisis de las mejoras obtenidas y la identificación de posibles ajustes adicionales para optimizar el proceso.

Este análisis permitirá extraer aprendizajes clave y establecer buenas prácticas para prevenir futuros problemas, asegurando una mejora continua en la calidad del código y la eficiencia del desarrollo.

## 2. Frontend

En este apartado se estudia la evolución de las incidencias que han tenido lugar en el frontend:

### 2.1 Incidencia 1:
- **Incidencia:** Las recetas del usuario y las recomendadas por el sistema según la edad del bebé dejaron de mostrarse en la app.  
- **Solución aportada:** Revisar los endpoints en frontend a los que se les hace peticiones para obtener las recetas.  
- **Métrica usada para su evaluación:** Se podía comprobar que en el frontend no aparecía ninguna de las recetas comentadas.  
- **Evolución de la incidencia:** Se ha conseguido arreglar el fallo haciendo peticiones a los endpoints correctos.  

### 2.2 Incidencia 2:
- **Incidencia:** Los inputs de la pasarela de pago no son completamente visibles al usuario.  
- **Solución aportada:** Revisión de la documentación de Stripe para averiguar la forma de disponer correctamente dichos inputs.  
- **Métrica usada para su evaluación:** Visibilidad de los inputs (75% aprox: solo se ven 3 de 4 inputs).  
- **Evolución de la incidencia:** Su solución aún no ha sido llevada a cabo.  

### 2.3 Incidencia 3:
- **Incidencia:** Dificultad para aplicar los estilos correctos al modal de Términos y condiciones legales.  
- **Solución aportada:** Crear un componente aparte y aplicar los estilos correspondientes en el mismo para que no se solapen con los de otros componentes de la pantalla en la que se usa el modal.  
- **Métrica usada para su evaluación:** En el frontend se podía comprobar que en el modal no se podían aplicar los márgenes correctamente, además de que la lista no hacía scroll.  
- **Evolución de la incidencia:** Ya ha sido resuelta.  

### 2.4 Incidencia 4:
- Incidencia: el formulario de registro de usuario no validaba correctamente los datos introducidos, inclumpliendo algunas reglas de negocio.
- Solución aportada: se han implementado validaciones en todos los campos, especialmente para comprobar si el nombre de usuario y el correo existen, o que la contraseña cumplía cierto formato.
- Métrica usada para su evaluación: el sistema permite el registro de los nuevos usuarios a pesar del incumplimiento de las reglas de negocio.
- Evolución de la incidencia: actualmente, todos los datos introducidos en el formulario son correctamente validados y se muestran por pantalla los posibles errores.

### 2.5 Incidencia 5:
- Incidencia: la paginación de la vista de recetas no funciona correctamente.
- Solución aportada: revisar los errores actuales y que causan el fallo.
- Métrica usada para su evaluación: no se muestra ningún elemento que permita paginar las recetas. 
- Evolución de la incidencia: aún no se ha llevado a cabo su resolución.
# 3. Backend

## 3. Backend

En este apartado se estudia la evolución de las incidencias que han tenido lugar en el backend:

### 3.1 Incidencia 1:
- **Incidencia:** No se cumplían los estándares mínimos de calidad en el código.  
- **Solución aportada:** Se reescribió gran parte del código desde cero.  
- **Métrica usada para su evaluación:** Análisis de calidad de SonarQube.  
- **Evolución de la incidencia:**  

### 3.2 Incidencia 2:
- **Incidencia:** Hubo un problema de comunicación entre backend y frontend al refactorizar las recetas para añadir filtros, lo que llevó a cambiar los endpoints sin actualizar el frontend.  
- **Solución aportada:** Actualizar el frontend.  
- **Métrica usada para su evaluación:** Funcionamiento de los filtros en el frontend.  
- **Evolución de la incidencia:** Los filtros siguen presentando fallos y no funcionan completamente bien.  

### 3.3 Incidencia 3:
- **Incidencia:** A última hora surgió un problema que impedía borrar un bebé debido a un fallo en la relación entre *Intake* e *IntakeSymptoms*.  
- **Solución aportada:** Depuración y corrección del código para asegurar su estabilidad y calidad.  
- **Métrica usada para su evaluación:** Funcionamiento del *delete* de la entidad *baby*.  
- **Evolución de la incidencia:** El error se ha solucionado y el *delete* en la entidad *baby* funciona correctamente.  

### 3.4 Incidencia 4:
- **Incidencia:** Falta de tests.  
- **Solución aportada:** Implementar más tests en las distintas entidades.  
- **Métrica usada para su evaluación:** Número de tests implementados.  
- **Evolución de la incidencia:** El número de tests ha aumentado, pero aún quedan muchos por desarrollar.  

### 3.5 Incidencia 5:
- **Incidencia:** Nos enteramos tarde de que el requisito de validación de email debía ser entregado en el Sprint 2.  
- **Solución aportada:** Reestructuración de las tareas para priorizar el requisito faltante.  
- **Métrica usada para su evaluación:** Entrega del requisito.  
- **Evolución de la incidencia:** El requisito se entregó correctamente.  
