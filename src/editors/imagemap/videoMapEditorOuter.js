import React, {Component} from 'react';
import VideoMapEditor from './videoMapEditor';
import {Tabs} from 'antd';

class VideoMapEditorOuter extends Component{
    state ={
        activeKey: "1",
		items: [{
			key: "1",
			label: "First scene",
		},
		{
			key: "2",
			label: "Second scene",
		}]
    }
    onTabChange = key => {
		this.setState({
			activeKey: key,
		});
	};
	addNewItemTab = item => {

		const newActiveKey = `newTab${this.state.items.length + 1}`;
		const newPanes = [...this.state.items];
		newPanes.push({
			label: 'New Tab',
			children: 'Content of new Tab',
			key: newActiveKey,
		});
		this.setState({
			items: newPanes,
			activeKey: newActiveKey
		});
	};
	removeItemTab = targetKey => {

		let newActiveKey = this.state.activeKey;
		let lastIndex = -1;
		const items  = this.state.items;
		items.forEach((item, i) => {
		if (item.key === targetKey) {
			lastIndex = i - 1;
		}
		});
		const newPanes = items.filter((item) => item.key !== targetKey);
		if (newPanes.length && newActiveKey === targetKey) {
		if (lastIndex >= 0) {
			newActiveKey = newPanes[lastIndex].key;
		} else {
			newActiveKey = newPanes[0].key;
		}
		}
		this.setState({
			items: newPanes
		});
		this.setState({
			activeKey: newActiveKey
		});
	};
	onEdit = (targetKey, action) => {
		if (action === 'add') {
		  this.addNewItemTab();
		} else {
		  this.removeItemTab(targetKey);
		}
	  };

    render(){

        const mappedItems = this.state.items.map(i=>{
			return (
			<Tabs.TabPane tab={i.label} key={i.key}>
			  {/* <Content title={title} content={content} loading={loading} className="" /> */}
              <VideoMapEditor/>
              <div>tests tasd a</div>
			</Tabs.TabPane>)
		})
		return  <Tabs
			type="editable-card"
			onChange={this.onTabChange}
			activeKey={this.state.activeKey}
			onEdit={this.onEdit}
			>
				{mappedItems}
		</Tabs>
    }



}
export default VideoMapEditorOuter;