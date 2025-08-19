import React, { useEffect, useRef } from 'react';

const HubSpotContactForm = () => {
    const loaded = useRef(false);
    useEffect(() => {
        if(loaded.current) return;
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
                    formId: '76fd9f49-b315-4375-935d-33c8ff90bb3d',
                    target: '#hubspot-contact-form-container'
                });
            }
        };

        return () => {
            const formContainer = document.querySelector('#hubspot-contact-form-container');
            if (formContainer) {
                formContainer.innerHTML = '';
            }
        };
    }, []);

    return <div id="hubspot-contact-form-container"></div>;
};

export default HubSpotContactForm;