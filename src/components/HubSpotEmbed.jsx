import React, { useEffect } from 'react';
import { useQueryParams } from '@/contexts/QueryParamContext';

const HubSpotEmbed = () => {
  const { queryParams } = useQueryParams();
  const hubspotUrl = `https://meetings.hubspot.com/your-marketing-car/ymc-consultation?embed=true${queryParams.replace('?', '&')}`;

  useEffect(() => {
    const scriptId = 'hubspot-meetings-embed-script';
    if (document.getElementById(scriptId)) {
      // Script already loaded, might need to re-initialize if HubSpot's script allows it
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Optional: Clean up the script when the component unmounts,
      // but it's often better to leave it for SPA navigation.
    };
  }, []);

  return (
    <div className="meetings-iframe-container" data-src={hubspotUrl} style={{ minHeight: '650px' }}></div>
  );
};

export default HubSpotEmbed;