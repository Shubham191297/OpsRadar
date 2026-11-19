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
  const url = 'http://3.142.69.116:31000/api/create-incident';
  const payload = JSON.stringify({
    title: 'DB slow query',
    description: 'Queries are taking longer than expected to execute, causing delays in data retrieval.',
    creator: 'John Doe',
    assignee: 'David Goggins',
    status: 'Open',
    severity: 'P2',
    service: 'Database',
    category: 'Database Performance',
    tags: "database,shards,slow-query",
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  sleep(1)
}