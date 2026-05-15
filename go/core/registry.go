package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAqiEntityFunc func(client *AirQualityIndexSDK, entopts map[string]any) AirQualityIndexEntity

