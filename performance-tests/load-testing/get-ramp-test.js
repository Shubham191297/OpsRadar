import http from 'k6/http';
import { sleep,check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 40 },
    { duration: '10s', target: 70 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<100'],
    checks: ['rate>0.95']
  },
}

export default function () {
  const url = 'http://3.142.69.116:31000/api/incidents';

  const res = http.get(url);
  check(res, {
    'is status 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
  sleep(1)
}