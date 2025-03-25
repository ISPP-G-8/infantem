# Revision

<img src = "../../docs/imagenes/Infantem.png" width="320" />


**Fecha:** 13/03/2025  
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

## Colaboradores del documento
- Luis Giraldo
  - Creó la plantilla de los documentos
- Enrique García Abadía
  - Estructura general del documento
- José García de Tejada Delgado
  - Finalizado de los datos faltantes
---


## Índice
- [Interacciones con los casos de uso](#interacciones-con-los-casos-de-uso)
- [Colaboradores del documento](#colaboradores-del-documento)
- [Datos necesarios para la review](#datos-necesarios-para-la-review)
- [Requisitos para ejecutar el proyecto](#requisitos-para-ejecutar-el-proyecto)
- [Demo](#demo)

## Interacciones con los casos de uso

Los casos de uso que han sido desarrollados en este Sprint son los siguientes:

- Iniciar sesion (login, register y logout)
    - Al entrar en la página web, un nuevo usuario puede registrarse ingresando sus datos personales, lo cuál le iniciará sesión automáticamente
    - Al entrar en la página web teniendo ya una cuenta, un usuario puede acceder a una página de login en la que insertar su nombre de usuario y contraseña para iniciar sesión
    - Un usuario loggeado puede cerrar sesión en cualquier momento
- Gestion bebes (visualizar, editar, eliminar y crear bebe)
    - Al iniciar sesión, se puede acceder a tus bebés y sus datos personales
    - Al acceder a los datos de tu bebé, puedes alterarlos según vaya cambiando
    - Puedes eliminar del sistema a tus bebés si así lo deseas
    - Puedes añadir nuevos bebés al sistema ingresando los datos básicos del mismo
- Gestionar perfil (visualizar y editar perfil)
    - Un usuario loggeado puede ver sus propios datos personales, y actualizarlos (excepto la contraseña (no está implementado))
- Gestion recetas (visualizar segun rango de edad, visualizar mis recetas y crear receta)
    - Un usuario loggeado puede ver las recetas del sistema
    - Un usuario loggeado puede crear recetas propias, insertando los datos pertinentes
    - Un usuario loggeado puede borrar sus propias recetas en cualquier momento cuando acceda a ellas (sin implementar)
    - Un usuario loggeado puede filtrar las recetas del sistema según una edad (en meses) recomendada

## Datos necesarios para la review

Los datos necesarios para realizar la review son los siguientes:
- Credenciales:
    - Usuario con datos de prueba (username,password): user1,user
    - Usuario vacío (username,password): user2,user
    - Admin (username,password): admin,user
- Github repo url: https://github.com/ISPP-G-8/infantem
- Landing page url: https://infantem.vercel.app/
- Deployment platform url: https://console.cloud.google.com/home/dashboard?hl=es-419&inv=1&invt=Abr8QA&project=ispp-2425-g8-s1
- Deployment platform credentials: Se le ha dado permisos a los dos profesores para que puedan acceder libremente con sus cuentas de la universidad de sevilla
- Time tracking tool url (clockify): https://app.clockify.me
- Clockify credentials: Una invitación ha sido enviada al email de los 2 profesores de la asignatura para que puedan acceder a los datos. Aparte, se ha creado la siguiente cuenta y se la ha hecho miembro: email: invitado.ispp.g8@gmail.com contraseña: 01XZbJjfF2


## Requisitos para usar el proyecto

Actualmente no hay requisitos extra para usar el proyecto

## Demo

-Link demo: 
<video src="./video_S1_ISPP.mp4" width="640" height="480" controls></video>

(en caso de que el embed falle, el vídeo está en el siguiente link: https://github.com/ISPP-G-8/infantem/blob/main/docs/Sprint%201/video_S1_ISPP.mp4 )

