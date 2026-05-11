import React, { Suspense } from 'react';
import Layout from './components/Layout.jsx';
import Router from './router/Router.jsx';
import { AddressProvider } from './contextValues.jsx';
import UtmHandler from './app/components/utmcomponent.jsx';
import AnalyticsProvider from './app/components/AnalyticsProvider.jsx';
import VancouverHeartbeatTracker from './app/components/VancouverHeartbeatTracker.jsx';

export default function App() {
  return (
    <AddressProvider>
      <Layout>
        <Suspense fallback={null}>
          <UtmHandler />
          <AnalyticsProvider />
          <VancouverHeartbeatTracker />
        </Suspense>
        <Router />
      </Layout>
    </AddressProvider>
  );
}
