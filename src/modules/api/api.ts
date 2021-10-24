import axios from "axios";

// const SYMBOL:string[] = [];
// SYMBOL.push('DAL');
// const API_URL = `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=c0h4ip748v6ttm1t20u0`;

const getApi: any = (code: string) => {
  console.log(code);
  if (code === "") {
    //alert("type the stock code");
  } else {
    return axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${code}&token=c0h4ip748v6ttm1t20u0`
    );
  }
};

const getTrend: any = (code: string) => {
  console.log("Get Trend")
  return axios.get(
    'https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=c0h4ip748v6ttm1t20u0'
  );
};
const api = {
  getApi,
  getTrend
};

export default api;
