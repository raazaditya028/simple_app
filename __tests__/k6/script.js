import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,         // virtual users
  duration: '20s'  // test duration
};

export default function () {
  // adjust base URL if needed (use deployed/staging URL for CI)
  const BASE = __ENV.BASE_URL || 'http://host.docker.internal:8181';
  const r1 = http.get(`${BASE}/`);
  check(r1, { 'status is 200': (r) => r.status === 200 });

  const payload = JSON.stringify({ name: 'banana' });
  const r2 = http.post(`${BASE}/items`, payload, { headers: { 'Content-Type': 'application/json' }});
  check(r2, { 'create status 201': (r) => r.status === 201 });

  sleep(1);
}
