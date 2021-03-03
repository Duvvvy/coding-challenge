import {
    filterByListOfCategories, 
    filterByListOfAccountTypes,
    filterByListOfValueType,
    sumReduce,
    convertToCurrency,
    convertToPercentage,
    getJsonReport
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

test('get report', () => {
    let data = [
            {
                "account_category": "revenue",
                "account_code": "200",
                "account_identifier": "e2bacdc6-2006-43c2-a5da-3c0e5f43b452",
                "value_type": "credit",
                "account_name": "Sales",
                "account_type": "sales",
                "system_account": "",
                "total_value": 32431.0
            },
            {
                "account_code": "400",
                "account_identifier": "d392fe47-c99d-499e-a200-46709dd6b6e7",
                "account_name": "Advertising",
                "system_account": "",
                "value_type": "debit",
                "account_category": "expense",
                "total_value": 1830.18,
                "account_type": "overheads"
            },
            {
                "account_identifier": "959af5f4-9925-44e8-b283-7ddf4b427238",
                "value_type": "debit",
                "system_account": "",
                "total_value": 31.5,
                "account_category": "expense",
                "account_code": "404",
                "account_name": "Bank Fees",
                "account_type": "overheads"
            },
            {
                "value_type": "debit",
                "total_value": 310.0,
                "account_name": "Cleaning",
                "account_type": "overheads",
                "account_identifier": "ff09eac3-5b17-44fb-9eea-e2e9375e91b4",
                "system_account": "",
                "account_category": "expense",
                "account_code": "408"
            },
            {
                "system_account": "",
                "total_value": 49.0,
                "account_category": "expense",
                "account_code": "412",
                "account_identifier": "6db51cfa-0326-4e63-a743-c78c4d99aba4",
                "account_name": "Consulting & Accounting",
                "account_type": "overheads",
                "value_type": "debit"
            },
            {
                "system_account": "",
                "value_type": "debit",
                "total_value": 477.2,
                "account_type": "overheads",
                "account_category": "expense",
                "account_code": "420",
                "account_identifier": "18e27517-81e0-437c-bc21-fbba8e30d6bb",
                "account_name": "Entertainment"
            },
            {
                "account_code": "429",
                "account_type": "overheads",
                "account_category": "expense",
                "account_identifier": "94882296-5acf-4350-8c5b-82bc9370ab78",
                "account_name": "General Expenses",
                "system_account": "",
                "value_type": "debit",
                "total_value": 966.87
            },
            {
                "account_name": "Light, Power, Heating",
                "account_type": "overheads",
                "system_account": "",
                "value_type": "debit",
                "account_category": "expense",
                "account_code": "445",
                "account_identifier": "42a56c1a-6141-4bf2-913d-916dc1a35cfd",
                "total_value": 645.0
            },
            {
                "account_type": "overheads",
                "system_account": "",
                "account_category": "expense",
                "account_code": "449",
                "account_identifier": "005f380d-4a9c-497f-b9d7-817f0f02790e",
                "account_name": "Motor Vehicle Expenses",
                "value_type": "debit",
                "total_value": 310.91
            },
            {
                "account_code": "453",
                "account_identifier": "8ab9d684-f897-4168-b5d1-2279bf74bb82",
                "account_type": "overheads",
                "value_type": "debit",
                "account_category": "expense",
                "account_name": "Office Expenses",
                "system_account": "",
                "total_value": 1295.99
            },
            {
                "account_code": "461",
                "account_type": "overheads",
                "system_account": "",
                "value_type": "debit",
                "total_value": 160.54,
                "account_category": "expense",
                "account_identifier": "b18eaea6-4d11-462c-ac30-7975108b5859",
                "account_name": "Printing & Stationery"
            },
            {
                "account_type": "overheads",
                "system_account": "",
                "value_type": "debit",
                "account_code": "469",
                "account_identifier": "f5f05ee3-f9cd-4bf9-9423-ed81de96b537",
                "account_name": "Rent",
                "total_value": 3000.0,
                "account_category": "expense"
            },
            {
                "account_type": "overheads",
                "system_account": "",
                "value_type": "debit",
                "total_value": 190.35,
                "account_name": "Telephone & Internet",
                "account_identifier": "266f40cc-5aa1-4f6c-b078-eb615171d6de",
                "account_category": "expense",
                "account_code": "489"
            },
            {
                "account_category": "expense",
                "account_code": "493",
                "account_name": "Travel - National",
                "account_type": "overheads",
                "system_account": "",
                "value_type": "debit",
                "total_value": 462.14,
                "account_identifier": "25717024-5b50-4320-93b7-280c0614a613"
            },
            {
                "account_category": "expense",
                "account_code": "477",
                "system_account": "",
                "total_value": 26800.0,
                "account_identifier": "c4f12f09-846e-4f6f-b39c-dff3be3e49a7",
                "account_name": "Wages and Salaries",
                "account_type": "overheads",
                "value_type": "debit"
            },
            {
                "account_category": "assets",
                "account_code": "610",
                "account_type": "current_accounts_receivable",
                "account_identifier": "3dd5c80d-e109-4313-8c61-41648e33704f",
                "account_name": "Accounts Receivable",
                "system_account": "DEBTORS",
                "value_type": "debit",
                "total_value": 10749.5
            },
            {
                "system_account": "",
                "account_code": "090",
                "account_identifier": "13918178-849a-4823-9a31-57b7eac713d7",
                "account_category": "assets",
                "account_name": "Business Bank Account",
                "account_type_bank": "BANK",
                "value_type": "debit",
                "total_value": 1065.85
            },
            {
                "system_account": "",
                "value_type": "debit",
                "account_category": "assets",
                "account_code": "091",
                "account_type_bank": "BANK",
                "account_identifier": "26028d3a-f981-44d6-a9ed-a522198870f8",
                "account_name": "Business Savings Account",
                "total_value": 15081.23
            },
            {
                "account_category": "assets",
                "account_name": "Office Equipment",
                "total_value": 750.0,
                "account_type": "fixed",
                "system_account": "",
                "value_type": "debit",
                "account_code": "710",
                "account_identifier": "2d69b4ee-37d4-4f67-b950-32cbdd5765ed"
            },
            {
                "account_identifier": "24d010bf-5e4b-42dd-9aa3-a5484dd0686f",
                "account_name": "Less Accumulated Depreciation on Office Equipment",
                "account_type": "fixed",
                "account_category": "assets",
                "system_account": "",
                "value_type": "credit",
                "total_value": 825.0,
                "account_code": "711"
            },
            {
                "account_type": "current_accounts_payable",
                "system_account": "CREDITORS",
                "value_type": "credit",
                "account_category": "liability",
                "account_code": "800",
                "account_identifier": "8e9c5166-d3fe-4e21-827a-f42753568e80",
                "account_name": "Accounts Payable",
                "total_value": 3434.06
            },
            {
                "account_category": "liability",
                "account_identifier": "66e60a82-99d8-47d1-956b-5baea404acba",
                "system_account": "GST",
                "total_value": 2245.99,
                "account_code": "820",
                "account_name": "GST",
                "account_type": "tax",
                "value_type": "credit"
            },
            {
                "account_code": "840",
                "account_name": "Historical Adjustment",
                "total_value": 19212.21,
                "value_type": "credit",
                "account_category": "liability",
                "account_identifier": "305b05b3-01f3-4f47-a45d-edfa66ea03e7",
                "account_type": "current",
                "system_account": "HISTORICAL"
            },
            {
                "account_name": "PAYG Withholdings Payable",
                "system_account": "",
                "value_type": "credit",
                "total_value": 6028.0,
                "account_category": "liability",
                "account_code": "825",
                "account_identifier": "4d111d55-1c71-46b4-8cbc-d8b54d8d54c5",
                "account_type": "payroll"
            },
            {
                "account_category": "liability",
                "account_type": "current",
                "value_type": "credit",
                "system_account": "UNPAIDEXPCLM",
                "total_value": 0.0,
                "account_code": "801",
                "account_identifier": "c11b84a9-e90a-4094-83d7-b8494d195ecc",
                "account_name": "Unpaid Expense Claims"
            }
        ]
    let report = getJsonReport(data)
    expect(report).toStrictEqual({
        "revenue": "$32,431.00",
        "expenses": "$36,529.68",
        "grossProfitMargin": "0%",
        "netProfitMargin": "-13%",
        "workingCapitalRatio": "47%",
    })

});