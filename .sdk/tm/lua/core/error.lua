-- AirQualityIndex SDK error

local AirQualityIndexError = {}
AirQualityIndexError.__index = AirQualityIndexError


function AirQualityIndexError.new(code, msg, ctx)
  local self = setmetatable({}, AirQualityIndexError)
  self.is_sdk_error = true
  self.sdk = "AirQualityIndex"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AirQualityIndexError:error()
  return self.msg
end


function AirQualityIndexError:__tostring()
  return self.msg
end


return AirQualityIndexError
