$files = Get-ChildItem -Path . -Filter *.html -Recurse -File
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content `
        -replace '>\s*Services\s*</a>', '><i class="fas fa-tools me-2"></i>Services</a>' `
        -replace 'href="onsite-services.html">Onsite Services</a>', 'href="onsite-services.html"><i class="fas fa-hard-hat me-2"></i>Onsite Services</a>' `
        -replace 'href="electrical-mechanical-services.html">M &amp; E Projects</a>', 'href="electrical-mechanical-services.html"><i class="fas fa-bolt me-2"></i>M &amp; E Projects</a>' `
        -replace 'href="electrical-mechanical-services.html">M & E Projects</a>', 'href="electrical-mechanical-services.html"><i class="fas fa-bolt me-2"></i>M & E Projects</a>' `
        -replace 'href="architectural-works.html">Architectural Works</a>', 'href="architectural-works.html"><i class="fas fa-pencil-ruler me-2"></i>Architectural Works</a>' `
        -replace 'href="civil-structural-works.html">Civil &amp; Structural Works</a>', 'href="civil-structural-works.html"><i class="fas fa-road me-2"></i>Civil &amp; Structural Works</a>' `
        -replace 'href="civil-structural-works.html">Civil & Structural Works</a>', 'href="civil-structural-works.html"><i class="fas fa-road me-2"></i>Civil & Structural Works</a>' `
        -replace 'href="mechanical-electrical-works.html">Mechanical &amp; Electrical Works</a>', 'href="mechanical-electrical-works.html"><i class="fas fa-plug me-2"></i>Mechanical &amp; Electrical Works</a>' `
        -replace 'href="mechanical-electrical-works.html">Mechanical & Electrical Works</a>', 'href="mechanical-electrical-works.html"><i class="fas fa-plug me-2"></i>Mechanical & Electrical Works</a>' `
        -replace 'href="construction-maintenance-services.html">Maintenance Services</a>', 'href="construction-maintenance-services.html"><i class="fas fa-wrench me-2"></i>Maintenance Services</a>' `
        -replace 'href="additional-services.html">Additional Services</a>', 'href="additional-services.html"><i class="fas fa-plus-circle me-2"></i>Additional Services</a>' `
        -replace 'href="about-essar-engineering-pte-ltd.html">Profile</a>', 'href="about-essar-engineering-pte-ltd.html"><i class="fas fa-id-card me-2"></i>Profile</a>' `
        -replace 'href="contact-us.html">Contact</a>', 'href="contact-us.html"><i class="fas fa-envelope me-2"></i>Contact</a>'
        
    if ($content -cne $newContent) {
        Set-Content $file.FullName -Value $newContent
        Write-Host "Updated $($file.Name)"
    }
}
