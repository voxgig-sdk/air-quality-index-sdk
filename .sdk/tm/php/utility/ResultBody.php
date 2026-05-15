<?php
declare(strict_types=1);

// AirQualityIndex SDK utility: result_body

class AirQualityIndexResultBody
{
    public static function call(AirQualityIndexContext $ctx): ?AirQualityIndexResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
