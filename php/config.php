<?php
declare(strict_types=1);

// AirQualityIndex SDK configuration

class AirQualityIndexConfig
{
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
              'active' => true,
              'name' => 'aqi',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'city',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'co',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'geo',
              'req' => true,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'no2',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'o3',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'pm10',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'pm25',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'so2',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
          ],
          'name' => 'aqi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'Los Angeles',
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '8.8.8.8',
                        'kind' => 'query',
                        'name' => 'ip',
                        'orig' => 'ip',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 34.0522,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => -118.2437,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
