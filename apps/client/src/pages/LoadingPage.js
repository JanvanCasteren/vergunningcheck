import React from "react";
import { Helmet } from "react-helmet";

import Layout from "../components/Layouts/BaseLayout";
import Loading from "../components/Loading";

const LoadingPage = () => (
  <Layout>
    <Helmet>
      <title>Laden... - Amsterdam Vergunningcheck</title>
    </Helmet>
    <Loading />
  </Layout>
);

export default LoadingPage;
