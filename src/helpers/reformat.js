import flatten from 'flat';

export function reformatColumns(items) {
	const flatList = items.map((item) => flatten(item, { maxDepth: 2 }));
		
	// convert columns
  const reformattedList = flatList.map((item) => ({
    ...item,
    // Put the hours in the right column
    [item['budgetHours.column']]: item['budgetHours.value'],
    total: item['budgetHours.value'],
  }));

	let concatObj = {};

  const itemsByFeature = reformattedList.reduce((features, item) => {
    features[item.feature] = [
      ...features[item.feature] || [],
      item,
    ];

    return features;
  }, {});

  console.log({ itemsByFeature, reformattedList });

	// combine on feature
	reformattedList.map((item) => {
    // Feature isn't already in the object
		if (typeof concatObj[item.feature] === 'undefined') {
			concatObj[item.feature] = item;
		} else {
      // Add to existing feature
			for (const property in item) {
				if(Array.isArray(item[property])) {
          concatObj[item.feature][property] = [
            ...concatObj[item.feature][property],
            ...item[property],
          ];
				} else if(typeof item[property] === 'number') {
          // Sum the numbers
					concatObj[item.feature][property] = concatObj[item.feature][property] + item[property] || item[property];
				} 
			}
		}
	});

	// convert concatObj from properties to array elements
	let concatList = [];
	for (const element in concatObj) {
		concatList = [...concatList, concatObj[element]];
	}

	return concatList;
}
