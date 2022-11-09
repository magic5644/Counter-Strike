<?php

namespace cs\Core;

class Point2D
{

    public function __construct(public int $x = 0, public int $y = 0)
    {
    }

    public function getX(): int
    {
        return $this->x;
    }

    public function getY(): int
    {
        return $this->y;
    }

    public function isOrigin(): bool
    {
        return ($this->x === 0 && $this->y === 0);
    }

    public function equals(self $point): bool
    {
        return ($this->x === $point->x && $this->y === $point->y);
    }

    public function addX(int $amount): self
    {
        $this->x += $amount;
        return $this;
    }

    public function setX(int $int): self
    {
        $this->x = $int;
        return $this;
    }

    public function addY(int $amount): self
    {
        $this->y += $amount;
        return $this;
    }

    public function setY(int $int): self
    {
        $this->y = $int;
        return $this;
    }

    public function __toString(): string
    {
        return "Point2D({$this->x},{$this->y})";
    }

    public function clone(): self
    {
        return new self($this->x, $this->y);
    }

    public function setFrom(self $point): void
    {
        $this->setX($point->x);
        $this->setY($point->y);
    }

    /**
     * @return array<string,int>
     */
    public function toArray(): array
    {
        return [
            "x" => $this->getX(),
            "y" => $this->getY(),
        ];
    }

}
