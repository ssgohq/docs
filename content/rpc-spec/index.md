---
outline: deep
---

# RPC Specification

RPC services are defined using standard Protocol Buffers (`.proto`) files.

## Overview

Proto files describe:

- **Messages** - Request and response structures
- **Services** - RPC methods and signatures
- **Enums** - Enumerated types
- **Options** - Go package and other metadata

## Quick Example

```protobuf
syntax = "proto3";

package user;
option go_package = "user";

message GetUserRequest {
  int64 id = 1;
}

message User {
  int64 id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}

message ListUsersRequest {
  int32 page = 1;
  int32 page_size = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  int32 total = 2;
}

service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}
```

## Documentation

- [Proto Format](./proto) - Message and service definitions
- [Configuration](./config) - Server configuration options

## Generated Code

When you run `ss rpc gen`, the following is generated:

| Component | Location | Description |
|-----------|----------|-------------|
| Proto Types | `kitex_gen/<pkg>/` | Generated protobuf code |
| Server | `internal/server/` | Service implementation |
| Logic | `internal/logic/` | Business logic layer |
| Config | `internal/config/config.go` | Configuration struct |
| Entry | `cmd/main.go` | Server entry point |

## Related Commands

- [ss rpc new](/commands/rpc#ss-rpc-new) - Create new proto file
- [ss rpc gen](/commands/rpc#ss-rpc-gen) - Generate server code
- [ss rpc model](/commands/rpc#ss-rpc-model) - Generate shared types
