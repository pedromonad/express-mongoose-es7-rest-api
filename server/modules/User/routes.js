const UserCtrl = require('./controller');
const router = require('express').Router();

router.get('/', UserCtrl.list);
router.get('/:userId', UserCtrl.load);
router.post('/', UserCtrl.create);
router.put('/:userId', UserCtrl.update);
router.delete('/:userId', UserCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', UserCtrl.load);

export default router;