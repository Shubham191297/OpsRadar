import http from 'k6/http';
import { sleep } from 'k6';

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
  const url = 'http://3.143.214.213:31000/api/incident/15';
  const payload = JSON.stringify({
    assignee: 'Viktor Frankl',
    status: 'Investigating',
    severity: 'P3',
    tags: "shards,slow-query,patch,update,incident",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.put(url, payload, params);
  sleep(1)
}