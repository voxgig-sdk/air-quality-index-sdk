<?php
declare(strict_types=1);

// AirQualityIndex SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AirQualityIndexUtility::setRegistrar(function (AirQualityIndexUtility $u): void {
    $u->clean = [AirQualityIndexClean::class, 'call'];
    $u->done = [AirQualityIndexDone::class, 'call'];
    $u->make_error = [AirQualityIndexMakeError::class, 'call'];
    $u->feature_add = [AirQualityIndexFeatureAdd::class, 'call'];
    $u->feature_hook = [AirQualityIndexFeatureHook::class, 'call'];
    $u->feature_init = [AirQualityIndexFeatureInit::class, 'call'];
    $u->fetcher = [AirQualityIndexFetcher::class, 'call'];
    $u->make_fetch_def = [AirQualityIndexMakeFetchDef::class, 'call'];
    $u->make_context = [AirQualityIndexMakeContext::class, 'call'];
    $u->make_options = [AirQualityIndexMakeOptions::class, 'call'];
    $u->make_request = [AirQualityIndexMakeRequest::class, 'call'];
    $u->make_response = [AirQualityIndexMakeResponse::class, 'call'];
    $u->make_result = [AirQualityIndexMakeResult::class, 'call'];
    $u->make_point = [AirQualityIndexMakePoint::class, 'call'];
    $u->make_spec = [AirQualityIndexMakeSpec::class, 'call'];
    $u->make_url = [AirQualityIndexMakeUrl::class, 'call'];
    $u->param = [AirQualityIndexParam::class, 'call'];
    $u->prepare_auth = [AirQualityIndexPrepareAuth::class, 'call'];
    $u->prepare_body = [AirQualityIndexPrepareBody::class, 'call'];
    $u->prepare_headers = [AirQualityIndexPrepareHeaders::class, 'call'];
    $u->prepare_method = [AirQualityIndexPrepareMethod::class, 'call'];
    $u->prepare_params = [AirQualityIndexPrepareParams::class, 'call'];
    $u->prepare_path = [AirQualityIndexPreparePath::class, 'call'];
    $u->prepare_query = [AirQualityIndexPrepareQuery::class, 'call'];
    $u->result_basic = [AirQualityIndexResultBasic::class, 'call'];
    $u->result_body = [AirQualityIndexResultBody::class, 'call'];
    $u->result_headers = [AirQualityIndexResultHeaders::class, 'call'];
    $u->transform_request = [AirQualityIndexTransformRequest::class, 'call'];
    $u->transform_response = [AirQualityIndexTransformResponse::class, 'call'];
});
