import os
import re

# Read template
with open('process-equipments.html', 'r', encoding='utf-8') as f:
    template = f.read()

# Sidebar replacement
new_sidebar = """
                            <h5 class="sidebar-title">Our Solutions</h5>
                            <ul class="sidebar-nav">
                                <li><a href="#"><i class="fas fa-building me-2"></i>Builder Works</a></li>
                                <li><a href="#"><i class="fas fa-cogs me-2"></i>Mechanical and Electral Works</a></li>
                                <li><a href="#"><i class="fas fa-star me-2"></i>Specialized Works</a></li>
                                <li><a href="about-essar-engineering-pte-ltd.html"><i class="fas fa-id-card me-2"></i>Profile</a></li>
                                <li><a href="contact-us.html"><i class="fas fa-envelope me-2"></i>Contact</a></li>
                            </ul>
"""

# Replace sidebar
sidebar_regex = re.compile(r'<h5 class="sidebar-title">Our Solutions</h5>.*?</ul>', re.DOTALL)
template = sidebar_regex.sub(new_sidebar.strip(), template)

pages = {
    # BUILDER WORKS - ARCHITECTURAL
    'builder-arch-aluminium-cladding.html': {
        'title': 'Aluminium Cladding & Facade Systems',
        'content': """Essar Engineering delivers comprehensive architectural works specializing in the design, fabrication, supply, and installation of high-quality aluminium cladding and facade systems for commercial, institutional, hospitality, retail, and mixed-use developments.
Our expertise encompasses a wide range of facade solutions, including aluminium composite panel (ACP) cladding, custom aluminium feature facades, perforated screens, decorative metal panels, sun-shading elements, louvres, and architectural envelope systems. We work closely with architects, developers, and consultants to transform design concepts into durable, aesthetically striking, and technically compliant facade solutions.
Leveraging advanced fabrication capabilities and experienced project teams, Essar Engineering ensures precision manufacturing, efficient installation, and superior workmanship throughout every stage of project delivery.
Our facade systems are engineered to provide weather protection, long-term durability, low maintenance requirements, and enhanced building performance while achieving the intended architectural vision.
From bespoke architectural features to large-scale building envelope installations, Essar Engineering is committed to delivering innovative facade solutions that combine functionality, sustainability, and visual excellence."""
    },
    'builder-arch-roof-installation.html': {
        'title': 'Roof Installation & Repair',
        'content': """Essar Engineering specializes in the installation, repair, replacement, and maintenance of roofing systems for commercial, industrial, institutional, and residential projects. Our capabilities include metal roofing, composite panel roofing, polycarbonate roofing, waterproofing systems, roof leak rectification, and preventive maintenance works.
Combining engineering expertise with quality workmanship, we deliver durable, weather-resistant, and high-performance roofing solutions that protect building assets, enhance operational reliability, and ensure long-term performance throughout the roof lifecycle."""
    },
    'builder-arch-waterproofing.html': {
        'title': 'Waterproofing & Leak Rectification',
        'content': """Essar Engineering provides waterproofing and leak rectification works for roofs, facades, basements, wet areas, podium decks, planter boxes, and water features. Our services include leak investigation, crack injection, joint sealing, membrane installation, waterproof coatings, and remedial waterproofing solutions. Through expert diagnosis and quality workmanship, we deliver durable and cost-effective solutions that prevent water ingress, protect building assets, and ensure long-term structural integrity and performance."""
    },
    'builder-arch-architectural-fit-outs.html': {
        'title': 'Architectural Fit-Outs & Addition & Alteration (A&A) Works',
        'content': """Essar Engineering delivers integrated architectural fit-out and A&A solutions, combining construction expertise, specialist finishes, thematic elements, custom fabrication, and building upgrades to create functional, engaging, and visually distinctive environments across commercial, recreational, institutional, and public spaces.
Our services include interior renovations, space reconfiguration, partition systems, ceilings, flooring, wall finishes, facade enhancements, refurbishment, and building upgrading works.
Essar Engineering also caters Integrated Building Maintenance & Asset Enhancement Services by providing end-to-end maintenance, repair, upgrading, and refurbishment solutions that preserve building performance."""
    },
    
    # BUILDER WORKS - CIVIL
    'builder-civil-demolition.html': {
        'title': 'Demolition & Dismantling Works',
        'content': """Essar Engineering provides safe, systematic, and controlled demolition and dismantling services for buildings, industrial facilities, structural elements, and existing infrastructure. Our experienced team utilizes advanced equipment, proven methodologies, and stringent safety procedures to execute demolition works efficiently while minimizing disruption to surrounding operations and the environment. From selective dismantling to complete structural demolition, we ensure precise execution, proper waste management, and full compliance with regulatory requirements."""
    },
    'builder-civil-steel-fabrication.html': {
        'title': 'Steel Fabrication, Erection & Commissioning',
        'content': """With extensive expertise in structural and architectural steelworks, Essar Engineering delivers end-to-end steel fabrication, erection, and commissioning solutions for commercial, industrial, institutional, and infrastructure projects.
Our capabilities cover detailed engineering, fabrication, welding, surface treatment, installation, and final commissioning. Leveraging skilled craftsmen, advanced fabrication technologies, and rigorous quality control processes, we ensure durable, precise, and high-performance steel structures that meet the most demanding project specifications."""
    },
    'builder-civil-general.html': {
        'title': 'General Civil Works',
        'content': """Essar Engineering offers comprehensive civil construction services encompassing earthworks, foundations, drainage systems, pavements, utility infrastructure, and building-related civil works. We combine technical expertise, efficient project management, and strict quality assurance to deliver cost-effective and sustainable solutions. Our commitment to safety, workmanship, and timely delivery enables us to successfully execute projects across commercial, industrial, institutional, and public sectors."""
    },
    'builder-civil-rc-works.html': {
        'title': 'RC Works and Structural Strengthening',
        'content': """We specialize in reinforced concrete (RC) construction and structural strengthening solutions designed to enhance the integrity, durability, and load-bearing capacity of existing structures. Our services include RC framing, slab and beam construction, jacketing works, carbon fiber reinforcement, structural retrofitting, and rehabilitation. Through detailed assessment, engineering expertise, and innovative strengthening techniques, we extend the service life of structures while ensuring compliance with current structural and safety standards."""
    },
    'builder-civil-concrete-repair.html': {
        'title': 'Concrete Repair and Grouting Works',
        'content': """Essar Engineering provides specialized concrete repair and grouting services to restore, protect, and enhance the performance of deteriorated structures. Our solutions address cracks, spalling concrete, voids, water ingress, honeycombing, and structural defects through advanced repair methodologies, pressure grouting, epoxy injection, and protective treatments. By utilizing high-quality materials and proven repair systems, we deliver long-lasting results that improve structural integrity, durability, and operational reliability."""
    },
    
    # ME WORKS
    'me-tank-pressure-vessel.html': {
        'title': 'Tank and Pressure Vessel Installation Works',
        'content': """Essar Engineering delivers comprehensive engineering solutions specializing in the design, fabrication, supply, installation, testing, and commissioning of tanks and pressure vessels. Our expertise covers a wide range of applications, including fire protection systems, power plants, potable water storage, HDB rooftop water tanks, boiler systems, and chemical storage facilities.
Our scope of work includes:
- Installation of storage tanks and pressure vessels.
- Positioning, alignment, and leveling of equipment.
- Fabrication and installation of supporting structures and foundations.
- Piping connection and integration with existing systems.
- Welding works in accordance with applicable industry standards.
- Inspection, non-destructive testing (NDT), and quality assurance of welded joints.
- Hydrostatic, pneumatic, and pressure testing as required.
- Commissioning, performance testing, and system handover.
Compliance with all relevant safety, environmental, and regulatory requirements.
With a commitment to quality, safety, and reliability, Essar Engineering ensures that every tank and pressure vessel installation is completed efficiently and in accordance with project specifications and industry standards."""
    },
    'me-fire-fighting.html': {
        'title': 'Fire Fighting Pumping System Works',
        'content': """Essar Engineering provides comprehensive engineering services for the design, supply, installation, testing, commissioning, repair, and upgrading of fire fighting pumping systems for commercial, industrial, residential, and infrastructure projects.
- Installation of fire pumps, jockey pumps, and diesel engine-driven pumps.
- Supply and installation of pump skids, control panels, and associated equipment.
- Fabrication and installation of pump room piping and supports.
- Installation of suction, discharge, bypass, and test line pipework.
- Electrical power supply, control wiring, and system integration.
- Alignment, calibration, and functional testing of pumps and controls.
- Flow testing, pressure testing, and performance verification.
- Repair, replacement, and upgrading of existing fire pump systems.
- Testing and commissioning in accordance with project specifications.
- Compliance with SCDF, PUB, and relevant Singapore standards and regulations.
- Preparation of as-built documentation, operation manuals, and handover reports.
Essar Engineering is committed to delivering reliable and efficient fire fighting pumping systems that ensure optimal fire protection performance, regulatory compliance, and long-term operational safety."""
    },
    'me-air-compressor.html': {
        'title': 'Air Compressor System and Compressed Air Piping Works',
        'content': """Essar Engineering provides comprehensive engineering services for the design, supply, installation, testing, commissioning, maintenance, and upgrading of air compressor systems and compressed air distribution networks for industrial, commercial, and manufacturing facilities.
- Supply and installation of air compressors, air receivers, air dryers, and filtration systems.
- Installation of compressed air piping systems, valves, fittings, and accessories.
- Fabrication and installation of pipe supports, brackets, and equipment foundations.
- Layout planning and integration with existing compressed air systems.
- Installation of pressure regulation, monitoring, and control equipment.
- Welding, inspection, and testing of compressed air pipelines.
- Leak testing, pressure testing, and system performance verification.
- Commissioning and optimization of compressed air systems.
- Repair, replacement, and upgrading of existing compressor equipment and piping.
- Preventive maintenance and troubleshooting services.
- Preparation of as-built drawings, operation manuals, and handover documentation.
- Compliance with relevant safety standards, codes, and regulatory requirements.
Essar Engineering delivers reliable and energy-efficient compressed air systems designed to ensure optimal performance, operational reliability, and long-term service life."""
    },
    
    # SPECIALIZED WORKS
    'spec-titanium-vessels.html': {
        'title': 'Titanium Vessels & Clean Room Works',
        'content': """Essar Engineering specializes in the supply, fabrication, installation, and commissioning of titanium vessels, exotic alloy equipment, and clean room fabrication works for the pharmaceutical, semiconductor, chemical, biotechnology, marine, and high-purity process industries.
- Design, fabrication, and supply of titanium tanks, vessels, and pressure equipment.
- Fabrication of equipment using exotic materials such as Titanium, Hastelloy, Inconel, Monel, Duplex Stainless Steel, Super Duplex Stainless Steel, and other corrosion-resistant alloys.
- Manufacturing of process vessels, reactors, storage tanks, heat exchangers, and custom-engineered equipment.
- Precision welding using TIG, orbital welding, and specialized welding procedures for exotic materials.
- Fabrication and installation of high-purity process piping systems.
- Clean room fabrication, assembly, and installation works.
- Surface finishing, passivation, pickling, and polishing to customer specifications.
- Non-destructive testing (NDT), quality control, and material traceability documentation.
- Pressure testing, leak testing, and performance verification.
- On-site installation, commissioning, and system integration.
- Compliance with ASME, AWS, ISO, and other applicable industry standards and client specifications.
- Preparation of manufacturing records, quality dossiers, and handover documentation.
Essar Engineering is committed to delivering high-quality fabrication solutions with strict quality control, precision workmanship, and compliance with the demanding requirements of high-purity and corrosive service applications."""
    },
    'spec-water-features.html': {
        'title': 'Water Features',
        'content': """Essar Engineering provides comprehensive services for the design, supply, fabrication, installation, testing, and commissioning of water features for commercial, residential, hospitality, and public infrastructure projects.
- Design, fabrication, and installation of decorative water features and fountain systems.
- Supply and installation of water pumps, filtration systems, nozzles, and control equipment.
- Fabrication and installation of stainless steel, mild steel, and custom-designed water feature structures.
- Installation of water circulation, filtration, and treatment systems.
- Piping works, valve installation, and integration with existing services.
- Electrical and control system installation for automated operation.
- Waterproofing coordination and integration with civil and architectural works.
- Fabrication and installation of water tanks, balancing tanks, and pump chambers.
- Testing, commissioning, and performance verification of water feature systems.
- Repair, refurbishment, and upgrading of existing water features and fountain installations.
- Routine maintenance and troubleshooting services.
- Preparation of as-built drawings, operation manuals, and handover documentation.
Compliance with relevant safety, environmental, and regulatory requirements.
Essar Engineering delivers innovative and reliable water feature solutions, combining quality workmanship, engineering expertise, and attention to detail to create visually appealing and efficient water installations."""
    }
}

train_content = """<div class="mt-5 pt-4 border-top">
    <h3 class="fw-bold text-primary mb-4">Key Project: Train Relocation and Refurbishment</h3>
    <div class="row mb-4">
        <div class="col-md-6 mb-3 mb-md-0">
            <img src="images/placeholder-train.jpg" alt="Train Relocation" class="img-fluid rounded shadow-sm w-100" style="min-height: 250px; object-fit: cover; background-color: #eee;">
        </div>
        <div class="col-md-6">
            <p><strong>Essar Engineering successfully carried out the preservation and relocation of the C751B Train Consist 3320 from Tuas Depot to ITE College West. The project involved complex logistics, heavy lifting operations, structural modifications, and interior refurbishment works to transform the train cabin into a functional educational facility.</strong></p>
        </div>
    </div>
    <ul class="mb-4">
        <li>Transportation of train cabins from Tuas Depot to ITE College West.</li>
        <li>Heavy lifting and positioning using mobile cranes and specialized lifting equipment.</li>
        <li>Structural alteration and addition works to accommodate site requirements.</li>
        <li>Interior renovation and refurbishment works.</li>
        <li>Site coordination and logistics management.</li>
        <li>Installation and alignment of train cabins at the designated location.</li>
        <li>Fabrication and modification of supporting structures.</li>
        <li>Mechanical and electrical integration works.</li>
        <li>Testing, inspection, and commissioning.</li>
        <li>Project handover in compliance with safety and quality standards.</li>
    </ul>
    <h5 class="fw-bold mt-4">Key Highlights:</h5>
    <ul>
        <li>Successful transportation and installation of multiple train cabins.</li>
        <li>Execution of complex lifting operations within a confined environment.</li>
        <li>Completion of alteration and interior works to meet educational and exhibition requirements.</li>
        <li>Delivered safely with zero major incidents and in accordance with project specifications.</li>
    </ul>
    <p class="mt-3 text-muted">This project demonstrates Essar Engineering's capabilities in heavy lifting, transportation, structural modification, fabrication, installation, and turnkey engineering solutions for specialized infrastructure projects.</p>
</div>"""

def generate_html_content(raw_text, title):
    lines = raw_text.split('\\n')
    html = f'<h2 class="border-start border-primary border-4 ps-3 mb-4">{title}</h2>'
    
    # Image layout logic
    first_para = ""
    rest_lines = []
    
    # Find first non-empty line that isn't a bullet point
    for i, line in enumerate(lines):
        if line.strip() and not line.strip().startswith('-'):
            first_para = line
            rest_lines = lines[i+1:]
            break
            
    if not first_para:
        rest_lines = lines

    # Add image placeholder + first paragraph
    html += f'''
    <div class="row mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
            <!-- Add your image here -->
            <img src="images/placeholder-{title.replace(" ", "-").lower()}.jpg" alt="{title}" class="img-fluid rounded shadow w-100" style="min-height: 250px; object-fit: cover; background-color: #eee; border: 2px dashed #ccc; padding: 2px;">
            <p class="text-center text-muted small mt-2"><i>(Placeholder for Image)</i></p>
        </div>
        <div class="col-lg-6">
            <p class="lead">{first_para}</p>
        </div>
    </div>
    '''
    
    # Process remaining lines
    in_ul = False
    for line in rest_lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith('- '):
            if not in_ul:
                html += '<ul class="mb-4 text-muted lh-lg">\\n'
                in_ul = True
            html += f'    <li><i class="fas fa-check-circle text-primary me-2"></i>{line[2:]}</li>\\n'
        else:
            if in_ul:
                html += '</ul>\\n'
                in_ul = False
            html += f'<p class="text-muted lh-lg">{line}</p>\\n'
            
    if in_ul:
        html += '</ul>\\n'
        
    return html

for filename, data in pages.items():
    page_html = template
    
    # Replace title tags
    page_html = re.sub(r'<title>.*?</title>', f'<title>{data["title"]} | Essar Engineering Pte Ltd</title>', page_html)
    
    # Replace H1 in banner
    page_html = re.sub(r'<h1 class="display-4 text-white">.*?</h1>', f'<h1 class="display-4 text-white">{data["title"]}</h1>', page_html)
    
    # Generate content HTML
    content_html = generate_html_content(data['content'], data['title'])
    
    # Add train content to spec pages
    if 'spec-' in filename:
        content_html += "\\n" + train_content
    
    # Replace content div
    # Note: process-equipments.html has: <div class="service-content">...</div>
    content_regex = re.compile(r'<div class="service-content">.*?</div>\s*</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
    
    new_content_block = f"""<div class="service-content">
{content_html}
                        </div>
                    </div>
                </div>
            </div>
        </section>"""
    
    page_html = content_regex.sub(new_content_block, page_html)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(page_html)
    
    print(f"Created {filename}")
