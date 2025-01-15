import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import store from './store.jsx';
import App from './router'
import './main.css'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
