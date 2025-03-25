# CI/CD

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
- [Integración continua](#integración-continua)
- [Despliegue continuo](#despliegue-continuo)


## Colaboradores del documento
- Luis Giraldo
  - Creó el documento en md.

##  Introducción

Este documento define las políticas y prácticas para la integración y despliegue continuo (CI/CD) en el proyecto Infantem por parte del grupo G8. Se establecen las reglas para llevar a cabo un proceso automatizado en el flujo del desarrollo.

## Integración continua

La integración continua (CI) del proyecto se llevará a cabo utilizando Github Actions, con workflows automatizados que validen cada cambio en el código antes de su integración en la rama de producción (main).

### Estrategia de ramas

La estrategia y política de ramas puede ser encontrada en detalle en el documento [Políticas y procedimiento](../../docs_tools/policies/Políticas%20y%20procedimiento.md#política-de-ramas). Aquí se explicarán los conceptos principales para poder entender el buen funcionamiento de la integración continua.
- **Rama principal**. La rama ***main*** contiene el código listo para producción.
- **Ramas de desarrollo**.
  - La rama ***feat/*** donde se desarrollan nuevas funcionalidades.
  - La rama ***fix/*** donde se realizan arreglos de bugs.
  - La rama ***docs/*** donde se realizan cambios en la documentación.
- Todos los commits deberán seguir el estándar de **Conventional Commits**.

### Workflows automáticos con Github Actions
Se ejecutarán distintos workflows tras cada commit y PR para garantizar la estabilidad del código.

#### Verificación de Conventional Commits
Tras cada commit se lanzará una accion de Github Actions para validar que los commits cumplen con el estándar de **Conventional Commits**.

#### Pruebas Automáticas
Tras cada commit y PR se lanzarán los commits desarrollados por el equipo de pruebas para garantizar la estabilidad del código.
Será imprescindible que una Pull Request pase este workflow de test para poder aceptar el merge a la rama de producción **main**.


#### Linter y formateo de código
Tras cada commit se integrarán herramientas de linting y formateo para mantener un código uniforme, estas herramientas dependerá de si el código pertenece al frontend o al backend
De igual manera que lo anterior, será imprescindible que una Pull Request pase este workflow de test para poder aceptar el merge a la rama de producción **main**.


## Despliegue continuo

El despliegue de la aplicación, tanto el servidor backend como el servidor de la aplicación web de frontend, se llevará a cabo en Google App Engine, asegurando que cada sprint cuente con una versión independiente accesible a través de una URL específica.
Para este despliegue se implementará un sistema de despliegue continuo basado en la rama principal de producción **main**, utilizando un workflow mediante GitHub Actions.

### Workflows automáticos con Github Actions

#### Releases automáticas
Cuando en la rama de producción **main**, se reciba una tag con una versión nueva, se realizará de forma automática una release con dicha tag.
Ver [Políticas y procedimiento](../../docs_tools/policies/Políticas%20y%20procedimiento.md#política-de-versionado).

#### Despliegue automático
Cuando en la rama de producción **main**, se reciba un push, se realizará un despliegue automático en Google App Engine.

> Nota: Para el que tenga que desarrollar esto se recomienda ver: [deploy-appengine](https://github.com/google-github-actions/deploy-appengine)