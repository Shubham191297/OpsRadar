import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  iterations: 5,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<100'],
  },
}

export default function () {
  const url = 'http://3.142.69.116:31000/api/incidents';

  http.get(url);
  sleep(1)
}