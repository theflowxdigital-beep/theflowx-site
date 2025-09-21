#!/usr/bin/env python3

from PIL import Image, ImageDraw, ImageFont
import os

def create_portfolio_image(width, height, title, subtitle, bg_color, text_color, filename):
    """Create a professional portfolio image with title and subtitle"""
    
    # Create image with gradient background
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a system font, fallback to default
    try:
        title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Calculate text positions (centered)
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_height = subtitle_bbox[3] - subtitle_bbox[1]
    
    # Position text in center
    title_x = (width - title_width) // 2
    title_y = (height - title_height - subtitle_height - 20) // 2
    
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + title_height + 20
    
    # Draw text
    draw.text((title_x, title_y), title, fill=text_color, font=title_font)
    draw.text((subtitle_x, subtitle_y), subtitle, fill=text_color, font=subtitle_font)
    
    # Add some design elements (simple border)
    draw.rectangle([(20, 20), (width-20, height-20)], outline=text_color, width=3)
    
    # Save image
    img.save(filename)
    print(f"Created: {filename}")

# Portfolio images based on FlowX services
portfolio_items = [
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-1.png",
        "size": (556, 551),
        "title": "SEO Strategy",
        "subtitle": "Organic Growth Campaign",
        "bg_color": (45, 55, 72),  # Dark blue-gray
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-2.png",
        "size": (631, 581),
        "title": "Pitch Deck",
        "subtitle": "Series A Presentation",
        "bg_color": (26, 54, 93),  # Deep blue
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-3.png",
        "size": (521, 651),
        "title": "Website CRO",
        "subtitle": "Conversion Optimization",
        "bg_color": (49, 46, 129),  # Purple
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-4.png",
        "size": (706, 631),
        "title": "Ad Campaigns", 
        "subtitle": "Performance Marketing",
        "bg_color": (17, 24, 39),  # Very dark
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-5.png",
        "size": (1321, 551),
        "title": "Financial Model",
        "subtitle": "3-Statement Model & Projections",
        "bg_color": (31, 41, 55),  # Dark gray
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-6.png",
        "size": (591, 471),
        "title": "Market Research",
        "subtitle": "Go-to-Market Strategy",
        "bg_color": (55, 65, 81),  # Medium gray
        "text_color": (255, 255, 255)
    },
    {
        "filename": "/Users/sunithkumar/Documents/theFlowX-site/assets/img/portfolio/portfolio-top-img-7.png",
        "size": (601, 631),
        "title": "Brand Strategy",
        "subtitle": "Digital Transformation",
        "bg_color": (75, 85, 99),  # Light gray
        "text_color": (255, 255, 255)
    }
]

# Create all portfolio images
for item in portfolio_items:
    create_portfolio_image(
        item["size"][0], 
        item["size"][1],
        item["title"],
        item["subtitle"],
        item["bg_color"],
        item["text_color"],
        item["filename"]
    )

print("\n✅ All portfolio images created!")
print("These replace the grey placeholder images with relevant FlowX service representations.")