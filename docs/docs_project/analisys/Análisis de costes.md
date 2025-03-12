# Plantilla del Sprint 1

![Portada](../../../docs/imagenes/Infantem.png)

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
1. [Introducción](#introduccion) 
2. [Estimación de Costes](#estimacion-costes) 
    2.1 [Desglose de Costes de Personal](#desglose-costes-personal)
    2.3 [Desglose de Costes de Infraestructura](#desglose-costes-infraestructura)
    2.4 [Desglose de Costes de Herramientas de Desarrollo](#desglose-costes-heramientas-desarollo) 
    2.5 [Desglose de Costes de Hardware y Amortización](#desglose-costes-hardware-amortizacion) 
    2.6 [Desglose de Costes de Distribución y Publicación](#desglose-costes-distribucion-publicacion) 
    2.7 [Costes totales](#costes-totales)
3. [Beneficios](#beneficios) 
    3.1. [Modelo Freemium](#modelo-freemium) 
    3.2. [Publicidad segmentada](#publicidad-segmentada) 
    3.3. [Marketplace](#marketplace) 
    3.4. [Suma total de beneficios](#suma-total-beneficios) 
4. [Relación entre beneficio y coste del proyecto](#relacion-beneficios-costes)
5. [Conclusión](#conclusion)

## 1. Introducción
Este documento tiene como objetivo analizar los costes asociados al desarrollo y mantenimiento de la aplicación Infantem. El análisis de costes se basa en la metodología PMBOK, considerando tanto los gastos de personal, infraestructura, herramientas de desarrollo, hardware y distribución, como una reserva de contingencia de un 10% sobre el total estimado. Además, se presenta una estimación de beneficios basada en el modelo de suscripción premium de la aplicación junto con un sistema de publicidad segmentada. 

Con una media de 26.837 nacimientos al mes en España, la aplicación cuenta con un mercado potencial significativo. Se estima que un porcentaje de estos nuevos padres optará por utilizar Infantem, ya sea en su versión gratuita o mediante la suscripción premium, con un coste de 4,99 € al mes. Este documento analiza la viabilidad económica del proyecto y su potencial retorno de inversión. 

## 2. Estimación de Costes
### 2.1. Desglose de Costes de Personal
En la tabla 1 se observa un desglose de los costes asociados por tener un trabajador en nómina según el rol que tenga asociado. Los datos de los salarios han sido extraídos de la página https://www.getmanfred.com, donde miles de trabajadores reflejan de manera activa sus condiciones salariales. Los datos mostrados son siempre la media que la página proporciona para cada perfil. En el caso de que algún empleado tenga asignados dos roles distintos el coste se calculará como la media aritmética de ambos roles. El coste total del está redondeado al alza a dos cifras decimales.

Las contribuciones sociales suelen variar entre el 30% y 35%. Para el cálculo se han usado la siguiente fórmula con sus respectivos valores (en todos los valores se considera el índice en lugar del porcentaje): 

Contribución social = (cc + pd + cp + f + F) * sueldo bruto
- cc = Contingencias comunes (23,6%) 
- pd = Prestaciones por desempleo (5,5%) 
- cp = Contingencias profesionales (3,5%) 
- f = Formación (0,6%) 
- F = FOGASA (0,2%)

cc + pd + cp + f + F = 0,334 

|             Rol              |                                                                Criterios de  búsqueda en  manfred                                                               | Estimación  salario bruto anual | Estimación  salario bruto por hora | Contribuciones sociales (33,4%) | Coste total  por hora |
|:----------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------:|:----------------------------------:|---------------------------------|:---------------------:|
| **Jefe de  proyecto**  | **Rol**: Project  Manager &  Delivery  Manager  **Experiencia**:  menos de dos años  **Tecnologías**:  React Native,  Spring,  Microsoft  Project | 30.800 €   | 14.81 €    | 4,94654 €   | 19,76 €  |
|**Frontend**|**Rol**: Frontend  Developer **Experiencia**: menos de dos años. **Tecnologías**: React Native | 28.300 €  |13.61 € | 4,54574 € | 18,16 €  |
| **Backend**                   | **Rol:** Backend Developer  <br> **Experiencia:** Menos de dos años  <br> **Tecnologías:** Spring Framework | 28.500 €     | 13,70 €         | 4.575,8 €      | 18,28 €        |
| **Full-Stack**                 | **Rol:** Full-Stack Developer  <br> **Experiencia:** Menos de dos años  <br> **Tecnologías:** Spring Framework, React Native | 28.600 €     | 13,75 €         | 4.592,5 €      | 18,35 €        |
| **QA e Ingeniero de Pruebas**  | **Rol:** QA & Testing Engineer  <br> **Experiencia:** Menos de dos años  <br> **Tecnologías:** JUnit, Selenium, Nessus, Burp Suite | 26.700 €     | 12,84 €         | 4.288,56 €     | 17,13 €        |
| **Documentador**  | **Rol**:  Administration **Experiencia**:  menos de dos años | 29700 €  | 14.28 €  | 4,76952 €  | 19,05€ | 4.592,5 € | 18,35 € |
|    **Analista**  | **Rol**: Data  Analyst & BI  **Experiencia**:  menos de dos años | 26800 €  | 12.88 €  | 4,30192 €  | 17,19 € | 4.592,5 € | 18,35 € |

<p style="text-align:center;font-style:italic;">Tabla 1: Desglose del coste por rol dentro del proyecto</p>

Para todos los trabajadores se espera un tiempo de dedicación semanal de 10 horas. Puesto que el proyecto tiene una duración conocida de 15 semanas se espera una dedicación de 150 horas totales. En la tabla 2 se refleja el coste de cada empleado según su asignación de roles. Los costes por hora se han redondeado al alza a dos cifras decimales. 

| Empleado                    | Roles                                | Coste por hora  | Coste total |
|-----------------------------|--------------------------------------|-----------------|-------------|
| Daniel del Castillo Piñero  | Jefe de proyecto  <br>  Full-Stack         | 19.06 €         | 2859 €      |
| David Fuentelsaz  Rodríguez | Backend  <br>  Documentador                | 18,67 €         | 2800,5 €    |
| Miguel Galán Lerate         | Backend  <br>  Analista                    | 17,74 €         | 2661 €      |
| Enrique García Abadía       | Frontend  <br>  QA e Ingeniero de  pruebas | 17,65 €         | 2647,5€     |
| José García de Tejada Delgado  | Backend  <br> QA e Ingeniero de pruebas   | 17,71 €         | 2656,5 €       |
| Luis Giraldo Santiago          | Jefe de proyecto  <br> Full-Stack           | 19,06 €         | 2859 €         |
| Antonio Jiménez Ortega         | Frontend  <br> QA e Ingeniero de pruebas   | 17,65 €         | 2647,5 €       |
| Álvaro Jiménez Osuna           | Frontend  <br> Analista                     | 17,68 €         | 2652 €         |
| Ángela López Oliva            | Frontend <br> Documentador                 | 18,61 €         | 2791,5 €       |
| Paula Luna Navarro            | Backend <br> Documentador                  | 18,67 €         | 2800,5 €       |
| José María Morgado Prudencio  | Backend <br> Documentador                  | 18,67 €         | 2800,5 €       |
| Lucía Noya Cano               | Backend <br> Documentador                  | 18,67 €         | 2800,5 €       |
| Josué Rodríguez López         | Backend <br> QA e Ingeniero de pruebas     | 17,71 €         | 2656,5 €       |
| Javier Santos Martín          | Frontend <br> Analista                     | 17,68 €         | 2652 €         |
| Felipe Solís Agudo            | Frontend <br> Analista                     | 17,68 €         | 2652 €         |
| Javier Ulecia García          | Backend <br> Analista                      | 17,74 €         | 2661 €         |
| David Vargas Muñiz            | Frontend <br> QA e Ingeniero de pruebas    | 17,65 €         | 2647,5 €       |
|||Total: |43.598 €|
<p style="text-align:center;font-style:italic;">Tabla 2: Desglose del coste de cada miembro</p>

### 2.2. Desglose de Costes de Infraestructura
Los costes estimados para 15 semanas se han calculado en función de los precios oficiales de IONOS y Google Cloud Platform (GCP). El dominio Infantem.app en IONOS tiene un precio anual de 12 € ionos.com prorrateado para 15 semanas. Para el despliegue en Google App Engine, se ha considerado una instancia estándar F1 funcionando 24/7 durante 15 semanas, a un coste de 0,05 €/hora cloud.google.com. 

El ancho de banda de salida se ha estimado en 50 GB, aplicando el primer GB gratuito mensual y un coste de 0,12 €/GB. Para Google Cloud Functions, se contemplaron 3 millones de invocaciones, pero debido a la capa gratuita de 2 millones por mes (7,5 millones en 15 semanas), no se generan costes. 

Los backups en Google Cloud Storage se estimaron para 20 GB a 0,026 €/GB/mes. Los registros en App Engine Logs (Stackdriver) se calcularon en 10 GB adicionales tras los primeros 50 GB gratuitos, a 0,50 €/GB. Finalmente, se estimó memoria adicional para instancias, suponiendo 2 GB usados continuamente, a 0,009 €/GB/hora. Todos los cálculos se realizaron multiplicando por el número de horas, meses o GB correspondientes a las 15 semanas de uso. 

| Elemento                                         | Detalle                                          | Precio unitario         | Uso estimado                            | Coste total (15 semanas) |
|--------------------------------------------------|-------------------------------------------------|-------------------------|----------------------------------------|--------------------------|
| Dominio en IONOS                                 | Infantem.app                                    | 12 €/año                | 15 semanas                             | 3,46 €                   |
| Instancias App Engine (Standard - F1)           | 0,05 €/hora - 1 instancia en funcionamiento 24/7 | 0,05 €/hora             | 24h × 7d × 15 semanas = 2.520 horas   | 126,00 €                  |
| Ancho de banda (Outbound traffic - 50 GB)       | 0,12 €/GB; primer 1 GB/mes gratuito             | 0,12 €/GB               | 49 GB (después del gratuito)          | 5,88 €                   |
| Google Cloud Functions                          | 0,40 €/millón de invocaciones (primer 2M gratis/mes) | 0,40 €/M invocaciones   | 3M invocaciones (3,75 meses)          | 0,00 €                    |
| Google Cloud Storage (Backups - 20 GB)          | 0,026 €/GB/mes                                  | 0,026 €/GB/mes          | 20 GB × 3,75 meses                    | 1,95 €                    |
| App Engine Logs (Stackdriver)                   | 0,50 €/GB (después de 50 GB gratuitos)         | 0,50 €/GB               | 10 GB adicionales                     | 5,00 €                    |
| Memoria  adicional para instancias | 0,009 €/GB/hora  | 0,009 €/GB/h  | 2 GB × 2.520  horas | 45,36 € |
||||Total:|187,65 €|
<p style="text-align:center;font-style:italic;">Tabla 3: Desglose del coste de la infraestructura</p>


### 2.3. Desglose de Costes de Herramientas de Desarrollo
Para el desarrollo del proyecto se han seleccionado herramientas ampliamente utilizadas en la industria. Como herramienta de pago vamos a seleccionar GitHub Enterprise Plan, que actualmente está valorado en 20,15€ al mes por usuario. 

| Elemento                        | Proveedor     | Detalle                                        | Coste total (15 semanas) |
|----------------------------------|--------------|------------------------------------------------|---------------------------|
| Repositorio de Código           | GitHub       | Plan Enterprise (20,15€/mes)                   | 1284,56 €                 |
| Entorno de desarrollo (IDE)      | VS Code      | Gratuito                                       | 0 €                       |
| CI/CD (Integración continua)     | GitHub Actions | Gratuito (uso limitado 2000 min/mes)          | 0 €                       |
| Spring Boot                      | VMWare       | Gratuito                                       | 0 €                       |
| React Native | Meta                 | Gratuito      | 0 €                       |
| MySQL        | Oracle Corporation   | Licencia GPL | 0 €                       |
|||Total:|1284,56 €|
<p style="text-align:center;font-style:italic;">Tabla 4: Desglose del coste de las herramientas de desarrollo</p>

### 2.4. Desglose de Costes de Hardware y Amortización

Para el desarrollo del proyecto, se ha seleccionado el Lenovo IdeaPad Slim 3 15IRH8, un portátil que ofrece un equilibrio óptimo entre rendimiento y coste. 

Actualmente, este portátil está disponible en MediaMarkt por un precio de 629 € por unidad. Para realizar los cálculos hemos supuesto una vida útil de 3 años. Para la amortización mensual de cada equipo se ha dividido el coste por equipo entre la vida útil (en meses). La amortización total se ha obtenido multiplicando la amortización mensual por equipo por el número de meses (3,75) y el número de equipos. 

|                   Elemento  | Vida útil  estimada | Número de equipos | Coste por equipo | Amortizaci ón  mensual  por equipo | Amortizaci ón total  (15  semanas) | Coste total |
|----------------------------:|:-------------------:|:-----------------:|:----------------:|:----------------------------------:|:----------------------------------:|:-----------:|
| Lenovo  IdeaPad  Slim 3 Gen |             3 años  |               17  |           629 €  |                           17,47 €  |             1.113,85 €             | 10.693 €    |
<p style="text-align:center;font-style:italic;">Tabla 5: Desglose del coste del hardware</p>


### 2.5. Desglose de Costes de Distribución y Publicación

Se ha elegido Google Play Store y Apple App Store para distribuir la aplicación, debido a su amplio alcance y facilidad de acceso en dispositivos Android e iOS, respectivamente. 
- En el caso de Google Play Store, el único coste asociado es el registro de desarrollador, con un pago único de 23,98 €, que permite gestionar y publicar la aplicación durante todo el periodo del proyecto. 
- Para Apple App Store, se requiere una suscripción anual al programa de desarrolladores de Apple, con un coste de 99 USD anuales. Dado que el proyecto tiene una duración de 15 semanas, se considerará el coste total de 99 USD (aproximadamente 94,97 € al tipo de cambio actual) https://developer.apple.com/la/support/compare-memberships/.

| Elemento           | Proveedor | Detalle                      | Coste total       |
|--------------------|----------|-----------------------------|-------------------|
| Google Play Store | Google   | Registro de desarrollador   | 23,98 € (pago único) |
| Apple App Store   | Apple    | Apple Developer Program    | 94,97 €          |
|                  |          | **Total**                   | **118,95 €**     |
<p style="text-align:center;font-style:italic;">Tabla 6: Desglose de costes de distribución</p>

### 2.6. Costes totales

En la siguiente tabla se recogen los costes totales del proyecto, incluyendo en el precio total un 10% de reservas de contingencia

| Categoría                                  | Costes         |
|--------------------------------------------|---------------|
| Costes de personal                         | 43.598 €      |
| Costes de Infraestructura                  | 187,65 €      |
| Costes de Herramientas de Desarrollo       | 1.284,56 €    |
| Costes de Hardware y Amortización          | 10.693 €      |
| Costes de Publicación y Distribución       | 118,95 €      |
| **Total**                                  | **55.882,16 €** |
| **Coste del proyecto (total + 10% de reserva de contingencias)** | **61.470,376 €** |
<p style="text-align:center;font-style:italic;">Tabla 7: desglose de costes del proyecto</p>


## 3. Beneficios (Ingresos)
Para el cálculo de los beneficios se tendrán en cuenta un caso optimista y un caso pesimista de adopción del sistema cómo se expondrán en los siguientes puntos. Estos casos se basan en el número de nacimientos medio por mes según el INE en 2024, siendo esta cifra de 26837. Infantem cuenta con cuatro maneras distintas de monetización. 

### 3.1. Modelo Freemium
La aplicación cuenta con funcionalidades básicas que son de uso gratuito para todos los usuarios. Sin embargo, también ofrece un plan Premium que ofrece funcionalidades extra. Dicho plan tiene un precio de 4,99 €. En estos datos no se descuenta el IVA. 
- Caso pesimista 
    - Un 1% de los padres con un hijo recién nacido utiliza Infantem, que se traduce en 268 usuarios. Si de este número un 5% (13 personas) adquieren el plan Premium se conseguiría un beneficio de 64,87 € el primer mes. Suponiendo también que la mitad de los usuarios continúa con la suscripción durante 6 meses queda la distribución por mes que se puede ver en el gráfico 1. Estos datos indican que el beneficio total por suscripciones en un año sería de 2237,97 € sin descontar el IVA y 1767,99 € si se descuenta..
- Caso Realista
    - Un 5% de los padres con un hijo recién nacido utiliza Infantem, que se traduce en 1342 usuarios. Si de este número un 7% (94 personas) adquieren el plan Premium, se conseguiría un beneficio de 469,06 € el primer mes. Suponiendo también que la mitad de los usuarios continúa con la suscripción durante 6 meses, queda la distribución por mes que se puede ver en el gráfico correspondiente. Estos datos indican que el beneficio total por suscripciones en un año sería de 5628,72 € sin descontar el IVA y 21.027,52 € tras IVA.

<img src='../../../docs/imagenes/GraficaBeneficioDespuesDelLanzamiento.png' width=500 style='display: block; margin-left:auto; margin-right:auto;' >

<p style="text-align:center;font-style:italic;">Gráfico 1: Distribución de beneficio por meses después del lanzamiento</p>

- Caso optimista
  - Un 10% de los padres con un recién nacido utiliza la aplicación, que se traduce en 2683 usuarios. Si un 10% de ellos (268) adquieren el plan Premium se conseguiría un beneficio de 1337,32 € el primer mes. Suponiendo que la mitad de los usuarios mantiene el plan durante un año queda la distribución por mes que se puede ver en el gráfico 2. Estos datos indican que el beneficio total por suscripciones en un año sería de 60179,4 € con IVA y 47541,72 € al descontar el IVA.

<img src='../../../docs/imagenes/GraficaBeneficioDespuesDelLanzamiento2.png' width=500 style='display: block; margin-left:auto; margin-right:auto;' >

<p style="text-align:center;font-style:italic;">Gráfico 2: Distribución de beneficio por meses después del lanzamiento</p>

### 3.2. Publicidad segmentada

Para los usuarios que no dispongan de plan premium tendrán publicidad en la aplicación orientada siempre a productos infantiles. Se asume que se tendrá un CPM (Costo por Mil Impresiones) de 2 euros y que un usuario accede de media a la aplicación 5 veces al día. Nuevamente se presenta un caso optimista y uno pesimista, para 
- Caso pesimista 
  - Nuevamente se asume que un 1% (268) de los padres con hijos recién nacidos usa Infantum y que el 95% (255) de ellos tiene el plan gratuito. Si durante un año utilizan la aplicación significa que cada uno ha visto 1825 anuncios, haciendo un total de 465375 visualizaciones de anuncios. Este número se traduce a su vez en 465 paquetes de 1000 visualizaciones, generando así 930 € anuales. No obstante, a esta cantidad hay que restarle en torno a un 15% (si factura menos de un millón de euros) de comisión por la plataforma en la que se aloja la aplicación y un 21% de IVA, quedando 595,2 €. 
- Caso Realista
  - Se asume que un 5% (1342 usuarios) de los padres con hijos recién nacidos usa Infantem y que el 92% (1234 usuarios) tiene el plan gratuito. Si durante un año utilizan la aplicación, cada uno verá 1825 anuncios, lo que resulta en 2.251.450 visualizaciones de anuncios. Este número equivale a 2251 paquetes de 1000 visualizaciones, generando así 4502 € anuales. Tras restar aproximadamente un 15% de comisión de la plataforma y un 21% de IVA, el beneficio anual neto se sitúa en 3.042,8 €.
- Caso optimista 
  - Nuevamente se asume que un 10% (2683) de los padres con hijos recién nacidos usa Infantum y que el 90% (2414) de ellos tiene el plan gratuito. Si durante un año utilizan la aplicación significa que cada uno ha visto 1825 anuncios, haciendo un total de 4405550 visualizaciones de anuncios. Este número se traduce a su vez en 4405 paquetes de 1000 visualizaciones, generando así 8810€ anuales. Restándole a esta cantidad las comisiones y el IVA se obtiene un beneficio anual de 5638,4 €. 

### 3.3. Marketplace

Infantem contará con un marketplace especializado en productos para bebés, donde terceros podrán ofrecer artículos relacionados con la alimentación infantil, higiene, ropa, juguetes educativos y otros productos de interés para los padres. La monetización de este marketplace se basará en comisiones por cada venta realizada a través de la plataforma. 

Al igual que en los modelos anteriores, se plantean dos escenarios para el análisis de beneficios: un caso optimista y un caso pesimista. Se ha considerado un ticket medio de compra de 40 € por usuario y una comisión del 10% por cada venta, sin descontar el IVA. 

- Caso pesimista 
  - En este escenario, se asume que un 1% de los padres con un hijo recién nacido utiliza el marketplace de Infantem, lo que equivale a 268 usuarios. Se presupone que cada usuario realiza una compra mensual con un valor medio de 40 €. Esto se traduce en unas ventas totales mensuales de 10.720 €. Dado que Infantem obtiene una comisión del 10% por cada venta, se generaría un beneficio mensual de 1.072 €. 
  Si consideramos que este volumen de ventas se mantiene constante durante todo el año, el beneficio anual antes de aplicar el IVA sería de 12.864 €. Tras descontar el 21% de IVA, el beneficio anual se situaría en 10.158,56 €. 
- Caso Realista
  - En este escenario, se asume que un 5% de los padres con un hijo recién nacido (1342 usuarios) utiliza el marketplace de Infantem. Se estima que cada usuario realiza 1,5 compras al mes con un valor medio de 40 € cada una.Esto resulta en unas ventas totales mensuales de 80.520 €. Aplicando la comisión del 10%, el beneficio mensual sería de 8.052 €. Si este volumen de ventas se mantiene durante todo el año, el beneficio anual antes de IVA sería de 96.624 €. Tras descontar el 21% de IVA, el beneficio neto anual alcanzaría 76.331 €.


- Caso optimista 
  - En un escenario más favorable, se estima que un 10% de los padres con un hijo recién nacido utiliza el marketplace de Infantem, lo que se traduce en 2.683 usuarios. Se plantea que cada usuario realiza dos compras al mes, con un valor medio de 40 € cada una. Esto daría lugar a unas ventas totales mensuales de 214.640 €. 
  Aplicando la comisión del 10%, el beneficio mensual ascendería a 21.464 €. Manteniendo este ritmo de ventas durante un año, se obtendría un beneficio anual antes de IVA de 257.568 €. Tras descontar el 21% de IVA, el beneficio anual alcanzaría los 203.479,72 €. 


### 3.4. Suma total de beneficios 
En este apartado se presentan los beneficios totales combinados de todas las formas de monetización expuestas anteriormente (modelo Freemium, publicidad segmentada y marketplace), distinguiendo entre el caso optimista y el caso pesimista

**Caso pesimista** 
- **Modelo Freemium**: 1.767,99 € anuales (tras IVA) 
- **Publicidad segmentada**: 595,2 € anuales (tras IVA) 
- **Marketplace**: 10.158,56 € anuales (tras IVA) 
**Beneficio total anual en el caso pesimista**: 12.521,75 € 

**Caso Realista**
- **Modelo Freemium**: 21.027,52 € anuales (tras IVA)
- **Publicidad segmentada**: 3.042,8 € anuales (tras IVA)
- **Marketplace**: 76.331 € anuales (tras IVA)
**Beneficio total anual en el caso pesimista**: 100.401,32 €

**Caso optimista** 
- **Modelo Freemium**: 47.541,72 € anuales (tras IVA) 
- **Publicidad segmentada**: 5.638,4 € anuales (tras IVA)
- **Marketplace**: 203.479,72 € anuales (tras IVA) 
**Beneficio total anual en el caso optimista**: 256.659,84 € 

## 4. Relación entre beneficio y coste del proyecto

Finalmente, se analiza la relación entre los beneficios estimados y los costes del proyecto. Según la tabla de desglose de costes (Tabla 4), el coste total del proyecto, incluyendo un 10% de reserva para contingencias, es de 61.470,376 €.

**Caso pesimista** 

Con un beneficio total anual estimado de 12.521,75 €, el tiempo estimado para recuperar la inversión inicial (punto de equilibrio) sería de aproximadamente 5 años si se mantiene este escenario. 

<img src='../../../docs/imagenes/RelacionIngresoEntreCostePesimista.png' width=550 style='display: block; margin-left:auto; margin-right:auto;' >


<p style="text-align:center;font-style:italic;">Gráfico 3: Relación entre beneficio acumulado y coste del proyecto caso pesimista</p>

**Caso Realista**

Con un beneficio total anual estimado de 100.401,32 €, el tiempo estimado para recuperar la inversión inicial de 61.470,38 € sería de aproximadamente 8 meses si se mantiene este escenario.

Este caso representa un punto de equilibrio más accesible que el pesimista (5 años) pero más conservador que el optimista (3 meses), mostrando una viabilidad intermedia del proyecto.


**Caso optimista**

Con un beneficio total anual estimado de 256.659,84 €, la inversión se recuperaría en menos de un año (aproximadamente 3 meses), generando beneficios netos rápidamente.

<img src='../../../docs/imagenes/RelacionIngresoEntreCosteOptimista.png' width=550 style='display: block; margin-left:auto; margin-right:auto;' >

<p style="text-align:center;font-style:italic;">Gráfico 4: Relación entre beneficio acumulado y coste del proyecto caso optimista</p> 

## 5. Conclusión

El análisis de costes y beneficios realizado en este documento permite evaluar la
viabilidad económica del proyecto Infantem. Con una inversión inicial estimada en
61.470,38 €, se han proyectado diferentes escenarios de ingresos basados en modelos
de monetización como suscripción premium, publicidad segmentada y marketplace.
Aunque el caso pesimista muestra un retorno más limitado, el caso optimista
demuestra un potencial significativo de rentabilidad. Estos resultados sugieren que
Infantem podría convertirse en una aplicación sostenible y escalable en el mercado de
productos y servicios para padres primerizos, siempre que se logre una adopción
adecuada por parte de los usuarios.