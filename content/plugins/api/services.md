# Service Definitions

Services define HTTP routes and their handlers.

## Basic Structure

```api
@server (
    // Server annotations
)
service service-name {
    @handler HandlerName
    method /path (RequestType) returns (ResponseType)
}
```

## Server Annotations

The `@server` block configures route groups:

```api
@server (
    prefix:     /api/v1
    group:      user
    middleware: Logging, Cors, Jwt
    timeout:    30s
    maxBytes:   10485760
)
```

### Annotation Options

| Option | Description | Example |
|--------|-------------|---------|
| `prefix` | URL prefix for all routes | `prefix: /api/v1` |
| `group` | Handler package name | `group: user` |
| `middleware` | Middleware chain | `middleware: Logging, Cors` |
| `jwt` | JWT auth config name | `jwt: Auth` |
| `timeout` | Request timeout | `timeout: 30s` |
| `maxBytes` | Max request body size | `maxBytes: 10485760` |

## Route Definition

### HTTP Methods

Supported methods: `get`, `post`, `put`, `delete`, `patch`, `head`, `options`

```api
service user-api {
    @handler GetUser
    get /users/:id (GetUserReq) returns (UserResp)
    
    @handler CreateUser
    post /users (CreateUserReq) returns (UserResp)
    
    @handler UpdateUser
    put /users/:id (UpdateUserReq) returns (UserResp)
    
    @handler DeleteUser
    delete /users/:id (DeleteUserReq)
    
    @handler PatchUser
    patch /users/:id (PatchUserReq) returns (UserResp)
}
```

### Path Parameters

Use `:param` syntax for path parameters:

```api
get /users/:id           // Single param
get /users/:userId/posts/:postId  // Multiple params
```

### Handler Annotation

The `@handler` annotation names the generated handler function:

```api
@handler GetUser        // Generates GetUserHandler
get /users/:id
```

### Documentation Annotation

The `@doc` annotation adds API documentation:

```api
// Simple doc
@doc "Get user by ID"
@handler GetUser
get /users/:id

// Detailed doc
@doc (
    summary: "Get user by ID"
    description: "Returns user details for the given ID"
)
@handler GetUser
get /users/:id
```

## Request/Response

### With Request and Response

```api
@handler CreateUser
post /users (CreateUserReq) returns (UserResp)
```

### Request Only (No Response Body)

```api
@handler DeleteUser
delete /users/:id (DeleteUserReq)
```

### Response Only (No Request Body)

```api
@handler ListUsers
get /users returns (ListUsersResp)
```

### No Request or Response

```api
@handler Ping
get /ping
```

## Middleware

### Built-in Middleware

| Middleware | Description |
|------------|-------------|
| `Logging` | Request logging with request ID |
| `Cors` | CORS headers for cross-origin requests |
| `Jwt` | JWT authentication |

### Usage

```api
// Public routes
@server (
    prefix: /api/v1
    group: public
    middleware: Logging, Cors
)
service my-api {
    @handler Ping
    get /ping
}

// Protected routes
@server (
    prefix: /api/v1
    group: user
    middleware: Logging, Cors, Jwt
)
service my-api {
    @handler GetProfile
    get /profile returns (UserResp)
}
```

### Custom Middleware

Custom middleware functions are generated in `internal/middleware/middleware.go`:

```api
@server (
    middleware: Logging, RateLimiter, AuditLog
)
```

Implement custom middleware:

```go
// internal/middleware/middleware.go
func RateLimiter(svcCtx *svc.ServiceContext) app.HandlerFunc {
    return func(ctx context.Context, c *app.RequestContext) {
        // Rate limiting logic
        c.Next(ctx)
    }
}
```

## Multiple Service Blocks

Split routes into multiple blocks with different configurations:

```api
// Public API
@server (
    prefix: /api/v1
    group: public
)
service my-api {
    @handler Login
    post /auth/login (LoginReq) returns (LoginResp)
}

// User API (JWT protected)
@server (
    prefix: /api/v1
    group: user
    middleware: Jwt
)
service my-api {
    @handler GetProfile
    get /profile returns (UserResp)
}

// Admin API (Admin JWT + extra middleware)
@server (
    prefix: /api/v1/admin
    group: admin
    jwt: AdminAuth
    middleware: AdminMiddleware, AuditLog
)
service my-api {
    @handler GetStats
    get /stats returns (StatsResp)
}
```

## Service Without Annotations

Routes can be defined without `@server` block:

```api
service simple-api {
    @handler Ping
    get /ping returns (PongResp)
}
```

## Complete Example

```api
syntax = "v1"

type (
    LoginReq {
        Username string `json:"username" validate:"required"`
        Password string `json:"password" validate:"required,min=6"`
    }
    
    LoginResp {
        Token string `json:"token"`
    }
    
    UserResp {
        Id    int64  `json:"id"`
        Name  string `json:"name"`
        Email string `json:"email"`
    }
    
    GetUserReq {
        Id int64 `path:"id"`
    }
)

@server (
    prefix: /api/v1
    group: auth
    middleware: Logging, Cors
)
service user-api {
    @doc "User login"
    @handler Login
    post /login (LoginReq) returns (LoginResp)
}

@server (
    prefix: /api/v1
    group: user
    middleware: Logging, Cors, Jwt
)
service user-api {
    @doc "Get user by ID"
    @handler GetUser
    get /users/:id (GetUserReq) returns (UserResp)
}
```
