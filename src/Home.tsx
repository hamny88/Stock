import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "../src/modules/index";
import { loading, Trend_loading } from "../src/modules/index";
import Quote from "../src/component/quote";
import "./style.css";
import { Form, Input, Radio } from "antd";
import "antd/dist/antd.css";
const { Search } = Input;

const request = require('request');

request('https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=c0h4ip748v6ttm1t20u0', { json: true }, (err:any, res:any, body:any) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});

const Home = () => {
  type LayoutType = Parameters<typeof Form>[0]["layout"];

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [type, setType] = useState<any>("");

  useEffect(()=> {
    console.log(type.layout)
  },[type]);
  
  const onFormLayoutChange = (layout: any) => {
    console.log(layout);
    setFormLayout(layout);
    setType(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 1.3 },
          wrapperCol: { span: 14 },
        }
      : null;

  const data = useSelector((state: RootState) => state);
  console.log(data);
  const Price: any = data.getReducer.data;
  const CP: number = Price?.c;
  let stockCode = "";
  const dispatch = useDispatch();
  const inputValue: any = React.createRef();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading === true && CP === 0) {
      alert("please enter correct stock code");
    }
  }, [CP]);

  console.log(type.layout)
  const onFinish = (values: any) => {
    if (type.layout === undefined) {
      alert("select the type first");
    } else if (type.layout === "quote") {
      setLoading(true);
      //dispatch(loading(stockCode));
      dispatch(Trend_loading(stockCode));
    }
  };
  const onSearch = (value: any) => {
    console.log(value);
    stockCode = value;
    if (type.layout === "") {
      alert("select the type first");
    } else if (type.layout === "quote") {
      console.log("quote type")
      setLoading(true);
      dispatch(loading(stockCode));
      dispatch(Trend_loading(stockCode));
    }
  };

  return (
    <div className="container">
      <div className="gray">
      <h3>Get the Stock from Finnhub</h3>
      <div className="form" >
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          onFinish={onFinish}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Info type" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="quote">Quote</Radio.Button>
              <Radio.Button value="news">News</Radio.Button>
              <Radio.Button value="trend">Trend</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="" className="input">
            <Search
              width="20"
              placeholder="stock code"
              ref={inputValue}
              enterButton="Search"
              onSearch={onSearch}
            />
          </Form.Item>
        </Form>
        </div>
        {isLoading === true && CP !== 0 ? <Quote CP={CP} /> : ""}

      </div>
    </div>
  );
};

export default Home;
