<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: prepare_body

class AirQualityIndexPrepareBody
{
    public static function call(AirQualityIndexContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
