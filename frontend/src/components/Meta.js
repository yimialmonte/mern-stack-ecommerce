import { Helmet } from 'react-helmet';
import React from 'react';

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={keywords}
      />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To PropShop",
  description: "We sell the best product for cheap",
  keywords: "Electronics, buy electronics, cheap electronics"
}
export default Meta;
