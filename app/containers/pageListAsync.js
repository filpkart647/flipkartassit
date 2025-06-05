import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';
// Login Page
export const Layout = loadable(() => import('./Layout'), {
  fallback: <Loading />,
});
// Login Page
export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});
export const Dashboard = loadable(() => import('./Dashboard'), {
  fallback: <Loading />,
});
export const Navbar = loadable(() => import('../components/Navbar'), {
  fallback: <Loading />,
});
// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
