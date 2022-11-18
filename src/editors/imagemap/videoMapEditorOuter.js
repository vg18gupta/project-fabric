import React, {Component} from 'react';
import VideoMapEditor from './videoMapEditor';
import {Button, Tabs, Modal} from 'antd';

class VideoMapEditorOuter extends Component{
    state ={
        activeKey: "1",
        isModalOpen: false,
        videoEditorCanvases: {},
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
    onPreviewClicked = ()=>{
        this.setState({
            isModalOpen: true
        })
        //Pull data for each canvas from state and create image 
    }
    passCanvasToParent = (id,data)=>{
        //Set canvas data in state
        let videoEditorCanvases = this.state.videoEditorCanvases;
        videoEditorCanvases[id]= data;
        this.setState({
            videoEditorCanvases
        })
        console.log("this", this.state.videoEditorCanvases);
    }
   showModal = () => {
        this.setState({
            isModalOpen: true
        })
      };
    
    handleOk = () => {
        this.setState({
            isModalOpen: false
        })
      };
    
    handleCancel = () => {
        this.setState({
            isModalOpen: false
        })
      };

    render(){
        const mappedImageSrc = Object.keys(this.state.videoEditorCanvases).map((i)=>{
            if(this.state.videoEditorCanvases[i] && this.state.videoEditorCanvases[i].handler){
                return <img  src = {this.state.videoEditorCanvases[i].handler.saveCanvasToDataURL()}/>
            }
            else{
                return <div>nothing</div>
            }
            
        })
        const mappedItems = this.state.items.map(i=>{
			return (
			<Tabs.TabPane tab={i.label} key={i.key}>
			  {/* <Content title={title} content={content} loading={loading} className="" /> */}
              <VideoMapEditor videoEditorId = {i.key + "_videoEditor"} passCanvasToParent={this.passCanvasToParent}/>
              
			</Tabs.TabPane>)
		})
		return <div>
             <Button onClick={()=>this.onPreviewClicked()} type="primary" >Preview</Button>
         <Tabs
			type="editable-card"
			onChange={this.onTabChange}
			activeKey={this.state.activeKey}
			onEdit={this.onEdit}
			>
				{mappedItems}
		</Tabs>
       
        <Modal title="Basic Modal" open={this.state.isModalOpen} visible={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}>
        {mappedImageSrc}
        </Modal>
        </div>
    }



}
export default VideoMapEditorOuter;