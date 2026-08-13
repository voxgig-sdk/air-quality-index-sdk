# frozen_string_literal: true

# Typed models for the AirQualityIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Aqi entity data model.
#
# @!attribute [rw] aqi
#   @return [String]
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] co
#   @return [String]
#
# @!attribute [rw] geo
#   @return [Hash]
#
# @!attribute [rw] no2
#   @return [String]
#
# @!attribute [rw] o3
#   @return [String]
#
# @!attribute [rw] pm10
#   @return [String]
#
# @!attribute [rw] pm25
#   @return [String]
#
# @!attribute [rw] so2
#   @return [String]
Aqi = Struct.new(
  :aqi,
  :city,
  :co,
  :geo,
  :no2,
  :o3,
  :pm10,
  :pm25,
  :so2,
  keyword_init: true
)

# Request payload for Aqi#load.
#
# @!attribute [rw] aqi
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] co
#   @return [String, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] no2
#   @return [String, nil]
#
# @!attribute [rw] o3
#   @return [String, nil]
#
# @!attribute [rw] pm10
#   @return [String, nil]
#
# @!attribute [rw] pm25
#   @return [String, nil]
#
# @!attribute [rw] so2
#   @return [String, nil]
AqiLoadMatch = Struct.new(
  :aqi,
  :city,
  :co,
  :geo,
  :no2,
  :o3,
  :pm10,
  :pm25,
  :so2,
  keyword_init: true
)

