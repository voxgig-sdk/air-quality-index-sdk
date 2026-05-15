# ProjectName SDK exists test

import pytest
from airqualityindex_sdk import AirQualityIndexSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AirQualityIndexSDK.test(None, None)
        assert testsdk is not None
