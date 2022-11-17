import React, {Component} from 'react';
import { Progress } from 'antd';

class VideoEditor extends Component {
    state = {
        activeImage: 'https://cdn.sharechat.com/69b0a54_1668337005503_sc.jpeg',
        imageData: [
            'https://source.unsplash.com/1600x900/?nature,animal',
            'https://source.unsplash.com/1600x900/?nature,animal',
            'https://cdn.sharechat.com/69b0a54_1668337005503_sc.jpeg',
            'https://source.unsplash.com/1600x900/?nature,animal',
        ],
        durations: [
            4,
            2,
            4,
            6
        ],
        progress: 0,
        isPlaying: false,
        increaseBy: 1,
        totalDuration: 100,
    }

    componentDidMount(){
        this.incrementProgress();
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
            progress: this.state.progress === 100 ? 0 : this.state.progress
        });
    }

    render() {
        return (
            <>
                <div>
                    <img style={{ width: 300, height: 300 }} src={this.state.activeImage}></img>;
                </div>
                <div>
                    <button onClick={(c) => { this.playPause() }}>play/pause</button>
                    <Progress style={{ width: 300, height: 300 }} percent={this.state.progress} format={percent => ``} />
                </div>
            </>
        )
    }
}


export default VideoEditor;
