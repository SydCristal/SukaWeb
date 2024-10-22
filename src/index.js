import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigurationProvider, SectionProvider, GuestsProvider, LoadingProvider, UsersProvider, TimerModalProvider } from './contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConfigurationProvider>
      <GuestsProvider>
        <SectionProvider>
          <UsersProvider>
            <LoadingProvider>
              <TimerModalProvider>
                <App />
              </TimerModalProvider>
            </LoadingProvider>
          </UsersProvider>
        </SectionProvider>
      </GuestsProvider>
    </ConfigurationProvider>
  </React.StrictMode>
)
