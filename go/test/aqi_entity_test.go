package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/air-quality-index-sdk"
	"github.com/voxgig-sdk/air-quality-index-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestAqiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Aqi(nil)
		if ent == nil {
			t.Fatal("expected non-nil AqiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := aqiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "aqi." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AIRQUALITYINDEX_TEST_AQI_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		aqiRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.aqi", setup.data)))
		var aqiRef01Data map[string]any
		if len(aqiRef01DataRaw) > 0 {
			aqiRef01Data = core.ToMapAny(aqiRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = aqiRef01Data

		// LOAD
		aqiRef01Ent := client.Aqi(nil)
		aqiRef01MatchDt0 := map[string]any{}
		aqiRef01DataDt0Loaded, err := aqiRef01Ent.Load(aqiRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if aqiRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func aqiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "aqi", "AqiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read aqi test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse aqi test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"aqi01", "aqi02", "aqi03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AIRQUALITYINDEX_TEST_AQI_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AIRQUALITYINDEX_TEST_AQI_ENTID": idmap,
		"AIRQUALITYINDEX_TEST_LIVE":      "FALSE",
		"AIRQUALITYINDEX_TEST_EXPLAIN":   "FALSE",
		"AIRQUALITYINDEX_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AIRQUALITYINDEX_TEST_AQI_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AIRQUALITYINDEX_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["AIRQUALITYINDEX_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAirQualityIndexSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AIRQUALITYINDEX_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AIRQUALITYINDEX_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
