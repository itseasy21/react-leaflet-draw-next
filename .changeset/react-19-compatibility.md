---
"react-leaflet-draw-next": patch
---

# React 19 Compatibility Fix

**BREAKING**: Fixed React 19 compatibility issues by updating component implementation and type definitions.

## Key Changes

### React 19 Compatibility
- **Fixed TypeScript definitions**: Changed `EditControl` from class component to functional component in type definitions
- **Enhanced context safety**: Added robust error handling for `useLeafletContext()` to prevent crashes
- **Improved effect cleanup**: Enhanced useEffect cleanup to handle React 19's stricter lifecycle management
- **Graceful error handling**: Component now returns `null` instead of throwing errors when context is unavailable

### Bug Fixes
- **Fixed Fragment ref validation**: Eliminated potential React Fragment ref errors
- **Improved module loading**: Enhanced leaflet-draw initialization order for better Vite compatibility
- **Fixed duplicate React instances**: Updated build configuration to prevent multiple React versions
- **Enhanced prop validation**: Made `draw` and `position` props optional to match actual usage

### Developer Experience
- **Better error messages**: Added development-mode warnings for missing context
- **Improved example setup**: Updated hooks example with proper CSS and icon configuration
- **Enhanced build process**: Updated Vite configuration for better React 19 support

## Migration Guide

### For TypeScript Users
The component is now correctly typed as a functional component:
```tsx
// Before (incorrect)
class EditControl extends React.Component<EditControlProps> {}

// After (correct)  
const EditControl: React.FC<EditControlProps>
```

### For Library Users
No breaking changes to the public API. All existing code should continue to work.

### For Contributors
- Enhanced error boundary handling for better debugging
- Improved development warnings for missing MapContainer context
- Better cleanup procedures for React 19 strict mode compatibility

## Impact
This release resolves the critical React 19 compatibility issue that was preventing applications from upgrading to React 19 while using react-leaflet-draw-next.

## Testing
- ✅ React 19.1.0 compatibility
- ✅ react-leaflet 5.0.0 compatibility  
- ✅ TypeScript 5.6.2 compatibility
- ✅ Vite 7.0.0 compatibility
- ✅ All existing functionality preserved
