import {
    filterByListOfCategories, 
    filterByListOfAccountTypes,
    filterByListOfValueType,
    sumReduce,
    convertToCurrency,
    convertToPercentage
  } from './Calculator';
  
  test('return only records that are in list of categories function', () => {
    let testData = 
    [
        {"account_category": "revenue"},
        {"account_category": "expense"},
        {"account_category": "liability"},
        {"account_category": "liability"},
        {"account_category": "assets"},
        {"account_category": "expense"}
    ]
    let assets = filterByListOfCategories(testData, ['assets'])
    expect(assets).toStrictEqual(
        [
            {"account_category": "assets"}
        ]
    );

    let liability = filterByListOfCategories(testData, ['liability'])
    expect(liability).toStrictEqual(
        [
            {"account_category": "liability"},
            {"account_category": "liability"}
        ]
    );

    let revenueExpense = filterByListOfCategories(testData, ['revenue', 'expense'])
    expect(revenueExpense).toStrictEqual(
        [
            {"account_category": "revenue"},
            {"account_category": "expense"},
            {"account_category": "expense"}
        ]
    );

  });
  
  test('return only records that are in list of account types function', () => {
    let testData = 
    [
        {"account_type": "sales"},
        {"account_type": "bank"},
        {"account_type": "current_accounts_receivable"},
        {"account_type": "current"},
        {"account_type": "current"},
        {"account_type": "current_accounts_payable"},
        {"account_type": "current_accounts_receivable"}
    ]
    let assets = filterByListOfAccountTypes(testData, ['sales'])
    expect(assets).toStrictEqual(
        [
            {"account_type": "sales"}
        ]
    );

    let liability = filterByListOfAccountTypes(testData, ['current_accounts_receivable'])
    expect(liability).toStrictEqual(
        [
            {"account_type": "current_accounts_receivable"},
            {"account_type": "current_accounts_receivable"}
        ]
    );

    let revenueExpense = filterByListOfAccountTypes(testData, ['current', 'bank', 'current_accounts_receivable'])
    expect(revenueExpense).toStrictEqual(
        [
            {"account_type": "bank"},
            {"account_type": "current_accounts_receivable"},
            {"account_type": "current"},
            {"account_type": "current"},
            {"account_type": "current_accounts_receivable"}
        ]
    );

  });
  
  test('return only records that are in list of value types function', () => {
    let testData = 
    [
        {"value_type": "credit"},
        {"value_type": "debit"},
        {"value_type": "debit"},
        {"value_type": "debit"},
        {"value_type": "credit"},
    ]
    let assets = filterByListOfValueType(testData, ['credit'])
    expect(assets).toStrictEqual(
        [
            {"value_type": "credit"},
            {"value_type": "credit"},
        ]
    );

    let liability = filterByListOfValueType(testData, ['debit'])
    expect(liability).toStrictEqual(
        [
            {"value_type": "debit"},
            {"value_type": "debit"},
            {"value_type": "debit"}
        ]
    );
  });

  test('calculate total_value from test data using array reducer pattern', () => {
    let testSet1 = 
    [
        {"total_value": 1295.99},
        {"total_value": 1},
        {"total_value": -12.17},
        {"total_value": 5.22},
        {"total_value": 3.0000},
    ]
    let total1 = sumReduce(testSet1)
    expect(total1).toStrictEqual(1293.04);

    let testSet2 = 
    [
        {"total_value": 1295.99},
        {"total_value": 1},
        {"total_value": -12.17},
        {"total_value": 5.22},
        {"total_value": 3.0000012},
    ]
    let total2 = sumReduce(testSet2)
    expect(total2).toStrictEqual(1293.0400012);
  });

  test('return numbers in AUD format', () =>{
    let unformattedNumber1 = 519169;
    let formattedNumber1 = convertToCurrency(unformattedNumber1);
    expect(formattedNumber1).toBe("$519,169.00")

    let unformattedNumber2 = 100.0;
    let formattedNumber2 = convertToCurrency(unformattedNumber2);
    expect(formattedNumber2).toBe("$100.00")

    let unformattedNumber3 = 50;
    let formattedNumber3 = convertToCurrency(unformattedNumber3);
    expect(formattedNumber3).toBe("$50.00")
  });

test('return percentage', () =>{
    let unformattedNumber1 = -0.22009100000001;//Accept long numbers
    let formattedNumber1 = convertToPercentage(unformattedNumber1);
    expect(formattedNumber1).toBe("-22%")

    let unformattedNumber2 = 0.994;//Round down
    let formattedNumber2 = convertToPercentage(unformattedNumber2);
    expect(formattedNumber2).toBe("99%")

    let unformattedNumber3 = 0.995;//Round up
    let formattedNumber3 = convertToPercentage(unformattedNumber3);
    expect(formattedNumber3).toBe("100%")
});