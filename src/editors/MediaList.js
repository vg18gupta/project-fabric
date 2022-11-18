import { Card, List, Button } from "antd";
import React, { Component } from "react";
import Canvas from "../canvas/Canvas";

class MediaList extends Component {
  state = {
    creativeData: [],
    activePane: 1,
  };
  componentDidMount() {
    let userId = "userId1";
    if (this.props.template) {
      userId = "templates";
    }
    const url =
      "https://apis.staging.sharechat.com/self-serve-service/v1/external/selfServe/asset/temp/get";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ creativeData: data });
      });
  }

  render() {
    return (
      <List
        grid={{
          gutter: 48,
          column: 2,
        }}
        dataSource={this.state.creativeData}
        renderItem={(item, i) => (
          <List.Item>
            <Button
              onClick={() => {
                if (item.creativeData) {
                  this.props.tabChangeOnEdit(1);
                  this.props.onEditInMain(item.creativeData[0]);
                }
              }}
              type="primary"
              size="large"
            >
              Edit
            </Button>
            <Card style={{ height: 300, margin: 16 }} title={i + "asd"}>
              <Canvas
                ref={(i) => {
                  this.canvasRef = i;
                }}
                height="200px"
                loadFromObject={item.creativeData ? item.creativeData[0] : null}
                className="rde-canvas"
                responsive="false"
                keyEvent={{
                  transaction: true,
                }}
                zoomEnabled="false"
                editable="false"
                canvasOption={{
                  selectionColor: "rgba(8, 151, 156, 0.3)",
                }}
              />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
export default MediaList;
