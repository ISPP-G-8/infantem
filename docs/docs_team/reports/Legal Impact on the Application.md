# IMPACTO LEGAL EN LA APLICACIÓN

![Portada](../images/Infantem.png)

**Fecha:** 18/02/2025  
**Grupo 8:** Infantem  
**Ideando un proyecto**

**Autores:**
- Álvaro Jiménez Osuna  
- Ángela López Oliva  
- Antonio Jiménez Ortega  
- Daniel del Castillo Piñero  
- David Fuentelsaz Rodríguez  
- David Vargas Muñiz  
- Enrique García Abadía  
- Felipe Solís Agudo  
- Javier Santos Martín  
- Javier Ulecia García  
- José García de Tejada Delgado  
- Jose Maria Morgado Prudencio  
- Josué Rodríguez López  
- Lucía Noya Cano  
- Luis Giraldo Santiago  
- Miguel Galán Lerate  
- Paula Luna Navarro  

---

## Índice

1. [Introducción](#introducción)  
2. [Marco Normativo Aplicable](#marco-normativo-aplicable)  
3. [Impacto Legal por Áreas](#impacto-legal-por-áreas)  
   3.1. [Tratamiento de Datos de Menores](#31-tratamiento-de-datos-de-menores)  
   3.2. [Tratamiento de Datos de Salud](#32-tratamiento-de-datos-de-salud)  
   3.3. [Obligaciones de Seguridad de la Información](#33-obligaciones-de-seguridad-de-la-información)  
   3.4. [Transparencia: Aviso Legal, Política de Privacidad y Cookies](#34-transparencia-aviso-legal-política-de-privacidad-y-cookies)  
   3.5. [Consentimiento Explícito](#35-consentimiento-explícito)  
   3.6. [Registro de Actividades de Tratamiento](#36-registro-de-actividades-de-tratamiento)  
   3.7. [Derechos ARCO-POL](#37-derechos-arco-pol)  
   3.8. [Transferencia Internacional de Datos](#38-transferencia-internacional-de-datos)  
   3.9. [Analítica o Perfilado](#39-analítica-o-perfilado)  
   3.10. [Relación con Terceros (Encargados de Tratamiento)](#310-relación-con-terceros-encargados-de-tratamiento)  
   3.11. [Compromiso Legal Interno del Equipo](#311-compromiso-legal-interno-del-equipo)  
4. [Acciones Necesarias o Recomendadas](#acciones-necesarias-o-recomendadas)  
5. [Conclusiones](#conclusiones)  

---

## Introducción

Este informe recoge el análisis legal del cumplimiento normativo en materia de protección de datos y seguridad aplicable a la aplicación **Infantem**, enfocada en el uso por menores y/o sus tutores, y el tratamiento de información especialmente sensible (como alergias).

---

## Marco Normativo Aplicable

- Reglamento (UE) 2016/679 (RGPD)  
- Ley Orgánica 3/2018 de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD)  
- Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE)  
- Esquema Nacional de Seguridad (ENS)  
- Data Privacy Framework (EE.UU.)  

---

## Impacto Legal por Áreas

### 3.1. Tratamiento de Datos de Menores

**Ley aplicable:** RGPD + LOPDGDD  
**Impacto:**
- Solo es posible tratar datos de menores con consentimiento explícito y verificable del padre/madre/tutor legal.  
- No debe permitirse el registro autónomo por parte de menores.  
- La aplicación debe implementar mecanismos de verificación parental.  

### 3.2. Tratamiento de Datos de Salud

**Ley aplicable:** Art. 9 RGPD  
**Impacto:**
- Los datos como alergias o intolerancias son considerados especialmente sensibles.  
- Se requiere consentimiento explícito e informado.  
- Deben implementarse medidas de seguridad reforzadas: cifrado, pseudonimización, control de accesos.  

### 3.3. Obligaciones de Seguridad de la Información

**Ley aplicable:** RGPD + ENS (si se colabora con entidades públicas)  
**Impacto:**
- Aplicar medidas técnicas y organizativas adecuadas:
  - Cifrado de datos  
  - Autenticación fuerte  
  - Control de accesos  
  - Registro de incidentes  
  - Backups seguros  

### 3.4. Transparencia: Aviso Legal, Política de Privacidad y Cookies

**Ley aplicable:** RGPD + LSSI-CE  
**Impacto:**
- Deben incluirse en la app:
  - Aviso Legal  
  - Política de Privacidad  
  - Política de Cookies (si hay analítica o seguimiento)  
- El usuario debe aceptar dichas políticas de forma libre, informada y verificable.  

### 3.5. Consentimiento Explícito

**Ley aplicable:** RGPD, arts. 6 y 7  
**Impacto:**
- No se puede asumir el consentimiento por el uso de la app.  
- Es obligatorio recogerlo de forma expresa y documentada.  
- Debe guardarse prueba del consentimiento (fecha, IP, versión de las condiciones).  

### 3.6. Registro de Actividades de Tratamiento

**Ley aplicable:** RGPD, art. 30  
**Impacto:**
- Es obligatorio si se tratan datos sensibles o de manera habitual.  
- Debe documentarse:
  - Qué datos se recogen  
  - Para qué finalidad  
  - Quién accede  
  - Medidas de seguridad aplicadas  

### 3.7. Derechos ARCO-POL

**Ley aplicable:** RGPD + LOPDGDD  
**Impacto:**
- La app debe permitir al usuario:
  - Acceder, rectificar o eliminar sus datos  
  - Limitar u oponerse al tratamiento  
  - Solicitar portabilidad  
- Se debe responder en un plazo máximo de 30 días.  

### 3.8. Transferencia Internacional de Datos

**Ley aplicable:** RGPD, Capítulo V  
**Impacto:**
- Si se usan servicios como Firebase, AWS u otros fuera del EEE:
  - Deben existir garantías adecuadas (SCCs o Data Privacy Framework)  
  - Se debe informar en la política de privacidad  

### 3.9. Analítica o Perfilado

**Ley aplicable:** RGPD + LSSI  
**Impacto:**
- Si se realiza seguimiento de usuarios o recomendaciones personalizadas:
  - Se requiere consentimiento específico  
  - Debe permitirse rechazar el perfilado  

### 3.10. Relación con Terceros (Encargados de Tratamiento)

**Ley aplicable:** RGPD, art. 28  
**Impacto:**
- Debe firmarse un Contrato de Encargado de Tratamiento (DPA) con terceros que acceden a los datos.  
- Se debe asegurar que dichos terceros cumplen el RGPD.  

### 3.11. Compromiso Legal Interno del Equipo

**Ley aplicable:** RGPD + LOPDGDD  
**Impacto:**
- Cada miembro del equipo debe firmar un acuerdo de confidencialidad.  
- Aplicar el principio de mínimos privilegios.  
- Formación básica en protección de datos.  
- Definir consecuencias ante incumplimientos.  

---

## Acciones Necesarias o Recomendadas

A partir del análisis legal anterior, se identifican las siguientes acciones que deben implementarse para cumplir la normativa:

1. **Verificación de consentimiento parental**
   - Implementar un sistema que recoja y registre el consentimiento explícito del tutor legal  
   - Bloquear el acceso a menores sin ese consentimiento  

2. **Protección reforzada de datos de salud**
   - Cifrado en base de datos para campos sensibles  
   - Control de accesos internos (solo personal autorizado)  
   - Pseudonimización o anonimización para analítica  

3. **Inclusión de textos legales visibles**
   - Política de Privacidad  
   - Aviso Legal  
   - Política de Cookies (si aplica)  
   - Mostrar aceptación en el primer inicio de sesión  

4. **Registro de consentimiento**
   - Guardar prueba documental: fecha, IP, versión del texto legal aceptado  

5. **Facilitar ejercicio de derechos ARCO-POL**
   - Botón o email para ejercer derechos  
   - Establecer respuesta en máximo 30 días  

6. **Auditoría de proveedores externos**
   - Verificar si transfieren datos fuera del EEE  
   - Firmar DPA con ellos  
   - Verificar si cumplen SCCs o Data Privacy Framework  

7. **Mecanismo para rechazar analítica o perfilado**
   - Solicitar consentimiento  
   - Opción de desactivación desde la app  

8. **Registro interno de actividades de tratamiento**
   - Documento que recoja: datos, finalidad, seguridad, terceros, conservación  

9. **Compromiso legal interno del equipo**
   - Firmar acuerdos de confidencialidad  
   - Aplicar mínimo privilegio en accesos  

10. **Plan de respuesta ante brechas**
    - Documento con pasos en caso de incidente de seguridad  
    - Procedimiento para notificar a AEPD en 72 horas  

---

## Conclusiones

La aplicación **Infantem** debe adoptar una serie de medidas legales, técnicas y organizativas para garantizar la protección de los datos personales, especialmente de menores y datos de salud. El cumplimiento con el **RGPD**, la **LOPDGDD** y la **LSSI-CE** no solo es una obligación legal, sino una garantía de confianza y seguridad para los usuarios y para el éxito de la aplicación.
