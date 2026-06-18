import os
import re
import glob

# The new navigation block
new_nav = """        <!-- Navigation Menu -->
        <nav class="navbar navbar-expand-lg navbar-dark material-nav">

            <div class="container">
                <!-- Mobile Logo -->
                <a class="navbar-brand d-lg-none" href="index.html">
                    <img src="images/logo/essar-engg-logo.png" alt="Essar Engineering"
                        style="height: 40px; background: white; padding: 5px; border-radius: 4px;">
                </a>

                <!-- Mobile Theme Toggle & Brochure Link (Always Outside Collapse) -->
                <div class="d-flex align-items-center ms-auto me-3 d-lg-none">
                    <a href="https://essarengg.com.sg/essar-brochure.pdf" target="_blank" class="text-white fs-4 me-2"
                        title="Download Brochure"><i class="fas fa-file-pdf"></i></a>
                    <button class="btn btn-sm btn-outline-secondary rounded-circle theme-toggle-btn"
                        style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-color: rgba(255,255,255,0.4); color: white;"
                        title="Toggle Dark/Light Mode"><i class="fas fa-moon"></i></button>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-uppercase fw-medium">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html"><i class="fas fa-home me-2"></i>Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="builderDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    class="fas fa-building me-2"></i>Builder Works</a>
                            <ul class="dropdown-menu material-dropdown" aria-labelledby="builderDropdown">
                                <li class="dropdown-submenu dropdown">
                                    <a class="dropdown-item dropdown-toggle-submenu" href="#"><i class="fas fa-pencil-ruler me-2"></i><strong>Architectural Works</strong></a>
                                    <ul class="dropdown-menu material-dropdown submenu-menu">
                                        <li><a class="dropdown-item" href="builder-arch-aluminium-cladding.html">Aluminium Cladding & Facade Systems</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-arch-roof-installation.html">Roof Installation & Repair</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-arch-waterproofing.html">Waterproofing & Leak Rectification</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-arch-architectural-fit-outs.html">Architectural Fit-Outs & Addition & Alteration</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li class="dropdown-submenu dropdown">
                                    <a class="dropdown-item dropdown-toggle-submenu" href="#"><i class="fas fa-hard-hat me-2"></i><strong>Civil & Structural Works</strong></a>
                                    <ul class="dropdown-menu material-dropdown submenu-menu">
                                        <li><a class="dropdown-item" href="builder-civil-demolition.html">Demolition & Dismantling Works</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-civil-steel-fabrication.html">Steel Fabrication, Erection & Commissioning</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-civil-general.html">General Civil Works</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-civil-rc-works.html">RC Works & Structural Strengthening</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="builder-civil-concrete-repair.html">Concrete Repair & Grouting Works</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="meDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    class="fas fa-cogs me-2"></i>Mechanical and Electral Works</a>
                            <ul class="dropdown-menu material-dropdown" aria-labelledby="meDropdown">
                                <li><a class="dropdown-item" href="me-tank-pressure-vessel.html"><i class="fas fa-flask me-2"></i>Tank & Pressure Vessel Installation</a></li>
                                <li><a class="dropdown-item" href="me-fire-fighting.html"><i class="fas fa-fire-extinguisher me-2"></i>Fire Fighting Pumping System</a></li>
                                <li><a class="dropdown-item" href="me-air-compressor.html"><i class="fas fa-wind me-2"></i>Air Compressor & Piping Works</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="specialDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                    class="fas fa-star me-2"></i>Specialized Works</a>
                            <ul class="dropdown-menu material-dropdown" aria-labelledby="specialDropdown">
                                <li><a class="dropdown-item" href="spec-titanium-vessels.html"><i class="fas fa-vial me-2"></i>Titanium Vessels & Clean Room Works</a></li>
                                <li><a class="dropdown-item" href="spec-water-features.html"><i class="fas fa-water me-2"></i>Water Features</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about-essar-engineering-pte-ltd.html"><i
                                    class="fas fa-id-card me-2"></i>Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contact-us.html"><i class="fas fa-envelope me-2"></i>Contact</a>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center d-none d-lg-flex">
                        <a href="https://essarengg.com.sg/essar-brochure.pdf" target="_blank" class="text-white fs-4"
                            title="Download Brochure"><i class="fas fa-file-pdf"></i></a>
                        <button class="btn btn-sm btn-outline-secondary ms-2 rounded-circle theme-toggle-btn"
                            style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-color: rgba(255,255,255,0.4); color: white;"
                            title="Toggle Dark/Light Mode"><i class="fas fa-moon"></i></button>
                    </div>
                </div>
            </div>

        </nav>"""

nav_regex = re.compile(r'<!-- Navigation Menu -->.*?s</nav>', re.DOTALL)
# wait, nav_regex needs to match </nav> exactly. The previous menu ended with </nav>
nav_regex = re.compile(r'<!-- Navigation Menu -->\s*<nav class="navbar navbar-expand-lg navbar-dark material-nav">.*?</nav>', re.DOTALL)

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<!-- Navigation Menu -->' in content:
        new_content = nav_regex.sub(new_nav, content)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"Skipped {file}")
