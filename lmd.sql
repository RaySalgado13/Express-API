USE mydb;

SHOW TABLES;
DESC menus;

INSERT INTO platillos VALUES (null, 'Mole rojo',60),(null, 'Pechuga empeanizada',60),(null, 'Bisteck a la mexicana',60),(null, 'chiles rellenos',60);

SELECT * FROM platillos;

INSERT INTO menus VALUES (null, NOW());

SELECT * FROM menus;

INSERT INTO menus_del_dia VALUES (1,1),(1,2),(1,3),(1,4);

SELECT * FROM menus_del_dia;


SELECT M.fecha, P.nombre FROM menus_del_dia MD INNER JOIN menus M ON MD.menus_id = M.id
INNER JOIN platillos P ON MD.platillos_id = P.id
WHERE M.id = (SELECT id FROM menus WHERE fecha = curdate());