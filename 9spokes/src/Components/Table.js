import React, {useState, useEffect} from "react";
import {getJsonReport} from '../Functions/Calculator/Calculator';
import axios from 'axios';
import {Table} from 'antd';


export default function Records() {
    const [isLoading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get('https://raw.githubusercontent.com/9spokes/coding-challenge/master/data.json')
            .then(response => {
              setLoading(false)
              setTableData([getJsonReport(response.data.data)])
            })
            .catch(error => {
                alert(error.message);
            })
      }, []);

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
        <Table columns={columns} dataSource={tableData} loading={isLoading} pagination={false}/>
        );
    }
    