---
slug: orkas
type: ai-workflow
title: Orkas
fileName: orkas.workflow
summary: >-
  Coordinates specialist AI agents from a desktop chat, using your own model
  credentials and installed coding CLIs to carry out multi-step tasks.
category: productivity
tags: [multi-agent, orchestration, desktop, local-first]
tools: [claude-code, codex, opencode, openclaw, hermes-agent]
license: MIT
author: Orkas contributors
source: https://github.com/Orkas-AI/Orkas
stars: 2177
starsNote: "Checked on 2026-10-13."
verified: false
install: |
  git clone https://github.com/Orkas-AI/Orkas.git
  cd Orkas
  .\run.cmd
installLang: powershell
testimonials: []
---

## Overview

Orkas is a desktop application for coordinating AI agents through chat. Its
Commander plans tasks, handles work directly and delegates to specialists in
sequence or in parallel. The app includes agents for research, writing,
presentations, development and other document or media tasks.

The README describes local storage for conversations, files and credentials.
Cloud model calls still send data to the selected provider. You can also
configure a compatible local model endpoint or run installed external CLI
agents, including Claude Code and Codex, as local sessions.

## How it works

1. Configure a model provider with your own credentials, or add a compatible
   local endpoint.
2. Describe a goal in chat. The Commander decides which parts to handle and
   which specialists to involve.
3. Agents use their own skills, memory and tools to complete assigned work.
   The Commander can consume their results for later steps or hand over the
   final response to a specialist.
4. Review the returned results and files before using them. External CLI
   integrations require the corresponding CLI to be installed and configured.

## Examples

The README demonstrates researching five competitors, writing a report and
turning it into a presentation. DeepResearcher gathers sources, ContentWriter
drafts the report and PptMaker builds the slides.

Other documented uses include turning a product specification into development
tasks and working with uploaded documents for local data analysis.

## Notes

Packaged installers for Windows and macOS require sign-in. The source build
has no account layer. Your model provider may charge for usage; the packaged
app also offers an optional Orkas model billed in credits.

This directory has not independently verified installation or task execution.
On October 13, 2026, the latest native-dependency CI workflow failed during
package installation on all five platform jobs, including Windows, while the
Linux source smoke workflow passed. The cause of those installation failures
was not confirmed. See the [CI run](https://github.com/Orkas-AI/Orkas/actions/runs/38342628926)
before relying on a source installation.

The repository's main license is MIT, with the notice
`Copyright (c) 2026 Orkas contributors`. Bundled components have separate
license notices; preserve those notices if you redistribute them. Listing
Orkas here does not imply endorsement by its authors.

## Installation

You need Git and Node.js 22.12 or newer to run from source. The README
recommends Node.js 24 LTS for native-dependency troubleshooting. Supported
systems are Windows 10+, macOS and glibc 2.34+ Linux on x64 or arm64. Alpine
and other musl-based Linux distributions are unsupported.

1. Clone the repository and enter its directory:
   ```bash
   git clone https://github.com/Orkas-AI/Orkas.git
   cd Orkas
   ```
2. On Windows, launch it from PowerShell:
   ```powershell
   .\run.cmd
   ```
   On macOS or Linux, use:
   ```bash
   ./run.sh
   ```
3. Allow the first launch to install dependencies and download runtime
   resources, including the embedding and speech models. Python 3 and a C/C++
   build toolchain may be needed when a native package must compile locally.
4. Configure your provider credentials or local model endpoint in the app.
   For a custom endpoint, the README specifies Account settings, Models,
   Chat, Add model, then Custom. Supply the protocol, base URL and model ID.
5. Run a small task and inspect its response and any generated files. Confirm
   that the selected model responds before trying a longer workflow.

For native-dependency errors, the README documents `npm run native:repair`.
Use `npm run native:check` to check dependencies without installing them.
Windows and macOS users can instead choose a packaged installer from the
[official download page](https://orkas.ai/download/), subject to its sign-in
requirement.