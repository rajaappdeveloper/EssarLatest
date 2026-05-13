$pages = @(
    "construction-industry-fabrication.html",
    "process-industry-fabrication.html",
    "process-equipments.html",
    "pumps-blowers.html",
    "valves.html",
    "pipes-pipe-fittings.html",
    "clean-room-works.html",
    "food-beverage-industry-fabrication.html",
    "machined-components.html",
    "onsite-services.html",
    "electrical-mechanical-services.html",
    "construction-maintenance-services.html",
    "about-essar-engineering-pte-ltd.html"
)

$baseUrl = "https://essarengg.com.sg/"
$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"

foreach ($page in $pages) {
    Write-Host "Processing $page..."
    $remoteUrl = $baseUrl + $page
    
    try {
        $response = Invoke-WebRequest -Uri $remoteUrl -UserAgent $userAgent -UseBasicParsing
        $html = $response.Content
        
        # Extract content between </header> and <footer
        $pattern = "(?s)</header>.*?<!-- /\.*header.*?-->(.*?)<footer class=`"theme-footer-one`">"
        if ($html -match $pattern) {
            $extractedContent = $matches[1]
            
            # Find all images
            $imgPattern = "(?i)<img[^>]+src=`"([^`"]+)`""
            $images = [regex]::Matches($extractedContent, $imgPattern)
            
            foreach ($img in $images) {
                $imgSrc = $img.Groups[1].Value
                
                # Download image if it's a relative path and not already downloaded
                if ($imgSrc -notmatch "^http" -and $imgSrc -match "images/") {
                    $localImgPath = Join-Path "d:\Projects\Website\EssarNew" $imgSrc
                    $imgDir = Split-Path $localImgPath
                    
                    if (!(Test-Path $imgDir)) {
                        New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
                    }
                    
                    if (!(Test-Path $localImgPath)) {
                        $remoteImgUrl = $baseUrl + $imgSrc
                        Write-Host "  Downloading image: $remoteImgUrl"
                        try {
                            Invoke-WebRequest -Uri $remoteImgUrl -OutFile $localImgPath -UserAgent $userAgent -UseBasicParsing | Out-Null
                        } catch {
                            Write-Host "  Failed to download $remoteImgUrl"
                        }
                    }
                }
            }
            
            # Now replace the content in the local file
            $localFilePath = Join-Path "d:\Projects\Website\EssarNew" $page
            if (Test-Path $localFilePath) {
                $localHtml = [System.IO.File]::ReadAllText($localFilePath)
                
                $replacePattern = "(?s)<!-- Page Title -->.*?<!-- Footer -->"
                
                $newContent = "<!-- Cloned Content -->`n" + $extractedContent + "`n`n    <!-- Footer -->"
                $newLocalHtml = [System.Text.RegularExpressions.Regex]::Replace($localHtml, $replacePattern, $newContent)
                
                [System.IO.File]::WriteAllText($localFilePath, $newLocalHtml, [System.Text.Encoding]::UTF8)
                Write-Host "  Successfully updated $page"
            }
            
        } else {
            Write-Host "  Could not find header/footer boundaries in $page"
        }
        
    } catch {
        Write-Host "Failed to process $page"
    }
}
Write-Host "Done!"
