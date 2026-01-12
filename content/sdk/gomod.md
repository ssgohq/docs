# Go Module Utilities

The `gomod` package provides utilities for working with Go modules.

## Installation

```go
import "github.com/ssgohq/ss-plugin-sdk/gomod"
```

Or use convenience functions from the main SDK package:

```go
import sdk "github.com/ssgohq/ss-plugin-sdk"

module := sdk.ReadGoModule("./my-project")
```

## Functions

### ReadModule

Read the module name from a go.mod file in a directory:

```go
module := gomod.ReadModule("./my-project")
// Returns: "github.com/org/my-project"
// Returns empty string if go.mod doesn't exist
```

### Parse

Parse a go.mod file and get detailed information:

```go
info, err := gomod.Parse("./my-project/go.mod")
if err != nil {
    log.Fatal(err)
}

fmt.Println(info.Module)    // "github.com/org/my-project"
fmt.Println(info.GoVersion) // "1.21"
```

### Exists

Check if a go.mod file exists:

```go
if gomod.Exists("./my-project") {
    // go.mod exists
}
```

### Init

Initialize a new Go module:

```go
err := gomod.Init("./my-project", "github.com/org/my-project")
```

### Tidy

Run `go mod tidy` in a directory:

```go
err := gomod.Tidy("./my-project")
```

### GetGoVersion

Get the current Go version:

```go
version := gomod.GetGoVersion()
// Returns: "1.21" or "1.22"
```

### FindModuleRoot

Find the root directory containing go.mod, searching upward from a starting directory:

```go
root := gomod.FindModuleRoot("./my-project/internal/handler")
// Returns: "./my-project" (where go.mod is located)
// Returns empty string if no go.mod found
```

### GetModuleFromDir

Convenience function that finds the module root and reads the module name:

```go
module := gomod.GetModuleFromDir("./my-project/internal/handler")
// Returns: "github.com/org/my-project"
```

## GoModInfo

The `GoModInfo` struct contains parsed information:

```go
type GoModInfo struct {
    Module    string // Module path (e.g., "github.com/org/my-project")
    GoVersion string // Go version (e.g., "1.21")
}
```

## Usage in Code Generation

Common pattern for code generation plugins:

```go
func (g *Generator) Execute(ctx *sdk.Context) error {
    outputDir := ctx.GetFlag("output")
    
    // Try to read module from existing go.mod
    module := ctx.GetFlag("module")
    if module == "" {
        module = gomod.ReadModule(outputDir)
    }
    if module == "" {
        return fmt.Errorf("--module flag required (no go.mod found)")
    }
    
    // Generate code with correct module path
    return g.generateWithModule(outputDir, module)
}
```

## SDK Package Re-exports

For convenience, these functions are also available from the main SDK package:

```go
import sdk "github.com/ssgohq/ss-plugin-sdk"

sdk.ReadGoModule(dir)   // gomod.ReadModule
sdk.GetGoVersion()      // gomod.GetGoVersion
sdk.GoModExists(dir)    // gomod.Exists
```
