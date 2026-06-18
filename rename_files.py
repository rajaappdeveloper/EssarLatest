import os
import glob

renames = {
    'builder-arch-aluminium-cladding.html': 'aluminium-cladding.html',
    'builder-arch-roof-installation.html': 'roof-installation.html',
    'builder-arch-waterproofing.html': 'waterproofing.html',
    'builder-arch-architectural-fit-outs.html': 'architectural-fit-outs.html',
    'builder-civil-demolition.html': 'demolition.html',
    'builder-civil-steel-fabrication.html': 'steel-fabrication.html',
    'builder-civil-general.html': 'general-civil-works.html',
    'builder-civil-rc-works.html': 'rc-works.html',
    'builder-civil-concrete-repair.html': 'concrete-repair.html',
    'me-tank-pressure-vessel.html': 'tank-pressure-vessels.html',
    'me-fire-fighting.html': 'fire-fighting.html',
    'me-air-compressor.html': 'air-compressors.html',
    'spec-titanium-vessels.html': 'titanium-vessels.html',
    'spec-water-features.html': 'water-features.html'
}

# 1. Rename files on disk
for old_name, new_name in renames.items():
    if os.path.exists(old_name):
        os.rename(old_name, new_name)
        print(f"Renamed {old_name} to {new_name}")

# 2. Update all HTML files with new links
for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old_name, new_name in renames.items():
        if f'"{old_name}"' in content or f"'{old_name}'" in content:
            content = content.replace(f'"{old_name}"', f'"{new_name}"')
            content = content.replace(f"'{old_name}'", f"'{new_name}'")
            modified = True
            
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in {file}")
