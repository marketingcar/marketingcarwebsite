import React, { useEffect, useRef } from 'react';

const HubSpotNewsletterForm = () => {
    const containerRef = useRef(null);
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current || !containerRef.current) return;
        
        const scriptId = 'hubspot-form-script';
        let script = document.getElementById(scriptId);

        const loadForm = () => {
            if (window.hbspt && containerRef.current) {
                window.hbspt.forms.create({
                    region: 'na1',
                    portalId: '47574927',
                    formId: '37006731-b953-4e1d-ab82-fd647161af72',
                    target: `#${containerRef.current.id}`
                });
                loaded.current = true;
            }
        };

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://js.hsforms.net/forms/embed/v2.js';
            script.defer = true;
            document.body.appendChild(script);
            script.onload = loadForm;
        } else {
            loadForm();
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            loaded.current = false;
        };
    }, []);

    return <div id="hubspot-newsletter-form-container" ref={containerRef} className="min-h-[200px] w-full"></div>;
};

export default HubSpotNewsletterForm;