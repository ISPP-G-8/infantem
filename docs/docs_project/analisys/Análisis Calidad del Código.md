# Análisis de la Calidad del Código con SonarQube 1

![Portada](../imagenes/Infantem.png)


**Fecha:** 19/03/2025  
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

## Introducción  
Este documento proporciona un análisis de la calidad del código del proyecto, basado en el escaneo realizado con **SonarQube**. Se detallan métricas clave, puntos fuertes, áreas de mejora y un plan de acción para optimizar la calidad del código.

---

##  Aspectos Positivos  
### Buenas prácticas detectadas  
- ✔️ **Uso adecuado de convenciones de código y estándares de desarrollo.**  
  El proyecto sigue convenciones comunes y buenas prácticas en el uso de nombres, indentación y organización de archivos.
  
- ✔️ **Aplicación de principios SOLID y modularidad en el diseño.**  
  El diseño general del sistema refleja principios SOLID, lo que favorece la escalabilidad y mantenibilidad del proyecto.

- ✔️ **Ausencia de vulnerabilidades críticas detectadas en el análisis.**  
  No se han encontrado vulnerabilidades críticas en el código, lo que asegura la seguridad del proyecto en términos de exposición de datos sensibles.

- ✔️ **Integración con SonarQube para el monitoreo continuo de la calidad del código.**  
  El proyecto está configurado para integrarse con SonarQube, permitiendo un monitoreo constante de la calidad del código y la identificación temprana de problemas.
  
- ✔️ **Control de la duplicación de código (baja duplicación).**  
  El nivel de duplicación del código es bajo (0.9%), lo que indica que el código está bien estructurado y se evita la repetición innecesaria.

- ✔️**Ciclimática optimizada en la mayoría de los módulos.**  
  A pesar de que algunos módulos tienen una complejidad ciclomática alta, la mayoría sigue buenas prácticas de diseño modular y las funciones son manejables.

- ✔️ **Uso de herramientas de integración continua (CI/CD).**  
  El proyecto tiene configuradas herramientas de CI/CD que permiten verificar la calidad y la cobertura de las pruebas en cada commit, garantizando un proceso de desarrollo ágil y controlado.


---

##  Métricas Clave de SonarQube  
**Fecha del análisis:** 📅 *[19/03/2025]*  

| Métrica                  | Valor  |
|--------------------------|--------|
| **Calidad del código**   | 🟢A |
| **Cobertura de pruebas** | *0.0%* |
| **Bugs detectados**      | *4*  |
| **Vulnerabilidades**     | *0*  |
| **Código duplicado**     | *0.9%* |
| **Debt Ratio**           | *0.0%* |
| **Complejidad ciclomática** | *531* |

---

##  Áreas de Mejora  
### Problemas detectados en SonarQube  
1. **Código duplicado:** *0.9%* del código se encuentra duplicado en los siguientes archivos:
   - **JwtResponse.java** (65.6% de duplicación en 21 líneas)
   - **JwtResponse.java** (65.6% de duplicación en 21 líneas)
   - **BabyDTO.java** (42.9% de duplicación en 21 líneas)
   - **favorites.tsx** (27.7% de duplicación en 26 líneas)
   - **index.tsx** (18.2% de duplicación en 56 líneas)
   - **Baby.java** (17.5% de duplicación en 21 líneas) 
2. **Complejidad ciclomática elevada:** Algunas funciones en los siguientes módulos tienen una complejidad ciclomática elevada:
   - **Complejidad total:** 531
   - Módulos con alta complejidad ciclomática:
     - **frontend**: 217
     - **src**: 314
     - **auth**: 24
     - **baby**: 20
     - **user**: 26
     - **recipe**: 23
     - **vaccine**: 11
     - Y otros módulos como `allergen`, `foodNutrient`, `milestone`, entre otros, también presentan valores elevados.
3. **Baja cobertura de pruebas:** La cobertura de código por pruebas unitarias es de *0%*, lo que podría afectar la mantenibilidad.  
4. **Vulnerabilidades detectadas:** *0* vulnerabilidades identificadas
5. **Code Smells:** *0* problemas de calidad que afectan la legibilidad y mantenibilidad del código.  

---

##  Plan de Mejora  
### Acciones recomendadas  

✅ **Reducir código duplicado:**  
- Aplicar refactorización en los siguientes archivos/módulos:
  - `JwtResponse.java` (65.6% de duplicación en 21 líneas)
  - `BabyDTO.java` (42.9% de duplicación en 21 líneas)
  - `favorites.tsx` (27.7% de duplicación en 26 líneas)
  - `index.tsx` (18.2% de duplicación en 56 líneas)
  - `Baby.java` (17.5% de duplicación en 21 líneas)  
- Usar herencia o composición para evitar duplicación innecesaria y mejorar la reutilización del código.

✅ **Optimizar la complejidad ciclomática:**  
- Dividir funciones grandes en métodos más pequeños y manejables.  
- Aplicar patrones de diseño como *Strategy*, *Command* o *Observer* para mejorar la modularidad y legibilidad del código.  
- Reducir la complejidad en módulos con alta ciclomática, como:
  - **frontend**: 217
  - **src**: 314
  - **auth**: 24
  - **baby**: 20
  - **user**: 26

✅ **Aumentar la cobertura de pruebas:**  
- Implementar pruebas unitarias y de integración en los siguientes módulos críticos:
  - **auth**  
  - **baby**  
  - **recipe**  
- Establecer un umbral mínimo de cobertura en el pipeline de CI/CD (por ejemplo, 80%).

✅ **Corregir vulnerabilidades:**  
- Revisar y mitigar las vulnerabilidades críticas identificadas, como posibles inyecciones de SQL o exposición de datos sensibles.  
- Aplicar buenas prácticas de seguridad en el código:
  - Sanitizar entradas de usuario.
  - Asegurar la comunicación cifrada.
  - Validar correctamente los datos antes de procesarlos.

✅ **Mejorar la mantenibilidad:**  
- Resolver *code smells* detectados en el análisis, como nombres de variables poco claros y lógica excesivamente compleja en funciones.  
- Usar herramientas de formateo y linters (como *Prettier* o *ESLint*) para garantizar estándares de código y mejorar la legibilidad.

---

## Conclusión  
El análisis de **SonarQube** ha permitido detectar fortalezas y oportunidades de mejora en el código. Con la implementación del plan de acción, se espera optimizar la calidad, seguridad y mantenibilidad del proyecto, reduciendo los problemas de duplicación, complejidad y vulnerabilidades.   

📎 **Enlace al análisis en SonarQube:** 🔗 *https://sonarcloud.io/summary/overall?id=ISPP-G-8_infantem&branch=main*
