
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AirQualityIndex',
        slug: "air-quality-index",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://hub.juheapi.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      aqi: {
      },

    }
  }


  entity = {
    "aqi": {
      "fields": [
        {
          "name": "aqi",
          "req": true,
          "short": "Air Quality Index - comprehensive air quality indicator based on US EPA standards",
          "type": "`$STRING`"
        },
        {
          "name": "city",
          "req": true,
          "short": "Name of the city",
          "type": "`$STRING`"
        },
        {
          "name": "co",
          "req": true,
          "short": "Carbon monoxide concentration (µg/m³)",
          "type": "`$STRING`"
        },
        {
          "name": "geo",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "no2",
          "req": true,
          "short": "Nitrogen dioxide concentration (µg/m³)",
          "type": "`$STRING`"
        },
        {
          "name": "o3",
          "req": true,
          "short": "Ozone concentration (µg/m³)",
          "type": "`$STRING`"
        },
        {
          "name": "pm10",
          "req": true,
          "short": "PM10 particulate matter concentration (µg/m³)",
          "type": "`$STRING`"
        },
        {
          "name": "pm25",
          "req": true,
          "short": "PM2.5 particulate matter concentration (µg/m³)",
          "type": "`$STRING`"
        },
        {
          "name": "so2",
          "req": true,
          "short": "Sulfur dioxide concentration (µg/m³)",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": "8.8.8.8",
                    "kind": "query",
                    "name": "ip",
                    "orig": "ip",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 34.0522,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": -118.2437,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "city",
                  "ip",
                  "lat",
                  "lon"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "parts": [
                "aqi",
                "v1",
                "city"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

