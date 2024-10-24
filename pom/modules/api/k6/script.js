import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from "k6/data"
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export const options = {
  stages: [
    { duration: "20s", target: 150 },
    
  ]

};

const tokens = new SharedArray("token data", function () {
  return JSON.parse(
    open("/home/automaticity-01/playwright-akademija/fixtures/tokens.json")
  )
})

export default async function () {
  const tokenData = tokens[randomIntBetween(0, 2)]
  const url = "https://automaticityacademy.ngrok.app/api/v1/products"
  let req = http.get(url, {
    headers: {
      Accept: "apllication/json",
      authorization: `Bearer ${tokenData}`
    }
  })
  check(req,{
        'is status 200': (r) => r.status === 200,

  })
}

// export default function () {
//   const url = 'https://automaticityacademy.ngrok.app/api/v1/auth/login';
//   const payload = JSON.stringify({
//     email: 'dusang@email.com ',
//     password: 'test123',
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: "application/json"
//     },
//   };

//   let res = http.post(url, payload, params);
//   check(res, {
//     'is status 200': (r) => r.status === 200,
//   });
// }

export function handleSummary(data) {
  return {
    "loadSummary.html": htmlReport(data),
  }
}




