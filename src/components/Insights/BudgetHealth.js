import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class BudgetHealth extends Component {
    constructor() {
        super();

        this.state = {
            budgetTotal: 0,
            actualTotal: 0,
            progress: 0,
        };
    }

    calculateBudget(tickets) {
        let budgetLeft = 0;
        let budgetProperty = 'budgetHours';
        let actualTotal = 0;
        let actualProperty = 'actualHours';

        if (typeof tickets != 'undefined') {            
            actualTotal = tickets.reduce(function (a, b) {
                return (typeof b[actualProperty] != 'undefined') ? a + b[actualProperty] : a;
            }, 0);

            budgetLeft = tickets.reduce(function (a, b) {
                return (typeof b[budgetProperty] != 'undefined') ? a + b[budgetProperty] : a;
            }, 0) - actualTotal;
        }

        return { actualTotal, budgetLeft };

        //return Math.round((budgetTotal - actualTotal) * 100) / 100;
    }

    buildChartData(tickets) {
        const { actualTotal, budgetLeft } = this.calculateBudget(tickets);

        // const data = {
        //     labels: ['Actual Hours Entered', 'Budgeted Hours Left'],
        //     datasets: [
        //         {
        //             label: 'test',
        //             data: [actualTotal, budgetLeft],
        //             backgroundColor: [
        //                 '#e5e76c',
        //                 '#36A2EB',
        //             ],
        //         },
        //     ]
        // };

        const data = {
            labels: ['Discovery', 'Design', 'Development', 'Demo'],
            datasets: [
                {
                    label: 'Total Budget Remaining',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.1)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 3,
                    pointHitRadius: 10,
                    data: [95, 75, 5, -15]
                },
                {
                    label: 'Budget Remaining in Phase',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(251,202,4,0.4)',
                    borderColor: 'rgba(251,202,4,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.1,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(251,202,4,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(251,202,4,1)',
                    pointHoverBorderColor: 'rgba(251,202,4,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: [50, 9, -25, -45]
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
                    <h3 className="panel-title">Project Budget Health</h3>
                    <div>
                        <Line data={this.buildChartData(this.props.tickets)} />
                    </div>
                </div>
            </section>
        )
    }
};

export default BudgetHealth;
