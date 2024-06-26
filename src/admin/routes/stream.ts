import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/admin/stream', (req, res)=>{
  // if haslegit cookie render else redirect to login
  if (!req.session?.jwt) {
    res.redirect('../admin/signin');
  }

  try {
    jwt.verify(
            req.session!.jwt,
            process.env.JWT_KEY!,
    );
    res.render('adminPages/stream');
  } catch (error) {
    console.error('Invalid Token:', error); // Log the error for debugging
    res.redirect('../admin/signin');
  }
});

export {router as adminStreamRouter};
