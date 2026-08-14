import { Router } from 'express';
import authRoute from './auth.route';
import projectRoute from './project.route';
import postRoute from './post.route';
import testimonialRoute from './testimonial.route';
import contactRoute from './contact.route';
import homepageRoute from './homepage.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/projects', projectRoute);
router.use('/posts', postRoute);
router.use('/testimonials', testimonialRoute);
router.use('/contact', contactRoute);
router.use('/homepage', homepageRoute);

export default router;
