import http from 'k6/http';
import { sleep,check } from 'k6';

export const options = {
  stages: [
    { duration: '40s', target: 200 },
    { duration: '40s', target: 200 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.95']
  },
};

export default () => {
  const incRes = http.get('http://18.222.140.34:31000/api/incidents');
  check(incRes, {
      'is status 200 or 201': (r) => r.status === 200 || r.status === 201,
    });

    sleep(1);
};