import { Layout as AntLayout } from 'antd';
import { FC } from 'react';

import {
  StyledContent,
} from './partials';
import { StyledHeader } from './partials/StyledHeader';

export const Layout: FC<any> = ({ children }) => {
  return (
    <AntLayout className="layout">
      <StyledHeader>React Repository Contributors</StyledHeader>
      <StyledContent>
        {children}
      </StyledContent>
    </AntLayout>
  );
};
