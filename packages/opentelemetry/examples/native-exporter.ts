import * as OtlpTracer from "@effect/opentelemetry/OtlpTracer"
import * as FetchHttpClient from "@effect/platform/FetchHttpClient"
import { Effect, Layer } from "effect"

const Tracing = OtlpTracer.layer({
  url: "http://localhost:4318/v1/traces",
  resource: {
    serviceName: "my-service"
  }
}).pipe(Layer.provide(FetchHttpClient.layer))

const program = Effect.log("Hello").pipe(
  Effect.withSpan("c"),
  Effect.withSpan("b"),
  Effect.withSpan("a"),
  Effect.repeatN(3),
  Effect.annotateSpans("working", true)
)

const failingProgram = Effect.fail(new Error("Failing program")).pipe(
  Effect.withSpan("d")
)

program.pipe(
  Effect.andThen(failingProgram),
  Effect.provide(Tracing),
  Effect.catchAllCause(Effect.logError),
  Effect.runFork
)
