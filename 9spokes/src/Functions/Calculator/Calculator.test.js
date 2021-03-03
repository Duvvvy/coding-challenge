import {
    filterByListOfCategories, 
    filterByListOfAccountTypes
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

  });

  