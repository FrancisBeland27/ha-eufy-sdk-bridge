import { test } from "node:test";
import assert from "node:assert/strict";
import { loadConfig } from "../src/config.mjs";

const base = { EUFY_EMAIL: "x@y.z", EUFY_PASSWORD: "pw" };

test("event pre-warm is OFF by default", () => {
  assert.equal(loadConfig(base).cfg.prewarm, false); // → client passes prewarmEvents: []
});

test("go2rtc is enabled by default and can be disabled with GO2RTC_ENABLE=0", () => {
  assert.equal(loadConfig(base).cfg.go2rtcEnable, true);
  assert.equal(loadConfig({ ...base, GO2RTC_ENABLE: "1" }).cfg.go2rtcEnable, true);
  assert.equal(loadConfig({ ...base, GO2RTC_ENABLE: "0" }).cfg.go2rtcEnable, false);
});

test("BRIDGE_PREWARM=1 turns pre-warm on (SDK default events)", () => {
  assert.equal(loadConfig({ ...base, BRIDGE_PREWARM: "1" }).cfg.prewarm, true);
  assert.equal(loadConfig({ ...base, BRIDGE_PREWARM: "true" }).cfg.prewarm, true);
  assert.equal(loadConfig({ ...base, BRIDGE_PREWARM: "0" }).cfg.prewarm, false);
});
