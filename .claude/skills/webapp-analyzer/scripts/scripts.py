"""
Webapp Analyzer Scripts Loader

Loads all JavaScript extraction scripts as named constants.
These scripts are designed to be injected into a browser via Chrome DevTools
MCP's evaluate_script tool.

Usage:
    from scripts import PAGE_DISCOVERY, CONTENT_EXTRACTION, ...
"""

from pathlib import Path

_DIR = Path(__file__).parent

PAGE_DISCOVERY = (_DIR / "page_discovery.js").read_text()
NAV_EXTRACTION = (_DIR / "nav_extraction.js").read_text()
CONTENT_EXTRACTION = (_DIR / "content_extraction.js").read_text()
COMPONENT_DETECTION = (_DIR / "component_detection.js").read_text()
DESIGN_TOKENS = (_DIR / "design_tokens.js").read_text()
API_SURFACE = (_DIR / "api_surface.js").read_text()

ALL_SCRIPTS = {
    "page_discovery": PAGE_DISCOVERY,
    "nav_extraction": NAV_EXTRACTION,
    "content_extraction": CONTENT_EXTRACTION,
    "component_detection": COMPONENT_DETECTION,
    "design_tokens": DESIGN_TOKENS,
    "api_surface": API_SURFACE,
}
