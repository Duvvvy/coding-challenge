import React, {useState, useEffect} from "react";
import {getJsonReport} from '../Functions/Calculator/Calculator';
import axios from 'axios';
import {Table} from 'antd';


export default function Records() {

    const columns = [
        {
          title: 'Revenue',
          dataIndex: 'revenue',
          key: 'revenue',
        },
        {
          title: 'Expenses',
          dataIndex: 'expenses',
          key: 'expenses',
        },
        {
          title: 'Gross Profit Margin',
          dataIndex: 'grossProfitMargin',
          key: 'grossProfitMargin',
        },
        {
          title: 'Net Profit Margin',
          dataIndex: 'netProfitMargin',
          key: 'netProfitMargin',
        },
        {
            title: 'Working Capital Ratio',
            dataIndex: 'workingCapitalRatio',
            key: 'workingCapitalRatio',
        }
      ];
    
      return (
        <Table columns={columns} pagination={false}/>
        );
    }
    