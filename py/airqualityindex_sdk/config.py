# AirQualityIndex SDK configuration


def make_config():
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
            "active": True,
            "name": "aqi",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "city",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "co",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "geo",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "no2",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "o3",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "pm10",
            "req": True,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "pm25",
            "req": True,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "so2",
            "req": True,
            "type": "`$STRING`",
            "index$": 8,
          },
        ],
        "name": "aqi",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "Los Angeles",
                      "kind": "query",
                      "name": "city",
                      "orig": "city",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "8.8.8.8",
                      "kind": "query",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 34.0522,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": -118.2437,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
