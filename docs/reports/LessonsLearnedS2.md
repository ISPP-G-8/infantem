# Plantilla del Sprint 3

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
- David Fuentelsaz Rodríguez
- Enrique García Abadía


## Índice
- [Análisis de condiciones de fallo](#analisis-condiciones-fallo)
- [Listado de problemas](#listado-problemas)
- [Metodología de desarrollo y roles del equipo](#metodologia-roles-equipo)
- [Análisis de los problemas](#analisis-problemas)


### Análisis de condiciones de fallo

Las ocho primeras condiciones de fallo (T-1 hasta T-8) han sido analizadas por el equipo, concluyendo que todas ellas se han cumplido satisfactoriamente.

A partir de la condición T-9 se realizará un análisis más individualizado y exhaustivo.

#### Análisis de la condición T-9

En primer lugar, en el documento `revision.md` se detectaron los siguientes errores:

- Las interacciones con los casos de uso se reducen a un simple listado, sin incluir una explicación detallada de cada uno.
- No se suministraron los datos de prueba necesarios para validar la pasarela de pago (número de tarjeta, CVC y fecha de caducidad).
- El vídeo no se entregó correctamente, impidiendo su visualización a pesar de haberse subido.

#### Análisis de la condición T-10

En este caso, la aplicación presentaba los siguientes errores en el entorno de producción:

- Algunas funcionalidades no mostraban el comportamiento esperado, lo que impedía su prueba completa. Esto incluye la ausencia de datos visuales en determinadas vistas.
- Algunos formularios carecían de validaciones, lo que provocaba errores 400 sin manejo adecuado al introducir datos límite.
- Se detectaron incoherencias en los formatos de datos entre distintas vistas.



