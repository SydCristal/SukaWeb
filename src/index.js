import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigurationProvider, SectionProvider, GuestsProvider, LoadingProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConfigurationProvider>
      <GuestsProvider>
        <SectionProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </SectionProvider>
      </GuestsProvider>
    </ConfigurationProvider>
  </React.StrictMode>
)
