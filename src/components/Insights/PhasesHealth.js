import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

class PhasesHealth extends Component {
    constructor() {
        super();

        this.state = {
            budgetTotal: 0,
            actualTotal: 0,
            progress: 0,
        };
    }

    calculateBudget(tickets) {
        return 0;
    }

    buildChartData(tickets) {
        // const data = {
        //     labels: ['Discovery', 'Project Management', 'Design', 'Development', 'Demo'],
        //     datasets: [
        //         {
        //             label: 'Kravet',
        //             backgroundColor: 'rgba(179,181,198,0.2)',
        //             borderColor: 'rgba(179,181,198,1)',
        //             pointBackgroundColor: 'rgba(179,181,198,1)',
        //             pointBorderColor: '#fff',
        //             pointHoverBackgroundColor: '#fff',
        //             pointHoverBorderColor: 'rgba(179,181,198,1)',
        //             data: [65, 59, 90, 81, 56]
        //         },
        //     ]
        // };

        const data = {
            labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprin 4', 'Sprint 5'],
            datasets: [
                {
                    label: 'Frontend',
                    backgroundColor: 'rgba(197,222,245,0.2)',
                    borderColor: '#c5def5',
                    pointBackgroundColor: '#c5def5',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#c5def5',
                    data: [65, 59, 90, 81, 56]
                },
                {
                    label: 'Backend',
                    backgroundColor: 'rgba(251,202,4,0.2)',
                    borderColor: '#fbca04',
                    pointBackgroundColor: '#fbca04',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fbca04',
                    data: [45, 34, 20, 11, 76]
                },
            ]
        };

        // let newData = {
        //     label: 'Papyrus',
        //     backgroundColor: 'rgba(255,99,132,0.2)',
        //     borderColor: 'rgba(255,99,132,1)',
        //     pointBackgroundColor: 'rgba(255,99,132,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(255,99,132,1)',
        //     data: [28, 48, 40, 19, 110]
        // }

        // data.datasets.push(newData);

        return data;
    }

    render() {
        return (
            <section className="panel panel-default">
                <div className="panel-body">
                    <h3 className="panel-title">Hours Breakdown - QA</h3>
                    <div>
                        <Radar data={this.buildChartData(this.props.tickets)} />
                    </div>
                </div>
            </section>
        )
    }
};

export default PhasesHealth;
