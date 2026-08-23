# AirQualityIndex SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://hub.juheapi.com",
            "auth": {
                "prefix": "",
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
            "req": True,
            "short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
            "type": "`$STRING`",
          },
          {
            "name": "city",
            "req": True,
            "short": "Name of the city",
            "type": "`$STRING`",
          },
          {
            "name": "co",
            "req": True,
            "short": "Carbon monoxide concentration (µg/m³)",
            "type": "`$STRING`",
          },
          {
            "name": "geo",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "no2",
            "req": True,
            "short": "Nitrogen dioxide concentration (µg/m³)",
            "type": "`$STRING`",
          },
          {
            "name": "o3",
            "req": True,
            "short": "Ozone concentration (µg/m³)",
            "type": "`$STRING`",
          },
          {
            "name": "pm10",
            "req": True,
            "short": "PM10 particulate matter concentration (µg/m³)",
            "type": "`$STRING`",
          },
          {
            "name": "pm25",
            "req": True,
            "short": "PM2.5 particulate matter concentration (µg/m³)",
            "type": "`$STRING`",
          },
          {
            "name": "so2",
            "req": True,
            "short": "Sulfur dioxide concentration (µg/m³)",
            "type": "`$STRING`",
          },
        ],
        "name": "aqi",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "Los Angeles",
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "8.8.8.8",
                      "kind": "query",
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 34.0522,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": -118.2437,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/aqi/v1/city",
                "parts": [
                  "aqi",
                  "v1",
                  "city",
                ],
                "select": {
                  "exist": [
                    "city",
                    "ip",
                    "lat",
                    "lon",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
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
