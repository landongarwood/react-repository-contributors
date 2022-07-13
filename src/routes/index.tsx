import { memo } from 'react';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from '../components/layout';
import { ContributorsPage } from '../pages/Contributors';

export const Routes: FC = memo(() => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={ContributorsPage} />
      </Switch>
    </Layout>
  );
});
