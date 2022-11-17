import React from "react";
import { Form, Radio } from "antd";

import UrlModal from "../../../components/common/UrlModal";
import FileUpload from "../../../components/common/FileUpload";

export default {
  render(canvasRef, form, data) {
    const { getFieldDecorator } = form;
    if (!data) {
      return null;
    }
    const imageLoadType = data.imageLoadType || "file";
    return (
      <React.Fragment>
        <Form.Item label="Image Load Type" colon={false}>
          {getFieldDecorator("imageLoadType", {
            initialValue: imageLoadType,
          })(
            <Radio.Group size="small">
              <Radio.Button value="file">Upload</Radio.Button>
              <Radio.Button value="src">Image URL</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        {imageLoadType === "file" ? (
          <Form.Item label="File" colon={false}>
            {getFieldDecorator("file", {
              rules: [
                {
                  required: true,
                  message: "Please enter file.",
                },
              ],
              initialValue: data.file,
            })(<FileUpload accept="image/*" />)}
          </Form.Item>
        ) : (
          <Form.Item>
            {getFieldDecorator("src", {
              initialValue: data.src,
            })(<UrlModal form={form} />)}
          </Form.Item>
        )}
      </React.Fragment>
    );
  },
};
