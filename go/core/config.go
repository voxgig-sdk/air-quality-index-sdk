package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AirQualityIndex",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"active": true,
						"name": "aqi",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "city",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "co",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "geo",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "no2",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "o3",
						"req": true,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "pm10",
						"req": true,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "pm25",
						"req": true,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "so2",
						"req": true,
						"type": "`$STRING`",
						"index$": 8,
					},
				},
				"name": "aqi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "Los Angeles",
											"kind": "query",
											"name": "city",
											"orig": "city",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "8.8.8.8",
											"kind": "query",
											"name": "ip",
											"orig": "ip",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 34.0522,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": -118.2437,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
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
								"index$": 0,
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
