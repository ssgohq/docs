---
layout: home

hero:
  name: "ssgo"
  text: "Go Microservice Toolkit"
  tagline: Code generation and development tools for Hertz HTTP and Kitex RPC
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: Commands
      link: /commands/
    - theme: alt
      text: GitHub
      link: https://github.com/ssgohq/ssgo

features:
  - icon: 🚀
    title: HTTP API Generation
    details: Generate Hertz HTTP servers from .api specification files with handlers, logic, and types.
  - icon: ⚡
    title: RPC Service Generation
    details: Generate Kitex RPC servers from .proto files with Consul service discovery support.
  - icon: 🗄️
    title: Database Integration
    details: Generate type-safe database code with SQLC, Bun, or GORM from existing schemas.
  - icon: 🔥
    title: Development Runner
    details: Run multiple services with hot reload, dependency ordering, and TUI.
  - icon: 📖
    title: OpenAPI Documentation
    details: Auto-generate OpenAPI/Swagger documentation from your API specifications.
  - icon: 🛠️
    title: Production Ready
    details: Built-in support for tracing, metrics, logging, and service discovery.
---

## Quick Start

```bash
# Install
brew install ssgohq/tap/ssgo

# Create and generate HTTP API
ss api new todo
ss api gen --api api/todo.api --dir todo-api -m github.com/myorg/todo-api

# Create and generate RPC service
ss rpc new user
ss rpc gen -p idl/user.proto --service UserService -m github.com/myorg/user-rpc -o user-rpc

# Run services with hot reload
ss run
```

## Learn More

<div class="vp-doc" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
  <a href="/getting-started/" style="flex: 1; min-width: 200px; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none;">
    <strong>📚 Getting Started</strong><br/>
    <span style="color: var(--vp-c-text-2)">Installation and quick start guide</span>
  </a>
  <a href="/commands/" style="flex: 1; min-width: 200px; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none;">
    <strong>💻 Commands</strong><br/>
    <span style="color: var(--vp-c-text-2)">CLI command reference</span>
  </a>
  <a href="/api-spec/" style="flex: 1; min-width: 200px; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none;">
    <strong>📝 API Spec</strong><br/>
    <span style="color: var(--vp-c-text-2)">Learn the .api file format</span>
  </a>
</div>
