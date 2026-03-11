# Dragnet Clickable Bubble (SPFx Web Part)

Custom SharePoint Framework (SPFx) web part that renders a configurable bubble/pill button (or label) for quick links and call-to-action elements.

## What This Web Part Does
- Renders a single inline bubble/button with configurable text and URL.
- Supports clickable and non-clickable modes.
- Can open links in the same tab or a new tab.
- Supports icon rendering:
  - Fluent UI icon
  - Custom image icon URL
  - No icon
- Optional external-link indicator icon (`right` or `inline`).
- Full appearance controls: colors, border, radius, font, spacing, hover colors, and shadow intensity.
- Includes presets:
  - `Pill Button`
  - `Compact Button`
  - `Label (Non-clickable)`
  - `Call to Action`
- Optional advanced free positioning using percentage offsets (`positionX`, `positionY`).
- Keyboard support for activation via `Enter` and `Space`.

## Tech Stack
- SPFx `1.20.x`
- React `17`
- Fluent UI React `8`
- TypeScript `4.7`

## Prerequisites
- Node.js `>=18.17.1 <19.0.0` (from `package.json`)
- npm (bundled with Node.js)
- SharePoint Online tenant and App Catalog access for deployment

## Project Setup
```bash
npm install
```

## Local Development
1. Update `config/serve.json` and replace `{tenantDomain}` in:
   - `https://{tenantDomain}/_layouts/workbench.aspx`
2. Run:
```bash
gulp serve
```
3. Open the SharePoint hosted workbench URL shown by the serve task.

## Build Commands
```bash
gulp clean
gulp build
```

## Production Package
```bash
gulp bundle --ship
gulp package-solution --ship
```

Generated package:
- `sharepoint/solution/dragnet-clickable-bubble.sppkg`

## Deployment (SharePoint Online)
1. Upload `sharepoint/solution/dragnet-clickable-bubble.sppkg` to your tenant App Catalog.
2. In the deployment prompt:
   - Enable tenant-wide deployment only if required by your governance model.
3. Deploy the solution.
4. Add the **ClickableBubble** web part to a modern SharePoint page.

Notes:
- `includeClientSideAssets` is enabled, so assets are packaged with the `.sppkg`.
- `skipFeatureDeployment` is `true`, allowing tenant-level availability without per-site feature activation.

## Property Pane Groups
- Preset
- Content Settings
- Icon Configuration
- Appearance Settings
- Hover Effects
- Size and Spacing
- Positioning (Advanced)
