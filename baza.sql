

create table stanovi(
idstanovi int not null primary key identity(1,1),
kvadratura int not null,
adresa varchar(100) not null,
oprema varchar(100),
slika varchar(100)
);

 create table zakupci(
 idzakupci int not null primary key identity(1,1),
 ime varchar(100),
 prezime varchar(100),
 email varchar(100) not null,
 telefon varchar(100)
 );

 create table najmovi(
 idnajmovi int not null primary key identity(1,1),
 idstanovi int not null,
 idzakupci int not null,
 datumpocetka date,
 datumzavrsetka date,
 cijenanajma money
);


alter table najmovi add foreign key (idstanovi) references stanovi(idstanovi);
alter table najmovi add foreign key (idzakupci) references zakupci(idzakupci);


select * from stanovi;
insert into stanovi (kvadratura,adresa,oprema,slika) values 
(50,'Zell am See','kuhinja,spavaonica,wc,terasa','slika.jpg'),
(73,'Saalfelden','wc','slika.jpg'),
(105,'Mittersil','kuhinja,kupatilo,ostava','slika.jpg'),
(23,'Turnbach','terasa,kupatilo','slika.jpg');

select * from zakupci;
insert into zakupci (ime,prezime,email,telefon) values 
('Kristina','Andric','fashionbykriss@gmail.com','031511271'),
('Tomislav','Rogic','tomislav.rogic@gmail.com','025485645'),
('Lara','Bakalar','larabakalar@gmail.com','051425152'),
('Tihomir','Pametnjakovic','tihomir.pametnjakovic@gmail.com','034253548');

select * from najmovi;
insert into najmovi (idstanovi,idzakupci,datumpocetka,datumzavrsetka,cijenanajma) values 
(2,3,'2024-02-07 15:09','2024-02-07 09:55',1560),
(4,1,'2022-03-09 22:40','2024-09-01 01:20',900),
(1,4,'2024-12-16 13:05','2025-09-01 00:00',3421),
(3,2,'2021-04-18 03:15','2024-11-01 01:26',1155);