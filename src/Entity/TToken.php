<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TToken
 *
 * @ORM\Table(name="t_token")
 * @ORM\Entity
 */
class TToken
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", length=60, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="token", type="string", length=60, nullable=false)
     */
    public $token;

    /**
     * @var string
     *
     * @ORM\Column(name="data", type="string", length=255, nullable=false)
     */
    public $data;

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function getData(): ?string
    {
        return $this->data;
    }

    public function setData(string $data): self
    {
        $this->data = $data;

        return $this;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }


}
