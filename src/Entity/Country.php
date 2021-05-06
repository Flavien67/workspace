<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Country
 *
 * @ORM\Table(name="country")
 * @ORM\Entity
 */
class Country
{
    /**
     * @var string
     *
     * @ORM\Column(name="Code", type="string", length=3, nullable=false, options={"fixed"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $code = '';

    /**
     * @var string
     *
     * @ORM\Column(name="Name", type="string", length=52, nullable=false, options={"fixed"=true})
     */
    private $name = '';

    /**
     * @var string
     *
     * @ORM\Column(name="Continent", type="string", length=0, nullable=false, options={"default"="Asia"})
     */
    private $continent = 'Asia';

    /**
     * @var string
     *
     * @ORM\Column(name="Region", type="string", length=26, nullable=false, options={"fixed"=true})
     */
    private $region = '';

    /**
     * @var float
     *
     * @ORM\Column(name="SurfaceArea", type="float", precision=10, scale=2, nullable=false, options={"default"="0.00"})
     */
    private $surfacearea = '0.00';

    /**
     * @var int|null
     *
     * @ORM\Column(name="IndepYear", type="smallint", nullable=true)
     */
    private $indepyear;

    /**
     * @var int
     *
     * @ORM\Column(name="Population", type="integer", nullable=false)
     */
    private $population = '0';

    /**
     * @var float|null
     *
     * @ORM\Column(name="LifeExpectancy", type="float", precision=3, scale=1, nullable=true)
     */
    private $lifeexpectancy;

    /**
     * @var float|null
     *
     * @ORM\Column(name="GNP", type="float", precision=10, scale=2, nullable=true)
     */
    private $gnp;

    /**
     * @var float|null
     *
     * @ORM\Column(name="GNPOld", type="float", precision=10, scale=2, nullable=true)
     */
    private $gnpold;

    /**
     * @var string
     *
     * @ORM\Column(name="LocalName", type="string", length=45, nullable=false, options={"fixed"=true})
     */
    private $localname = '';

    /**
     * @var string
     *
     * @ORM\Column(name="GovernmentForm", type="string", length=45, nullable=false, options={"fixed"=true})
     */
    private $governmentform = '';

    /**
     * @var string|null
     *
     * @ORM\Column(name="HeadOfState", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $headofstate;

    /**
     * @var int|null
     *
     * @ORM\Column(name="Capital", type="integer", nullable=true)
     */
    private $capital;

    /**
     * @var string
     *
     * @ORM\Column(name="Code2", type="string", length=2, nullable=false, options={"fixed"=true})
     */
    private $code2 = '';

    public function getCode(): ?string
    {
        return $this->code;
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

    public function getContinent(): ?string
    {
        return $this->continent;
    }

    public function setContinent(string $continent): self
    {
        $this->continent = $continent;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getSurfacearea(): ?float
    {
        return $this->surfacearea;
    }

    public function setSurfacearea(float $surfacearea): self
    {
        $this->surfacearea = $surfacearea;

        return $this;
    }

    public function getIndepyear(): ?int
    {
        return $this->indepyear;
    }

    public function setIndepyear(?int $indepyear): self
    {
        $this->indepyear = $indepyear;

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

    public function getLifeexpectancy(): ?float
    {
        return $this->lifeexpectancy;
    }

    public function setLifeexpectancy(?float $lifeexpectancy): self
    {
        $this->lifeexpectancy = $lifeexpectancy;

        return $this;
    }

    public function getGnp(): ?float
    {
        return $this->gnp;
    }

    public function setGnp(?float $gnp): self
    {
        $this->gnp = $gnp;

        return $this;
    }

    public function getGnpold(): ?float
    {
        return $this->gnpold;
    }

    public function setGnpold(?float $gnpold): self
    {
        $this->gnpold = $gnpold;

        return $this;
    }

    public function getLocalname(): ?string
    {
        return $this->localname;
    }

    public function setLocalname(string $localname): self
    {
        $this->localname = $localname;

        return $this;
    }

    public function getGovernmentform(): ?string
    {
        return $this->governmentform;
    }

    public function setGovernmentform(string $governmentform): self
    {
        $this->governmentform = $governmentform;

        return $this;
    }

    public function getHeadofstate(): ?string
    {
        return $this->headofstate;
    }

    public function setHeadofstate(?string $headofstate): self
    {
        $this->headofstate = $headofstate;

        return $this;
    }

    public function getCapital(): ?int
    {
        return $this->capital;
    }

    public function setCapital(?int $capital): self
    {
        $this->capital = $capital;

        return $this;
    }

    public function getCode2(): ?string
    {
        return $this->code2;
    }

    public function setCode2(string $code2): self
    {
        $this->code2 = $code2;

        return $this;
    }


}
