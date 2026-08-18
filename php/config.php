<?php
declare(strict_types=1);

// AirQualityIndex SDK configuration

class AirQualityIndexConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AirQualityIndex",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://hub.juheapi.com",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "aqi" => [],
                ],
            ],
            "entity" => [
        'aqi' => [
          'fields' => [
            [
              'name' => 'aqi',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'city',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'co',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'geo',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'no2',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'o3',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pm10',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pm25',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'so2',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'aqi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'Los Angeles',
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '8.8.8.8',
                        'kind' => 'query',
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 34.0522,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => -118.2437,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/aqi/v1/city',
                  'parts' => [
                    'aqi',
                    'v1',
                    'city',
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'ip',
                      'lat',
                      'lon',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.data`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AirQualityIndexFeatures::make_feature($name);
    }
}
