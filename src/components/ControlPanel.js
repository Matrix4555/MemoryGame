import React from 'react';
import { connect } from 'react-redux';
import { addSecond, resetCards } from '../redux/actions';
import '../style.css';

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        setInterval(() => {
            if(!this.props.pauseTimer)
                this.props.addSecond();
        }, 1000);
    }

    render() {
        return(
            <div className="control_panel">
                <div className="timer">{this.props.timer}</div>
                <button className="start_button" onClick={() => this.props.resetCards()}>Start New Game</button>
                <table border="1">
                    <caption>Results</caption>
                    <tr>
                        <th>Number</th>
                        <th>Time</th>
                    </tr>
                    {this.props.results.map((el, ind) => <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{el}</td>
                    </tr>)}
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timer: state.timer,
        pauseTimer: state.pauseTimer,
        results: state.results
    };
}

const mapDispatchToProps = {
    addSecond, resetCards
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
