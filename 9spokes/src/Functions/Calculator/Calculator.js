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
        currency: "AUD"
      })
}

export function convertToPercentage(number){
    let option = {style: 'percent'};
    var formatter = new Intl.NumberFormat("en-US", option);
    return formatter.format(number);
}

function getRevenue(data){
    return sumReduce(filterByListOfCategories(data, ['revenue']))
}

function getExpenses(data){
    return sumReduce(filterByListOfCategories(data, ['expense']))
}

function getGrossProfitMargin(data, revenue) {
    let allSales = filterByListOfAccountTypes(data, ['sales'])
    let debitSales = filterByListOfValueType(allSales, ['debit'])
    let grossProfit = sumReduce(debitSales);
    return grossProfit / revenue;
}

function getNetProfitMargin(revenue, expenses) {
    return (revenue - expenses) / revenue;
}

function getCapital(data, validAccountTypes, validAccountCategories, minuendValueType, subtrahendValueType){//minuend means to be subtracted from, subtrahend means to subtract
    let allRecordsInCategories = filterByListOfCategories(data, validAccountCategories)
    let filteredRecordsByAccountTypes = filterByListOfAccountTypes(allRecordsInCategories, validAccountTypes)
    let minuend = sumReduce(filterByListOfValueType(filteredRecordsByAccountTypes, minuendValueType));
    let subtrahend = sumReduce(filterByListOfValueType(filteredRecordsByAccountTypes, subtrahendValueType));
    return minuend - subtrahend;
}

function getWorkingCapitalRatio(data) {
    let assets = getCapital(data, ['current', 'bank', 'current_accounts_receivable'], ['assets'], ['credit'], ['debit'])
    let liabilities = getCapital(data, ['current', 'current_accounts_payable'], ['liability'], ['debit'], ['credit'])
    return assets / liabilities;
}

export function getJsonReport(data){
    let revenue = getRevenue(data)
    let expenses = getExpenses(data)
    let grossProfitMargin = getGrossProfitMargin(data, revenue)
    let netProfitMargin = getNetProfitMargin(revenue, expenses)
    let workingCapitalRatio = getWorkingCapitalRatio(data)
    return {
        "revenue": convertToCurrency(revenue),
        "expenses": convertToCurrency(expenses),
        "grossProfitMargin": convertToPercentage(grossProfitMargin),
        "netProfitMargin": convertToPercentage(netProfitMargin),
        "workingCapitalRatio": convertToPercentage(workingCapitalRatio)
    };
}