"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AirQualityIndex',
        slug: "air-quality-index",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://hub.juheapi.com",
        auth: {
            prefix: '',
            name: 'X-API-Key',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            aqi: {},
        }
    };
    entity = {
        "aqi": {
            "fields": [
                {
                    "name": "aqi",
                    "title": "Aqi",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards"
                },
                {
                    "name": "city",
                    "title": "City",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Name of the city"
                },
                {
                    "name": "co",
                    "title": "Co",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Carbon monoxide concentration (µg/m³)"
                },
                {
                    "name": "geo",
                    "title": "Geo",
                    "type": "`$OBJECT`",
                    "req": true
                },
                {
                    "name": "no2",
                    "title": "No2",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Nitrogen dioxide concentration (µg/m³)"
                },
                {
                    "name": "o3",
                    "title": "O3",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Ozone concentration (µg/m³)"
                },
                {
                    "name": "pm10",
                    "title": "Pm10",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "PM10 particulate matter concentration (µg/m³)"
                },
                {
                    "name": "pm25",
                    "title": "Pm25",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "PM2.5 particulate matter concentration (µg/m³)"
                },
                {
                    "name": "so2",
                    "title": "So2",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Sulfur dioxide concentration (µg/m³)"
                }
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
                                    "lit": "aqi"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "city"
                                }
                            ],
                            "parts": [
                                "aqi",
                                "v1",
                                "city"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "city",
                                        "orig": "city",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "Los Angeles"
                                    },
                                    {
                                        "name": "ip",
                                        "orig": "ip",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "8.8.8.8"
                                    },
                                    {
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 34.0522
                                    },
                                    {
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": -118.2437
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "city",
                                    "ip",
                                    "lat",
                                    "lon"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map