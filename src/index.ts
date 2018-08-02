import { app } from './app';
import * as http from 'http';

const server = http.createServer(app).listen(8080, '0.0.0.0');
