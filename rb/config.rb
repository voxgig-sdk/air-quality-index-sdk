# AirQualityIndex SDK configuration

module AirQualityIndexConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AirQualityIndex",
        "slug" => "air-quality-index",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://hub.juheapi.com",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "aqi" => {},
        },
      },
      "entity" => {
        "aqi" => {
          "fields" => [
            {
              "name" => "aqi",
              "req" => true,
              "short" => "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
              "type" => "`$STRING`",
            },
            {
              "name" => "city",
              "req" => true,
              "short" => "Name of the city",
              "type" => "`$STRING`",
            },
            {
              "name" => "co",
              "req" => true,
              "short" => "Carbon monoxide concentration (µg/m³)",
              "type" => "`$STRING`",
            },
            {
              "name" => "geo",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "no2",
              "req" => true,
              "short" => "Nitrogen dioxide concentration (µg/m³)",
              "type" => "`$STRING`",
            },
            {
              "name" => "o3",
              "req" => true,
              "short" => "Ozone concentration (µg/m³)",
              "type" => "`$STRING`",
            },
            {
              "name" => "pm10",
              "req" => true,
              "short" => "PM10 particulate matter concentration (µg/m³)",
              "type" => "`$STRING`",
            },
            {
              "name" => "pm25",
              "req" => true,
              "short" => "PM2.5 particulate matter concentration (µg/m³)",
              "type" => "`$STRING`",
            },
            {
              "name" => "so2",
              "req" => true,
              "short" => "Sulfur dioxide concentration (µg/m³)",
              "type" => "`$STRING`",
            },
          ],
          "name" => "aqi",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "Los Angeles",
                        "kind" => "query",
                        "name" => "city",
                        "orig" => "city",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "8.8.8.8",
                        "kind" => "query",
                        "name" => "ip",
                        "orig" => "ip",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 34.0522,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => -118.2437,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/aqi/v1/city",
                  "segments" => [
                    {
                      "lit" => "aqi",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "city",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "city",
                      "ip",
                      "lat",
                      "lon",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "parts" => [
                    "aqi",
                    "v1",
                    "city",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AirQualityIndexFeatures.make_feature(name)
  end
end
