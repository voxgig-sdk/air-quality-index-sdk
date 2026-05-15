package core

type AirQualityIndexError struct {
	IsAirQualityIndexError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAirQualityIndexError(code string, msg string, ctx *Context) *AirQualityIndexError {
	return &AirQualityIndexError{
		IsAirQualityIndexError: true,
		Sdk:              "AirQualityIndex",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AirQualityIndexError) Error() string {
	return e.Msg
}
