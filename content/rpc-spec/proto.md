# Proto Format

The RPC plugin uses standard Protocol Buffers (`.proto`) files to define services.

## File Structure

```protobuf
syntax = "proto3";

package <package-name>;

option go_package = "<go-package>";

// Message definitions
message <MessageName> {
  <type> <field_name> = <number>;
}

// Service definition
service <ServiceName> {
  rpc <MethodName>(<RequestType>) returns (<ResponseType>);
}
```

## Syntax Statement

Always use `proto3` syntax:

```protobuf
syntax = "proto3";
```

## Package Declaration

The package name is used for namespacing:

```protobuf
package user;
```

## Go Package Option

Required for Go code generation:

```protobuf
option go_package = "user";
```

## Message Types

Define request and response structures:

```protobuf
message GetUserRequest {
  int64 id = 1;
}

message GetUserResponse {
  int64 id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}
```

### Scalar Types

| Proto Type | Go Type | Description |
|------------|---------|-------------|
| `int32` | `int32` | 32-bit integer |
| `int64` | `int64` | 64-bit integer |
| `uint32` | `uint32` | Unsigned 32-bit |
| `uint64` | `uint64` | Unsigned 64-bit |
| `float` | `float32` | 32-bit float |
| `double` | `float64` | 64-bit float |
| `bool` | `bool` | Boolean |
| `string` | `string` | UTF-8 string |
| `bytes` | `[]byte` | Byte array |

### Nested Messages

```protobuf
message User {
  int64 id = 1;
  string name = 2;
  Address address = 3;
}

message Address {
  string street = 1;
  string city = 2;
  string country = 3;
}
```

### Repeated Fields (Arrays)

```protobuf
message ListUsersResponse {
  repeated User users = 1;
  int64 total = 2;
}
```

### Optional Fields

In proto3, all fields are optional by default. Use wrapper types for explicit null handling:

```protobuf
import "google/protobuf/wrappers.proto";

message UpdateUserRequest {
  int64 id = 1;
  google.protobuf.StringValue name = 2;  // nullable string
}
```

### Enums

```protobuf
enum UserStatus {
  USER_STATUS_UNSPECIFIED = 0;
  USER_STATUS_ACTIVE = 1;
  USER_STATUS_INACTIVE = 2;
  USER_STATUS_BANNED = 3;
}

message User {
  int64 id = 1;
  UserStatus status = 2;
}
```

### Maps

```protobuf
message UserMetadata {
  int64 user_id = 1;
  map<string, string> attributes = 2;
}
```

## Service Definition

Define RPC methods:

```protobuf
service UserService {
  // Get a user by ID
  rpc GetUser(GetUserRequest) returns (GetUserResponse);

  // Create a new user
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);

  // Update an existing user
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);

  // Delete a user
  rpc DeleteUser(DeleteUserRequest) returns (DeleteUserResponse);

  // List users with pagination
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}
```

## Complete Example

```protobuf
syntax = "proto3";

package user;

option go_package = "user";

// User entity
message User {
  int64 id = 1;
  string name = 2;
  string email = 3;
  UserStatus status = 4;
  int64 created_at = 5;
  int64 updated_at = 6;
}

enum UserStatus {
  USER_STATUS_UNSPECIFIED = 0;
  USER_STATUS_ACTIVE = 1;
  USER_STATUS_INACTIVE = 2;
}

// GetUser
message GetUserRequest {
  int64 id = 1;
}

message GetUserResponse {
  User user = 1;
}

// CreateUser
message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message CreateUserResponse {
  User user = 1;
}

// UpdateUser
message UpdateUserRequest {
  int64 id = 1;
  string name = 2;
  string email = 3;
}

message UpdateUserResponse {
  User user = 1;
}

// DeleteUser
message DeleteUserRequest {
  int64 id = 1;
}

message DeleteUserResponse {
  bool success = 1;
}

// ListUsers
message ListUsersRequest {
  int32 page = 1;
  int32 page_size = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  int64 total = 2;
}

// Service definition
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);
  rpc DeleteUser(DeleteUserRequest) returns (DeleteUserResponse);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}
```

## Importing Other Proto Files

```protobuf
syntax = "proto3";

package order;

option go_package = "order";

import "user.proto";

message Order {
  int64 id = 1;
  user.User customer = 2;  // Reference user from imported file
  repeated OrderItem items = 3;
}
```

## Best Practices

1. **Use descriptive names** - `GetUserRequest` instead of `Req`
2. **Include ID in responses** - Always return the created/updated entity
3. **Use pagination** - For list endpoints, include `page` and `page_size`
4. **Prefix enum values** - `USER_STATUS_ACTIVE` instead of `ACTIVE`
5. **Keep messages focused** - One purpose per message type
