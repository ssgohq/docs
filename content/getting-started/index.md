---
outline: deep
---

# Introduction

ssgo is an all-in-one CLI toolkit for building Go microservices with [Hertz](https://github.com/cloudwego/hertz) HTTP and [Kitex](https://github.com/cloudwego/kitex) RPC frameworks.

## Features

- **HTTP API Generation** - Generate Hertz servers from `.api` spec files
- **RPC Service Generation** - Generate Kitex RPC servers from `.proto` files
- **Database Integration** - Generate type-safe database code with SQLC, Bun, or GORM
- **Development Runner** - Run multiple services with hot reload and TUI
- **OpenAPI Documentation** - Auto-generate API documentation

## Installation

```bash
# Using Homebrew (macOS/Linux)
brew install ssgohq/tap/ssgo

# Using go install
go install github.com/ssgohq/ssgo/tool/cmd/ssgo@latest
```

## Quick Start

### HTTP API with Hertz

```bash
# Create API spec file
ss api new user

# Generate Hertz server
ss api gen --api api/user.api --dir user-api -m github.com/myorg/user-api

# Run the server
cd user-api && go mod tidy && go run cmd/main.go
```

### RPC Service with Kitex

```bash
# Create proto file
ss rpc new user

# Generate Kitex RPC server
ss rpc gen -p idl/user.proto --service UserService -m github.com/myorg/user-rpc -o user-rpc

# Run the server
cd user-rpc && go mod tidy && go run cmd/main.go -c etc/config.yaml
```

### Development Runner

```bash
# Initialize run config by scanning project
ss run init

# Run all services with hot reload
ss run
```

## Project Structure

A typical ssgo project follows this structure:

```
my-project/
├── .ss.yaml              # ssgo configuration
├── api/                  # API spec files (.api)
├── idl/                  # Proto files (.proto)
├── api-gateway/          # HTTP API service
│   ├── cmd/main.go
│   ├── etc/api.yaml
│   └── internal/
├── user-rpc/             # RPC service
│   ├── cmd/main.go
│   ├── etc/config.yaml
│   └── internal/
└── common-pb/            # Shared protobuf types
```

## Runtime Library

Generated services use [goten-core](https://github.com/ssgohq/goten-core) as the runtime library, providing:

- **Logging** - Structured logging with Zap
- **Metrics** - Prometheus metrics collection
- **Tracing** - OpenTelemetry distributed tracing
- **Middleware** - HTTP middleware (CORS, JWT, logging)
- **Stores** - Database connection utilities (PostgreSQL, MySQL, Redis)
- **Lifecycle** - Graceful startup/shutdown management

The runtime library is automatically included in generated `go.mod` files.

## What's Next

- [Configuration](/getting-started/configuration) - Learn about `.ss.yaml` configuration
- [API Commands](/commands/api) - Generate HTTP services
- [RPC Commands](/commands/rpc) - Generate RPC services
- [Database Commands](/commands/db) - Generate database code
- [goten-core Reference](/reference/goten-core) - Runtime library documentation
