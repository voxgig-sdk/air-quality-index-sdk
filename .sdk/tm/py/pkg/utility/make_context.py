# AirQualityIndex SDK utility: make_context

from projectname_sdk.core.context import AirQualityIndexContext


def make_context_util(ctxmap, basectx):
    return AirQualityIndexContext(ctxmap, basectx)
