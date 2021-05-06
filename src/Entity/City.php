<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 * City
 *
 * @ORM\Table(name="city", indexes={@ORM\Index(name="CountryCode", columns={"CountryCode"})})
 * @ORM\Entity
 */
class City
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="Name", type="string", length=35, nullable=false, options={"fixed"=true})
     */
    private $name = '';

    /**
     * @var string|null
     *
     * @ORM\Column(name="District", type="string", length=20, nullable=true, options={"fixed"=true})
     */
    private $district = '';

    /**
     * @var int
     *
     * @ORM\Column(name="Population", type="integer", nullable=false)
     */
    private $population = '0';

    /**
     * @var \Country
     *
     * @ORM\ManyToOne(targetEntity="Country")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="CountryCode", referencedColumnName="Code")
     * })
     */
    private $countrycode;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDistrict(): ?string
    {
        return $this->district;
    }

    public function setDistrict(?string $district): self
    {
        $this->district = $district;

        return $this;
    }

    public function getPopulation(): ?int
    {
        return $this->population;
    }

    public function setPopulation(int $population): self
    {
        $this->population = $population;

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
