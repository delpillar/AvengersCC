SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `Assemble` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `Assemble` ;

-- -----------------------------------------------------
-- Table `Assemble`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Assemble`.`Users` (
  `id` INT NOT NULL ,
  `name` VARCHAR(30) NULL ,
  `password` VARCHAR(256) NULL ,
  `email` VARCHAR(256) NULL ,
  `default_availability` VARCHAR(1024) NULL ,
  `token` VARCHAR(256) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Assemble`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Assemble`.`Events` (
  `id` INT NOT NULL ,
  `name` VARCHAR(30) NULL ,
  `start_date` INT NULL ,
  `end_date` INT NULL ,
  `description` VARCHAR(1024) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Assemble`.`UserEvents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Assemble`.`UserEvents` (
  `availability` VARCHAR(1024) NULL ,
  `Users_id` INT NOT NULL ,
  `Events_id` INT NOT NULL ,
  PRIMARY KEY (`Users_id`, `Events_id`) ,
  INDEX `fk_UserEvents_Events1_idx` (`Events_id` ASC) ,
  CONSTRAINT `fk_UserEvents_Users`
    FOREIGN KEY (`Users_id` )
    REFERENCES `Assemble`.`Users` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserEvents_Events1`
    FOREIGN KEY (`Events_id` )
    REFERENCES `Assemble`.`Events` (`id` )
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `Assemble` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
