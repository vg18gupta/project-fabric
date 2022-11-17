import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Radio } from "antd";

import { InputHtml } from ".";
import FileUpload from "./FileUpload";

class SVGModal extends Component {
  static propTypes = {
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    visible: PropTypes.bool.isRequired,
  };

  state = {
    loadType: "file",
    visible: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  handleChangeSvgType = (e) => {
    this.props.form.resetFields();
    this.setState({
      loadType: e.target.value,
    });
  };

  handleOk = () => {
    const { form, onOk } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (values.svg instanceof Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(values.svg);
        reader.onload = () => {
          onOk({ ...values, svg: reader.result });
        };
      } else {
        onOk(values);
      }
    });
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
      return;
    }
    this.setState({
      visible: false,
    });
  };

  render() {
    const { form } = this.props;
    const { loadType, visible } = this.state;
    return (
      <Modal
        title="Add SVG"
        closable
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        visible={visible}
      >
        <Form colon={false}>
          <Form.Item label="Type">
            {form.getFieldDecorator("loadType", {
              initialValue: loadType,
            })(
              <Radio.Group onChange={this.handleChangeSvgType}>
                <Radio.Button value="file">File</Radio.Button>
                <Radio.Button value="svg">SVG</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label={loadType === "svg" ? "SVG" : "File"}>
            {form.getFieldDecorator("svg", {
              rules: [
                {
                  required: true,
                  message:
                    "Please enter {{arg}}." +
                    {
                      arg: loadType === "svg" ? "SVG" : "File",
                    },
                },
              ],
            })(
              loadType === "svg" ? <InputHtml /> : <FileUpload accept=".svg" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(SVGModal);
