# Copilot Agent Best Practices for dDrummer

## Overview
This document provides guidelines for Copilot Agents working on the dDrummer repository to prevent common issues and ensure smooth operation.

## Pre-Flight Checklist

Before making any changes, agents should:

1. ✅ **Explore the repository structure**
   ```bash
   ls -la
   find . -type f -name "*.json" | head -10
   ```

2. ✅ **Verify build system works**
   ```bash
   npm install --prefix apps/dashboard
   npm run build
   ```

3. ✅ **Check current state**
   ```bash
   git status
   git log --oneline -5
   ```

4. ✅ **Understand the task** fully before proceeding

## Using `report_progress` Correctly

### ✅ DO:
- Call `report_progress` after making meaningful changes
- Include a comprehensive checklist in the PR description
- Use descriptive commit messages
- Verify changes exist before calling: `git status && git diff`
- Update the checklist to reflect actual progress

### ❌ DON'T:
- Call `report_progress` before making any file changes
- Use generic messages like "Initial plan" without a detailed checklist
- Create empty commits
- Call it just to "test" if it works

### Example of GOOD `report_progress` usage:

```typescript
report_progress({
  commitMessage: "Add error handling to postCreate.sh script",
  prDescription: `
- [x] Analyze repository structure
- [x] Identify issue in postCreate.sh
- [x] Add error handling for npm install failures
- [x] Test build process
- [ ] Add unit tests for error scenarios
- [ ] Update documentation
  `
})
```

### Example of BAD `report_progress` usage:

```typescript
// ❌ NO! This will create an empty commit!
report_progress({
  commitMessage: "Initial plan",
  prDescription: ""
})
```

## Working with This Repository

### Repository Structure
```
dDrummer/
├── apps/
│   └── dashboard/        # Main React dashboard app
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── .devcontainer/        # Codespaces configuration
├── 0_inbox/              # Miscellaneous files
├── package.json          # Root package.json (workspace)
└── README.md
```

### Building the Project

```bash
# Install dependencies (from root)
npm run build

# Or directly in dashboard
cd apps/dashboard
npm install
npm run build
```

### Testing Your Changes

```bash
# Build the dashboard
npm run build

# Check for TypeScript errors
cd apps/dashboard && npx tsc --noEmit

# Preview the build
npm run preview
```

## Common Pitfalls

### 1. Empty Commits
**Problem**: Calling `report_progress` before making changes
**Solution**: Always make and verify changes first

### 2. Missing Dependencies
**Problem**: Not installing npm packages before building
**Solution**: Run `npm install` in the appropriate directory

### 3. Working Directory Issues
**Problem**: Running commands in wrong directory
**Solution**: Always use absolute paths or cd to correct location

### 4. Incomplete Plans
**Problem**: Starting work without understanding the full scope
**Solution**: Explore thoroughly, then create detailed checklist

## Error Recovery

If you encounter errors:

1. **Check git status**: `git status`
2. **Review recent changes**: `git diff`
3. **Check build**: `npm run build`
4. **Review logs**: Check command output carefully
5. **Ask for help**: If stuck, stop and inform the user

## Working with GitHub Tools

### Preferred Workflow:
1. Use `bash` tool to explore and make changes
2. Use `view` to examine files
3. Use `str_replace` for surgical edits
4. Use `create` for new files
5. Use `report_progress` to commit and push

### Git Commands (via bash):
```bash
# Check status
git status

# View changes
git diff

# Check history
git log --oneline -10

# View specific file changes
git diff path/to/file
```

## Resource Management

- Be mindful of token usage
- Make focused, minimal changes
- Don't recreate files that already exist
- Use `str_replace` instead of recreating entire files
- Clean up temporary files in `/tmp`

## Quality Standards

### Code Changes:
- ✅ Maintain existing code style
- ✅ Test changes before committing
- ✅ Update relevant documentation
- ✅ Use meaningful variable names
- ✅ Add comments only when necessary

### Commits:
- ✅ Use clear, descriptive commit messages
- ✅ Keep commits focused and atomic
- ✅ Verify changes are staged correctly

### PR Descriptions:
- ✅ Use markdown checklists
- ✅ Be specific about what was done
- ✅ List remaining work
- ✅ Keep consistent structure across updates

## Quick Reference Commands

```bash
# Navigation
cd /home/runner/work/dDrummer/dDrummer
pwd

# File operations
ls -la
find . -name "*.ts" -type f
cat path/to/file

# Git operations
git status
git log --oneline -10
git diff
git show HEAD

# Build operations
npm install --prefix apps/dashboard
npm run build
npm run dev

# Testing
npm run build && echo "Build successful!"
```

## Final Checklist Before `report_progress`

- [ ] Changes are staged and visible in `git status`
- [ ] Changes have been tested (build succeeds)
- [ ] Commit message is descriptive
- [ ] PR description has detailed checklist
- [ ] No temporary files are included
- [ ] Changes are minimal and focused

## Remember

> "The best `report_progress` is one that comes after meaningful work, not before."

When in doubt, explore more, plan thoroughly, and only commit when you have something concrete to show.
