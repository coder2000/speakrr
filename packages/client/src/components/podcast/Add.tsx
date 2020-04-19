import React, { useState } from 'react';
import { Button, Col, Form, Input, PageHeader, Row, Typography } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ADD_PODCAST = gql`
  mutation createOneQueue($input: CreateOneQueueInput!) {
    createOneQueue(input: $input) {
      id
    }
  }
`;

interface Queue {
  id: number;
  url: string;
  completed: boolean;
}

interface CreateOneQueueInput {
  queue: Queue;
}

export function Add() {
  const [url, setUrl] = useState<string>();

  const { Title } = Typography;

  const [savePodcast, { error, data }] = useMutation<
    { createOneQueue: Queue },
    { input: CreateOneQueueInput }
  >(ADD_PODCAST, {
    variables: {
      input: { queue: { id: 0, url: url!, completed: false } },
    },
  });

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
      {error ? <p>{error.message}</p> : null}
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
