// Typed models for the AirQualityIndex SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Aqi {
  aqi: string
  city: string
  co: string
  geo: Record<string, any>
  no2: string
  o3: string
  pm10: string
  pm25: string
  so2: string
}

export interface AqiLoadMatch {
  city?: string
  ip?: string
  lat?: number
  lon?: number
}

