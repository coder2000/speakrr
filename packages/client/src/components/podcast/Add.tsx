import React from 'react';
import { Button, Col, Form, Input, PageHeader, Row, Typography } from 'antd';

export function Add() {
  const { Title } = Typography;

  return (
    <>
      <PageHeader title="Speakrr" subTitle="Add Podcast" />
      <Row>
        <Col offset={8} span={8}>
          <Title>Add Podcast</Title>
        </Col>
      </Row>
      <Form>
        <Form.Item
          wrapperCol={{ span: 12, offset: 4 }}
          rules={[{ required: true }]}
          name="url"
        >
          <Input placeholder="Podcast URL" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 4, offset: 10 }}>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </>
  );
}
