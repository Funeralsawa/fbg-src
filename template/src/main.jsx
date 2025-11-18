import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import 'fbg-gen-root/theme.css';
import './css/index.css'
import "./css/typeWriter.css"
import "./css/base.css"
import "./css/mobile.css"
import "./css/iosCompatible.css"
import SiteWrapper from './components/site.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <div className="container">
        <SiteWrapper />
      </div>
    </Provider>
  </BrowserRouter>
)
