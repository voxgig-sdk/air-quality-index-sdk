# AirQualityIndex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AirQualityIndexFeatures
  def self.make_feature(name)
    case name
    when "base"
      AirQualityIndexBaseFeature.new
    when "ratelimit"
      AirQualityIndexRatelimitFeature.new
    when "retry"
      AirQualityIndexRetryFeature.new
    when "test"
      AirQualityIndexTestFeature.new
    when "timeout"
      AirQualityIndexTimeoutFeature.new
    else
      AirQualityIndexBaseFeature.new
    end
  end
end
