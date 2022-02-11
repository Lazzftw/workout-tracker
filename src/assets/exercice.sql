PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS days(dayId INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT);
INSERT or IGNORE INTO days VALUES (1 , 'DAY 1');
INSERT or IGNORE INTO days VALUES (2 , 'DAY 2');
INSERT or IGNORE INTO days VALUES (3 , 'DAY 3');

PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS exercices(id INTEGER PRIMARY KEY AUTOINCREMENT ,dayId INTEGER ,name TEXT,set1 INTEGER,set2 INTEGER, set3 INTEGER, set4 INTEGER,img TEXT, FOREIGN KEY (dayId) REFERENCES days (dayId) ON DELETE CASCADE);
INSERT or IGNORE INTO exercices VALUES (1, 1, 'Bench Press', 18.75, 20, 21.25, NULL , 'assets/img/article-ath-benchpress.jpg');
INSERT or IGNORE INTO exercices VALUES (2, 1,'Overhead press', 8.75, 10, 11.25, NULL, 'assets/img/default.png');
INSERT or IGNORE INTO exercices VALUES (3, 1,'Trapez Bar Lift', 31.25, 32.5, 32.5, '', 'assets/img/default.png');
INSERT or IGNORE INTO exercices VALUES (4, 1,'Back Bar Lift', '45', '46.5', '47.5', '', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO exercices VALUES (5, 1,'Biceps Bar Lift', '8.75', '8.75', '8.75', '', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (6, 1,'Triceps Bar', '7.5', '7.5', '7.5', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (7, 2, 'Bench Press Incline', '18.75', '18.75', '18.75', '', 'assets/img/article-ath-benchpress.jpg');
INSERT or IGNORE INTO exercices VALUES (8, 2,'Lift haltere Shoulder', '7.5', '7.5', '7.5', '', 'img/article-ath-benchpress.jpg');
INSERT or IGNORE INTO exercices VALUES (9, 2,'Trapez haltere', '31.25', '32.5', '32.5', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (10, 2,'Back Lift machine', '45', '46.5', '47.5', '', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO exercices VALUES (11, 2,'Biceps Bar Lift', '8.75', '8.75', '8.75', '', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (12, 2,'Triceps Bar', '7.5', '7.5', '7.5', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (13, 3, 'Bench Press', '18.75', '20', '21.25', '', 'assets/img/article-ath-benchpress.jpg');
INSERT or IGNORE INTO exercices VALUES (14, 3,'Shoulder Bar Lift', '8.75', '10', '11.25', '', 'img/article-ath-benchpress.jpg');
INSERT or IGNORE INTO exercices VALUES (15, 3,'Trapez Bar Lift', '31.25', '32.5', '32.5', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (16, 3,'Back Bar Lift', '45', '46.5', '47.5', '', 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO exercices VALUES (17, 3,'Biceps Bar Lift', '8.75', '8.75', '8.75', '', 'https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO exercices VALUES (18, 3,'Triceps Bar', '7.5', '7.5', '7.5', '', 'https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');


