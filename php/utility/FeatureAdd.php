<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: feature_add

class AirQualityIndexFeatureAdd
{
    public static function call(AirQualityIndexContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
