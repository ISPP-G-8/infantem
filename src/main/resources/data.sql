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
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Inserción de registros de sueño
INSERT INTO dream_table (baby_id, date_start, date_end, num_wakeups, dream_type) VALUES
(1, '2024-03-03 22:00:00', '2024-03-04 06:30:00', 2, 1),
(2, '2024-03-04 23:15:00', '2024-03-05 07:00:00', 3, 2);

-- Inserción de vacunas
INSERT INTO vaccine_table (type, vaccination_date, baby_id) VALUES
('MMR', '2023-06-01', 1),
('DTaP', '2023-07-01', 2),
('HepB', '2023-08-01', 3),
('Polio', '2023-09-01', 4),
('Hib', '2023-10-01', 5);

-- Relación entre usuarios y bebés
INSERT INTO user_baby (user_id, baby_id) VALUES
(1, 1), (2, 2);

-- Inserción de hitos
INSERT INTO milestone (name, description) VALUES
('Primer paso', 'El bebé da su primer paso sin apoyo.');

-- Inserción de hitos completados
INSERT INTO milestone_completed (baby_id, milestone_id, date) VALUES
(1, 1, '2024-01-01');

-- Inerción de recetas
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
(11, 8, null, 'Pasta corta con verduras', 'Cocinar pasta corta, mezclar con verduras al vapor y triturar ligeramente.', 'Pasta corta, verduras', 'Pasta con Verduras', 'a');


-- Inserción de síntomas relacionados con las ingestas
INSERT INTO intake_symptom (description, date) VALUES
('El bebé no presentó ningún síntoma.', '2024-03-01 08:00:00'),
('El bebé rechazó la comida ofrecida.', '2024-03-01 12:30:00'),
('El bebé mostró signos de malestar estomacal.', '2024-03-01 18:00:00'),
('El bebé presentó una reacción alérgica leve.', '2024-03-02 08:30:00'),
('El bebé presentó una reacción alérgica severa.', '2024-03-02 13:00:00'),
('El bebé vomitó después de la ingesta.', '2024-03-02 15:00:00'),
('El bebé tuvo diarrea después de la ingesta.', '2024-03-02 18:00:00'),
('El bebé presentó fiebre después de la ingesta.', '2024-03-03 08:00:00'),
('El bebé presentó erupciones en la piel.', '2024-03-03 12:00:00'),
('Otros síntomas no especificados.', '2024-03-03 18:00:00');

-- Inserción de ingestas
INSERT INTO intake_table (date, quantity, observations, baby_id, intake_symptom_id) VALUES
('2024-03-01 08:00:00', 200, 'Desayuno: el bebé comió bien, sin problemas.', 1, 1),
('2024-03-01 12:30:00', 150, 'Almuerzo: el bebé dejó un poco de comida.', 1, 2),
('2024-03-01 18:00:00', 180, 'Merienda: el bebé disfrutó la comida.', 2, 3),
('2024-03-02 08:30:00', 220, 'Desayuno: el bebé comió todo.', 3, 1),
('2024-03-02 13:00:00', 160, 'Almuerzo: el bebé tuvo un poco de malestar.', 4, 4);

-- Relación entre intake y recetas
INSERT INTO intake_recipe (intake_id, recipe_id) VALUES
(1, 1), (1, 2), 
(2, 3),        
(3, 4), (3, 5),
(4, 6),         
(5, 7), (5, 8); 

