CREATE TABLE contacts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR ( 200 ) NOT NULL,
	cellphone VARCHAR ( 20 ) NOT NULL
);

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	login VARCHAR ( 50 ) NOT NULL,
	password VARCHAR ( 40 ) NOT NULL,
	id_client INT NOT NULL
);

INSERT INTO contacts (name, cellphone) VALUES ('Marina Rodrigues', 5541996941919);
INSERT INTO contacts (name, cellphone) VALUES ('Nicolas Rodrigues', 5541954122723);
INSERT INTO contacts (name, cellphone) VALUES ('Davi Lucca Rocha', 5541979210400);
INSERT INTO contacts (name, cellphone) VALUES ('Lucas Barros', 5541944061868);
INSERT INTO contacts (name, cellphone) VALUES ('Lucca Lima', 5541908727427);
INSERT INTO contacts (name, cellphone) VALUES ('Benjamin Sales', 5541914106998);
INSERT INTO contacts (name, cellphone) VALUES ('Ana Laura Pereira', 5541919883324);
INSERT INTO contacts (name, cellphone) VALUES ('Henrique da Conceição', 5541936250777);
INSERT INTO contacts (name, cellphone) VALUES ('Ana Clara Porto', 5541988315943);
INSERT INTO contacts (name, cellphone) VALUES ('Ryan Souza', 5541937901945);
INSERT INTO contacts (name, cellphone) VALUES ('Nina da Cruz', 5541930283480);
INSERT INTO contacts (name, cellphone) VALUES ('Esther Costa', 5541976620331);
INSERT INTO contacts (name, cellphone) VALUES ('Felipe Ribeiro', 5541987077478);
INSERT INTO contacts (name, cellphone) VALUES ('Sra. Amanda Cavalcanti', 5541905979333);
INSERT INTO contacts (name, cellphone) VALUES ('Bruno Farias', 5541945698108);
INSERT INTO contacts (name, cellphone) VALUES ('Sra. Mirella Aragão', 5541932294266);
INSERT INTO contacts (name, cellphone) VALUES ('Nicole Ramos', 5541972713343);
INSERT INTO contacts (name, cellphone) VALUES ('Augusto Novaes', 5541934105240);
INSERT INTO contacts (name, cellphone) VALUES ('Vitor Hugo Cunha', 5541981870128);
INSERT INTO contacts (name, cellphone) VALUES ('Luiz Miguel Monteiro', 5541994140336);
INSERT INTO contacts (name, cellphone) VALUES ('Alícia Santos', 5541978861534);
INSERT INTO contacts (name, cellphone) VALUES ('Sr. Marcos Vinicius Duarte', 5541979767374);
INSERT INTO contacts (name, cellphone) VALUES ('Luiz Gustavo da Cunha', 5541971153240);
INSERT INTO contacts (name, cellphone) VALUES ('Murilo Moraes', 5541971140196);
INSERT INTO contacts (name, cellphone) VALUES ('Julia Costela', 5541938133697);
INSERT INTO contacts (name, cellphone) VALUES ('André Cardoso', 5541925935033);
INSERT INTO contacts (name, cellphone) VALUES ('Luiza Campos', 5541942303433);
INSERT INTO contacts (name, cellphone) VALUES ('Nathan da Mata', 5541971551888);
INSERT INTO contacts (name, cellphone) VALUES ('Nina Sales', 5541952206418);
INSERT INTO contacts (name, cellphone) VALUES ('Natália Caldeira', 5541977897055);
INSERT INTO contacts (name, cellphone) VALUES ('Thiago Cardoso', 5541928464916);
INSERT INTO contacts (name, cellphone) VALUES ('Yago Ferreira', 5541962241042);
INSERT INTO contacts (name, cellphone) VALUES ('Isabel Moura', 5541917433481);
INSERT INTO contacts (name, cellphone) VALUES ('Francisco Nogueira', 5541916159692);
INSERT INTO contacts (name, cellphone) VALUES ('André Monteiro', 5541987830622);
INSERT INTO contacts (name, cellphone) VALUES ('Ana Julia Barbosa', 5541965101052);
INSERT INTO contacts (name, cellphone) VALUES ('Emanuella Vieira', 5541937084511);
INSERT INTO contacts (name, cellphone) VALUES ('Rebeca Correia', 5541944003092);
INSERT INTO contacts (name, cellphone) VALUES ('Luiza Lopes', 5541950648087);
INSERT INTO contacts (name, cellphone) VALUES ('Sr. Vitor Hugo Jesus', 5541966777904);
INSERT INTO contacts (name, cellphone) VALUES ('Bárbara da Rosa', 5541984242583);
INSERT INTO contacts (name, cellphone) VALUES ('Fernando Melo', 5541993278935);
INSERT INTO contacts (name, cellphone) VALUES ('Melissa Pereira', 5541961982198);
INSERT INTO contacts (name, cellphone) VALUES ('Luigi Melo', 5541937316914);
INSERT INTO contacts (name, cellphone) VALUES ('Davi Lucas Silva', 5541919590454);
INSERT INTO contacts (name, cellphone) VALUES ('Sr. Marcos Vinicius Alves', 5541940281564);
INSERT INTO contacts (name, cellphone) VALUES ('Igor da Rocha', 5541981148730);
INSERT INTO contacts (name, cellphone) VALUES ('Noah Ramos', 5541943467544);
INSERT INTO contacts (name, cellphone) VALUES ('Sofia Pinto', 5541942446391);
INSERT INTO contacts (name, cellphone) VALUES ('Joaquim Vieira', 5541988403129);