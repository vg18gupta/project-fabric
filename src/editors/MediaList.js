import { Card, List } from 'antd';
import React, {Component} from 'react';
import Canvas from '../canvas/Canvas';

class MediaList extends Component {
    state= {
        creativeData: []
    }
    componentDidMount(){
        const url = 'https://apis.staging.sharechat.com/self-serve-service/v1/external/selfServe/asset/temp/get'
        fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:'userId1'})
          }).then((response) => response.json())
          .then((data) => {console.log(data); this.setState({creativeData: data})});
    }
    render(){
        return <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={this.state.creativeData}
        renderItem={(item, i) => (
          <List.Item>
            <Card title={i + "asd"}>
            <Canvas
							ref={i => {
								this.canvasRef = i;
							}}
                            loadFromObject={item.creativeData? item.creativeData[0]: null}
							className="rde-canvas"
							keyEvent={{
								transaction: true,
							}}
							canvasOption={{
								selectionColor: 'rgba(8, 151, 156, 0.3)',
							}}
						/>
            </Card>
          </List.Item>
        )}
      />
    }
}
export default MediaList;