"""Trim transparent margins and export generated cutouts to lightweight WebP."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'artifacts' / 'food-assets.json').read_text(encoding='utf-8'))
destination = root / 'public' / 'ingredients'
destination.mkdir(parents=True, exist_ok=True)
for name, source in manifest.items():
    target = destination / f'{name}.webp'
    if target.exists() and target.stat().st_size > 0:
        continue
    image = Image.open(source).convert('RGBA')
    bounds = image.getchannel('A').point(lambda alpha: 255 if alpha > 16 else 0).getbbox()
    if not bounds:
        raise ValueError(f'Empty food asset: {name}')
    image = image.crop(bounds)
    image.thumbnail((768, 768) if name == 'mozzarella' else (512, 512), Image.Resampling.LANCZOS)
    image.save(target, 'WEBP', quality=91, method=0)
    print(f'{name}: {image.width}x{image.height}, {target.stat().st_size // 1024} KiB')
