export function filterByListOfCategories(data, categoryList){// Only returns records that are in the category list
    return data.filter(record => categoryList.includes(record.account_category));
}

export function filterByListOfAccountTypes(data, listOfAccountTypes){//Only return companies of given type/s in list.
    return data.filter(company => listOfAccountTypes.includes(company.account_type));
}

export function filterByListOfValueType(data, listOfValueTypes){
    return data.filter(company => listOfValueTypes.includes(company.value_type))
}

export function sumReduce(data){
    
}