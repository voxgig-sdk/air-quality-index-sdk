<?php
declare(strict_types=1);

// AirQualityIndex SDK exists test

require_once __DIR__ . '/../airqualityindex_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AirQualityIndexSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
