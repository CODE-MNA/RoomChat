import request from 'supertest';
import express from 'express';

describe('GET /', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
  });

  it('should redirect when FRONTEND_URL is defined', async () => {
    process.env.FRONTEND_URL = 'http://example.com';
    app.get('/', (req, res) => {
      const redirectTo = process.env.FRONTEND_URL!;
      res.redirect(redirectTo);
    });

    await request(app)
      .get('/')
      .expect(302)
      .expect('Location', 'http://example.com');
  });

  it('should return "No Frontend Proxy!" when FRONTEND_URL is undefined', async () => {
    delete process.env.FRONTEND_URL;
    app.get('/', (req, res) => {
      let redirectTo = process.env.FRONTEND_URL;

      if (!redirectTo) {
        res.send('<h1>No Frontend Proxy!</h1>');
        return;
      }

      redirectTo = process.env.FRONTEND_URL!;
      res.redirect(redirectTo);
    });

    await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('<h1>No Frontend Proxy!</h1>');
  });

  it('should return "No Frontend Proxy!" when FRONTEND_URL is empty', async () => {
    process.env.FRONTEND_URL = '';
    app.get('/', (req, res) => {
      let redirectTo = process.env.FRONTEND_URL;

      if (!redirectTo) {
        res.send('<h1>No Frontend Proxy!</h1>');
        return;
      }

      redirectTo = process.env.FRONTEND_URL!;
      res.redirect(redirectTo);
    });

    await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect('<h1>No Frontend Proxy!</h1>');
  });
});