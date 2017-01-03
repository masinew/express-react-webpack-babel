import { Router } from 'express';

const router = new Router();

router.get('/list', function(req, res) {
  const tmpList = [
    {
      id: 1,
      header: 'Ensure correct role and provide a label',
      shortInfo: 'In order for assistive technologies – such as screen readers – to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. For button groups, this would be role="group", while toolbars should have a role="toolbar".'
    },
    {
      id: 2,
      header: 'Ensure correct role and provide a label',
      shortInfo: 'In order for assistive technologies – such as screen readers – to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. For button groups, this would be role="group", while toolbars should have a role="toolbar".'
    }
  ];

  res.json(tmpList);
});

export default router;
