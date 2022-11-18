import React, {Component} from 'react';
import {Button, Progress} from 'antd';

class VideoPreview extends Component {
    state = {
        activeImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/YouTube_Diamond_Play_Button.png/1024px-YouTube_Diamond_Play_Button.png',
        imageData: this.props.imageData || [],
        durations: [],
        progress: 0,
        isPlaying: false,
        increaseBy: 1,
        totalDuration: 100,
    }

    componentDidMount(){
        this.incrementProgress();
        this.state.durations = this.props.imageData.map((image) => {
            return 4;
        });
        this.state.totalDuration = this.state.durations.reduce((p,c) => { return p+c; }, 0);
        this.state.increaseBy = 100/this.state.totalDuration;
    }

    componentDidUpdate() {}

    changeImage() {
        console.log('progress => ', this.state.progress);
        let passedDuration = 0;
        let activeIndex = 0;
        for (let index=0; index < this.state.imageData.length; index++) {
            passedDuration += this.state.durations[index];
            const passedPercentage = (passedDuration/this.state.totalDuration) * 100;
            console.log('passedPercentage', passedPercentage)
            if (this.state.progress <= passedPercentage) {
                activeIndex = index;
                break;
            }

        }
        console.log(activeIndex);
        this.setState({
            activeImage: this.state.imageData[activeIndex]
        });
    }


    incrementProgress() {
        console.log('start')
        setInterval(() => {
            if (!this.state.isPlaying) {
                return;
            }
            console.log('plus +1')
            this.setState({
                progress: this.state.progress + (this.state.increaseBy/20)
            });
            this.changeImage();
            if(this.state.progress >= 100) {
                this.setState({
                    isPlaying: false
                });
            }
        }, 50);
    }


    playPause() {
        console.log('playPause', this.state.isPlaying);
        this.setState({
            isPlaying: !this.state.isPlaying,
            progress: this.state.progress >= 100 ? 0 : this.state.progress
        });
    }

    render() {
        return (
            <>
                <div>
                    <img style={{ width: 450, height: 350 }} src={this.state.activeImage}></img>;
                </div>
                <div>
                    <Button
                        className=""
                        type= "primary"
                        shape="round"
                        icon="image"
                        onClick={() => {this.playPause()}}
                    >
                        { !this.state.isPlaying ? 'Play' : 'Pause' }
                    </Button>
                    <Progress style={{ width: 450, height: 300 }} percent={this.state.progress} format={percent => ``} />
                </div>
            </>
        )
    }
}


export default VideoPreview;
