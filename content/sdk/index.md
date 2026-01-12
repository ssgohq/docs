# Building Plugins

## Install SDK

```bash
go get github.com/ssgohq/ss-plugin-sdk@latest
```

## Plugin Interface

```go
type Plugin interface {
    Metadata() Metadata
    Init(ctx *Context) error
    Execute(ctx *Context) error
    Cleanup(ctx *Context) error
}
```

## Example: hello plugin

```go
package main

import (
    "fmt"
    sdk "github.com/ssgohq/ss-plugin-sdk"
)

type HelloPlugin struct{}

func (p *HelloPlugin) Metadata() sdk.Metadata {
    return sdk.Metadata{
        Name:        "hello",
        Version:     "1.0.0",
        Description: "A simple hello world plugin",
    }
}

func (p *HelloPlugin) Init(ctx *sdk.Context) error { return nil }

func (p *HelloPlugin) Execute(ctx *sdk.Context) error {
    names := ctx.Args
    if len(names) == 0 {
        names = []string{"World"}
    }
    for _, name := range names {
        sdk.Success(fmt.Sprintf("Hello, %s!", name))
    }
    return nil
}

func (p *HelloPlugin) Cleanup(ctx *sdk.Context) error { return nil }

func main() {
    sdk.Run(&HelloPlugin{})
}
```

## plugin.yaml

```yaml
metadata:
  name: hello
  version: 1.0.0
  description: A simple hello world plugin

runtime:
  command: hello

commands:
  - name: hello
    description: Say hello to someone
    usage: ss hello [name...]
```

## Build & Install

```bash
go build -o hello
ss plugin install .
ss hello World
```

## Optional Interfaces

### Completer

```go
func (p *HelloPlugin) Complete(ctx *sdk.Context) {
    completions := []string{"world", "everyone", "friend"}
    filtered := sdk.FilterCompletions(completions, ctx.GetCompletionToComplete())
    sdk.PrintCompletions(filtered)
}
```

### Validator

```go
func (p *MyPlugin) Validate(ctx *sdk.Context) error {
    if len(ctx.Args) == 0 {
        return errors.New("argument required")
    }
    return nil
}
```

## Next Steps

- [API Reference](./api) - Full SDK API documentation
- [naming](./naming) - Naming convention utilities
- [gen](./gen) - Code generation framework
- [gomod](./gomod) - Go module utilities
