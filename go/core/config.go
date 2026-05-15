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
				"prefix": "Bearer",
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
						"name": "code",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "data",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "msg",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
				},
				"name": "aqi",
				"op": map[string]any{
					"load": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "8.8.8.8",
											"kind": "query",
											"name": "ip",
											"orig": "ip",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 34.0522,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"example": -118.2437,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": false,
											"type": "`$NUMBER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
