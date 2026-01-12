# Code Generation Framework

The `gen` package provides a powerful framework for building code generation plugins.

## Installation

```go
import "github.com/ssgohq/ss-plugin-sdk/gen"
```

## Core Concepts

### Generator Interface

Every generator implements this interface:

```go
type Generator interface {
    Name() string     // Generator name for logging
    Steps() []Step    // List of generation steps
}
```

### Steps

A step is a unit of generation work:

```go
type Step struct {
    Name string      // Step name for logging
    Run  StepFunc    // Execution function
    Tags []string    // Tags for selective execution
}

type StepFunc func(ctx context.Context, r *Runner) error
```

### Runner

The runner executes generators:

```go
runner := gen.NewRunner(gen.RunnerConfig{
    Options: gen.CommonOptions{
        OutputDir: "./output",
        Module:    "github.com/org/my-service",
        Verbose:   true,
    },
    TemplatesFS: templatesFS,  // embed.FS
    TemplateDir: "templates",
})

err := runner.Run(ctx, myGenerator)
```

## Example Generator

```go
//go:embed templates/*
var templatesFS embed.FS

type ServiceGenerator struct {
    spec *ServiceSpec
}

func (g *ServiceGenerator) Name() string {
    return "service-generator"
}

func (g *ServiceGenerator) Steps() []gen.Step {
    return []gen.Step{
        {
            Name: "models",
            Run:  g.generateModels,
            Tags: []string{"models", "scaffold"},
        },
        {
            Name: "handlers",
            Run:  g.generateHandlers,
            Tags: []string{"handlers", "scaffold"},
        },
        {
            Name: "main",
            Run:  g.generateMain,
            Tags: []string{"scaffold"},
        },
    }
}

func (g *ServiceGenerator) generateModels(ctx context.Context, r *gen.Runner) error {
    for _, model := range g.spec.Models {
        data := map[string]any{
            "Model":  model,
            "Module": r.Opt.Module,
        }
        
        outputPath := filepath.Join(r.Opt.OutputDir, "internal/model", model.FileName+".go")
        if err := r.Tpl.RenderToFile(r.Files, "model.go.tpl", outputPath, data); err != nil {
            return err
        }
    }
    return nil
}
```

## Template Manager

### Render from File

```go
content, err := r.Tpl.Render("model.go.tpl", data)
```

### Render to File

```go
err := r.Tpl.RenderToFile(r.Files, "model.go.tpl", "output/model.go", data)
```

### Skip Existing Files

```go
skipped, err := r.Tpl.RenderSkipExisting(r.Files, "handler.go.tpl", "output/handler.go", data)
if skipped {
    r.Log.Verbosef("Skipped existing file")
}
```

### Render Inline Template

```go
result, err := r.Tpl.RenderString("Hello {{.Name}}!", map[string]string{"Name": "World"})
```

## Template Functions

Default functions available in templates:

```go
// Naming
{{.Name | ToSnakeCase}}   // user_id
{{.Name | ToPascalCase}}  // UserID
{{.Name | ToCamelCase}}   // userID
{{.Name | ToKebabCase}}   // user-id

// String operations
{{.Name | lower}}         // lowercase
{{.Name | upper}}         // UPPERCASE
{{.Name | title}}         // Title Case
{{trimPrefix .Path "/"}}
{{trimSuffix .File ".go"}}
{{contains .Name "user"}}
{{hasPrefix .Path "/api"}}
{{hasSuffix .File ".go"}}
{{replace .Text "old" "new" 1}}
{{replaceAll .Text "old" "new"}}
{{split .List ","}}
{{join .Items ", "}}

// Utilities
{{default 8080 .Port}}              // Default value if empty
{{ternary .Enabled "yes" "no"}}     // Conditional
{{add .Index 1}}                    // Addition
{{sub .Total 1}}                    // Subtraction
```

### Custom Functions

Add custom template functions:

```go
runner := gen.NewRunner(gen.RunnerConfig{
    FuncMap: template.FuncMap{
        "pluralize": func(s string) string { return s + "s" },
        "quote":     func(s string) string { return `"` + s + `"` },
    },
    // ...
})
```

## File Manager

### Write Files

```go
err := r.Files.WriteFile("output/config.go", []byte(content))
```

### Create Directories

```go
err := r.Files.MkdirAll("output/internal/handler")
err := r.Files.CreateDirs([]string{"output/cmd", "output/internal"})
```

### Check Existence

```go
if r.Files.Exists("output/go.mod") {
    // ...
}

if r.Files.IsFile("output/main.go") {
    // ...
}

if r.Files.IsDir("output/internal") {
    // ...
}
```

## Hooks

Run code before/after generation:

```go
hooks := gen.NewHookRegistry()

// Pre-hooks
hooks.AddPreHook(gen.LogHook("Starting generation..."))
hooks.AddPreHook(gen.EnsureDirsHook("cmd", "internal/handler", "internal/model"))

// Post-hooks
hooks.AddPostHook(gen.GoFmtHook)        // go fmt ./...
hooks.AddPostHook(gen.GoImportsHook)    // goimports -w .
hooks.AddPostHook(gen.GoModTidyHook)    // go mod tidy
hooks.AddPostHook(gen.GoModInitHook("github.com/org/my-service"))

runner := gen.NewRunner(gen.RunnerConfig{
    Hooks: hooks,
    // ...
})
```

### Custom Hooks

```go
myHook := func(ctx context.Context, r *gen.Runner) error {
    r.Log.Printf("Custom hook running...")
    return nil
}

hooks.AddPostHook(myHook)
```

## Selective Generation

Run only specific steps by tag:

```go
// Run only "models" and "handlers" steps
err := runner.RunWithTags(ctx, generator, "models", "handlers")
```

## Runner Data

Store and retrieve data across steps:

```go
// In step 1
r.SetData("parsedSpec", mySpec)

// In step 2
spec, ok := gen.GetData[*MySpec](r, "parsedSpec")
```

## Dry-Run Mode

Test generation without writing files:

```go
memFS := gen.NewMemWriteFS()

runner := gen.NewRunner(gen.RunnerConfig{
    WriteFS: memFS,
    // ...
})

runner.Run(ctx, generator)

// Inspect results
files := memFS.GetFiles()
for path, content := range files {
    fmt.Printf("%s (%d bytes)\n", path, len(content))
}

dirs := memFS.GetDirs()
```

## Logging

```go
// Always printed
r.Log.Printf("Generating %s...", name)

// Only in verbose mode
r.Log.Verbosef("Processing %s", file)

// Error output
r.Log.Errorf("Failed to process: %v", err)
```

### Custom Logger

```go
runner := gen.NewRunner(gen.RunnerConfig{
    Logger: gen.NewStdLoggerWithWriter(verbose, os.Stdout, os.Stderr),
    // ...
})
```

## Error Handling

Rich error context:

```go
if err != nil {
    return gen.WrapStepError("my-generator", "models", outputPath, "cover", "model.go.tpl", err)
}

// Or with builder
return gen.NewStepErrorBuilder().
    Generator("my-generator").
    Step("models").
    Path(outputPath).
    Template("model.go.tpl").
    Wrap(err)
```
