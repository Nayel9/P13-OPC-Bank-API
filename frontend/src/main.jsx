import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import store from './store.jsx';
import App from './router'
import './main.css'

/**
 * Point d'entrée principal de l'application.
 * Monte le composant principal `App` dans le DOM avec le `Provider` de Redux.
 */
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)