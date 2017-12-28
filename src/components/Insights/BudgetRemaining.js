import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class BudgetRemaining extends Component {
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
            actualTotal = Math.round((tickets.reduce(function (a, b) {
                return (typeof b[actualProperty] != 'undefined') ? a + b[actualProperty] : a;
            }, 0)) * 100) / 100;

            budgetLeft = Math.round((tickets.reduce(function (a, b) {
                return (typeof b[budgetProperty] != 'undefined') ? a + b[budgetProperty] : a;
            }, 0) - actualTotal) * 100) / 100;

            budgetLeft = (budgetLeft < 0) ? 0 : budgetLeft;
        }

        return { actualTotal, budgetLeft };
    }

    buildChartData(tickets) {
        const { actualTotal, budgetLeft } = this.calculateBudget(tickets);

        const data = {
            labels: ['Actual Hours Entered', 'Budgeted Hours Left'],
            datasets: [
                {
                    label: 'test',
                    data: [actualTotal, budgetLeft],
                    backgroundColor: [
                        '#e5e76c',
                        '#36A2EB',
                    ],
                },
            ]
        };

        // let overBudget = {
        //     label: 'test',
        //     data: [20, 80],
        //     backgroundColor: [
        //         'red',
        //         '#fff',
        //     ],
        // }

        // data.datasets.push(overBudget);

        return data;
    }

    render() {
        return (
            <section className="panel panel-default">
                <div className="panel-body">
                    <h3 className="panel-title">Project Budget Remaining</h3>
                    <div>
                        <Doughnut data={this.buildChartData(this.props.tickets)} />
                    </div>
                </div>
            </section>
        )
    }
};

export default BudgetRemaining;
