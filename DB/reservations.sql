-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eventdb` ;

-- -----------------------------------------------------
-- Schema eventdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eventdb` DEFAULT CHARACTER SET utf8 ;
USE `eventdb` ;

-- -----------------------------------------------------
-- Table `reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservation` ;

CREATE TABLE IF NOT EXISTS `reservation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(500) NOT NULL,
  `reservation_time` DATETIME NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `how_many` INT NOT NULL,
  `requests` TEXT NULL,
  `email` VARCHAR(200) NULL,
  `enabled` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS eventuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'eventuser'@'localhost' IDENTIFIED BY 'eventuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'eventuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `reservation`
-- -----------------------------------------------------
START TRANSACTION;
USE `eventdb`;
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (1, 'Rob', '2020-06-09 18:30:00', '123-456-7890', 3, 'none', 'Test@yahoo.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (2, 'Denise', '2020-06-11 13:30:00', '834-561-6451', 6, 'VEGAN', 'xyzdorayme@aol.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (3, 'Briana', '2020-06-15 11:15:00', '487-651-9321', 2, 'birthday', 'swifty@msn.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (4, 'Alex', '2020-06-24 20:30:00', '648-814-9132', 1, 'retirement', 'upandatem@gmail.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (5, 'Jeremy', '2020-06-30 21:30:00', '645-465-4657', 3, 'no gluten', 'humanity@protonmail.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (6, 'Anthony', '2020-07-06 22:00:00', '303-854-8799', 10, 'special menu', 'specialness@msn.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (7, 'Emily', '2020-07-10 18:45:00', '360-987-8872', 5, 'no pork', 'deepthoughts@yahoo.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (8, 'Bruce', '2020-07-19 21:15:00', '212-985-3658', 6, 'needs food very hot', 'ohlalaouioui@gmail.com', 1);
INSERT INTO `reservation` (`id`, `name`, `reservation_time`, `phone`, `how_many`, `requests`, `email`, `enabled`) VALUES (9, 'Frida', '2020-07-28 19:00:00', '144-745-6598', 4, 'free desert', 'ambigiousmapping@aol.com', 1);

COMMIT;

