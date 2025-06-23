# React WYSIWYG Editor Component

A reusable and flexible **WYSIWYG Editor** built with `draft-js`, designed to support both **controlled** and **uncontrolled** modes with customizable styling and a pluggable toolbar.

---

## Features

- Controlled and Uncontrolled behavior support
- Basic formatting: **bold**, _italic_, underline
- Default and custom toolbar support via `renderToolbar`
- Custom styling via `className` and `style`
- Fake async load & save to fake API
- Fully tested with unit tests for core features

---

## Project Structure

```graphql
src/
├── components/
│   └── editor/                     # Core editor components
│       ├── RichEditor.jsx         # Main editor component
│       ├── DefaultToolbar.jsx     # Default toolbar with formatting options
│       ├── ExternalToolbar.jsx    # Custom toolbar (example used in demo)
│       ├── RichEditorDemo.jsx     # Editor with fake API behavior
│       └── StyleButton.jsx        # Toolbar formatting button (Bold, Italic, etc.)
│
│   └── ui/                         # Shared UI elements
│       ├── Button.jsx             # Reusable button
│       ├── Header.jsx             # Page header (if used)
│       ├── Logo.jsx               # Logo component
│       └── Spinner.jsx            # Loading spinner
│
├── hooks/                          # Custom reusable logic
│   ├── useRichEditor.js           # Editor state & formatting logic
│   └── useEditorFakeApi.js        # Simulated async API logic
│
├── demo/                           # Main demo for the component
│   └── DemoPage.jsx               # Page to toggle modes and preview features
│
├── data/                           # Static or dynamic data
│   └── headerLinkes.js            # Navigation links or headers
│
├── __tests__/                      # Unit tests
│   ├── RichEditor.test.js         # Tests for editor component
│   ├── RichEditorDemo.test.js     # Tests for the fake API demo
│   ├── DemoPage.test.js           # Tests for the demo page
│   ├── useRichEditor.test.js      # Hook test
│   └── useEditorFakeApi.test.js   # Hook test
│   └── DefaultToolbar.test.jsx    # Tests Editor Operations Like(bold, italic,underline)

```

---

## Getting Started

### Installation

```bash
npm install

```

---

### Start the Project

```bash
npm run dev

```

---

### The demo page is available at

```bash
http://localhost:5173

```

---

### Running Tests

```bash
npm test

```

- We are using Jest and @testing-library/react for unit tests.
- You can find tests under the **tests** folder.
- Test coverage includes:
  - Controlled and uncontrolled mode behavior
  - Toolbar buttons and formatting
  - API mocking via custom hook
  - Component rendering

# Usage Examples

## Controlled Mode

```jsx
<RichEditor
  value={editorState}
  onChange={handleEditorChange}
  renderToolbar={ExternalToolbar}
  placeholder="Controlled mode..."
/>
```

---

## Uncontrolled Mode

```jsx
<RichEditor renderToolbar={DefaultToolbar} placeholder="Uncontrolled mode." />
```

---

### Bonus (Advanced)

- RichEditorDemo.jsx demonstrates:
  - Fake loading of content (e.g., from API)
  - Submitting content to a fake API (simulated async behavior)
  - Custom Hook: useEditorFakeApi.js handles the mock logic

---

### Customization

- renderToolbar: Replace or extend the toolbar
- className / style: Override styles easily
