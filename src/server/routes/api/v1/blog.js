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

router.get('/:id', function(req, res) {
  const tmpDetail = {
    id: 1,
    header: 'Ensure correct role and provide a label',
    details: [
      'In order for assistive technologies – such as screen readers – to convey that a series of buttons is grouped, an appropriate role attribute needs to be provided. For button groups, this would be role="group", while toolbars should have a role="toolbar".',
      'One exception are groups which only contain a single control (for instance the justified button groups with <button> elements) or a dropdown.',
      'In addition, groups and toolbars should be given an explicit label, as most assistive technologies will otherwise not announce them, despite the presence of the correct role attribute. In the examples provided here, we use aria-label, but alternatives such as aria-labelledby can also be used.'
    ]
  }

  res.json(tmpDetail);
});

export default router;
