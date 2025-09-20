# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML website for "theFlowX" - an AI-first digital marketing and investor materials company. The site is built using traditional HTML, CSS (with SASS), and JavaScript without any build tools or package managers.

## Architecture & Structure

### Core Technologies
- **HTML**: Static HTML pages for different sections (index, about, services, portfolio, etc.)
- **CSS/SASS**: Modular SASS architecture compiled to CSS
- **JavaScript**: jQuery-based interactions with GSAP animations
- **Template**: Based on "Cretio" template by Thememarch

### Directory Structure
```
├── assets/
│   ├── css/          # Compiled CSS and plugin styles
│   ├── sass/         # SASS source files (modular architecture)
│   ├── js/           # JavaScript files and plugins
│   ├── img/          # Images organized by category
│   ├── fonts/        # Web fonts and icon fonts
│   └── videos/       # Video assets
├── *.html            # Individual page templates
```

### SASS Architecture
The SASS files are organized in a modular structure:
- `default/`: Base variables and typography
- `common/`: Shared components (header, footer, preloader, etc.)
- `shortcode/`: Specific component styles (hero, services, team, etc.)

Main SASS entry point: `assets/sass/style.scss`

## Development Workflow

### CSS Development
- Edit SASS files in `assets/sass/`
- Compile SASS to CSS (no automated build process detected)
- Main stylesheet: `assets/css/style.css`

### JavaScript Development
- Main JavaScript file: `assets/js/main.js`
- External plugins in `assets/js/plugins/`
- Uses jQuery, GSAP, Swiper, and other libraries

### Static Assets
- Images organized by purpose in `assets/img/`
- Fonts and icons in `assets/fonts/`
- Videos in `assets/videos/`

## Key Features & Components

### Interactive Elements
- Dark/light mode toggle
- Smooth scrolling with Lenis
- GSAP animations throughout
- Swiper sliders for various sections
- Video modal popups
- Isotope filtering for portfolios
- Accordion components

### Page Templates
- `index.html`: Main landing page
- `about.html`, `services.html`, `portfolio.html`: Core pages
- `blog.html`, `team.html`, `contact.html`: Content pages
- `pricing.html`, `faq.html`: Service pages
- Specialized templates: `seo-agency.html`, `marketing-agency.html`, etc.

## Development Notes

### No Build Process
This project doesn't use modern build tools (no package.json, webpack, etc.). Changes are made directly to source files.

### SASS Compilation
SASS files need to be compiled manually or with a SASS compiler. The compiled CSS is committed to the repository.

### Browser Compatibility
Built with Bootstrap and uses modern JavaScript features. Test across different browsers for compatibility.

### Performance Considerations
- Multiple external libraries loaded
- Large image assets - optimize for web
- Consider lazy loading for images