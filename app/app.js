import './i18n';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login, NotFound, Layout } from './containers/pageListAsync';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { Chat } from './components';
import PrivateRoute from './PrivateRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Chat />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: '8px' }}
        toastOptions={{ duration: 3000, position: 'top-center' }}
      />
    </Provider>
  );
}

export default App;
