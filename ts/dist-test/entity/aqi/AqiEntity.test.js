"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AqiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AIR_QUALITY_INDEX_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AIR_QUALITY_INDEX_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AirQualityIndexSDK.test();
        const ent = testsdk.Aqi();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AIR_QUALITY_INDEX_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'aqi.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "aqi", "req": true, "short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "city", "req": true, "short": "Name of the city", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "co", "req": true, "short": "Carbon monoxide concentration (µg/m³)", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "geo", "req": true, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "no2", "req": true, "short": "Nitrogen dioxide concentration (µg/m³)", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "o3", "req": true, "short": "Ozone concentration (µg/m³)", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "pm10", "req": true, "short": "PM10 particulate matter concentration (µg/m³)", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "pm25", "req": true, "short": "PM2.5 particulate matter concentration (µg/m³)", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "so2", "req": true, "short": "Sulfur dioxide concentration (µg/m³)", "type": "`$STRING`", "index$": 8 }], "name": "aqi", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "Los Angeles", "kind": "query", "name": "city", "orig": "city", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "8.8.8.8", "kind": "query", "name": "ip", "orig": "ip", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 34.0522, "kind": "query", "name": "lat", "orig": "lat", "reqd": false, "type": "`$NUMBER`", "index$": 2 }, { "active": true, "example": -118.2437, "kind": "query", "name": "lon", "orig": "lon", "reqd": false, "type": "`$NUMBER`", "index$": 3 }] }, "contract": { "id": "GET /aqi/v1/city", "json": "{\"operationId\":\"getAQIByCity\",\"parameters\":[{\"description\":\"Name of the city to query air quality data for\",\"in\":\"query\",\"name\":\"city\",\"required\":false,\"schema\":{\"example\":\"Los Angeles\",\"type\":\"string\"}},{\"description\":\"Latitude coordinate for precise location query\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"example\":34.0522,\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Longitude coordinate for precise location query\",\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"example\":-118.2437,\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"IP address for automatic location detection\",\"in\":\"query\",\"name\":\"ip\",\"required\":false,\"schema\":{\"example\":\"8.8.8.8\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"200\",\"data\":{\"aqi\":\"53\",\"city\":\"Los Angeles\",\"co\":\"350.5\",\"geo\":{\"lat\":\"34.0522\",\"lon\":\"-118.2437\"},\"no2\":\"15.2\",\"o3\":\"58.6\",\"pm10\":\"22.1\",\"pm25\":\"14.7\",\"so2\":\"1.9\"},\"msg\":\"Success\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Response status code\",\"example\":\"200\",\"type\":\"string\"},\"data\":{\"properties\":{\"aqi\":{\"description\":\"Air Quality Index - comprehensive air quality indicator based on US EPA standards\",\"example\":\"53\",\"type\":\"string\"},\"city\":{\"description\":\"Name of the city\",\"example\":\"Los Angeles\",\"type\":\"string\"},\"co\":{\"description\":\"Carbon monoxide concentration (µg/m³)\",\"example\":\"350.5\",\"type\":\"string\"},\"geo\":{\"properties\":{\"lat\":{\"description\":\"Latitude coordinate of the monitoring station\",\"example\":\"34.0522\",\"type\":\"string\"},\"lon\":{\"description\":\"Longitude coordinate of the monitoring station\",\"example\":\"-118.2437\",\"type\":\"string\"}},\"required\":[\"lat\",\"lon\"],\"type\":\"object\"},\"no2\":{\"description\":\"Nitrogen dioxide concentration (µg/m³)\",\"example\":\"15.2\",\"type\":\"string\"},\"o3\":{\"description\":\"Ozone concentration (µg/m³)\",\"example\":\"58.6\",\"type\":\"string\"},\"pm10\":{\"description\":\"PM10 particulate matter concentration (µg/m³)\",\"example\":\"22.1\",\"type\":\"string\"},\"pm25\":{\"description\":\"PM2.5 particulate matter concentration (µg/m³)\",\"example\":\"14.7\",\"type\":\"string\"},\"so2\":{\"description\":\"Sulfur dioxide concentration (µg/m³)\",\"example\":\"1.9\",\"type\":\"string\"}},\"required\":[\"city\",\"aqi\",\"co\",\"no2\",\"o3\",\"pm10\",\"pm25\",\"so2\",\"geo\"],\"type\":\"object\"},\"msg\":{\"description\":\"Response message\",\"example\":\"Success\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\",\"data\"],\"type\":\"object\"}}},\"description\":\"Successful response with air quality data\"},\"400\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"400\",\"msg\":\"Invalid request parameters\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Bad Request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"401\",\"msg\":\"Unauthorized - Invalid API key\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"404\",\"msg\":\"Location not found\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Not Found - Location not found\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"429\",\"msg\":\"Rate limit exceeded\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Too Many Requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"example\":{\"code\":\"500\",\"msg\":\"Internal server error\"},\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"example\":\"400\",\"type\":\"string\"},\"msg\":{\"description\":\"Error message\",\"example\":\"Invalid request parameters\",\"type\":\"string\"}},\"required\":[\"code\",\"msg\"],\"type\":\"object\"}}},\"description\":\"Internal Server Error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key required for authentication. Get your API key at https://www.juheapi.com\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/aqi/v1/city", "segments": [{ "lit": "aqi" }, { "lit": "v1" }, { "lit": "city" }], "select": { "exist": ["city", "ip", "lat", "lon"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "aqi", "name__orig": "aqi", "Name": "Aqi", "name_": "aqi", "name-": "aqi", "NAME": "AQI", "index$": 0 }, { "active": true, "entity": "aqi", "key$": "BasicAqiFlow", "kind": "basic", "name": "BasicAqiFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "aqi_ref01", "srcdatavar": "aqi_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-aqi_ref01" } }], "index$": 0 }] }, 'Aqi');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let aqi_ref01_data = Object.values(setup.data.existing.aqi)[0];
        // LOAD
        const aqi_ref01_ent = client.Aqi();
        const aqi_ref01_match_dt0 = {};
        const aqi_ref01_data_dt0 = (await aqi_ref01_ent.load(aqi_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != aqi_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/aqi/AqiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AirQualityIndexSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['aqi01', 'aqi02', 'aqi03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AIR_QUALITY_INDEX_TEST_AQI_ENTID': idmap,
        'AIR_QUALITY_INDEX_TEST_LIVE': 'FALSE',
        'AIR_QUALITY_INDEX_TEST_EXPLAIN': 'FALSE',
        'AIR_QUALITY_INDEX_APIKEY': '',
    });
    idmap = env['AIR_QUALITY_INDEX_TEST_AQI_ENTID'];
    const live = 'TRUE' === env.AIR_QUALITY_INDEX_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AIR_QUALITY_INDEX_TEST_AQI_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AirQualityIndexSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.AIR_QUALITY_INDEX_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AIR_QUALITY_INDEX_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AqiEntity.test.js.map