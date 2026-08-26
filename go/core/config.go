package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AirQualityIndex",
			"slug": "air-quality-index",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://hub.juheapi.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"aqi": map[string]any{},
			},
		},
		"entity": map[string]any{
			"aqi": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aqi",
						"req": true,
						"short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"req": true,
						"short": "Name of the city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "co",
						"req": true,
						"short": "Carbon monoxide concentration (µg/m³)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "geo",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "no2",
						"req": true,
						"short": "Nitrogen dioxide concentration (µg/m³)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "o3",
						"req": true,
						"short": "Ozone concentration (µg/m³)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pm10",
						"req": true,
						"short": "PM10 particulate matter concentration (µg/m³)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pm25",
						"req": true,
						"short": "PM2.5 particulate matter concentration (µg/m³)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "so2",
						"req": true,
						"short": "Sulfur dioxide concentration (µg/m³)",
						"type": "`$STRING`",
					},
				},
				"name": "aqi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Los Angeles",
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "8.8.8.8",
											"kind": "query",
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 34.0522,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": -118.2437,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/aqi/v1/city",
								"parts": []any{
									"aqi",
									"v1",
									"city",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"ip",
										"lat",
										"lon",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
