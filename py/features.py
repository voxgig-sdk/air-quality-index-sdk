# AirQualityIndex SDK feature factory

from feature.base_feature import AirQualityIndexBaseFeature
from feature.test_feature import AirQualityIndexTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AirQualityIndexBaseFeature(),
        "test": lambda: AirQualityIndexTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
