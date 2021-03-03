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

  });
  
  test('return only records that are in list of account types function', () => {

  });
  
  test('return only records that are in list of value types function', () => {

  });

  