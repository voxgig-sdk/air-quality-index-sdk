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
            "type": "`$STRING`",
          },
          {
            "name": "city",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "co",
            "req": True,
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
            "type": "`$STRING`",
          },
          {
            "name": "o3",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "pm10",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "pm25",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "so2",
            "req": True,
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
