```markdown
# qwen-anak Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `qwen-anak` TypeScript repository. You'll learn how to structure files, write imports and exports, follow commit message standards, and write and run tests in alignment with the project's style. This guide is ideal for contributors aiming for consistency and maintainability in the codebase.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - **Example:**  
    `MyComponent.ts`  
    `UserService.ts`

### Import Style
- Use **relative imports** for referencing other files.
  - **Example:**
    ```typescript
    import { UserService } from './UserService';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - **Example:**
    ```typescript
    // In UserService.ts
    export function getUser() { ... }
    export const USER_ROLE = 'admin';

    // In another file
    import { getUser, USER_ROLE } from './UserService';
    ```

### Commit Messages
- Use **Conventional Commits** with the `feat` prefix for features.
  - **Example:**  
    `feat: add user authentication middleware`

## Workflows

### Creating a New Feature
**Trigger:** When adding a new feature to the codebase  
**Command:** `/create-feature`

1. Create a new file using PascalCase (e.g., `NewFeature.ts`).
2. Implement the feature using TypeScript.
3. Use named exports for all exported members.
4. Import dependencies using relative paths.
5. Write corresponding tests in a file named `NewFeature.test.ts`.
6. Commit your changes with a message like:  
   `feat: add new feature for user onboarding`

### Writing and Running Tests
**Trigger:** When validating new or existing code  
**Command:** `/run-tests`

1. Create a test file alongside the implementation file, using the pattern `*.test.ts`.
2. Write tests according to the project's conventions (testing framework is currently unknown).
3. Run the test suite using the project's configured test runner (refer to project documentation or scripts).

## Testing Patterns

- Test files are named using the pattern `*.test.*` (e.g., `UserService.test.ts`).
- Place test files alongside or near the files they test.
- The specific testing framework is not detected; refer to the project documentation or existing test files for examples.

## Commands
| Command         | Purpose                                   |
|-----------------|-------------------------------------------|
| /create-feature | Scaffold a new feature with conventions   |
| /run-tests      | Run the test suite for the codebase       |
```
