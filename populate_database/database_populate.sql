truncate table usuario_table;
truncate table sueño_table;
truncate table alergeno; 

insert into user_table (surname, `contraseña`, email, name, nombre_usuario) values
('1','pwd', 'user1@gmail.com', 'user', 'user1'),
('2','pwd', 'user2@gmail.com', 'user', 'user2'),
('3','pwd', 'user3@gmail.com', 'user', 'user3'),
('4','pwd', 'user4@gmail.com', 'user', 'user4'),
('5','pwd', 'user5@gmail.com', 'user', 'user5'),
('6','pwd', 'user6@gmail.com', 'user', 'user6');

insert into allergen (name, description) values
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

insert into sueño_table (fin, inicio, num_desvalos, `tipo_sueño`) values
('2024-03-03 22:00:00.000000', '2024-03-04 06:30:00.000000', 2, 1),
('2024-03-04 23:15:00.000000', '2024-03-05 07:00:00.000000', 3, 2),
('2024-03-05 21:45:00.000000', '2024-03-06 05:20:00.000000', 1, 1),
('2024-03-06 00:30:00.000000', '2024-03-06 08:10:00.000000', 4, 3),
('2024-03-07 22:20:00.000000', '2024-03-08 06:00:00.000000', 2, 2),
('2024-03-08 23:50:00.000000', '2024-03-09 07:30:00.000000', 5, 1),
('2024-03-09 22:10:00.000000', '2024-03-10 05:50:00.000000', 1, 2),
('2024-03-10 23:40:00.000000', '2024-03-11 06:45:00.000000', 3, 3),
('2024-03-11 21:30:00.000000', '2024-03-12 07:10:00.000000', 4, 1);
