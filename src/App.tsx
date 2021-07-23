import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home'
import { Welcome } from './pages/Welcome'


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
        </Switch>
        <Toaster />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
