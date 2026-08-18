
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'AirQualityIndex',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "city",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "co",
          "req": true,
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
          "type": "`$STRING`"
        },
        {
          "name": "o3",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "pm10",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "pm25",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "so2",
          "req": true,
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
              "parts": [
                "aqi",
                "v1",
                "city"
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
              }
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
  config
}

