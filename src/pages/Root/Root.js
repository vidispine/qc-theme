import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { AuthProvider } from '@vidispine/vdt-react';
import { QueryClientProvider } from 'react-query';
import { ConfigurationProvider, DialogProvider, PresetProvider } from '../../context';
import { LOGIN_EXPIRES_SECONDS, APP_BASENAME } from '../../const';
import Search from '../Search';
import Login from '../Login';
import NotFound from '../NotFound';
import Review from '../Review';
import Upload from '../Upload';
import Header from './Header';
import queryClient from '../../queryClient';

const styles = ({ mixins, spacing }) => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    paddingTop: `calc(${mixins.toolbar.minHeight}px + ${spacing(2)})`,
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
});

function Root({ classes }) {
  const [loginError, setLoginError] = React.useState();
  const handleLoginError = ({ message }) => {
    setLoginError(message);
    setTimeout(() => setLoginError(), 5000);
  };
  return (
    <AuthProvider
      cookieOptions={{
        maxAge: LOGIN_EXPIRES_SECONDS,
        path: APP_BASENAME,
      }}
      onError={handleLoginError}
      LoginComponent={Login}
      LoginProps={{ error: loginError }}
    >
      <QueryClientProvider client={queryClient}>
        <PresetProvider>
          <ConfigurationProvider>
            <DialogProvider>
              <Header />
              <div className={classes.container}>
                <Switch>
                  <Route exact path="/search/:itemId">
                    <Review />
                  </Route>
                  <Route exact path="/search/">
                    <Search />
                  </Route>
                  <Route exact path="/upload/">
                    <Upload />
                  </Route>
                  <Redirect exact from="/" push to="/search/" />
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </DialogProvider>
          </ConfigurationProvider>
        </PresetProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default withStyles(styles)(Root);
