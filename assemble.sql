SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `assemble` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `assemble` ;

-- -----------------------------------------------------
-- Table `assemble`.`Users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `assemble`.`Users` (
  `id` INT NOT NULL ,
  `name` VARCHAR(30) NULL ,
  `password` VARCHAR(256) NULL ,
  `email` VARCHAR(256) NULL ,
  `default_availability` VARCHAR(256) NULL ,
  `token` VARCHAR(256) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `assemble`.`Events`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `assemble`.`Events` (
  `id` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `start_date` VARCHAR(45) NULL ,
  `end_date` VARCHAR(45) NULL ,
  `description` VARCHAR(1024) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `assemble`.`UserEvents`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `assemble`.`UserEvents` (
  `availability` VARCHAR(1056) NULL ,
  `Users_id` INT NOT NULL ,
  `Events_id` INT NOT NULL ,
  PRIMARY KEY (`Users_id`, `Events_id`) ,
  INDEX `fk_UserEvents_Events1_idx` (`Events_id` ASC) ,
  CONSTRAINT `fk_UserEvents_Users`
    FOREIGN KEY (`Users_id` )
    REFERENCES `assemble`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserEvents_Events1`
    FOREIGN KEY (`Events_id` )
    REFERENCES `assemble`.`Events` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `assemble` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
