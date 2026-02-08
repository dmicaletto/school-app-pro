# 🎨 Dark Mode Visual Guide

## Color Palette Reference

### 🌞 Light Mode Colors

```
┌─────────────────────────────────────────────┐
│ BACKGROUNDS                                 │
├─────────────────────────────────────────────┤
│ Main Background:    bg-gray-50    #F9FAFB  │
│ Card Background:    bg-white      #FFFFFF  │
│ Input Background:   bg-gray-50    #F9FAFB  │
│ Hover Background:   bg-gray-100   #F3F4F6  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEXT COLORS                                 │
├─────────────────────────────────────────────┤
│ Primary Text:       text-gray-900 #111827  │
│ Secondary Text:     text-gray-700 #374151  │
│ Tertiary Text:      text-gray-500 #6B7280  │
│ Disabled Text:      text-gray-400 #9CA3AF  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BORDERS                                     │
├─────────────────────────────────────────────┤
│ Main Border:        border-gray-200 #E5E7EB│
│ Input Border:       border-gray-200 #E5E7EB│
│ Divider:            border-gray-100 #F3F4F6│
└─────────────────────────────────────────────┘
```

### 🌙 Dark Mode Colors

```
┌─────────────────────────────────────────────┐
│ BACKGROUNDS                                 │
├─────────────────────────────────────────────┤
│ Main Background:    bg-gray-900   #111827  │
│ Card Background:    bg-gray-800   #1F2937  │
│ Input Background:   bg-gray-700   #374151  │
│ Hover Background:   bg-gray-600   #4B5563  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEXT COLORS                                 │
├─────────────────────────────────────────────┤
│ Primary Text:       text-gray-100 #F3F4F6  │
│ Secondary Text:     text-gray-300 #D1D5DB  │
│ Tertiary Text:      text-gray-400 #9CA3AF  │
│ Disabled Text:      text-gray-500 #6B7280  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BORDERS                                     │
├─────────────────────────────────────────────┤
│ Main Border:        border-gray-700 #374151│
│ Input Border:       border-gray-600 #4B5563│
│ Divider:            border-gray-700 #374151│
└─────────────────────────────────────────────┘
```

### 🎨 Accent Colors (Both Modes)

```
┌─────────────────────────────────────────────┐
│ PRIMARY (Blue)                              │
├─────────────────────────────────────────────┤
│ Light:  bg-blue-600     #2563EB            │
│ Dark:   bg-blue-500     #3B82F6            │
│ Hover Light: bg-blue-700 #1D4ED8           │
│ Hover Dark:  bg-blue-600 #2563EB           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SUCCESS (Green)                             │
├─────────────────────────────────────────────┤
│ Light:  bg-green-500    #22C55E            │
│ Dark:   bg-green-600    #16A34A            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ERROR (Red)                                 │
├─────────────────────────────────────────────┤
│ Light:  bg-red-500      #EF4444            │
│ Dark:   bg-red-600      #DC2626            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ WARNING (Yellow)                            │
├─────────────────────────────────────────────┤
│ Light:  bg-yellow-500   #EAB308            │
│ Dark:   bg-yellow-600   #CA8A04            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ INFO (Blue)                                 │
├─────────────────────────────────────────────┤
│ Light:  bg-blue-500     #3B82F6            │
│ Dark:   bg-blue-600     #2563EB            │
└─────────────────────────────────────────────┘
```

---

## 📐 Component Examples

### Button

```jsx
// Light Mode
<button className="
  bg-blue-600 
  text-white 
  hover:bg-blue-700 
  border-blue-600
">

// Dark Mode (same element)
<button className="
  bg-blue-600 
  dark:bg-blue-500 
  text-white 
  hover:bg-blue-700 
  dark:hover:bg-blue-600 
  border-blue-600 
  dark:border-blue-500
  transition-colors duration-200
">
```

### Card

```jsx
// Light Mode
<div className="
  bg-white 
  text-gray-900 
  border-gray-200
">

// Dark Mode (same element)
<div className="
  bg-white 
  dark:bg-gray-800 
  text-gray-900 
  dark:text-gray-100 
  border-gray-200 
  dark:border-gray-700
  transition-colors duration-200
">
```

### Input

```jsx
// Light Mode
<input className="
  bg-gray-50 
  text-gray-900 
  border-gray-200 
  placeholder-gray-400
">

// Dark Mode (same element)
<input className="
  bg-gray-50 
  dark:bg-gray-700 
  text-gray-900 
  dark:text-gray-100 
  border-gray-200 
  dark:border-gray-600 
  placeholder-gray-400 
  dark:placeholder-gray-500
  transition-colors duration-200
">
```

---

## 🎯 Usage Patterns

### Pattern 1: Basic Container
```jsx
<div className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
  transition-colors duration-200
">
  Content
</div>
```

### Pattern 2: Interactive Element
```jsx
<button className="
  bg-blue-600 dark:bg-blue-500
  text-white
  hover:bg-blue-700 dark:hover:bg-blue-600
  active:scale-95
  transition-all duration-200
">
  Click me
</button>
```

### Pattern 3: Form Input
```jsx
<input className="
  bg-gray-50 dark:bg-gray-700
  border border-gray-200 dark:border-gray-600
  text-gray-900 dark:text-gray-100
  focus:ring-2 focus:ring-blue-500
  transition-all
" />
```

### Pattern 4: Text Hierarchy
```jsx
<div>
  <h1 className="text-gray-900 dark:text-gray-100">
    Primary Heading
  </h1>
  <h2 className="text-gray-700 dark:text-gray-300">
    Secondary Heading
  </h2>
  <p className="text-gray-500 dark:text-gray-400">
    Body text
  </p>
</div>
```

---

## ✨ Special Effects

### Glassmorphism
```jsx
<div className="
  bg-white/50 dark:bg-gray-800/50
  backdrop-blur-sm
  border border-white/50 dark:border-gray-700/50
">
  Glass effect
</div>
```

### Gradient
```jsx
<div className="
  bg-gradient-to-r 
  from-blue-500 to-blue-600
  dark:from-blue-600 dark:to-blue-700
">
  Gradient
</div>
```

### Shadow
```jsx
<div className="
  shadow-lg
  dark:shadow-blue-600/30
">
  With shadow
</div>
```

---

## 🔄 Transition Best Practices

### Always Include
```jsx
// For color changes
transition-colors duration-200

// For all properties
transition-all duration-200

// For specific properties
transition-transform duration-200
```

### Timing
- **200ms** - Color changes, backgrounds
- **150ms** - Hover effects
- **300ms** - Complex animations
- **100ms** - Micro-interactions

---

## 🎨 Toast Notification Colors

### Success Toast
```
Light Mode:
- Background: bg-green-50
- Border: border-green-200
- Text: text-green-800
- Icon: text-green-500

Dark Mode:
- Background: dark:bg-green-900/20
- Border: dark:border-green-800
- Text: dark:text-green-200
- Icon: text-green-500
```

### Error Toast
```
Light Mode:
- Background: bg-red-50
- Border: border-red-200
- Text: text-red-800
- Icon: text-red-500

Dark Mode:
- Background: dark:bg-red-900/20
- Border: dark:border-red-800
- Text: dark:text-red-200
- Icon: text-red-500
```

---

## 📱 Responsive + Dark Mode

```jsx
<div className="
  bg-white dark:bg-gray-800
  p-4 sm:p-6 md:p-8
  text-sm sm:text-base md:text-lg
  text-gray-900 dark:text-gray-100
  transition-colors duration-200
">
  Responsive + Dark Mode
</div>
```

---

## 🎯 Quick Reference

### Most Used Combinations

**Container:**
```
bg-white dark:bg-gray-800
text-gray-900 dark:text-gray-100
border-gray-200 dark:border-gray-700
```

**Button Primary:**
```
bg-blue-600 dark:bg-blue-500
hover:bg-blue-700 dark:hover:bg-blue-600
```

**Input:**
```
bg-gray-50 dark:bg-gray-700
border-gray-200 dark:border-gray-600
text-gray-900 dark:text-gray-100
```

**Text:**
```
text-gray-900 dark:text-gray-100  (Primary)
text-gray-700 dark:text-gray-300  (Secondary)
text-gray-500 dark:text-gray-400  (Tertiary)
```

---

## 🚫 Common Mistakes

### ❌ Don't
```jsx
// Missing dark mode
<div className="bg-white text-gray-900">

// No transition
<div className="bg-white dark:bg-gray-800">

// Inconsistent colors
<div className="bg-gray-100 dark:bg-gray-900">
```

### ✅ Do
```jsx
// Complete dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">

// With transition
<div className="bg-white dark:bg-gray-800 transition-colors duration-200">

// Consistent hierarchy
<div className="bg-white dark:bg-gray-800">
```

---

**🎨 Use this guide as reference when styling new components!**
