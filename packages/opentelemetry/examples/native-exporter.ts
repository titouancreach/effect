import { OtlpTracer, Resource } from "@effect/opentelemetry"
import { NodeHttpClient, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"

const ResourceLayer = Resource.layer({
  serviceName: "example"
})

const Tracing = OtlpTracer.layer({
  url: "http://localhost:4318/v1/traces"
}).pipe(Layer.provide([ResourceLayer, NodeHttpClient.layerUndici]))

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
  NodeRuntime.runMain
)
