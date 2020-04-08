import React, { useState } from 'react';
import { Button, Col, Form, Input, PageHeader, Row, Typography } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_PODCAST = gql`
  mutation addPodcast($podcast: PodcastInput!) {
    addPodcast(podcastData: $podcast) {
      id
    }
  }
`;

interface Podcast {
  id: number;
}

interface PodcastInput {
  podcastUrl: string;
}

export function Add() {
  const [url, setUrl] = useState<string>();

  const { Title } = Typography;

  const [savePodcast, { error, data }] = useMutation<
    { addPodcast: Podcast },
    { podcast: PodcastInput }
  >(ADD_PODCAST, { variables: { podcast: { podcastUrl: url! } } });

  const onFinish = () => {
    savePodcast();
  };

  return (
    <>
      <PageHeader title="Speakrr" subTitle="Add Podcast" />
      <Row>
        <Col offset={8} span={8}>
          <Title>Add Podcast</Title>
        </Col>
      </Row>
      <Form onFinish={onFinish}>
        <Form.Item
          wrapperCol={{ span: 12, offset: 4 }}
          rules={[{ required: true }]}
          name="url"
        >
          <Input
            placeholder="Podcast URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </>
  );
}
