---
outline: deep
---

# Database Commands

Generate type-safe database code using SQLC, Bun, or GORM.

## Overview

The `ss db` command provides database code generation with:

- **SQLC** - Type-safe SQL query generation
- **Bun** - ORM model and repository generation
- **GORM** - ORM model and repository generation
- **Schema parsing** - Introspect database schema

## Commands

### ss db sqlc init

Initialize SQLC configuration in a service.

```bash
ss db sqlc init [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dir` | `-d` | `.` | Service directory |
| `--migrations` | `-m` | | Path to migrations directory |
| `--schema` | `-s` | | Schema name |
| `--entity` | `-e` | | Sample entity name |
| `--db-type` | | `postgres` | Database type: `postgres` or `mysql` |
| `--verbose` | `-v` | | Verbose output |

**Example:**

```bash
ss db sqlc init --dir user-rpc --db-type postgres --entity user
```

### ss db sqlc gen

Generate repository wrappers after running `sqlc generate`.

```bash
ss db sqlc gen [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dir` | `-d` | `.` | Service directory |
| `--trace` | `-t` | `false` | Enable OpenTelemetry tracing |
| `--verbose` | `-v` | | Verbose output |

**Example:**

```bash
# First run sqlc
sqlc generate

# Then generate repositories
ss db sqlc gen --dir user-rpc --trace
```

### ss db bun gen

Generate Bun ORM models and repositories from database schema.

```bash
ss db bun gen [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dsn` | | *env: SS_DB_DSN* | Database connection string |
| `--schema` | | `public` | Schema name |
| `--tables` | | *all* | Comma-separated table names |
| `--exclude` | | | Tables to exclude |
| `--dir` | `-o` | `.` | Output directory |
| `--module` | | *auto-detected* | Go module name |
| `--model-pkg` | | `model` | Model package name |
| `--repo-pkg` | | `repository` | Repository package name |
| `--model-only` | | `false` | Generate only models |
| `--repo-only` | | `false` | Generate only repositories |
| `--strict` | | `false` | Use `sql.Null*` types |
| `--trace` | | `false` | Enable OpenTelemetry |
| `--verbose` | `-v` | | Verbose output |

**Example:**

```bash
export SS_DB_DSN="postgres://user:pass@localhost/mydb?sslmode=disable"
ss db bun gen --tables users,posts --dir ./internal
```

### ss db gorm gen

Generate GORM models and repositories from database schema.

```bash
ss db gorm gen [flags]
```

**Flags:** Same as `bun gen` plus:

| Flag | Default | Description |
|------|---------|-------------|
| `--no-soft-delete` | `false` | Disable soft delete |
| `--hooks` | `false` | Generate hook methods |

**Example:**

```bash
ss db gorm gen --tables users --dir ./internal --hooks
```

### ss db parse

Parse and display database schema (for debugging).

```bash
ss db parse [flags]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--dsn` | | *env: SS_DB_DSN* | Connection string |
| `--schema` | | `public` | Schema name |
| `--tables` | | *all* | Tables to parse |
| `--json` | | `false` | Output as JSON |
| `--verbose` | `-v` | | Verbose output |

## Workflow

### SQLC Workflow

```bash
# 1. Initialize SQLC config
ss db sqlc init --dir user-rpc --entity user

# 2. Write SQL queries
cat > user-rpc/query/user.sql << 'EOF'
-- name: GetUser :one
SELECT * FROM users WHERE id = $1;

-- name: ListUsers :many
SELECT * FROM users ORDER BY created_at DESC;

-- name: CreateUser :one
INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;
EOF

# 3. Run sqlc
cd user-rpc && sqlc generate

# 4. Generate repositories
ss db sqlc gen --dir . --trace
```

### Bun/GORM Workflow

```bash
# 1. Set database connection
export SS_DB_DSN="postgres://localhost/mydb?sslmode=disable"

# 2. Generate models and repositories
ss db bun gen --dir ./internal --trace

# 3. Use in your service
```

## Generated Files

### SQLC

```
internal/
├── data/db/           # SQLC generated
│   ├── db.go
│   ├── models.go
│   ├── querier.go
│   └── user.sql.go
├── repository/        # ssgo generated
│   └── user_repository.go
└── store/             # ssgo generated
    ├── db.go
    └── store.go
```

### Bun/GORM

```
internal/
├── model/
│   └── user.go
└── repository/
    └── user_repository.go
```
