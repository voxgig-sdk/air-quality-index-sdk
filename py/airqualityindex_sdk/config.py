# AirQualityIndex SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AirQualityIndex",
            "slug": "air-quality-index",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://hub.juheapi.com",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "aqi": {},
            },
        },
        "entity": {
      "aqi": {
        "fields": [
          {
            "name": "aqi",
            "title": "Aqi",
            "type": "`$STRING`",
            "req": True,
            "short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the city",
          },
          {
            "name": "co",
            "title": "Co",
            "type": "`$STRING`",
            "req": True,
            "short": "Carbon monoxide concentration (µg/m³)",
          },
          {
            "name": "geo",
            "title": "Geo",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "no2",
            "title": "No2",
            "type": "`$STRING`",
            "req": True,
            "short": "Nitrogen dioxide concentration (µg/m³)",
          },
          {
            "name": "o3",
            "title": "O3",
            "type": "`$STRING`",
            "req": True,
            "short": "Ozone concentration (µg/m³)",
          },
          {
            "name": "pm10",
            "title": "Pm10",
            "type": "`$STRING`",
            "req": True,
            "short": "PM10 particulate matter concentration (µg/m³)",
          },
          {
            "name": "pm25",
            "title": "Pm25",
            "type": "`$STRING`",
            "req": True,
            "short": "PM2.5 particulate matter concentration (µg/m³)",
          },
          {
            "name": "so2",
            "title": "So2",
            "type": "`$STRING`",
            "req": True,
            "short": "Sulfur dioxide concentration (µg/m³)",
          },
        ],
        "name": "aqi",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/aqi/v1/city",
                "segments": [
                  {
                    "lit": "aqi",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "city",
                  },
                ],
                "parts": [
                  "aqi",
                  "v1",
                  "city",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Los Angeles",
                    },
                    {
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "8.8.8.8",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 34.0522,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": -118.2437,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                    "ip",
                    "lat",
                    "lon",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
