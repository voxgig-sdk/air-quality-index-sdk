# AirQualityIndex SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AirQualityIndexUtility.registrar = ->(u) {
  u.clean = AirQualityIndexUtilities::Clean
  u.done = AirQualityIndexUtilities::Done
  u.make_error = AirQualityIndexUtilities::MakeError
  u.feature_add = AirQualityIndexUtilities::FeatureAdd
  u.feature_hook = AirQualityIndexUtilities::FeatureHook
  u.feature_init = AirQualityIndexUtilities::FeatureInit
  u.fetcher = AirQualityIndexUtilities::Fetcher
  u.make_fetch_def = AirQualityIndexUtilities::MakeFetchDef
  u.make_context = AirQualityIndexUtilities::MakeContext
  u.make_options = AirQualityIndexUtilities::MakeOptions
  u.make_request = AirQualityIndexUtilities::MakeRequest
  u.make_response = AirQualityIndexUtilities::MakeResponse
  u.make_result = AirQualityIndexUtilities::MakeResult
  u.make_point = AirQualityIndexUtilities::MakePoint
  u.make_spec = AirQualityIndexUtilities::MakeSpec
  u.make_url = AirQualityIndexUtilities::MakeUrl
  u.param = AirQualityIndexUtilities::Param
  u.prepare_auth = AirQualityIndexUtilities::PrepareAuth
  u.prepare_body = AirQualityIndexUtilities::PrepareBody
  u.prepare_headers = AirQualityIndexUtilities::PrepareHeaders
  u.prepare_method = AirQualityIndexUtilities::PrepareMethod
  u.prepare_params = AirQualityIndexUtilities::PrepareParams
  u.prepare_path = AirQualityIndexUtilities::PreparePath
  u.prepare_query = AirQualityIndexUtilities::PrepareQuery
  u.result_basic = AirQualityIndexUtilities::ResultBasic
  u.result_body = AirQualityIndexUtilities::ResultBody
  u.result_headers = AirQualityIndexUtilities::ResultHeaders
  u.transform_request = AirQualityIndexUtilities::TransformRequest
  u.transform_response = AirQualityIndexUtilities::TransformResponse
}
