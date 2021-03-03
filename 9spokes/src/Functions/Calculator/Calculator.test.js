import {
    filterByListOfCategories, 
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

  });
  
  test('return only records that are in list of value types function', () => {

  });

  