<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200505091658 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE city CHANGE Name Name CHAR(35) NOT NULL, CHANGE CountryCode CountryCode CHAR(3) DEFAULT NULL, CHANGE District District CHAR(20) DEFAULT NULL, CHANGE Population Population INT NOT NULL');
        $this->addSql('ALTER TABLE country CHANGE Code Code CHAR(3) NOT NULL, CHANGE Name Name CHAR(52) NOT NULL, CHANGE Continent Continent VARCHAR(255) DEFAULT \'Asia\' NOT NULL, CHANGE Region Region CHAR(26) NOT NULL, CHANGE IndepYear IndepYear SMALLINT DEFAULT NULL, CHANGE Population Population INT NOT NULL, CHANGE LifeExpectancy LifeExpectancy DOUBLE PRECISION DEFAULT NULL, CHANGE GNP GNP DOUBLE PRECISION DEFAULT NULL, CHANGE GNPOld GNPOld DOUBLE PRECISION DEFAULT NULL, CHANGE LocalName LocalName CHAR(45) NOT NULL, CHANGE GovernmentForm GovernmentForm CHAR(45) NOT NULL, CHANGE HeadOfState HeadOfState CHAR(60) DEFAULT NULL, CHANGE Capital Capital INT DEFAULT NULL, CHANGE Code2 Code2 CHAR(2) NOT NULL');
        $this->addSql('ALTER TABLE countrylanguage DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE countrylanguage CHANGE CountryCode CountryCode CHAR(3) NOT NULL, CHANGE Language Language CHAR(30) NOT NULL, CHANGE IsOfficial IsOfficial VARCHAR(255) DEFAULT \'F\' NOT NULL');
        $this->addSql('ALTER TABLE countrylanguage ADD PRIMARY KEY (Language, CountryCode)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE city CHANGE Name Name CHAR(35) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE District District CHAR(20) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' COLLATE `utf8_general_ci`, CHANGE Population Population INT DEFAULT 0 NOT NULL, CHANGE CountryCode CountryCode CHAR(3) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`');
        $this->addSql('ALTER TABLE country CHANGE Code Code CHAR(3) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE Name Name CHAR(52) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE Continent Continent VARCHAR(255) CHARACTER SET utf8 DEFAULT \'\'\'Asia\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE Region Region CHAR(26) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE IndepYear IndepYear SMALLINT DEFAULT NULL, CHANGE Population Population INT DEFAULT 0 NOT NULL, CHANGE LifeExpectancy LifeExpectancy DOUBLE PRECISION DEFAULT \'NULL\', CHANGE GNP GNP DOUBLE PRECISION DEFAULT \'NULL\', CHANGE GNPOld GNPOld DOUBLE PRECISION DEFAULT \'NULL\', CHANGE LocalName LocalName CHAR(45) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE GovernmentForm GovernmentForm CHAR(45) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE HeadOfState HeadOfState CHAR(60) CHARACTER SET utf8 DEFAULT \'NULL\' COLLATE `utf8_general_ci`, CHANGE Capital Capital INT DEFAULT NULL, CHANGE Code2 Code2 CHAR(2) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`');
        $this->addSql('ALTER TABLE countrylanguage DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE countrylanguage CHANGE Language Language CHAR(30) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE IsOfficial IsOfficial VARCHAR(255) CHARACTER SET utf8 DEFAULT \'\'\'F\'\'\' NOT NULL COLLATE `utf8_general_ci`, CHANGE CountryCode CountryCode CHAR(3) CHARACTER SET utf8 DEFAULT \'\'\'\'\'\' NOT NULL COLLATE `utf8_general_ci`');
        $this->addSql('ALTER TABLE countrylanguage ADD PRIMARY KEY (CountryCode, Language)');
    }
}
