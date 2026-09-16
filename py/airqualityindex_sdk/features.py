# AirQualityIndex SDK feature factory

from airqualityindex_sdk.feature.base_feature import AirQualityIndexBaseFeature
from airqualityindex_sdk.feature.ratelimit_feature import AirQualityIndexRatelimitFeature
from airqualityindex_sdk.feature.retry_feature import AirQualityIndexRetryFeature
from airqualityindex_sdk.feature.test_feature import AirQualityIndexTestFeature
from airqualityindex_sdk.feature.timeout_feature import AirQualityIndexTimeoutFeature


_FEATURES = {
    "base": lambda: AirQualityIndexBaseFeature(),
    "ratelimit": lambda: AirQualityIndexRatelimitFeature(),
    "retry": lambda: AirQualityIndexRetryFeature(),
    "test": lambda: AirQualityIndexTestFeature(),
    "timeout": lambda: AirQualityIndexTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
