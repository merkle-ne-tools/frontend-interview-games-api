import { Request, Response, NextFunction } from 'express';

const FAILURE_RATE = 0.05;
const HANG_MIN_MS = 5000;
const HANG_MAX_MS = 10000;

let enabled = process.env.UNSTABLE_MODE === 'true';

export const isUnstableEnabled = (): boolean => enabled;
export const setUnstableEnabled = (value: boolean): void => {
  enabled = value;
};
export const getFailureRate = (): number => FAILURE_RATE;

type FailureMode = 'error500' | 'hang' | 'dropConnection';
const FAILURE_MODES: FailureMode[] = ['error500', 'hang', 'dropConnection'];

export const unstableMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!enabled || Math.random() >= FAILURE_RATE) {
    next();
    return;
  }

  const mode = FAILURE_MODES[Math.floor(Math.random() * FAILURE_MODES.length)];

  switch (mode) {
    case 'error500':
      res.setHeader('X-Unstable-Mode', 'simulated-failure');
      res.status(500).json({
        error: {
          message: 'Simulated Internal Server Error (unstable mode)',
          status: 500,
          simulated: true,
          source: 'unstable-mode'
        }
      });
      return;
    case 'hang': {
      const delay = HANG_MIN_MS + Math.random() * (HANG_MAX_MS - HANG_MIN_MS);
      setTimeout(() => {
        if (!res.headersSent) {
          res.setHeader('X-Unstable-Mode', 'simulated-failure');
          res.status(504).json({
            error: {
              message: 'Simulated Gateway Timeout (unstable mode)',
              status: 504,
              simulated: true,
              source: 'unstable-mode'
            }
          });
        }
      }, delay);
      return;
    }
    case 'dropConnection':
      // No marker possible — the socket is destroyed before any bytes are sent.
      // The frontend will see a network error (ECONNRESET / empty reply).
      req.socket.destroy();
      return;
  }
};
