const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

(async () => {
    console.log('🚀 Starting PDF generation...');

    // Launch browser
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'reddit-clone-documentation.html');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle'
    });

    console.log('📄 HTML loaded, generating PDF...');

    // Generate PDF
    await page.pdf({
        path: 'Reddit_Clone_Technical_Documentation.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm'
        },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
            <div style="font-size: 10px; text-align: center; width: 100%; color: #666; padding: 0 15mm;">
                <span>Reddit Clone Technical Documentation</span>
                <span style="float: right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
            </div>
        `
    });

    await browser.close();

    console.log('✅ PDF generated successfully: Reddit_Clone_Technical_Documentation.pdf');
})();
