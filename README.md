# Clickable Bubble WebPart

Customizable bubble and pill buttons for SharePoint pages.

## Features
- Adjustable size and roundness
- Optional icons (left or right)
- Optional external link indicator
- Free positioning anywhere on the page
- Hover effects and shadows
- Keyboard accessible
- Responsive layout

## Configuration
Use the property pane to configure:
- Content (text, link, click behavior)
- Icon settings (type, position, size)
- Appearance (colors, borders, shadows)
- Hover effects
- Size and spacing
- Advanced positioning

## Presets
Choose a preset to quickly apply a style:
- Pill Button
- Compact Button
- Label (Non-clickable)
- Call to Action

## Examples
- Quick links and navigation
- Call-to-action buttons
- Footer links
- Floating quick links

## Build and Package
```bash
npm install
gulp clean
gulp build
gulp bundle --ship
gulp package-solution --ship
```

The packaged solution will be at `sharepoint/solution/dragnet-clickable-bubble.sppkg`.
