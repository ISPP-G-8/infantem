# Análisis de la Calidad del Código con SonarQube 2

![Portada](../imagenes/Infantem.png)

**Fecha:** 27/03/2025  
**Grupo 8:** Infantem  
**Sprint 2**

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
- **Paula Luna Navarro**

##  Introducción  
Este documento proporciona un análisis de la calidad del código del proyecto, basado en el escaneo realizado con **SonarQube**. Se detallan métricas clave, puntos fuertes, áreas de mejora y un plan de acción para optimizar la calidad del código.

---

##  Aspectos Positivos  
###  Buenas prácticas detectadas  
- ✔️ **Uso adecuado de convenciones de código y estándares de desarrollo.**  
- ✔️ **Aplicación de principios SOLID y modularidad en el diseño.**  
- ✔️ **Integración con SonarQube para el monitoreo continuo de la calidad del código.**  
- ✔️ **Bajo nivel de código duplicado (1.3% estimado tras merge, 0.1% actual).**  
- ✔️ **Organización modular por carpetas con separación clara de responsabilidades.**

---

##  Métricas Clave de SonarQube  
**Fecha del análisis:** 📅 *27/03/2025*  

| Métrica                         | Valor                |
|----------------------------------|----------------------|
| **Calidad del código**          | 🔴 *Failed*          |
| **Cobertura de pruebas**        | *52.5%* (Requerido ≥ 80%) |
| **Cobertura de condiciones**    | *42.8%*              |
| **Líneas sin cubrir**           | *426*                |
| **Bugs detectados**             | *4*                  |
| **Vulnerabilidades**            | *0*                  |
| **Security Hotspots**           | *3* (0% revisados)   |
| **Código duplicado**            | *0.1%*               |
| **Debt Ratio**                  | *0.0%*               |
| **Complejidad ciclomática**     | *531*                |

---

## Áreas de Mejora  
### Problemas detectados en SonarQube  
1. **Calidad general fallida:** El análisis no ha pasado el Quality Gate debido a:
   - Cobertura insuficiente (*52.5%* < *80%*).
   - 0% de hotspots de seguridad revisados (3 detectados).
2. **Código duplicado:** *0.1%* en esta rama (*1.3%* estimado tras merge) en:
   - `JwtResponse.java`, `BabyDTO.java`, `favorites.tsx`, `index.tsx`, `Baby.java`
3. **Complejidad ciclomática elevada:** Total de 531, con mayor carga en:
   - `frontend` (217), `src` (314), `auth` (24), `user` (26), `recipe` (23), `baby` (20)
4. **Baja cobertura de pruebas:** Cobertura actual *52.5%*, condiciones cubiertas *42.8%*.
5. **Security Hotspots:** 3 detectados, ninguno revisado (0%), puede implicar riesgos potenciales.
6. **277 issues abiertos:** A revisar desde el [panel de incidencias](https://sonarcloud.io/project/issues?issueStatuses=OPEN%2CCONFIRMED&pullRequest=277&id=ISPP-G-8_infantem)

---

## Plan de Mejora  
###  Acciones recomendadas  

✅ **Reducir código duplicado:**  
- Refactorizar estructuras repetidas en:
  - `JwtResponse.java`, `BabyDTO.java`, `favorites.tsx`, `index.tsx`, `Baby.java`
- Aplicar principios DRY y patrones reutilizables.

✅ **Mejorar cobertura de pruebas:**  
- Aumentar la cobertura al menos al 80% en líneas y condiciones.
- Priorizar módulos como `auth`, `user`, `recipe`.

✅ **Reducir la complejidad ciclomática:**  
- Dividir funciones complejas en métodos más simples.
- Reestructurar módulos con lógica densa como `frontend` y `src`.

✅ **Revisar hotspots de seguridad:**  
- Validar y revisar los 3 hotspots detectados.
- Aplicar controles de seguridad y sanitización.

✅ **Controlar issues pendientes:**  
- Revisar los 277 issues abiertos en esta rama.
- Clasificar por prioridad y asignar tareas para resolución progresiva.

---

##  Conclusión  
El análisis de **SonarQube** evidencia áreas sólidas como una arquitectura modular y baja duplicación, pero también resalta importantes áreas de mejora, especialmente en **cobertura de pruebas**, **hotspots de seguridad** y **complejidad**. El objetivo en el siguiente sprint debe centrarse en superar el Quality Gate y mejorar la calidad continua del código.

📎 **Enlace al análisis completo:**  
[🔗 Ver análisis en SonarCloud (rama `main`)](https://sonarcloud.io/summary/new_code?id=ISPP-G-8_infantem&pullRequest=277)  

