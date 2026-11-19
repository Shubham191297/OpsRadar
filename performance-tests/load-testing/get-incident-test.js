import http from 'k6/http';
import { sleep,check } from 'k6';

export const options = {
  vus: 5,
  iterations: 5,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<100'],
  },
}

export default function () {
  const url = 'http://3.143.214.213:31000/api/incident/10';

  const res = http.get(url);
  check(res, {
    'is status 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
  sleep(1)
}
