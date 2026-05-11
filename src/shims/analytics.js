// @vercel/analytics shim — Vercel is gone; render nothing.
import React from 'react';
export function Analytics() { return null; }
export function track(_event, _props) {}
export default Analytics;
