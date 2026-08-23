# AirQualityIndex Python SDK Reference

Complete API reference for the AirQualityIndex Python SDK.


## AirQualityIndexSDK

### Constructor

```python
from airqualityindex_sdk import AirQualityIndexSDK

client = AirQualityIndexSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AirQualityIndexSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AirQualityIndexSDK.test()
```


### Instance Methods

#### `Aqi(data=None)`

Create a new `AqiEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AqiEntity

```python
aqi = client.Aqi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aqi` | `str` | Yes | Air Quality Index - comprehensive air quality indicator based on US EPA standards |
| `city` | `str` | Yes | Name of the city |
| `co` | `str` | Yes | Carbon monoxide concentration (µg/m³) |
| `geo` | `dict` | Yes |  |
| `no2` | `str` | Yes | Nitrogen dioxide concentration (µg/m³) |
| `o3` | `str` | Yes | Ozone concentration (µg/m³) |
| `pm10` | `str` | Yes | PM10 particulate matter concentration (µg/m³) |
| `pm25` | `str` | Yes | PM2.5 particulate matter concentration (µg/m³) |
| `so2` | `str` | Yes | Sulfur dioxide concentration (µg/m³) |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Aqi().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AqiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = AirQualityIndexSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

