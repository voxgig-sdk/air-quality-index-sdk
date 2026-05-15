# AirQualityIndex SDK exists test

require "minitest/autorun"
require_relative "../AirQualityIndex_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AirQualityIndexSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
