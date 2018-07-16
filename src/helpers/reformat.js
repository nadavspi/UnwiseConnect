import flatten from 'flat';

export function reformatColumns(items) {
	const flatList = items.map((item) => flatten(item, { maxDepth: 2 }));
		
	const reformattedList = rotateOnTeam(flatList);
	const concatObj = concatOnProperties(reformattedList);
	const concatList = convertToList(concatObj);

	return concatList;
}

function rotateOnTeam(list) {
	// convert columns
  const rotatedList = list.map((item) => ({
    ...item,
    // Put the hours in the right column
    [item['budgetHours.column']]: parseInt(item['budgetHours.value']),
   }));

  return rotatedList;
}

function concatOnProperties(list) {
	let concatObj = {};

	// combine on feature
	list.map((item) => {
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
		return item;
	});
	return concatObj;
}

// convert concatObj from properties to array elements
export function convertToList(object) {
	let list = [];

	for (const element in object) {
		if(object.hasOwnProperty(element)) {
			list = [...list, object[element]];
		}
	}

	return list;
}
