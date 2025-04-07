-- Inserción de roles
INSERT INTO authorities (id, authority) VALUES (1, 'user'), (2, 'admin');

-- Inserción de usuarios con contraseñas encriptadas
-- La contraseña que se ha codificado es: user

INSERT INTO user_table (name, surname, username, password, email, profile_photo_route, authority_id) VALUES
('user', 'user', 'user1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user1@example.com', 'a', 1),
('user', 'user', 'user2', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user2@example.com', 'a', 1),
('admin', 'admin', 'admin1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'admin1@example.com', 'a', 2),
('Ana', 'García', 'anagarcia', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'ana.garcia@email.com', 'a', 1),
('Carlos', 'Pérez', 'carlosperez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'carlos.perez@email.com', 'a', 1),
('Laura', 'Martínez', 'lauramartinez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'laura.martinez@email.com', 'a', 1),
('Javier', 'Sánchez', 'javiersanchez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'javier.sanchez@email.com', 'a', 1),
('Sofía', 'Rodríguez', 'sofiarodriguez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'sofia.rodriguez@email.com', 'a', 1),
('Miguel', 'López', 'miguelopez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'miguel.lopez@email.com', 'a', 1),
('Elena', 'Fernández', 'elenafernandez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'elena.fernandez@email.com', 'a', 1),
('David', 'González', 'davidgonzalez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'david.gonzalez@email.com', 'a', 1),
('Isabel', 'Ruiz', 'isabelruiz', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'isabel.ruiz@email.com', 'a', 1),
('Pablo', 'Jiménez', 'pablojimenez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'pablo.jimenez@email.com', 'a', 1),
('Marta', 'Díaz', 'martadiaz', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'marta.diaz@email.com', 'a', 1),
('Sergio', 'Álvarez', 'sergioalvarez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'sergio.alvarez@email.com', 'a', 1);

-- Inserción de alérgenos
INSERT INTO allergen (name, description) VALUES
('Gluten', 'Presente en trigo, cebada, centeno y sus derivados.'),
('Lactosa', 'Azúcar presente en la leche y productos lácteos.'),
('Frutos secos', 'Incluye almendras, avellanas, nueces, anacardos, pistachos, etc.'),
('Huevo', 'Puede encontrarse en salsas, repostería y productos procesados.'),
('Mariscos', 'Incluye gambas, langostinos, cangrejos, y otros crustáceos.'),
('Pescado', 'Presente en alimentos procesados como caldos y salsas.'),
('Soja', 'Se encuentra en productos como salsa de soja, tofu y alimentos procesados.'),
('Mostaza', 'Ingrediente común en salsas y condimentos.'),
('Sésamo', 'Presente en panes, galletas, tahini y otros productos.'),
('Sulfitos', 'Utilizados como conservantes en vinos, frutas secas y productos procesados.');

-- Inserción de bebés
INSERT INTO baby_table (name, birth_date, genre, weight, height, cephalic_perimeter, food_preference) VALUES
('Juan', '2023-01-01', 'MALE', 3.5, 49, 35, 'Leche'),
('María', '2023-02-01', 'FEMALE', 3.2, 48, 34, 'Leche'),
('Alicia', '2023-03-01', 'FEMALE', 3.8, 36, 36, 'Leche'),
('Bruno', '2023-04-01', 'MALE', 3.6, 41, 35, 'Leche'),
('Carlos', '2023-05-01', 'MALE', 3.4, 49, 34, 'Leche');

-- Inserción de relaciones entre bebés y alérgenos
INSERT INTO baby_allergen (allergen_id, baby_id) VALUES
(1, 2),
(3, 3),
(4, 4),
(5, 5);

-- Inserción de registros de sueño
INSERT INTO dream_table (baby_id, date_start, date_end, num_wakeups, dream_type) VALUES
(1, '2025-03-03 22:00:00', '2025-03-04 06:30:00', 2, 1),
(1, '2025-03-04 23:15:00', '2025-03-05 07:00:00', 3, 1),
(1, '2025-03-05 21:30:00', '2025-03-06 06:45:00', 1, 2),
(4, '2025-03-06 22:45:00', '2025-03-07 07:30:00', 2, 3),
(5, '2025-03-07 23:00:00', '2025-03-08 07:15:00', 1, 1);

-- Inserción de vacunas
INSERT INTO vaccine_table (type, vaccination_date, baby_id) VALUES
('MMR', '2023-06-01', 1),
('DTaP', '2023-07-01', 2),
('HepB', '2025-03-04', 3),
('Polio', '2023-09-01', 4),
('Hib', '2023-10-01', 5),
('Rotavirus', '2023-11-01', 1),
('PCV', '2025-03-03', 1),
('HepA', '2024-01-01', 1),
('Varicela', '2024-02-01', 4),
('Meningococo', '2024-03-01', 5);


-- Relación entre usuarios y bebés
INSERT INTO user_baby (user_id, baby_id) VALUES
(1, 1), (2, 2), (1,3);

-- Inserción de hitos
INSERT INTO milestone (name, description) VALUES
('Primer paso', 'El bebé da su primer paso sin apoyo.');

-- Inserción de hitos completados
INSERT INTO milestone_completed (baby_id, milestone_id, date) VALUES
(1, 1, '2024-01-01');

-- Inserción de recetas
INSERT INTO recipe_table(max_recommended_age, min_recommended_age, user_id, description, elaboration, ingredients, name, photo_route) VALUES
(8, 6, 1, 'Puré de zanahoria y batata', 'Cocinar zanahoria y batata al vapor, triturar.', 'Zanahoria, batata', 'Puré de Zanahoria y Batata', 'a'),
(7, 5, 2, 'Compota de manzana y pera', 'Cocinar manzana y pera a fuego lento, triturar.', 'Manzana, pera', 'Compota de Manzana y Pera', 'a'),
(9, 6, 2, 'Puré de aguacate y plátano', 'Triturar aguacate y plátano maduros.', 'Aguacate, plátano', 'Puré de Aguacate y Plátano', 'a'),
(8, 6, 1, 'Crema de calabaza y calabacín', 'Cocinar calabaza y calabacín al vapor, triturar.', 'Calabaza, calabacín', 'Crema de Calabaza y Calabacín', 'a'),
(7, 5, 1, 'Puré de guisantes y zanahoria', 'Cocinar guisantes y zanahoria al vapor, triturar.', 'Guisantes, zanahoria', 'Puré de Guisantes y Zanahoria', 'a'),
(10, 7, null, 'Puré de pollo con verduras', 'Cocinar pollo y verduras al vapor, triturar.', 'Pollo, verduras mixtas', 'Puré de Pollo con Verduras', 'a'),
(10, 7, null, 'Tortilla francesa con espinacas', 'Batir huevo con espinacas cocidas, cocinar.', 'Huevo, espinacas', 'Tortilla con Espinacas', 'a'),
(12, 8, null, 'Croquetas de pescado blanco', 'Cocinar pescado, mezclar con puré de patata, formar croquetas y hornear.', 'Pescado blanco, patata', 'Croquetas de Pescado', 'a'),
(11, 8, null, 'Arroz con pollo y verduras', 'Cocinar arroz, pollo y verduras al vapor, triturar ligeramente.', 'Arroz, pollo, verduras', 'Arroz con Pollo y Verduras', 'a'),
(9, 7, 1, 'Yogur natural con fruta', 'Mezclar yogur natural con fruta triturada.', 'Yogur natural, fruta', 'Yogur con Fruta', 'a'),
(8, 6, 2, 'Huevo revuelto con aguacate', 'Revuelto de huevo con aguacate triturado.', 'Huevo, aguacate', 'Revuelto con Aguacate', 'a'),
(7, 5, 1, 'Puré de lentejas con zanahoria', 'Cocinar lentejas y zanahoria, triturar.', 'Lentejas, zanahoria', 'Puré de Lentejas', 'a'),
(10, 7, null, 'Pescado blanco al vapor con verduras', 'Cocinar pescado blanco y verduras al vapor.', 'Pescado blanco, verduras', 'Pescado al Vapor', 'a'),
(12, 9, null, 'Mini hamburguesas de ternera', 'Carne de ternera picada, formar mini hamburguesas y cocinar a la plancha.', 'Ternera picada', 'Mini Hamburguesas', 'a'),
(11, 8, null, 'Pasta corta con verduras', 'Cocinar pasta corta, mezclar con verduras al vapor y triturar ligeramente.', 'Pasta corta, verduras', 'Pasta con Verduras', 'a'),
(12, 9, null, 'Mini hamburguesas de ternera', 'Carne de ternera picada, formar mini hamburguesas y cocinar a la plancha.', 'Ternera picada', 'Mini Hamburguesas', 'a'),
(9, 6, null, 'Cocer brócoli y patata al vapor, triturar hasta obtener una crema suave.', 'Cocer brócoli y patata al vapor, triturar.', 'Brócoli, patata', 'Crema de Brócoli y Patata', 'a'),
(10, 7, null, 'Cocer calabacín y arroz, triturar hasta conseguir una papilla homogénea.', 'Cocer calabacín y arroz, triturar.', 'Calabacín, arroz', 'Papilla de Calabacín y Arroz', 'a'),
(11, 8, null, 'Saltear calabaza y lentejas cocidas, triturar para obtener un puré.', 'Cocer calabaza y lentejas, triturar.', 'Calabaza, lentejas', 'Puré de Calabaza y Lentejas', 'a'),
(12, 9, null, 'Hervir pasta pequeña con brócoli y triturar ligeramente.', 'Cocer pasta pequeña y brócoli, triturar.', 'Pasta pequeña, brócoli', 'Pasta con Brócoli', 'a'),
(9, 7, null, 'Cocer pera y ciruela, triturar para obtener una compota suave.', 'Cocer pera y ciruela, triturar.', 'Pera, ciruela', 'Compota de Pera y Ciruela', 'a'),
(10, 7, null, 'Cocer arroz con leche vegetal y manzana, triturar.', 'Cocer arroz con leche vegetal y manzana, triturar.', 'Arroz, leche vegetal, manzana', 'Papilla de Arroz y Manzana', 'a'),
(11, 8, null, 'Cocer garbanzos y calabacín, triturar para formar un puré.', 'Cocer garbanzos y calabacín, triturar.', 'Garbanzos, calabacín', 'Puré de Garbanzos y Calabacín', 'a'),
(12, 9, null, 'Tostar pan integral, untar con aguacate y huevo cocido triturado.', 'Tostar pan integral, untar con aguacate y huevo cocido.', 'Pan integral, aguacate, huevo', 'Tostada Nutritiva', 'a');


-- Inserción de anuncios
INSERT INTO advertisement_table(company_name, title, target_url, photo_route, time_seen, total_clicks, max_minutes, is_completed) VALUES 
('Nestlé', 'Papillas de frutas', 'https://google.com', 'a', 0, 0, 1, false),
('Hero', 'Leche de continuación', 'https://google.com', 'a', 0, 0, 1, false),
('Dodot', 'Pañales', 'https://google.com', 'a', 0, 0, 1, false),
('Chicco', 'Biberones', 'https://google.com', 'a', 0, 0, 1, false),
('Suavinex', 'Chupetes', 'https://google.com', 'a', 0, 0, 1, false),
('Johnsons', 'Toallitas húmedas', 'https://google.com', 'a', 0, 0, 1, false),
('Blemil', 'Leche de inicio', 'https://google.com', 'a', 0, 0, 1, false),
('Nutribén', 'Potitos de verduras', 'https://google.com', 'a', 0, 0, 1, false),
('Avent', 'Esterilizador de biberones', 'https://google.com', 'a', 0, 0, 1, false),
('Babymoov', 'Cuna de viaje', 'https://google.com', 'a', 0, 0, 1, false);

INSERT INTO recipe_allergen(allergen_id,recipe_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);


-- Inserción de síntomas relacionados con las ingestas
INSERT INTO intake_symptom (description, date) VALUES
('El bebé no presentó ningún síntoma.', '2025-03-01 08:00:00'),
('El bebé rechazó la comida ofrecida.', '2025-03-01 12:30:00'),
('El bebé mostró signos de malestar estomacal.', '2025-03-01 18:00:00'),
('El bebé presentó una reacción alérgica leve.', '2025-03-02 08:30:00'),
('El bebé presentó una reacción alérgica severa.', '2025-03-02 13:00:00'),
('El bebé vomitó después de la ingesta.', '2025-03-02 15:00:00'),
('El bebé tuvo diarrea después de la ingesta.', '2025-03-02 18:00:00'),
('El bebé presentó fiebre después de la ingesta.', '2025-03-03 08:00:00'),
('El bebé presentó erupciones en la piel.', '2025-03-03 12:00:00'),
('Otros síntomas no especificados.', '2025-03-03 18:00:00');

-- Inserción de ingestas
INSERT INTO intake_table (date, quantity, observations, baby_id, intake_symptom_id) VALUES
('2025-03-01 08:00:00', 200, 'Desayuno: el bebé comió bien, sin problemas.', 1, 1),
('2025-03-02 08:00:00', 200, 'Desayuno: el bebé comió bien, sin problemas.', 1, 2),
('2025-03-01 18:00:00', 180, 'Merienda: el bebé disfrutó la comida.', 2, 3),
('2025-03-01 18:00:00', 180, 'Merienda: el bebé disfrutó la comida.', 3, 4),
('2025-03-02 13:00:00', 160, 'Almuerzo: el bebé tuvo un poco de malestar.', 4, 5);

-- Relación entre intake y recetas
INSERT INTO intake_recipe (intake_id, recipe_id) VALUES
(1, 1), 
(1, 2), 
(2, 3),        
(3, 4),
(3, 5);


-- Inserción de enfermedades en la tabla disease_table
INSERT INTO disease_table (id, name, start_date, end_date, symptoms, extra_observations, baby_id) VALUES
(1, 'Varicela', '2025-03-01', '2025-03-09', 'Erupción cutánea, fiebre', 'Se recomienda mantener al bebé hidratado.', 1),
(2, 'Gripe', '2025-02-03', '2025-03-02', 'Fiebre, tos, congestión nasal', 'Administrar medicamentos según indicación médica.', 1),
(3, 'Otitis', '2024-01-10', '2025-01-15', 'Dolor de oído, fiebre', 'Evitar exponer al bebé al agua durante el tratamiento.', 1),
(4, 'Bronquitis', '2025-03-05', '2025-03-15', 'Tos persistente, dificultad para respirar', 'Se recomienda usar humidificador.', 2),
(5, 'Conjuntivitis', '2025-03-12', '2025-03-14', 'Ojos rojos, secreción ocular', 'Limpiar los ojos con solución salina.', 2);

-- Inserción de métricas en la tabla metric_table
INSERT INTO metric_table (id, weight, height, cephalic_perimeter, date, baby_id) VALUES
(1, 3.5, 50.0, 35, '2025-03-01', 1),
(2, 4.0, 52.0, 36, '2025-03-04', 1),
(3, 5.0, 55.0, 37, '2025-04-01', 1),
(4, 6.0, 60.0, 38, '2025-05-01', 2),
(5, 7.0, 65.0, 39, '2025-06-01', 3),
(6, 8.0, 70.0, 40, '2025-07-01', 3),
(7, 9.0, 75.0, 41, '2025-08-01', 4),
(8, 10.0, 80.0, 42, '2025-09-01', 4),
(9, 11.0, 85.0, 43, '2025-10-01', 5),
(10, 12.0, 90.0, 44, '2025-11-01', 5);

-- Inserción de productos

INSERT INTO product (title, description, image_url, shop_url) VALUES
(
  'Philips Avent SCF033/27 - Biberón Natural 260 ml',
  'Pack de dos biberones con capacidad de 260 ml, sin BPA y con forma ergonómica; enganche natural gracias a la tetina más ancha con forma de pecho.',
  'https://m.media-amazon.com/images/I/41b7U5nfW1L._AC_SL1000_.jpg',
  'https://www.amazon.es/Philips-Avent/dp/B095CBHTT4'
),
(
  'Dodot Sensitive Talla 2 (4-8 kg), 240 pañales',
  'Pañales con suavidad excelente: materiales muy delicados, ideales para pieles sensibles o con tendencia a irritaciones. Alta absorción: buena retención de líquidos.',
  'https://m.media-amazon.com/images/I/81V-dxSVHeL._AC_SL1500_.jpg',
  'https://www.amazon.es/DODOT-Sensitive-Pa%C3%B1ales-Talla-240/dp/B082N3H868'
),
(
  'Hero Baby Tarrito de Verduras con Ternera y Arroz (2x235 g)',
  'Tarrito de verduras con ternera y arroz, sin gluten, adecuado desde los 10 meses.',
  'https://latiendahero.es/cdn/shop/files/8410175081131_VerdurasconArrozyTernera2x235g_L.png?v=1741782192&width=910',
  'https://latiendahero.es/products/tarrito-hero-solo-verdura-ternera-y-arroz'
),
(
  'Dodot Toallitas Pure Aqua (144 uds)',
  'Toallitas con 99% de agua purificada y algodón orgánico, ideales para pieles sensibles.',
  'https://m.media-amazon.com/images/I/71YW6XLg1-L._AC_SL1500_.jpg',
  'https://www.amazon.es/Toallitas-Paquetes-Unidades-Elaboradas-Limpieza/dp/B0B6C21YSN'
),
(
  'Chicco Mordedor Fresh Relax 4m+',
  'Mordedor refrigerante que alivia las encías durante la dentición. Se puede enfriar para mayor alivio.',
  'https://m.media-amazon.com/images/I/61lpDkUDtLL._AC_SL1500_.jpg',
  'https://www.amazon.es/Chicco-Fresh-Relax-4-m/dp/B0891CRC5F'
),
(
  'Carrefour Baby Toallitas Sensitive 6x72 uds',
  'Toallitas con extracto de aloe vera y sin perfume. Testadas dermatológicamente.',
  'https://static.carrefour.es/hd_510x_/img_pim_food/489929_00_1.jpg',
  'https://www.carrefour.es/supermercado/toallitas-bebe-sensitive-my-baby-carrefour-72-ud/R-prod395287/p'
),

(
  'Lictin Pack 2 baberos impermeables con bolsillo',
  'Baberos ajustables de silicona con recogemigas. Fáciles de limpiar y resistentes al uso diario.',
  'https://m.media-amazon.com/images/I/71vX4RWw3PL._AC_SL1500_.jpg',
  'https://www.amazon.es/Lictin-Babero-Mangas-Impermeable-Ajustable/dp/B0BZVLJGQ9'
);

