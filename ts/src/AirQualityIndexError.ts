
import { Context } from './Context'


class AirQualityIndexError extends Error {

  isAirQualityIndexError = true

  sdk = 'AirQualityIndex'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AirQualityIndexError
}

