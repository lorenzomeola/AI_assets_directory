---
slug: kleap-cli
type: mcp-server
title: Kleap MCP & CLI
fileName: kleap-cli.mcp
summary: >-
  Lets AI agents edit and publish websites on Kleap using their own generated
  code or Kleap's AI, then check deployment status before sharing the URL.
category: web-design
tags: [official, website-builder, deployment, astro, cli]
tools: [claude, claude-code, cursor, chatgpt, codex]
license: MIT
author: Kleap
source: https://github.com/kleaphq/cli
stars: 1
starsNote: "Checked on 2026-10-13."
verified: false
official: true
install: |
  npx -y kleap-cli@2.1.0 auth login
  claude mcp add kleap -- npx -y kleap-cli@2.1.0
installLang: bash
testimonials: []
---

## Overview

Kleap MCP & CLI is the official client for connecting AI agents to Kleap's
hosted website platform. The MIT-licensed package supports local MCP over
stdio and shell commands. The repository also documents a hosted OAuth
connector for clients that support remote MCP.

Your agent can write code and send exact file changes, or ask Kleap's AI to
generate a site or modify it from a prompt. Kleap handles the hosted build
and deployment. Tools also expose form submissions, analytics, Search Console
and the site's database, subject to account permissions.

## How it works

1. Authenticate with Kleap through browser login or a scoped API key.
2. Use `create_app` or `modify_app` for Kleap-generated changes. These return
   a task ID; inspect `check_task` for completion. Those tasks auto-deploy.
3. For changes written by your own agent, locate the site with `find_app`,
   read existing files and send changes through `edit_files` or `write_files`.
4. After direct file changes, call `publish_app` and inspect
   `get_publish_status` before reporting that the deployment is live.

The same package accepts CLI commands with optional JSON output. Database
update and delete tools require a non-empty filter. The domain purchase tool
creates a checkout link that the user must open and pay, rather than buying
the domain automatically.

## Examples

Ask your agent to build a bakery website, add a contact form or update a
headline. For an existing site, the documented MCP sequence is `find_app`,
`read_files`, `edit_files`, `publish_app`, then `get_publish_status`.

The CLI also supports creating a site without waiting for the build:

```bash
npx -y kleap-cli@2.1.0 create "a landing page for my podcast" --no-wait --json
```

Use the returned task ID to check progress. This command starts an AI build
and consumes Kleap credits.

## Notes

A Kleap account and internet access are required. AI builds and edits consume
Kleap credits; the README says direct file writes do not consume AI credits.
That does not make the hosted service free of plan limits or other charges.
Custom domain connection requires a paid plan. Check
[Kleap's pricing](https://kleap.co/pricing) before starting work.

The directory has not independently tested authentication or a live
deployment. The repository includes CLI and MCP tests against a simulated
API; those do not verify the production service. Its last visible CI run
passed in June 2026 for earlier code, and the linked workflow is absent from
the current main branch. Some README installation examples use `kleap` as
the package name; the instructions here use the confirmed npm package
`kleap-cli@2.1.0`.

The client is MIT licensed with the notice `Copyright (c) 2026 Kleap`.
Keep the copyright and license when redistributing code or substantial
portions of its documentation. The code license does not cover the hosted
service's terms or grant rights to Kleap's trademarks.

## Installation

For a local MCP process, you need Node.js 18 or newer with npm and a Kleap
account. The Claude Code command below also requires Claude Code to be
installed.

1. Sign in using your browser:
   ```bash
   npx -y kleap-cli@2.1.0 auth login
   ```
   The CLI stores the login in `~/.kleap/config.json`. Complete authentication
   directly in your browser; do not paste credentials into an agent chat.
2. For Claude Code, register the local MCP server:
   ```bash
   claude mcp add kleap -- npx -y kleap-cli@2.1.0
   ```
   For another local MCP client, add this server entry to its MCP configuration:
   ```json
   {
     "mcpServers": {
       "kleap": {
         "command": "npx",
         "args": ["-y", "kleap-cli@2.1.0"]
       }
     }
   }
   ```
3. Reload the client and ask it to list your Kleap apps. An empty list is
   expected for a new account; confirm that the request succeeds before
   allowing changes or starting a paid build.
4. Clients supporting remote MCP with OAuth can instead add
   `https://kleap.co/api/mcp` as a connector and authorize it in the browser.
   This hosted option does not require a local Node.js process.

For API-key authentication, choose only the scopes needed for your task and
keep the key out of committed files. Use `npx -y kleap-cli@2.1.0 auth logout`
to remove the locally stored login; revoke server credentials separately in
your Kleap account settings when needed.