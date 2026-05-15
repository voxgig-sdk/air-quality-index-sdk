
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AirQualityIndexSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AirQualityIndexSDK.test()
    equal(null !== testsdk, true)
  })

})
