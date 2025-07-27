# Contributing to React-Leaflet-Geoman

Thank you for your interest in contributing to React-Leaflet-Geoman! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- Basic knowledge of React, TypeScript, and Leaflet

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/react-leaflet-geoman.git
   cd react-leaflet-geoman
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development mode**
   ```bash
   npm run dev
   ```

4. **Run the example app**
   ```bash
   npm run example:dev
   ```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Tests should be placed in `src/**/__tests__/` directories
- Use descriptive test names that explain the expected behavior
- Test both success and error cases
- Mock external dependencies (Leaflet, Geoman)
- Aim for high test coverage

### Test Structure
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should do something specific', () => {
    // Test implementation
  });
});
```

## 📝 Code Style

### TypeScript
- Use strict TypeScript configuration
- Provide proper type annotations
- Use interfaces for object shapes
- Avoid `any` type when possible
- Use union types for better type safety

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper cleanup in useEffect

### General
- Use meaningful variable and function names
- Write clear, descriptive comments
- Keep functions small and focused
- Follow the existing code style

### Linting
```bash
# Check for linting issues
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## 🔧 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write your code following the style guidelines
- Add tests for new functionality
- Update documentation if needed

### 3. Test Your Changes
```bash
npm run typecheck
npm run lint
npm test
npm run build
```

### 4. Run the Example App
```bash
npm run example:dev
```
Test your changes in the example app to ensure they work correctly.

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### 6. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

## 📚 Documentation

### Updating Documentation
- Update README.md for user-facing changes
- Add JSDoc comments for new functions/components
- Update type definitions in index.ts
- Add examples for new features

### Documentation Standards
- Use clear, concise language
- Include code examples
- Provide TypeScript types
- Add links to relevant resources

## 🐛 Bug Reports

### Before Submitting a Bug Report
1. Check existing issues to avoid duplicates
2. Try to reproduce the issue in the example app
3. Check if the issue is related to Geoman or React-Leaflet

### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- React version: [e.g. 18.3.1]
- React-Leaflet version: [e.g. 4.2.1]
- Geoman version: [e.g. 2.15.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

### Before Submitting a Feature Request
1. Check if the feature already exists
2. Consider if it aligns with the project's goals
3. Think about the implementation complexity

### Feature Request Template
```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 🔄 Pull Request Process

### Before Submitting a PR
1. Ensure all tests pass
2. Update documentation if needed
3. Test in the example app
4. Follow the commit message conventions

### PR Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] I have read the [CONTRIBUTING.md](CONTRIBUTING.md) file
- [ ] My code follows the project's coding standards
- [ ] I have tested my changes in the example app
- [ ] I have updated the documentation accordingly
```

## 🏷️ Versioning

We use [Semantic Versioning](https://semver.org/) for versioning:
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes

## 📄 License

By contributing to React-Leaflet-Geoman, you agree that your contributions will be licensed under the MIT License.

## 🆘 Getting Help

If you need help with contributing:
- Check the [documentation](README.md)
- Search existing [issues](https://github.com/your-username/react-leaflet-geoman/issues)
- Create a new issue for questions or problems

## 🙏 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors list

Thank you for contributing to React-Leaflet-Geoman! 🎉