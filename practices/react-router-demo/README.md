# React Router Demo - Document Title Management

A simple React application demonstrating proper document title management and accessibility practices with React Router.

## 🎯 Purpose

This demo is part of the **AccessibleLab** project and specifically focuses on:

- **WCAG 2.4.2 (Page Titled)** - Level A compliance
- Dynamic document title management in single-page applications
- Screen reader announcements for route changes
- Focus management for improved navigation
- Keyboard accessibility

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
react-router-demo/
├── src/
│   ├── components/
│   │   └── Navigation.jsx      # Accessible navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Home page with title management
│   │   └── About.jsx           # About page with title management
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # Accessible styles
│   └── main.jsx
├── index.html
└── package.json
```

## ✨ Features

### Document Title Management

- ✅ Unique, descriptive titles for each page
- ✅ Consistent title pattern: "Page Name - React Router Demo"
- ✅ Automatic updates on route changes
- ✅ Proper cleanup in useEffect hooks

### Screen Reader Support

- ✅ Page change announcements via ARIA live regions
- ✅ Current page indicators with `aria-current="page"`
- ✅ Screen reader only text for additional context
- ✅ Proper ARIA labels and roles

### Keyboard Navigation

- ✅ Skip link to main content
- ✅ Full keyboard accessibility
- ✅ Visible focus indicators
- ✅ Logical tab order

### Focus Management

- ✅ Focus moves to main heading on route change
- ✅ Helps screen reader users understand context
- ✅ Proper use of `tabIndex="-1"` for programmatic focus

### Responsive & Accessible Design

- ✅ Mobile-friendly layout
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Dark mode support

## 🧪 Testing Accessibility

### Manual Testing

1. **Document Title Changes**

   - Navigate between Home and About pages
   - Watch the browser tab title update
   - Verify each page has a unique, descriptive title

2. **Screen Reader Testing**

   - Use NVDA (Windows), JAWS (Windows), or VoiceOver (macOS)
   - Navigate between pages and listen for announcements
   - Verify focus moves to main heading on page changes

3. **Keyboard Navigation**

   - Press Tab when page loads - skip link should appear
   - Navigate through all interactive elements using Tab
   - Activate links using Enter
   - Verify all elements have visible focus indicators

4. **Focus Management**
   - Navigate to a new page
   - Verify focus is placed on the main heading
   - This helps screen reader users understand the page content

### Browser Developer Tools

- Use Chrome DevTools Accessibility tree
- Check Lighthouse accessibility score
- Verify proper ARIA attributes

## 🔑 Key Implementation Details

### useEffect for Title Management

Each page component uses React's `useEffect` hook to manage titles:

```javascript
useEffect(() => {
  // 1. Update document title
  document.title = "Home - React Router Demo";

  // 2. Focus main heading for context
  if (headingRef.current) {
    headingRef.current.focus();
  }

  // 3. Announce to screen readers
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.className = "sr-only";
  announcement.textContent = "Navigated to Home page";
  document.body.appendChild(announcement);

  // 4. Cleanup
  const timer = setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);

  return () => clearTimeout(timer);
}, []);
```

### Navigation with React Router

Using React Router's `Link` component with accessibility features:

```javascript
<Link
  to='/'
  className={isActive("/") ? "active" : ""}
  aria-current={isActive("/") ? "page" : undefined}
>
  Home
  {isActive("/") && <span className='sr-only'> (current page)</span>}
</Link>
```

## 📚 WCAG Compliance

This demo addresses the following WCAG Success Criteria:

| Criterion                 | Level | Description                                          |
| ------------------------- | ----- | ---------------------------------------------------- |
| **2.4.2 Page Titled**     | A     | Web pages have titles that describe topic or purpose |
| **2.4.3 Focus Order**     | A     | Sequential navigation follows a logical order        |
| **4.1.3 Status Messages** | AA    | Status changes are announced to screen readers       |

## 🎓 Learning Objectives

After exploring this demo, you'll understand:

1. **Why document titles matter** for accessibility
2. **How to implement dynamic titles** in React SPAs
3. **Best practices for title patterns** and consistency
4. **How to announce route changes** to screen readers
5. **Focus management strategies** for better UX
6. **Integration of React Router** with accessibility features

## 🔄 Comparison: Traditional vs SPA

### Traditional Multi-Page Website

- ✅ Browser automatically updates title on page load
- ✅ Screen readers announce page load
- ✅ Focus resets to top of page

### Single-Page Application (SPA)

- ⚠️ No automatic title update
- ⚠️ No automatic screen reader announcement
- ⚠️ Focus doesn't reset automatically
- ✅ **Solution:** Manual implementation (as shown in this demo)

## 🚀 Next Steps

To extend this demo, consider:

1. **Custom Hook**: Create a `useDocumentTitle` hook for reusability
2. **Route Metadata**: Define titles in route configuration
3. **Loading States**: Show loading titles during data fetching
4. **Error Pages**: Add 404 page with proper title
5. **Breadcrumbs**: Add hierarchical navigation
6. **Modal Dialogs**: Demonstrate focus trapping

## 📖 Resources

- [React Router Documentation](https://reactrouter.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 👨‍💻 Author

**Michele Dellaquila**

- GitHub: [@MicheleDellaquila](https://github.com/MicheleDellaquila)

## 📄 License

This project is part of AccessibleLab and is available under the MIT License.
