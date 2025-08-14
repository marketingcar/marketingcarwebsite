import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaMarkup = ({ schema }) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SchemaMarkup;