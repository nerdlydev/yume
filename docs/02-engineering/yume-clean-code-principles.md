# Yume Clean Code Principles

**Answers:** *How do we write code?*

## 1. Engineering Philosophy

Every line of code should be written as if another engineer will maintain it in two years. 

We prioritize:
- **Simplicity** over cleverness.
- **Maintainability** over speed of writing.
- **Readability** because code is read far more often than it is written.
- **Consistency** so the codebase feels like it was written by a single engineer.

---

## 2. Core Engineering Principles

### KISS (Keep It Simple, Stupid)
Choose the simplest solution that solves the problem correctly. Avoid unnecessary abstractions.

### DRY (Don't Repeat Yourself)
Business logic should exist in one place. Duplication should only be removed when it becomes genuine duplication.

### YAGNI (You Aren't Gonna Need It)
Do not build for hypothetical future requirements. Build for today's requirements while leaving room for tomorrow.

### SOLID
- **S**ingle Responsibility: A module or function should have one reason to change.
- **O**pen/Closed: Open for extension, closed for modification.
- **L**iskov Substitution: Subtypes must be substitutable for their base types.
- **I**nterface Segregation: Do not force clients to depend on interfaces they do not use.
- **D**ependency Inversion: Depend upon abstractions, not concretions.

### Separation of Concerns (SoC)
Keep boundaries explicit.
```text
Controller → HTTP
Service    → Business Logic
Repository → Persistence
```

### High Cohesion
Every module should have one reason to exist. Everything related to a feature (e.g., Journey) belongs in that feature.

### Low Coupling
Modules should know as little as possible about one another. A feature should never import deep internals of another feature. Rely on public APIs instead.

### Composition Over Inheritance
Especially important in React. Build complex behavior by composing smaller, focused pieces rather than extending deep class hierarchies.

### Convention Over Configuration
Less thinking. One folder structure. One naming convention. One architecture.

---

## 3. Code Organization
- **Small files**: Keep files focused.
- **Explicit naming**: Folders and files should instantly reveal what they contain.
- **Predictable folders**: Adhere strictly to the defined structure.
- **Explicit dependencies**: Imports should be obvious and necessary.

---

## 4. Feature Ownership
Every feature owns its own:
- Components
- API
- Hooks
- Validation
- Types

Architecture belongs elsewhere, but a feature's internal domain logic belongs solely to the feature.

---

## 5. Clean Code Rules
- Functions should ideally be small (guideline, not a strict law).
- Avoid nested conditionals.
- Prefer early returns.
- Maintain one abstraction level per function.
- No magic numbers. Use named constants.
- No boolean parameter explosion. Use option objects instead.
- Meaningful names: If it requires a comment to explain, rename it.
- Prefer immutability.
- Avoid comments that explain *what*; write code that explains itself.

---

## 6. TypeScript Standards
- `strict` mode is mandatory.
- No `any`. Use `unknown` if a type is truly dynamic.
- Use `readonly` where appropriate.
- Prefer discriminated unions for complex states.
- Ensure exhaustive switch statements.

---

## 7. Error Handling
- Never swallow errors.
- Use custom domain errors when necessary.
- Use centralized error middleware to process and format errors.
- Provide meaningful messages to clients without leaking internals.

---

## 8. Testing Philosophy
Test behaviors, not implementation details. Focus on what the code does from the perspective of its consumer, rather than how it achieves it internally.

---

## 9. Refactoring Philosophy
Refactor only when it improves clarity or removes real duplication. Avoid abstraction for abstraction's sake.

---

## 10. Code Review Checklist
Before requesting a review, ask yourself:
- Is it simple?
- Is it readable?
- Is it testable?
- Does it follow ownership boundaries?
- Does it duplicate logic unnecessarily?
- Does it leak abstractions?
- Is the naming clear?
