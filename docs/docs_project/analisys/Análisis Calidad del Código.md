# Análisis de la Calidad del Código con SonarQube

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

## 🔍 Introducción  
Este documento proporciona un análisis de la calidad del código del proyecto, basado en el escaneo realizado con **SonarQube**. Se detallan métricas clave, puntos fuertes, áreas de mejora y un plan de acción para optimizar la calidad del código.

---

## ✅ Aspectos Positivos  
### 🏆 Buenas prácticas detectadas  
- [✔️] Uso adecuado de convenciones de código y estándares de desarrollo.  
- [✔️] Implementación de principios SOLID y modularidad en el diseño.  
- [✔️] Ausencia de vulnerabilidades críticas detectadas en el análisis.  
- [✔️] Integración con **SonarQube** para el monitoreo continuo de la calidad del código.  

---

## 📊 Métricas Clave de SonarQube  
**Fecha del análisis:** 📅 *[dd/mm/aaaa]*  

| Métrica                  | Valor  |
|--------------------------|--------|
| **Calidad del código**   | 🟢 / 🟡 / 🔴 *[A/B/C/D/E]* |
| **Cobertura de pruebas** | *[X]%* |
| **Bugs detectados**      | *[X]*  |
| **Vulnerabilidades**     | *[X]*  |
| **Código duplicado**     | *[X]%* |
| **Debt Ratio**           | *[X.X]%* |
| **Complejidad ciclomática** | *[X]* |

---

## ⚠️ Áreas de Mejora  
### 🚨 Problemas detectados en SonarQube  
1. **Código duplicado:** *[X]%* del código se encuentra duplicado en *[módulos afectados]*.  
2. **Complejidad ciclomática elevada:** Algunas funciones en *[archivos/módulos]* superan los valores recomendados.  
3. **Baja cobertura de pruebas:** La cobertura de código por pruebas unitarias es de *[X]%*, lo que podría afectar la mantenibilidad.  
4. **Vulnerabilidades detectadas:** *[X]* vulnerabilidades identificadas, relacionadas con *[ejemplo: inyección SQL, datos sensibles expuestos, etc.]*.  
5. **Code Smells:** *[X]* problemas de calidad que afectan la legibilidad y mantenibilidad del código.  

---

## 🛠️ Plan de Mejora  
### 🔄 Acciones recomendadas  
✅ **Reducir código duplicado:**  
- Aplicar refactorización en *[archivos/módulos específicos]*.  
- Usar herencia o composición para evitar duplicación innecesaria.  

✅ **Optimizar la complejidad ciclomática:**  
- Dividir funciones grandes en métodos más pequeños y manejables.  
- Aplicar patrones de diseño para mejorar la modularidad.  

✅ **Aumentar la cobertura de pruebas:**  
- Implementar pruebas unitarias y de integración en módulos críticos.  
- Establecer un umbral mínimo de cobertura en el pipeline de CI/CD.  

✅ **Corregir vulnerabilidades:**  
- Revisar y mitigar las vulnerabilidades críticas identificadas.  
- Aplicar buenas prácticas de seguridad en el código.  

✅ **Mejorar la mantenibilidad:**  
- Resolver *code smells* detectados en el análisis.  
- Usar herramientas de formateo y linters para garantizar estándares de código.  

---

## 📌 Conclusión  
El análisis de **SonarQube** ha permitido detectar fortalezas y oportunidades de mejora en el código. Con la implementación del plan de acción, se espera optimizar la calidad, seguridad y mantenibilidad del proyecto. 🚀  

📎 **Enlace al análisis en SonarQube:** [🔗 *URL del reporte aquí*]  