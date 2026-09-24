
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AirQualityIndexSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AirQualityIndexSDK.test()
    equal(testsdk instanceof AirQualityIndexSDK, true,
      'AirQualityIndexSDK.test() must return a client synchronously')
  })

})
