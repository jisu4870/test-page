/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import MonthlyRecommendations from './pages/MonthlyRecommendations';
import PackageDetail from './pages/PackageDetail';
import Magazine from './pages/Magazine';
import MagazineDetail from './pages/MagazineDetail';
import CustomerCenter from './pages/CustomerCenter';
import Admin from './pages/Admin';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="monthly" element={<MonthlyRecommendations />} />
            <Route path="packages" element={<Navigate to="/" replace />} />
            <Route path="package/:id" element={<PackageDetail />} />
            <Route path="magazine" element={<Magazine />} />
            <Route path="magazine/:id" element={<MagazineDetail />} />
            <Route path="customer-center" element={<CustomerCenter />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
