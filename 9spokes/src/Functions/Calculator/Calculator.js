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

export function convertToCurrency(number){
    return number.toLocaleString("en-AU", { 
        style: "currency", 
        currency: "USD"//Task requested USD format rather than AUD format
      })
}

export function convertToPercentage(number){
    let option = {style: 'percent'};
    var formatter = new Intl.NumberFormat("en-US", option);
    return formatter.format(number);
}

export function getJsonReport(data){
    let revenue = 0
    let expenses = 0
    let grossProfitMargin = 0
    let netProfitMargin = 0
    let workingCapitalRatio = 0
    return {
        "revenue": convertToCurrency(revenue),
        "expenses": convertToCurrency(expenses),
        "grossProfitMargin": convertToPercentage(grossProfitMargin),
        "netProfitMargin": convertToPercentage(netProfitMargin),
        "workingCapitalRatio": convertToPercentage(workingCapitalRatio)
    };
}