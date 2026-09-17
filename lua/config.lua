-- AirQualityIndex SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AirQualityIndex",
      slug = "air-quality-index",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://hub.juheapi.com",
      auth = {
        prefix = "",
        name = "X-API-Key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["aqi"] = {},
      },
    },
    entity = {
      ["aqi"] = {
        ["fields"] = {
          {
            ["name"] = "aqi",
            ["req"] = true,
            ["short"] = "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "city",
            ["req"] = true,
            ["short"] = "Name of the city",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "co",
            ["req"] = true,
            ["short"] = "Carbon monoxide concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "geo",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "no2",
            ["req"] = true,
            ["short"] = "Nitrogen dioxide concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "o3",
            ["req"] = true,
            ["short"] = "Ozone concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pm10",
            ["req"] = true,
            ["short"] = "PM10 particulate matter concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pm25",
            ["req"] = true,
            ["short"] = "PM2.5 particulate matter concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "so2",
            ["req"] = true,
            ["short"] = "Sulfur dioxide concentration (µg/m³)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "aqi",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "Los Angeles",
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "8.8.8.8",
                      ["kind"] = "query",
                      ["name"] = "ip",
                      ["orig"] = "ip",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 34.0522,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = -118.2437,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/aqi/v1/city",
                ["segments"] = {
                  {
                    ["lit"] = "aqi",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "city",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "ip",
                    "lat",
                    "lon",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["parts"] = {
                  "aqi",
                  "v1",
                  "city",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
