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
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] msg
#   @return [String]
Aqi = Struct.new(
  :code,
  :data,
  :msg,
  keyword_init: true
)

# Request payload for Aqi#load.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] msg
#   @return [String, nil]
AqiLoadMatch = Struct.new(
  :code,
  :data,
  :msg,
  keyword_init: true
)

