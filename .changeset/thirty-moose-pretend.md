---
"@effect/schema": patch
---

Add description annotation to the encoded part of DateFromString.

Before

```ts
import { JSONSchema, Schema } from "@effect/schema"

const schema = Schema.DateFromString

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
/*
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string"
}
*/
```

After

```ts
import { JSONSchema, Schema } from "@effect/schema"

const schema = Schema.DateFromString

console.log(JSON.stringify(JSONSchema.make(schema), null, 2))
/*
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "string",
  "description": "a string that will be parsed into a Date"
}
*/
```