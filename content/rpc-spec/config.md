# Configuration

The generated RPC server uses `etc/config.yaml` for configuration.

## Configuration File

```yaml
name: user
host: 0.0.0.0
port: 8888

metric:
  enabled: true
  port: 6061
  metricsPath: /metrics
  healthPath: /healthz
  readyPath: /readyz
  enableMetrics: true
  enablePprof: true

discovery:
  type: consul
  consul:
    address: localhost:8500

# Optional: OpenTelemetry tracing
# trace:
#   name: user
#   endpoint: localhost:4317

# Optional: Redis
# redis:
#   host: localhost
#   port: 6379

# Optional: Database (added by 'ssgo dms bun gen')
# db:
#   host: localhost
#   port: 5432
#   user: postgres
#   password: password
#   dbname: mydb
#   sslmode: disable
```

## Server Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `name` | string | Service name | Required |
| `host` | string | Listen host | `0.0.0.0` |
| `port` | int | RPC server port | `8888` |

## Metrics Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `metric.enabled` | bool | Enable metrics server | `true` |
| `metric.port` | int | Metrics server port | `6061` |
| `metric.metricsPath` | string | Prometheus metrics path | `/metrics` |
| `metric.healthPath` | string | Health check path | `/healthz` |
| `metric.readyPath` | string | Readiness check path | `/readyz` |
| `metric.enableMetrics` | bool | Enable Prometheus metrics | `true` |
| `metric.enablePprof` | bool | Enable pprof endpoints | `true` |

### Endpoints

When metrics are enabled, the following endpoints are available:

| Endpoint | Description |
|----------|-------------|
| `GET /metrics` | Prometheus metrics |
| `GET /healthz` | Liveness probe (always returns 200) |
| `GET /readyz` | Readiness probe (200 when ready) |
| `GET /debug/pprof/*` | Go pprof endpoints (if enabled) |

## Service Discovery

### Consul

```yaml
discovery:
  type: consul
  consul:
    address: localhost:8500
```

The service registers with Consul on startup and deregisters on shutdown.

### Disabling Service Discovery

To run without service discovery, remove or comment out the discovery section:

```yaml
# discovery:
#   type: consul
#   consul:
#     address: localhost:8500
```

## Tracing Configuration

Enable OpenTelemetry tracing:

```yaml
trace:
  name: user
  endpoint: localhost:4317
```

| Field | Type | Description |
|-------|------|-------------|
| `trace.name` | string | Service name in traces |
| `trace.endpoint` | string | OTLP collector endpoint |

Traces are exported to the OTLP collector using gRPC.

## Redis Configuration

Add Redis support with `--with-redis` flag:

```yaml
redis:
  host: localhost
  port: 6379
  password: ""
  db: 0
```

Access Redis in your logic:

```go
func (l *GetUserLogic) GetUser(req *user.GetUserRequest) (*user.GetUserResponse, error) {
    // Access Redis via ServiceContext
    val, err := l.svcCtx.Redis.Get(l.ctx, "user:"+strconv.FormatInt(req.Id, 10)).Result()
    // ...
}
```

## Database Configuration

Database configuration is typically added by `ssgo dms bun gen`:

```yaml
db:
  host: localhost
  port: 5432
  user: postgres
  password: password
  dbname: mydb
  sslmode: disable
```

## Environment Variables

Configuration values can be overridden with environment variables:

```bash
# Override port
export PORT=9999

# Override Consul address
export CONSUL_ADDRESS=consul.example.com:8500
```

## Running with Configuration

```bash
# Default config file (etc/config.yaml)
go run cmd/main.go

# Custom config file
go run cmd/main.go -c /path/to/config.yaml
```

## Docker Configuration

Mount config file in Docker:

```dockerfile
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o server ./cmd/main.go

FROM alpine:3.18
COPY --from=builder /app/server /server
COPY etc/config.yaml /etc/config.yaml
EXPOSE 8888 6061
CMD ["/server", "-c", "/etc/config.yaml"]
```

```bash
# Run with custom config
docker run -v $(pwd)/config.yaml:/etc/config.yaml my-service
```

## Kubernetes Configuration

Use ConfigMap for configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: user-rpc-config
data:
  config.yaml: |
    name: user
    host: 0.0.0.0
    port: 8888
    metric:
      enabled: true
      port: 6061
    discovery:
      type: consul
      consul:
        address: consul.default.svc:8500
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-rpc
spec:
  template:
    spec:
      containers:
      - name: user-rpc
        image: user-rpc:latest
        ports:
        - containerPort: 8888
        - containerPort: 6061
        volumeMounts:
        - name: config
          mountPath: /etc/config.yaml
          subPath: config.yaml
        livenessProbe:
          httpGet:
            path: /healthz
            port: 6061
        readinessProbe:
          httpGet:
            path: /readyz
            port: 6061
      volumes:
      - name: config
        configMap:
          name: user-rpc-config
```
