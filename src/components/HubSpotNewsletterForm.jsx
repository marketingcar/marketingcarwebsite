import React, { useEffect, useRef } from 'react';

const HubSpotNewsletterForm = () => {
    const loaded = useRef(false);
    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region: 'na1',
                    portalId: '47574927',
                    formId: '37006731-b953-4e1d-ab82-fd647161af72',
                    target: '#hubspot-newsletter-form-container'
                });
            }
        };
        
        return () => {
             const formContainer = document.querySelector('#hubspot-newsletter-form-container');
            if (formContainer) {
                formContainer.innerHTML = '';
            }
        };
    }, []);

    return <div id="hubspot-newsletter-form-container"></div>;
};

export default HubSpotNewsletterForm;