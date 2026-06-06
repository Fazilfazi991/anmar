---
name: Logistics Prestige
colors:
  surface: '#f9faf8'
  surface-dim: '#d9dad8'
  surface-bright: '#f9faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f2'
  surface-container: '#edeeec'
  surface-container-high: '#e7e8e6'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#45483f'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#f0f1ef'
  outline: '#75786e'
  outline-variant: '#c5c8bc'
  surface-tint: '#526440'
  primary: '#50613e'
  on-primary: '#ffffff'
  primary-container: '#687a54'
  on-primary-container: '#f9ffeb'
  inverse-primary: '#b9cda1'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#5d5f56'
  on-tertiary: '#ffffff'
  tertiary-container: '#75786e'
  on-tertiary-container: '#040602'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e9bc'
  primary-fixed-dim: '#b9cda1'
  on-primary-fixed: '#111f04'
  on-primary-fixed-variant: '#3b4c2a'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e4d7'
  tertiary-fixed-dim: '#c5c8bc'
  on-tertiary-fixed: '#1a1d15'
  on-tertiary-fixed-variant: '#45483f'
  background: '#f9faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system embodies a **Corporate / Modern** aesthetic tailored specifically for the industrial logistics and warehousing sector. It prioritizes authority, operational efficiency, and regional stability. The visual narrative balances the ruggedness of industrial scale with the precision of modern technology.

The style utilizes a "Structured Professionalism" approach:
- **Reliability:** Heavy use of clean, architectural lines and balanced compositions.
- **Transparency:** Clear information hierarchy and open white spaces that suggest honesty and scale.
- **Regional Context:** Subtle integration of prestige through a palette that reflects the natural and industrial landscape of Saudi Arabia.
- **Tactile Precision:** Use of subtle gradients and high-quality photography to make large-scale operations feel accessible and premium.

## Colors

The palette is anchored by **Olive Green**, symbolizing stability and growth within the industrial sector. This is complemented by **Gold** accents that denote premium service and prestige.

- **Primary (Olive Green):** Used for main CTAs, iconography backgrounds, and key structural elements. It conveys a sense of established trust.
- **Secondary (Gold):** Utilized sparingly for high-value highlights, small accents, and success states to elevate the brand beyond a standard industrial provider.
- **Tertiary (Deep Charcoal):** Provides groundedness for typography and navigation, ensuring maximum legibility.
- **Neutral (Warm White/Grey):** Backgrounds use a slightly warm-toned off-white to maintain a "clean warehouse" feel without the sterility of pure white.

## Typography

The typography strategy is built on **Hanken Grotesk** for headlines to provide a sharp, contemporary, and engineered feel. **Inter** is used for body copy due to its high legibility in data-dense industrial contexts.

- **Headlines:** Should be tight, bold, and authoritative. Use "Olive Green" for primary headlines and "Deep Charcoal" for secondary.
- **Body:** Generous line-height is essential to ensure technical descriptions are easily digestible.
- **Labels:** We use **IBM Plex Sans** for labels and monospaced-adjacent contexts to lean into the technical/logistics nature of the business.

## Layout & Spacing

This design system employs a **Fixed Grid** approach for desktop to maintain a controlled, high-end editorial feel, transitioning to a fluid layout for mobile.

- **Grid:** A 12-column grid with 24px gutters. Content should typically span 4, 6, or 12 columns to maintain structural balance.
- **Sectioning:** Large vertical padding (80px - 120px) is used between major landing page sections to allow the brand "room to breathe."
- **Content Blocks:** Use "stack-md" (16px) for related elements (heading to subtext) and "stack-lg" (32px) between unrelated component groups.

## Elevation & Depth

To maintain a grounded, corporate feel, depth is handled through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows.

- **Surfaces:** Main content sits on the neutral background. Secondary information (like cards or form containers) uses white backgrounds with a subtle 1px border (#E5E7EB).
- **Shadows:** Only used on interactive elements or floating modals. When used, they are "Ambient Shadows"—extremely soft, blurred, and with a slight Olive tint to avoid looking "dirty."
- **Overlays:** Images should use a subtle dark-to-transparent gradient overlay at the bottom to ensure white text remains legible.

## Shapes

The shape language is **Soft (Level 1)**. This choice reflects a balance between the hard angles of industrial architecture and the approachable nature of a service provider.

- **Standard Radius:** 4px (0.25rem) for buttons, input fields, and small UI elements.
- **Card Radius:** 8px (0.5rem) for larger containers, service cards, and image wrappers.
- **Icon Containers:** Circular or highly rounded containers (16px+) are permitted for iconography to create a focal point against the otherwise linear layout.

## Components

### Buttons
- **Primary:** Solid Olive Green with white text. 4px border radius. Includes a right-arrow icon for "Action" orientation.
- **Secondary:** Transparent background with a 1px Olive Green border.
- **Ghost:** Text-only with a subtle underline or arrow, used for "Learn More" links.

### Input Fields
- White background with 1px light grey border.
- Labels sit above the field in **IBM Plex Sans** (Label-caps).
- Focus state: 1px Olive Green border with a soft green outer glow.

### Cards (Service/Industry)
- White background, 8px radius, subtle 1px border.
- Use a top-aligned image with a 1:1 or 4:3 aspect ratio.
- Include a decorative icon in a soft-tinted Olive circle at the bottom-left of the image or top-left of the content.

### Status Indicators & Steps
- Use numbered circles with "Olive Green" backgrounds for process steps (1, 2, 3...).
- Connect steps with dashed lines to indicate flow and logistics movement.

### Chips/Tags
- Used for categories (e.g., "Medical", "Food").
- Light grey background with 12px IBM Plex Sans text. Rounded-pill shape.