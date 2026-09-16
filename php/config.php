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
                "slug" => "air-quality-index",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'short' => 'Air Quality Index - comprehensive air quality indicator based on US EPA standards',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'city',
              'req' => true,
              'short' => 'Name of the city',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'co',
              'req' => true,
              'short' => 'Carbon monoxide concentration (µg/m³)',
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
              'short' => 'Nitrogen dioxide concentration (µg/m³)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'o3',
              'req' => true,
              'short' => 'Ozone concentration (µg/m³)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pm10',
              'req' => true,
              'short' => 'PM10 particulate matter concentration (µg/m³)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'pm25',
              'req' => true,
              'short' => 'PM2.5 particulate matter concentration (µg/m³)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'so2',
              'req' => true,
              'short' => 'Sulfur dioxide concentration (µg/m³)',
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
                  'segments' => [
                    [
                      'lit' => 'aqi',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'city',
                    ],
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
                  'parts' => [
                    'aqi',
                    'v1',
                    'city',
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
