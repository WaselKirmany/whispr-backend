import app from '../index.js';
import { createServer } from 'http';

export default function handler(req, res) {
  createServer(app).emit('request', req, res);
}