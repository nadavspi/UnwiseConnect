import * as Table from 'reactabular-table';
import React from 'react';
import { compose } from 'redux';

export default class BudgetTable extends React.Component {

	render() {
		return ( 
				<div>
					<h3>Item/Task(ID): {exampleItem[0].summary}</h3>
					<ul> 
						<li>Summary: {exampleItem[0].summary}</li>
						<li>Phase: {exampleItem[0].phase}</li>
						<li>Feature: {exampleItem[0].feature}</li>
						<h3>Budget Hours</h3>
						<ul>
							<li>Phase: {exampleItem[0].budgetHours.column}</li>
							<li>Hours: {exampleItem[0].budgetHours.value}</li>
						</ul>
						<h3>Descriptions</h3>
						<ul>
							<li>
								Workplan: {exampleItem[0].descriptions.workplan}
							</li>
							<li>
								Budget: {exampleItem[0].descriptions.budget}
							</li>
							<li>
								Assumptions: {exampleItem[0].descriptions.assumptions}
							</li>  
							<li>
								Exclusions: {exampleItem[0].descriptions.exclusions}
							</li>
						</ul>
						<li>Tags: {exampleItem[0].tags}</li>
					</ul>
				</div> 
		)
	}
}

let	exampleItem = [
    {
        summary: "Klevu discovery & calls",
        phase: "dev/Klevu",
        feature: "Klevu",
        budgetHours: { 
          column: "Discovery",
          value: 6,
        },
        descriptions: {
          workplan: [
            "Time for communication with Klevu.",
          ],
          budget: [],
          assumptions: [
            "Accounts for one onboarding call."
          ],
          exclusions: [],
        },
        tags: "klevu"
    },
    {
        summary: "Install Klevu extension",
        phase: "dev/Klevu",
        feature: "Klevu",
        budgetHours: { 
          column: 'Dev',
          value: 4,
        },
        descriptions: {
          workplan: [
              "Install Klevu extension using composer.",
          ],
          assumptions: [
            "Install extension once using code provided by Klevu."
          ],
        },
        tags: "klevu"
    },
    {
        summary: "Configure Klevu flyout",
        phase: "dev/Klevu",
        feature: "Klevu",
        budgetHours: { 
          column: 'Dev',
          value: 4,
        },
        descriptions: {
          workplan: [
              "Use Klevu control panel to choose between autocomplete and faceted.",
          ],
          assumptions: [
            "Use one of out of box options provided by Klevu (autocomplete or faceted) without customization."
          ],
        },
        tags: "klevu"
    },
];