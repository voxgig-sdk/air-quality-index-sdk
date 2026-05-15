# AirQualityIndex SDK utility: make_context
require_relative '../core/context'
module AirQualityIndexUtilities
  MakeContext = ->(ctxmap, basectx) {
    AirQualityIndexContext.new(ctxmap, basectx)
  }
end
