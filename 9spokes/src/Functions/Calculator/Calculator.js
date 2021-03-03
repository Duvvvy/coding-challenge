export function filterByListOfCategories(data, categoryList){// Only returns records that are in the category list
    return data.filter(record => categoryList.includes(record.account_category));
}

export function filterByListOfAccountTypes(data, listOfAccountTypes){//Only return companies of given type/s in list.
    return data.filter(record => listOfAccountTypes.includes(record.account_type));
}

export function filterByListOfValueType(data, listOfValueTypes){
    return data.filter(record => listOfValueTypes.includes(record.value_type))
}

export function sumReduce(data){
    let reducer = (accumulator, record) => record.total_value + accumulator;
    return data.reduce(reducer, 0)
}