import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './index.module.scss';
import App from './LoginPage';

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
  ReactDOM.render(
    <BrowserRouter>
      <App className={`${styles.body} ${styles.code}`} />
    </BrowserRouter>,
    root
  );
});
