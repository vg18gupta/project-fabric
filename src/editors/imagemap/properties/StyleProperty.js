import React from "react";
import { Form, Slider, Select, InputNumber, Col, Row } from "antd";

import ColorPicker from "../../../components/common/ColorPicker";

export default {
  render(canvasRef, form, data) {
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Form.Item label="Fill Color" colon={false}>
          {getFieldDecorator("fill", {
            initialValue: data.fill || "rgba(0, 0, 0, 1)",
          })(<ColorPicker />)}
        </Form.Item>
        <Form.Item label="Opacity" colon={false}>
          {getFieldDecorator("opacity", {
            rules: [
              {
                type: "number",
                min: 0,
                max: 1,
              },
            ],
            initialValue: data.opacity || 1,
          })(<Slider min={0} max={1} step={0.1} />)}
        </Form.Item>
        <Form.Item label="Stroke Color" colon={false}>
          {getFieldDecorator("stroke", {
            initialValue: data.stroke || "rgba(255, 255, 255, 0)",
          })(<ColorPicker />)}
        </Form.Item>
        <Form.Item label="Stroke Width" colon={false}>
          {getFieldDecorator("strokeWidth", {
            initialValue: data.strokeWidth || 1,
          })(
            <Select showSearch style={{ width: "100%" }}>
              {Array.from({ length: 12 }, (v, k) => {
                const value = k + 1;
                return (
                  <Select.Option key={value} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        {data.type === "rect" ? (
          <Row gutter={8}>
            <Col md={24} lg={12}>
              <Form.Item label="Radius x" colon={false}>
                {getFieldDecorator("rx", {
                  initialValue: data.rx || 0,
                })(<InputNumber min={0} />)}
              </Form.Item>
            </Col>
            <Col md={24} lg={12}>
              <Form.Item label="Radius y" colon={false}>
                {getFieldDecorator("ry", {
                  initialValue: data.ry || 0,
                })(<InputNumber min={0} />)}
              </Form.Item>
            </Col>
          </Row>
        ) : null}
      </React.Fragment>
    );
  },
};
