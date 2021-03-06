import { Avatar, Button, Card, List, Skeleton } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContributorsPerPage } from '../constants';
import apiService, { RepositoryContributor } from '../services/apiService'

const LoadMoreWrapper = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;

export const ContributorsPage: FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [contributors, setContributors] = useState<RepositoryContributor[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    apiService.getRepositoryContributors(1)
      .then((response) => {
        setContributors(response)
        setInitLoading(false)
      })
  }, []);

  const increasePage = () => {
    setPage((prev) => prev + 1)
  }

  const onLoadMore = async () => {
    setLoading(true);

    setContributors(contributors.concat([...new Array(ContributorsPerPage)].map(() => ({
      loading: true,
      login: "",
      avatar_url: "",
      url: "",
      html_url: "",
      contributions: 0,
    }))))

    setContributors(contributors.concat(await apiService.getRepositoryContributors(page + 1)));
    increasePage();

    setLoading(false)
    window.dispatchEvent(new Event('resize'));
  };

  const loadMore =
    !initLoading && !loading ? (
      <LoadMoreWrapper>
        <Button onClick={onLoadMore}>load more</Button>
      </LoadMoreWrapper>
    ) : null;

  return (
    <Card title="Contributors">
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={contributors}
        renderItem={contributor => (
          <List.Item
            actions={[
              (
                <Link to={`/contributors/${contributor.login}`}>
                  <Button type="primary">View</Button>
                </Link>
              )]}
          >
            <Skeleton avatar title={false} loading={contributor.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={contributor.avatar_url} />}
                title={<a href={contributor.url}>{contributor.login}</a>}
                description={`Total contributions: ${contributor.contributions}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  );
};
