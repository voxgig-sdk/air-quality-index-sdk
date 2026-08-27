<?php
declare(strict_types=1);

// Typed models for the AirQualityIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Aqi entity data model. */
class Aqi
{
    public string $aqi;
    public string $city;
    public string $co;
    public array $geo;
    public string $no2;
    public string $o3;
    public string $pm10;
    public string $pm25;
    public string $so2;
}

/** Request payload for Aqi#load. */
class AqiLoadMatch
{
    public ?string $city = null;
    public ?string $ip = null;
    public ?float $lat = null;
    public ?float $lon = null;
}

