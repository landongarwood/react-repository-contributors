import { Button, Card, Divider, Image } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import apiService, { ContributorDetails } from '../services/apiService'

type ContributorDetailsPageParams = {
  login: string;
};

export const ContributorDetailsPage: FC = () => {
  const { login } = useParams<ContributorDetailsPageParams>();

  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [contributor, setContributor] = useState<ContributorDetails>()

  useEffect(() => {
    if (login) {
      apiService.getContributorDetails(login)
      .then((response) => {
        setContributor(response)
        setInitLoading(false)
      })
    }
  }, [login]);

  return (
    <Card title="Contributor Details" loading={initLoading} extra={<Link to='/'><Button icon={<ArrowLeftOutlined />}>Back</Button></Link>}>
      {contributor && (
        <div>
          <Image
            width={200}
            src={contributor.avatar_url}
          />
          <Divider />
          <strong>
            <a href={contributor.html_url} target="_blank" rel='noreferrer'>
              {contributor.login}
            </a>
          </strong>
          <Divider dashed />
          <strong>
            {contributor.email}
          </strong>
          <Divider dashed />
          <strong>
            {contributor.name}
          </strong>
          <Divider dashed />
          <p>
            {contributor.bio}
          </p>
        </div>
      )}
    </Card>
  );
};
