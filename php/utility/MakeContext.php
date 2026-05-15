<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AirQualityIndexMakeContext
{
    public static function call(array $ctxmap, ?AirQualityIndexContext $basectx): AirQualityIndexContext
    {
        return new AirQualityIndexContext($ctxmap, $basectx);
    }
}
