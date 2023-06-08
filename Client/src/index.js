import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './components/Context/AuthContext/AuthContext';
import { AccountContextProvider } from './components/Context/AccountContext/AccountContext';
import { TransactionContextProvider } from './components/Context/TransactionContext/TransactionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <AccountContextProvider>
      <TransactionContextProvider>
        <App /> 
      </TransactionContextProvider>
    </AccountContextProvider>
    </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
