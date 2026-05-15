<?php
declare(strict_types=1);

// AirQualityIndex SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AirQualityIndexFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AirQualityIndexBaseFeature();
            case "test":
                return new AirQualityIndexTestFeature();
            default:
                return new AirQualityIndexBaseFeature();
        }
    }
}
