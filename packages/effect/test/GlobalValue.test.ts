import { describe, it } from "@effect/vitest"
import * as G from "effect/GlobalValue"
import { strictEqual } from "effect/test/util"

const a = G.globalValue("id", () => ({}))
const b = G.globalValue("id", () => ({}))

describe("GlobalValue", () => {
  it("should give the same value when invoked with the same id", () => {
    strictEqual(a, b)
  })
})
