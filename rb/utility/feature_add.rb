# AirQualityIndex SDK utility: feature_add
module AirQualityIndexUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
