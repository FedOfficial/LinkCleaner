// referral.js - FINAL version using history.replaceState (no reload)
(function () {
    const REF_CODE = '3208430';

    // STEP 1: Modify current page URL silently (no reload)
    try {
        const current = new URL(window.location.href);
        if (current.hostname.includes('cnfans.com') && current.searchParams.get('ref') !== REF_CODE) {
            current.searchParams.set('ref', REF_CODE);
            history.replaceState(null, '', current.toString()); // modifies URL in address bar
        }
    } catch (e) {
        console.error('[REF ERROR - PAGE]', e);
    }

    // STEP 2: Modify all CNFans links
    try {
        const links = document.querySelectorAll("a[href*='cnfans.com']");
        links.forEach(link => {
            try {
                const url = new URL(link.href);
                url.searchParams.set('ref', REF_CODE);
                link.href = url.toString();
            } catch (e) {
                // Skip malformed links
            }
        });
    } catch (e) {
        console.error('[REF ERROR - LINKS]', e);
    }
})();
