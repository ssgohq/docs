# API Syntax

The `.api` file format defines HTTP services using a simple, readable DSL.

## File Structure

```api
syntax = "v1"

info (
    title: "API Title"
    version: "1.0"
)

type (
    // Type definitions
)

@server (
    // Server annotations
)
service service-name {
    // Route definitions
}
```

## Syntax Statement

The `syntax` statement declares the API version. Currently only `v1` is supported.

```api
syntax = "v1"
```

## Info Block

The `info` block contains API metadata. All fields are optional.

```api
info (
    title:   "User API"
    desc:    "User management service"
    author:  "team"
    email:   "team@example.com"
    version: "1.0.0"
)
```

## Import Statement

Import other `.api` files to reuse type definitions.

```api
// Single import
import "common.api"

// Multiple imports
import (
    "types/user.api"
    "types/order.api"
)
```

## Type Block

Define request/response structures. See [Type Definitions](./types) for details.

```api
type (
    User {
        Id   int64  `json:"id"`
        Name string `json:"name"`
    }
)
```

## Service Block

Define HTTP routes grouped by server annotations. See [Service Definitions](./services) for details.

```api
@server (
    prefix: /api/v1
    group: user
)
service user-api {
    @handler GetUser
    get /users/:id (GetUserReq) returns (UserResp)
}
```

## Comments

```api
// Single-line comment

/*
   Multi-line
   comment
*/
```

## Complete Example

```api
syntax = "v1"

info (
    title:   "Todo API"
    version: "1.0"
)

type (
    Todo {
        Id        int64  `json:"id"`
        Title     string `json:"title"`
        Completed bool   `json:"completed"`
    }
    
    CreateTodoReq {
        Title string `json:"title" validate:"required"`
    }
    
    GetTodoReq {
        Id int64 `path:"id"`
    }
    
    ListTodosReq {
        Page     int `query:"page,default=1"`
        PageSize int `query:"page_size,default=20"`
    }
    
    ListTodosResp {
        Total int64  `json:"total"`
        Items []Todo `json:"items"`
    }
)

@server (
    prefix: /api/v1
    group: todo
    middleware: Logging, Cors
)
service todo-api {
    @doc "List todos with pagination"
    @handler ListTodos
    get /todos (ListTodosReq) returns (ListTodosResp)
    
    @doc "Get todo by ID"
    @handler GetTodo
    get /todos/:id (GetTodoReq) returns (Todo)
}

@server (
    prefix: /api/v1
    group: todo
    middleware: Logging, Cors, Jwt
)
service todo-api {
    @doc "Create a new todo"
    @handler CreateTodo
    post /todos (CreateTodoReq) returns (Todo)
}
```
