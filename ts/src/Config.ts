
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://hub.juheapi.com',

    auth: {
      prefix: 'Bearer',
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
          "active": true,
          "name": "code",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "data",
          "req": true,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "msg",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "aqi",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": "Los Angeles",
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": "8.8.8.8",
                    "kind": "query",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 34.0522,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  },
                  {
                    "active": true,
                    "example": -118.2437,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": false,
                    "type": "`$NUMBER`"
                  }
                ]
              },
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
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
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

