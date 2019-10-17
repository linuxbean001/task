import React, { Component } from 'react';

class AddUser extends Component {

    state = {
        title: null,
        description: null,
        isEditing: false,
        activityList: [],
        currentId: ''
    }

    componentDidMount() {
        this.getActivity();
    }

    getActivity() {
        if (localStorage.getItem('activity')) {
            this.setState({
                activityList: JSON.parse(localStorage.getItem('activity'))
            })
        }
    }

    startTime() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        let activity = [];
        const activityVo = {
            id: Math.random(),
            title: this.refs.title.value,
            duration: '',
            description: this.refs.description.value,
            start: time,
            endTime: ''
        }
        this.setState({
            currentId: activityVo.id
        })
        activity.push(activityVo)
        localStorage.setItem('activity', JSON.stringify(activity))
        this.getActivity();
    }

    durationCalculation(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], 0);
        var endDate = new Date(0, 0, 0, end[0], end[1], 0);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes
    }

    endTime() {
        const activity = JSON.parse(localStorage.getItem('activity'))
        const updateActivity = []
        activity.map(value => {
            if (value.id == this.state.currentId) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                const duration = this.durationCalculation(value.start, time);
                const activityVo = {
                    id: value.id,
                    title: value.title,
                    duration: duration,
                    description: value.description,
                    start: value.start,
                    endTime: time
                }
                updateActivity.push(activityVo)
            }
            else {
                updateActivity.push(value)
            }
        })
        localStorage.setItem('activity', JSON.stringify(updateActivity))
        this.getActivity();
    }

    render() {

        return (
            <div className="row">
                <div className="input-field col s4">
                    <input name="title" autoComplete="off" placeholder="title" required type="text" ref="title" />
                </div>
                <div className="input-field col s2">
                    <input name="description" autoComplete="off" type="text" placeholder="description" ref="description" />
                </div>
                <div className="input-field col s2">
                    <button value="Start" className="btn green" onClick={() => this.startTime()}>Start</button>
                </div>
                <div className="input-field col s2">
                    <button value="Start" className="btn red" onClick={() => this.endTime()}>End</button>
                </div>

                <table className="striped">
                    <thead>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    {this.state.activityList ? this.state.activityList.map(value => (
                        <thead>
                            <tr>
                                <th>
                                    <th>{value.start}</th>
                                </th>
                                <th>
                                    {value.endTime}
                                </th>
                                <th>{value.duration}</th>
                                <th>{value.description}</th>
                            </tr>
                        </thead>
                    )) : ''}
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default AddUser;