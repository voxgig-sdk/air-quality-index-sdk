# AirQualityIndex SDK

Real-time Air Quality Index and pollutant readings (PM2.5, PM10, CO, NO2, SO2, O3) for cities worldwide

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Air Quality Index API

The Air Quality Index API is hosted on [JuheAPI](https://hub.juheapi.com) and surfaces real-time air-quality readings for locations worldwide. It is catalogued on [freepublicapis.com](https://freepublicapis.com/air-quality-index-api), where it is reported to cover over 1000 major cities and 9000 monitoring stations.

What you get from the API:

- The current Air Quality Index (AQI) for a queried location.
- Concentrations for the common pollutants: PM2.5, PM10, CO, NO2, SO2, and O3.
- Lookup by client IP address via the `/aqi/v1/ip` endpoint.

Authentication is via an `apikey` query parameter. The community catalogue reports a typical response time of around 1.3 seconds and notes that CORS is disabled, so calls are best made from a server-side component.

## Try it

**TypeScript**
```bash
npm install air-quality-index
```

**Python**
```bash
pip install air-quality-index-sdk
```

**PHP**
```bash
composer require voxgig/air-quality-index-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/air-quality-index-sdk/go
```

**Ruby**
```bash
gem install air-quality-index-sdk
```

**Lua**
```bash
luarocks install air-quality-index-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AirQualityIndexSDK } from 'air-quality-index'

const client = new AirQualityIndexSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o air-quality-index-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "air-quality-index": {
      "command": "/abs/path/to/air-quality-index-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Aqi** | Air-quality readings — the AQI value plus pollutant concentrations (PM2.5, PM10, CO, NO2, SO2, O3) for a location, exposed under `/aqi/v1/ip` for IP-based lookup. | `/aqi/v1/city` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from airqualityindex_sdk import AirQualityIndexSDK

client = AirQualityIndexSDK({})


# Load a specific aqi
aqi, err = client.Aqi(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'airqualityindex_sdk.php';

$client = new AirQualityIndexSDK([]);


// Load a specific aqi
[$aqi, $err] = $client->Aqi(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/air-quality-index-sdk/go"

client := sdk.NewAirQualityIndexSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AirQualityIndex_sdk"

client = AirQualityIndexSDK.new({})


# Load a specific aqi
aqi, err = client.Aqi(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("air-quality-index_sdk")

local client = sdk.new({})


-- Load a specific aqi
local aqi, err = client:Aqi(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AirQualityIndexSDK.test()
const result = await client.Aqi().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AirQualityIndexSDK.test(None, None)
result, err = client.Aqi(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AirQualityIndexSDK::test(null, null);
[$result, $err] = $client->Aqi(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Aqi(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AirQualityIndexSDK.test(nil, nil)
result, err = client.Aqi(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Aqi(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Air Quality Index API

- Upstream: [https://hub.juheapi.com](https://hub.juheapi.com)

- Listed as a free public API on freepublicapis.com.
- Access requires an `apikey` query parameter issued by JuheAPI.
- No explicit licence terms are published with the API; consult [JuheAPI](https://hub.juheapi.com) for terms of use before redistribution.
- CORS is reported as disabled, so browser-side calls may need a proxy.

---

Generated from the Air Quality Index API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
