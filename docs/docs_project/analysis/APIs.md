# APIs

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
  - Creó la plantilla de los documentos
  - Actualiza el documento al sprint 2.
  - Actualizó el documento al sprint 3.
- Javier Ulecia
  - Realizar documento.


## Índice
- [Introduccion](#introducción)
- [APIs usadas](#apis-usadas)
  - [Stripe](#stripe)


## Introducción

En este documento se detalla que hacer en caso de que una API externa deje de funcionar.

## APIs usadas

### Stripe
#### Riesgos potenciales
Las posibles opciones por las que Stripe deje de funcionar son:
- Fallo en la API: Stripe deja de procesar pagos temporales.
- Cambio en las condiciones: Aumentan las restricciones en el plan gratuito, las comisiones o los requisitos adicionales.
- Bloqueo de la cuenta: Retención de fondos o cierre de la cuenta por revisión de seguridad.
- Interrupción del servicio: Caida de los servidores de Stripe.

#### Estrategia de respaldo

Para garantizar la continuidad del sistema de pagos, se implementaran las siguientes acciones:
- Cambio de proveedor: Se configura un sistema que permite cambiar entre Stripe y un proveedor de pagos alternativo sin afectar la experiencia del usuario.
- Modo de operación manual: Se habilitará un método de pago en el que se guardarán los pagos en la base de datos sin llegar a procesarlos.

#### Implementación técnica
En caso de fallo, se implementa un servicio intermedio que permita cambiar de proveedor sin modificar la lógica del negocio.

Si falla, se activa un sistema donde los pagos se registran para ser procesados posteriormente.

#### Plan de acción en caso de fallo

| **Escenario**              | **Acción Inmediata**          | **Acción Secundaria**       | **Tiempo de Recuperación Estimado** |
|----------------------------|------------------------------|----------------------------|--------------------------------------|
| API de Stripe cae         | Activar proveedor secundario | Modo manual                | 5-15 min                             |
| Cambio de condiciones     | Evaluar costos y alternativas | Negociación con inversores | 1-2 días                             |
| Cuenta bloqueada          | Contacto con soporte        | Activar respaldo manual    | 1-7 días                             |
| Stripe deja de existir    | Migrar a otro proveedor      | Implementar pagos locales  | 1-2 semanas                          |