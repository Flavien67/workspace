<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Countrylanguage
 *
 * @ORM\Table(name="countrylanguage", indexes={@ORM\Index(name="CountryCode", columns={"CountryCode"})})
 * @ORM\Entity
 */
class Countrylanguage
{
    /**
     * @var string
     *
     * @ORM\Column(name="Language", type="string", length=30, nullable=false, options={"fixed"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $language = '';

    /**
     * @var string
     *
     * @ORM\Column(name="IsOfficial", type="string", length=0, nullable=false, options={"default"="F"})
     */
    private $isofficial = 'F';

    /**
     * @var float
     *
     * @ORM\Column(name="Percentage", type="float", precision=4, scale=1, nullable=false, options={"default"="0.0"})
     */
    private $percentage = '0.0';

    /**
     * @var \Country
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CountryCode", referencedColumnName="Code")
     * })
     */
    private $countrycode;

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function getIsofficial(): ?string
    {
        return $this->isofficial;
    }

    public function setIsofficial(string $isofficial): self
    {
        $this->isofficial = $isofficial;

        return $this;
    }

    public function getPercentage(): ?float
    {
        return $this->percentage;
    }

    public function setPercentage(float $percentage): self
    {
        $this->percentage = $percentage;

        return $this;
    }

    public function getCountrycode(): ?Country
    {
        return $this->countrycode;
    }

    public function setCountrycode(?Country $countrycode): self
    {
        $this->countrycode = $countrycode;

        return $this;
    }


}
