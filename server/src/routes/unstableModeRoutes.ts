import express, { Request, Response, Router } from 'express';
import {
  isUnstableEnabled,
  setUnstableEnabled,
  getFailureRate
} from '../middleware/unstableMode';

const router: Router = express.Router();

router.get('/unstable-mode-on', (req: Request, res: Response) => {
  setUnstableEnabled(true);
  res.json({
    enabled: true,
    failureRate: getFailureRate(),
    message: 'Unstable mode is now ON'
  });
});

router.get('/unstable-mode-off', (req: Request, res: Response) => {
  setUnstableEnabled(false);
  res.json({
    enabled: false,
    message: 'Unstable mode is now OFF'
  });
});

router.get('/unstable-mode', (req: Request, res: Response) => {
  const enabled = isUnstableEnabled();
  res.json({
    enabled,
    failureRate: getFailureRate(),
    description:
      'When enabled, REST (/api/v1), GraphQL (/graphql) and media (/media) requests have a 5% chance of failing. Each failure is randomly one of: a 500 error, a hang/504, or a dropped TCP connection. Documentation, health, and admin endpoints are never affected.',
    failureModes: ['error500', 'hang', 'dropConnection'],
    toggle: {
      on: '/admin/unstable-mode-on',
      off: '/admin/unstable-mode-off',
      status: '/admin/unstable-mode'
    }
  });
});

export default router;
