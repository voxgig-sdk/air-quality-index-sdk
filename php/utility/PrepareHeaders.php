<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: prepare_headers

class AirQualityIndexPrepareHeaders
{
    public static function call(AirQualityIndexContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
