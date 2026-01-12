# Naming Utilities

The `naming` package provides naming convention utilities commonly used in code generation.

## Installation

```go
import "github.com/ssgohq/ss-plugin-sdk/naming"
```

Or use convenience functions from the main SDK package:

```go
import sdk "github.com/ssgohq/ss-plugin-sdk"

result := sdk.ToSnakeCase("UserID")
```

## Case Conversions

### ToSnakeCase

Converts a string to `snake_case`:

```go
naming.ToSnakeCase("UserID")      // "user_id"
naming.ToSnakeCase("HTTPServer")  // "http_server"
naming.ToSnakeCase("getUser")     // "get_user"
naming.ToSnakeCase("SimpleTest")  // "simple_test"
```

### ToPascalCase

Converts a string to `PascalCase` with proper Go acronym handling:

```go
naming.ToPascalCase("user_id")      // "UserID"
naming.ToPascalCase("http-server")  // "HTTPServer"
naming.ToPascalCase("get user")     // "GetUser"
naming.ToPascalCase("api_url")      // "APIURL"
```

### ToCamelCase

Converts a string to `camelCase`:

```go
naming.ToCamelCase("user_id")      // "userID"
naming.ToCamelCase("http_server")  // "httpServer"
naming.ToCamelCase("GetUser")      // "getUser"
```

### ToKebabCase

Converts a string to `kebab-case`:

```go
naming.ToKebabCase("UserID")      // "user-id"
naming.ToKebabCase("HTTPServer")  // "http-server"
naming.ToKebabCase("getUser")     // "get-user"
```

## Go Acronyms

The package automatically handles common Go acronyms:

| Input | PascalCase Output |
|-------|-------------------|
| `id` | `ID` |
| `url` | `URL` |
| `api` | `API` |
| `http` | `HTTP` |
| `json` | `JSON` |
| `sql` | `SQL` |
| `uuid` | `UUID` |
| `jwt` | `JWT` |
| `db` | `DB` |
| ... | ... |

### Custom Acronyms

Add custom acronyms:

```go
naming.AddAcronym("pdf", "PDF")
naming.ToPascalCase("pdf_reader")  // "PDFReader"
```

## Code Generation Helpers

### HandlerName

```go
naming.HandlerName("GetUser")  // "GetUserHandler"
```

### LogicName

```go
naming.LogicName("Login")  // "LoginLogic"
```

### FileNameFromHandler

```go
naming.FileNameFromHandler("GetUser")  // "get_user"
```

### BaseHandlerName

```go
naming.BaseHandlerName("CreateTodoHandler")  // "create_todo"
```

### GroupVarName

```go
naming.GroupVarName("user")  // "userGroup"
naming.GroupVarName("")      // "r"
```

## Type Utilities

### CleanTypeName

Removes pointer and slice prefixes:

```go
naming.CleanTypeName("*User")   // "User"
naming.CleanTypeName("[]User")  // "User"
naming.CleanTypeName("[]*User") // "User"
```

### IsPointerType / IsSliceType

```go
naming.IsPointerType("*User")  // true
naming.IsSliceType("[]User")   // true
```

### SanitizePackageName

Converts to valid Go package name:

```go
naming.SanitizePackageName("my-package")  // "mypackage"
naming.SanitizePackageName("123pkg")      // "pkg123pkg"
```

## Go Version

Parse Go version strings:

```go
naming.ParseGoVersion("go1.21.5")  // "1.21"
naming.ParseGoVersion("go version go1.22.0 darwin/arm64")  // "1.22"
```
