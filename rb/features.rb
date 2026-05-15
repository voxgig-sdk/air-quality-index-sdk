# AirQualityIndex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AirQualityIndexFeatures
  def self.make_feature(name)
    case name
    when "base"
      AirQualityIndexBaseFeature.new
    when "test"
      AirQualityIndexTestFeature.new
    else
      AirQualityIndexBaseFeature.new
    end
  end
end
