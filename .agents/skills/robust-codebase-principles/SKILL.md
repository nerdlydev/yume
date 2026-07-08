---
name: robust-codebase-principles
description: Enforces strict software engineering principles (KISS, DRY, YAGNI, SOLID, SoC) on code generation, refactoring, and architectural decisions. Use this skill whenever the user asks to write new features, refactor code, design architecture, review code, or whenever you are generating substantial amounts of code, to ensure the output prioritizes maintainability, readability, and adaptability.
---

# Robust Codebase Principles

When generating code, designing architecture, or refactoring existing systems, you MUST strictly adhere to the following core software engineering principles. The primary goals are **maintainability**, **readability**, and **adaptability**.

## 1. The Fundamentals

### KISS (Keep It Simple, Stupid)
- Favor simple, straightforward implementations over clever, complex ones.
- Avoid premature optimization. Write code that is easy to understand for the next developer (which might be you in 6 months).
- If a solution requires extensive comments to explain *how* it works (rather than *why*), it is likely too complex.

### DRY (Don't Repeat Yourself)
- Every piece of knowledge or logic must have a single, unambiguous representation within the system.
- Extract duplicated logic into reusable functions, hooks, or utility classes.
- *Caveat*: Do not blindly apply DRY if the abstractions become so complex that they violate KISS. Sometimes, a little duplication is better than the wrong abstraction.

### YAGNI (You Aren't Gonna Need It)
- Do not build features, abstractions, or extensibility points based on anticipated future needs.
- Implement only what is strictly necessary to satisfy the current requirements.
- Leave the codebase in a state where it is easy to adapt later, rather than predicting how it will adapt.

## 2. Advanced Design Principles

### SOLID Principles
- **Single Responsibility Principle (SRP)**: A class, module, or function should have one, and only one, reason to change.
- **Open/Closed Principle (OCP)**: Software entities should be open for extension but closed for modification. Use interfaces, composition, or polymorphism rather than modifying existing source code when adding new behavior.
- **Liskov Substitution Principle (LSP)**: Derived classes or components must be substitutable for their base classes without altering the correctness of the program.
- **Interface Segregation Principle (ISP)**: Clients should not be forced to depend upon interfaces/types they do not use. Prefer many small, specific interfaces over one large, general-purpose interface.
- **Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules. Both should depend on abstractions.

### SoC (Separation of Concerns) & Layered Architecture
- Divide the application into distinct features/layers with as little overlap in functionality as possible.
- Separate UI logic (appearance) from business logic (behavior) and data access (state).
- Use boundaries (like the `@yume/ui` vs `apps/web` split) to enforce these separations.
- **Strict Layer Independence**: Every layer has exactly one responsibility and every module owns its business domain. 
  - **Services orchestrate behavior**: All logical operations happen here. Cross-module communication always occurs through the Service layer.
  - **Repositories persist data**: Repositories must never depend on or invoke another repository.
  - **No Bypassing**: No layer may bypass another (e.g., Controllers/Routes must call Services, not Repositories directly).

## 3. Enforcement Guidelines

When reviewing or writing code:
1. **Challenge Complexity**: Ask yourself, "Is this the simplest way to solve the problem?" (KISS)
2. **Challenge Scope**: Ask yourself, "Is this logic actually required right now?" (YAGNI)
3. **Challenge Responsibilities**: Ask yourself, "Is this component doing too much?" (SRP/SoC)

If you find yourself violating these principles to fulfill a user request, you must explicitly call out the tradeoff to the user and suggest a cleaner alternative.
