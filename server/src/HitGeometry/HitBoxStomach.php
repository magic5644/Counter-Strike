<?php

namespace cs\HitGeometry;

use cs\Core\Player;
use cs\Core\Point;

class HitBoxStomach extends SphereGroupHitBox
{
    private Point $centerPoint;

    public function __construct()
    {
        $this->centerPoint = new Point();
        parent::__construct(function (Player $player): Point {
            return $this->centerPoint->setScalar(0)->addY($player->getHeadHeight());
        });

        $this->createFrontRight();
        $this->createFrontLeft();
    }

    private function createFrontLeft(): void
    {
        $this->addHitBox(new Point(-10, -72, 7), 6);
        $this->addHitBox(new Point(-10, -65, 6), 6);
        $this->addHitBox(new Point(-10, -59, 6), 6);
        $this->addHitBox(new Point(-11, -52, 5), 6);
        $this->addHitBox(new Point(-11, -58, 0), 4);
        $this->addHitBox(new Point(-2, -79, 10), 6);
        $this->addHitBox(new Point(-2, -69, 9), 6);
        $this->addHitBox(new Point(-3, -60, 8), 6);
        $this->addHitBox(new Point(-3, -52, 8), 6);
        $this->addHitBox(new Point(-11, -78, 6), 6);
    }

    private function createFrontRight(): void
    {
        $this->addHitBox(new Point(10, -72, 7), 6);
        $this->addHitBox(new Point(10, -65, 6), 6);
        $this->addHitBox(new Point(10, -59, 6), 6);
        $this->addHitBox(new Point(11, -52, 5), 6);
        $this->addHitBox(new Point(11, -58, 0), 4);
        $this->addHitBox(new Point(2, -79, 10), 6);
        $this->addHitBox(new Point(2, -69, 9), 6);
        $this->addHitBox(new Point(3, -60, 8), 6);
        $this->addHitBox(new Point(3, -52, 8), 6);
        $this->addHitBox(new Point(11, -78, 6), 6);
    }

}
