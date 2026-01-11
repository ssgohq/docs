# API Reference

## Plugin Interface

```go
type Plugin interface {
    Metadata() Metadata
    Init(ctx *Context) error
    Execute(ctx *Context) error
    Cleanup(ctx *Context) error
}
```

## Context

| Field | Type | Description |
|-------|------|-------------|
| `ConfigFile` | `string` | Path to `.ss.yaml` |
| `ConfigJSON` | `map[string]interface{}` | Parsed config |
| `WorkingDir` | `string` | Current directory |
| `PluginDir` | `string` | Plugin directory |
| `PluginName` | `string` | Plugin name |
| `Args` | `[]string` | Command arguments |
| `Flags` | `map[string]string` | Flag values |
| `Debug` | `bool` | Debug mode |
| `Logger` | `*Logger` | Logger instance |
| `RunnerConfig` | `*Config` | Service config |

### Methods

```go
ctx.GetArg(0)              // Get arg at index
ctx.Subcommand()           // First arg
ctx.SubcommandArgs()       // Args after first
ctx.GetFlag("name")        // Get flag value
ctx.GetFlagBool("verbose") // Get bool flag
ctx.HasFlag("name")        // Check flag exists
ctx.Context()              // Get context.Context
ctx.Cancel()               // Cancel context
```

## Output Helpers

```go
sdk.Success("Done")           // ✓ Done (green)
sdk.Error("Failed")           // ✗ Failed (red)
sdk.Warning("Careful")        // ⚠ Careful (yellow)
sdk.Info("Note")              // ℹ Note (blue)
sdk.Debug("Debug")            // [DEBUG] ... (only when SS_DEBUG=true)

sdk.Successf("Created %d", n) // Formatted variants
sdk.Errorf("Error: %v", err)

sdk.Fatal("Critical")         // Print and exit 1
sdk.FatalIfError(err, "msg")  // Exit if err != nil
```

## Completion Helpers

```go
sdk.PrintCompletions([]string{"a", "b"})
sdk.PrintCompletionsWithDescriptions(map[string]string{
    "opt1": "First option",
    "opt2": "Second option",
})
sdk.FilterCompletions(options, prefix)
```

## Environment Variables

ss-cli sets these for plugins:

| Variable | Description |
|----------|-------------|
| `SS_PLUGIN_MAGIC` | Handshake verification |
| `SS_CONFIG_FILE` | Config file path |
| `SS_CONFIG_JSON` | Config as JSON |
| `SS_WORKING_DIR` | Working directory |
| `SS_PLUGIN_DIR` | Plugin directory |
| `SS_PLUGIN_NAME` | Plugin name |
| `SS_DEBUG` | Debug mode |
| `SS_FLAG_*` | Flag values |
