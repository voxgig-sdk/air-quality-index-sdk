

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AirQualityIndexSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AqiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AIR_QUALITY_INDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('AIR_QUALITY_INDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AirQualityIndexSDK.test()
    const ent = testsdk.Aqi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AIR_QUALITY_INDEX_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'aqi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aqi":{"a":true,"h":"Aqi","n":"aqi","r":true,"sh":"Air Quality Index - comprehensive air quality indicator based on US EPA standards","t":"`$STRING`","key$":"aqi","index$":0},"city":{"a":true,"h":"City","n":"city","r":true,"sh":"Name of the city","t":"`$STRING`","key$":"city","index$":1},"co":{"a":true,"h":"Co","n":"co","r":true,"sh":"Carbon monoxide concentration (µg/m³)","t":"`$STRING`","key$":"co","index$":2},"geo":{"a":true,"h":"Geo","n":"geo","r":true,"t":"`$OBJECT`","key$":"geo","index$":3},"no2":{"a":true,"h":"No2","n":"no2","r":true,"sh":"Nitrogen dioxide concentration (µg/m³)","t":"`$STRING`","key$":"no2","index$":4},"o3":{"a":true,"h":"O3","n":"o3","r":true,"sh":"Ozone concentration (µg/m³)","t":"`$STRING`","key$":"o3","index$":5},"pm10":{"a":true,"h":"Pm10","n":"pm10","r":true,"sh":"PM10 particulate matter concentration (µg/m³)","t":"`$STRING`","key$":"pm10","index$":6},"pm25":{"a":true,"h":"Pm25","n":"pm25","r":true,"sh":"PM2.5 particulate matter concentration (µg/m³)","t":"`$STRING`","key$":"pm25","index$":7},"so2":{"a":true,"h":"So2","n":"so2","r":true,"sh":"Sulfur dioxide concentration (µg/m³)","t":"`$STRING`","key$":"so2","index$":8}},"name":"aqi","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /aqi/v1/city","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"Los Angeles","k":"query","n":"city","or":"city","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"8.8.8.8","k":"query","n":"ip","or":"ip","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":34.0522,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":-118.2437,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":3}]},"k":"http","m":"GET","o":"/aqi/v1/city","q":{"exist":["city","ip","lat","lon"]},"r":{},"s":[{"lit":"aqi"},{"lit":"v1"},{"lit":"city"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"aqi","name__orig":"aqi","Name":"Aqi","name_":"aqi","name-":"aqi","NAME":"AQI","index$":0}, {"active":true,"entity":"aqi","key$":"BasicAqiFlow","kind":"basic","name":"BasicAqiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"aqi_ref01","srcdatavar":"aqi_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-aqi_ref01"}}],"index$":0}]}, 'Aqi', {"GET /aqi/v1/city":{"protocol":"http","operationId":"getAQIByCity","responses":{"200":{"description":"Successful response with air quality data","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"description":"Response status code","example":"200","key$":"code","type":"string"},"msg":{"description":"Response message","example":"Success","key$":"msg","type":"string"},"data":{"key$":"data","properties":{"aqi":{"description":"Air Quality Index - comprehensive air quality indicator based on US EPA standards","example":"53","type":"string","key$":"aqi"},"city":{"description":"Name of the city","example":"Los Angeles","type":"string","key$":"city"},"co":{"description":"Carbon monoxide concentration (µg/m³)","example":"350.5","type":"string","key$":"co"},"geo":{"properties":{"lat":{"description":"Latitude coordinate of the monitoring station","example":"34.0522","type":"string"},"lon":{"description":"Longitude coordinate of the monitoring station","example":"-118.2437","type":"string"}},"required":["lat","lon"],"type":"object","x-ref":"#/components/schemas/GeoLocation","key$":"geo"},"no2":{"description":"Nitrogen dioxide concentration (µg/m³)","example":"15.2","type":"string","key$":"no2"},"o3":{"description":"Ozone concentration (µg/m³)","example":"58.6","type":"string","key$":"o3"},"pm10":{"description":"PM10 particulate matter concentration (µg/m³)","example":"22.1","type":"string","key$":"pm10"},"pm25":{"description":"PM2.5 particulate matter concentration (µg/m³)","example":"14.7","type":"string","key$":"pm25"},"so2":{"description":"Sulfur dioxide concentration (µg/m³)","example":"1.9","type":"string","key$":"so2"}},"required":["city","aqi","co","no2","o3","pm10","pm25","so2","geo"],"type":"object","x-ref":"#/components/schemas/AQIData","index$":0}},"required":["code","msg","data"],"x-ref":"#/components/schemas/AQIResponse"},"example":{"code":"200","msg":"Success","data":{"city":"Los Angeles","aqi":"53","co":"350.5","no2":"15.2","o3":"58.6","pm10":"22.1","pm25":"14.7","so2":"1.9","geo":{"lat":"34.0522","lon":"-118.2437"}}}}}},"400":{"description":"Bad Request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"400"},"msg":{"type":"string","description":"Error message","example":"Invalid request parameters"}},"required":["code","msg"],"x-ref":"#/components/schemas/ErrorResponse"},"example":{"code":"400","msg":"Invalid request parameters"}}}},"401":{"description":"Unauthorized - Invalid or missing API key","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"400"},"msg":{"type":"string","description":"Error message","example":"Invalid request parameters"}},"required":["code","msg"],"x-ref":"#/components/schemas/ErrorResponse"},"example":{"code":"401","msg":"Unauthorized - Invalid API key"}}}},"404":{"description":"Not Found - Location not found","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"400"},"msg":{"type":"string","description":"Error message","example":"Invalid request parameters"}},"required":["code","msg"],"x-ref":"#/components/schemas/ErrorResponse"},"example":{"code":"404","msg":"Location not found"}}}},"429":{"description":"Too Many Requests - Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"400"},"msg":{"type":"string","description":"Error message","example":"Invalid request parameters"}},"required":["code","msg"],"x-ref":"#/components/schemas/ErrorResponse"},"example":{"code":"429","msg":"Rate limit exceeded"}}}},"500":{"description":"Internal Server Error","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"Error code","example":"400"},"msg":{"type":"string","description":"Error message","example":"Invalid request parameters"}},"required":["code","msg"],"x-ref":"#/components/schemas/ErrorResponse"},"example":{"code":"500","msg":"Internal server error"}}}}},"parameters":[{"name":"city","in":"query","description":"Name of the city to query air quality data for","required":false,"schema":{"type":"string","example":"Los Angeles"},"index$":0},{"name":"lat","in":"query","description":"Latitude coordinate for precise location query","required":false,"schema":{"type":"number","format":"float","example":34.0522},"index$":1},{"name":"lon","in":"query","description":"Longitude coordinate for precise location query","required":false,"schema":{"type":"number","format":"float","example":-118.2437},"index$":2},{"name":"ip","in":"query","description":"IP address for automatic location detection","required":false,"schema":{"type":"string","example":"8.8.8.8"},"index$":3}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-API-Key","description":"API key required for authentication. Get your API key at https://www.juheapi.com"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let aqi_ref01_data = Object.values(setup.data.existing.aqi)[0] as any

    // LOAD
    const aqi_ref01_ent = client.Aqi()
    const aqi_ref01_match_dt0: any = {}
    const aqi_ref01_data_dt0 = (await aqi_ref01_ent.load(aqi_ref01_match_dt0)).data()
    assert(null != aqi_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/aqi/AqiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AirQualityIndexSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['aqi01','aqi02','aqi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AIR_QUALITY_INDEX_TEST_AQI_ENTID': idmap,
    'AIR_QUALITY_INDEX_TEST_LIVE': 'FALSE',
    'AIR_QUALITY_INDEX_TEST_EXPLAIN': 'FALSE',
    'AIR_QUALITY_INDEX_APIKEY': '',
  })

  idmap = env['AIR_QUALITY_INDEX_TEST_AQI_ENTID']

  const live = 'TRUE' === env.AIR_QUALITY_INDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AIR_QUALITY_INDEX_TEST_AQI_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AirQualityIndexSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
