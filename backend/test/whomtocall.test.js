import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Custom counters
export const status_200 = new Counter('http_200_responses');
export const status_400 = new Counter('http_400_responses');
export const status_404 = new Counter('http_404_responses');
export const status_other = new Counter('http_other_responses');

export const options = {
    stages: [
        { duration: '30s', target: 10 },   // Ramp up to 10
        { duration: '60s', target: 1000 },  // Ramp up to 1000
        { duration: '60s', target: 1000 },  // Stay at 1000
        { duration: '30s', target: 10 },   // Ramp down to 10
    ],
};

const BASE_URL = 'http://localhost:8080/api/web/whomtocall';

const payloads = [
    {
        issueType: 'road',
        lat: 18.559163334972332,
        long: 73.8081538849116,
        userId: 'test-user-1'
    },
    {
        issueType: 'road',
        lat: 18.505633694110596,
        long: 73.79773993398565,
        userId: 'test-user-2'
    },
    {
        issueType: 'road',
        lat: 18.567323542777054,
        long: 73.95011476616952,
        userId: 'test-user-3'
    },
    {
        issueType: 'road',
        lat: 18.538518534509883,
        long: 73.9365964337456,
        userId: 'test-user-4'
    },
    {
        issueType: 'road',
        lat: 18.733691356784835,
        long: 73.68479542944813,
        userId: 'test-user-5'
    }
];

export default function () {
    const payload = JSON.stringify(payloads[Math.floor(Math.random() * payloads.length)]);

    const headers = {
        'Content-Type': 'application/json',
    };

    const res = http.post(BASE_URL, payload, { headers });

    // Increment counters based on response status
    if (res.status === 200) status_200.add(1);
    else if (res.status === 400) status_400.add(1);
    else if (res.status === 404) status_404.add(1);
    else status_other.add(1);

    check(res, {
        'status is 200 or 400/404': (r) => [200, 400, 404].includes(r.status),
    });

    if (![200, 400, 404].includes(res.status)) {
        console.error(`Unexpected response: ${res.status} → ${res.body}`);
    }

    sleep(1); // simulate realistic pacing
}
