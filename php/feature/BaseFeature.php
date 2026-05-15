<?php
declare(strict_types=1);

// AirQualityIndex SDK base feature

class AirQualityIndexBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AirQualityIndexContext $ctx, array $options): void {}
    public function PostConstruct(AirQualityIndexContext $ctx): void {}
    public function PostConstructEntity(AirQualityIndexContext $ctx): void {}
    public function SetData(AirQualityIndexContext $ctx): void {}
    public function GetData(AirQualityIndexContext $ctx): void {}
    public function GetMatch(AirQualityIndexContext $ctx): void {}
    public function SetMatch(AirQualityIndexContext $ctx): void {}
    public function PrePoint(AirQualityIndexContext $ctx): void {}
    public function PreSpec(AirQualityIndexContext $ctx): void {}
    public function PreRequest(AirQualityIndexContext $ctx): void {}
    public function PreResponse(AirQualityIndexContext $ctx): void {}
    public function PreResult(AirQualityIndexContext $ctx): void {}
    public function PreDone(AirQualityIndexContext $ctx): void {}
    public function PreUnexpected(AirQualityIndexContext $ctx): void {}
}
