# Type Definitions

Types define the structure of request and response data.

## Basic Syntax

```api
type TypeName {
    FieldName FieldType `tag:"value"`
}
```

## Supported Types

### Primitive Types

| Type | Description |
|------|-------------|
| `bool` | Boolean |
| `int`, `int8`, `int16`, `int32`, `int64` | Signed integers |
| `uint`, `uint8`, `uint16`, `uint32`, `uint64` | Unsigned integers |
| `float32`, `float64` | Floating point |
| `string` | String |
| `interface{}` | Any type |

### Composite Types

```api
type Example {
    // Slice
    Tags []string `json:"tags"`
    
    // Map
    Meta map[string]string `json:"meta"`
    
    // Pointer
    Profile *Profile `json:"profile,optional"`
    
    // Nested type reference
    Address Address `json:"address"`
}
```

## Type Aliases

Define type aliases for reusability:

```api
type (
    ID = int64
    UserID = ID
    UserList = []User
)
```

## Field Tags

### JSON Tag

Controls JSON serialization:

```api
type User {
    Id   int64  `json:"id"`
    Name string `json:"name"`
    Bio  string `json:"bio,optional"`      // Optional field
    Age  int    `json:"age,omitempty"`     // Omit if zero
}
```

### Path Parameters

Extract values from URL path:

```api
type GetUserReq {
    Id int64 `path:"id"`  // /users/:id -> Id
}
```

### Query Parameters

Extract values from query string:

```api
type ListUsersReq {
    Page     int    `query:"page,default=1"`
    PageSize int    `query:"page_size,default=20"`
    Status   string `query:"status,optional"`
}
```

### Header Parameters

Extract values from HTTP headers:

```api
type AuthReq {
    Token     string `header:"Authorization"`
    UserAgent string `header:"User-Agent,optional"`
}
```

### Form Data

For multipart form data:

```api
type UploadReq {
    File        string `form:"file"`
    Description string `form:"description,optional"`
}
```

## Validation

Add validation rules with the `validate` tag:

```api
type CreateUserReq {
    // Required field
    Name string `json:"name" validate:"required"`
    
    // Length constraints
    Username string `json:"username" validate:"required,min=3,max=20"`
    
    // Email format
    Email string `json:"email" validate:"required,email"`
    
    // Numeric range
    Age int `json:"age" validate:"range=[18:100]"`
    
    // Allowed values
    Status string `json:"status" validate:"options=active|inactive|pending"`
    
    // URL format
    Website string `json:"website,optional" validate:"url"`
}
```

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Field must be present | `validate:"required"` |
| `min=N` | Minimum length/value | `validate:"min=3"` |
| `max=N` | Maximum length/value | `validate:"max=100"` |
| `range=[MIN:MAX]` | Value range | `validate:"range=[1:100]"` |
| `options=A\|B\|C` | Allowed values | `validate:"options=a\|b\|c"` |
| `email` | Email format | `validate:"email"` |
| `url` | URL format | `validate:"url"` |

## Embedded Types

Embed types to compose structures:

```api
type Pagination {
    Page     int `query:"page,default=1"`
    PageSize int `query:"page_size,default=20"`
}

type Sorting {
    SortBy    string `query:"sort_by,default=created_at"`
    SortOrder string `query:"sort_order,default=desc"`
}

type ListOrdersReq {
    Pagination              // Embedded
    Sorting                 // Embedded
    Status string `query:"status,optional"`
}
```

## Inline Structs

Define nested structures inline:

```api
type CreateOrderReq {
    Items []OrderItem `json:"items"`
    
    ShippingInfo {
        Address string `json:"address" validate:"required"`
        City    string `json:"city" validate:"required"`
        Zip     string `json:"zip" validate:"required"`
    } `json:"shipping_info"`
}
```

## Grouping Types

Group related types in a single block:

```api
type (
    // Request types
    GetUserReq {
        Id int64 `path:"id"`
    }
    
    CreateUserReq {
        Name  string `json:"name" validate:"required"`
        Email string `json:"email" validate:"required,email"`
    }
    
    // Response types
    UserResp {
        Id        int64  `json:"id"`
        Name      string `json:"name"`
        Email     string `json:"email"`
        CreatedAt string `json:"created_at"`
    }
)
```
