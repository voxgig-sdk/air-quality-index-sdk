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
    public string $code;
    public array $data;
    public string $msg;
}

/** Request payload for Aqi#load. */
class AqiLoadMatch
{
    public ?string $code = null;
    public ?array $data = null;
    public ?string $msg = null;
}

