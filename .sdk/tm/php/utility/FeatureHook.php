<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: feature_hook

class AirQualityIndexFeatureHook
{
    public static function call(AirQualityIndexContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
