import React, { useEffect } from 'react';
import { useQueryParams } from '@/contexts/QueryParamContext';

const HubSpotEmbed = () => {
  const { queryParams } = useQueryParams();
  const hubspotUrl = `https://meetings.hubspot.com/your-marketing-car/ymc-consultation?embed=true${queryParams.replace('?', '&')}`;

  useEffect(() => {
    const scriptId = 'hubspot-meetings-embed-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
  }, []);

  return (
    <div className="meetings-iframe-container" data-src={hubspotUrl} style={{ minHeight: '650px' }}></div>
  );
};

export default HubSpotEmbed;