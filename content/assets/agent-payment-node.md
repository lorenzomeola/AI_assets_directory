---
slug: agent-payment-node
type: mcp-server
title: Agent Payment Node (APN)
fileName: agent-payment-node.mcp
summary: >-
  Local-first payment runtime and MCP server that lets AI agents prepare
  x402, USDC and on-chain payments while the owner sets limits and approves
  each spend in a terminal.
category: finance
tags: [mcp, payments, x402, usdc, evm, solana, tron, agentic-commerce, wallet]
tools: [claude-desktop, claude-code, cursor]
license: MIT
author: Nuanu AI
source: https://github.com/nuanu-ai/agent-payment-node
stars: 73
verified: false
install: |
  brew install nuanu-ai/tap/apn
  apn --version
  apn mcp config
  apn mcp serve
installLang: bash
testimonials: []
---

## Overview

**Agent Payment Node (APN)** is an open-source, local-first payment runtime and MCP server for AI agents. An agent drives it through the `apn` CLI or a local stdio MCP server, while a human owner sets the limits and approves payments in a foreground terminal. It covers direct transfers on EVM networks, Solana and TRON, standard x402 purchases, bridges, guarded swaps, and provider wallets such as Coinbase and MetaMask.

## How it works

1. The agent runs a `prepare` command, which freezes one exact effect (chain, asset, amount, recipient, fee budget) under an idempotency key and signs nothing.
2. An `approve` or `execute` command re-checks the frozen facts and the active owner policy, shows the exact terms in a foreground terminal, and asks for a typed code before signing.
3. x402 purchases run only inside a spending policy the owner has activated, and an owner allowlist enforces per-operation and daily caps.
4. Every send sits behind a durable marker, so after a crash APN finds the saved operation and does not send the money twice.

APN never prints or exports a private key, and the agent never approves a payment. There is no hosted remote MCP endpoint, so the server runs locally over stdio. It currently targets Apple Silicon macOS with Node 24.

## Examples

```bash
# Install and discover the contract
brew install nuanu-ai/tap/apn
apn --version
apn help --json

# Connect an MCP client
apn mcp config   # prints the launch descriptor
apn mcp serve    # local stdio server

# x402 purchase: inspect first, then prepare and approve
apn x402 inspect
```

APN handles real funds and has not been independently audited or tested by this directory. Read the [custody and threat model](https://github.com/nuanu-ai/agent-payment-node/blob/main/docs/custody-and-recovery.md) before funding a wallet.
