const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

function generateToken(user, expiresIn) {
  const token = jwt.sign(user, 'yourtoken', { expiresIn });
  return token;
}

router.get('/login', passport.authenticate('local'), (req, res) => res.redirect('/'));

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_location'],
  session: false,
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = generateToken(req.user, expiresIn);
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/');
});

// router.get('/facebook/callback', (req, res, next) => {
//   passport.authenticate('facebook', (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.redirect('/');
//     }
//     if (!user) {
//       console.log('user did not permit');
//       return res.redirect('/');
//     }
//     req.login(user, (error) => {
//       if (err) {
//         console.log(err);
//         return next(error);
//       }
//       console.log('all worked well');
//       return res.redirect('/facebooklogin');
//     });
//     return null;
//   })(req, res, next);
// });

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/plus.login'],
  session: false,
}));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    console.log('google loooooooogin');
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = generateToken(req.user, expiresIn);
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

// router.get('/google/callback', (req, res, next) => {
//   passport.authenticate('google', (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.redirect('/');
//     }
//     if (!user) {
//       console.log('user did not permit');
//       return res.redirect('/');
//     }
//     req.login(user, (error) => {
//       if (err) {
//         console.log(err);
//         return next(error);
//       }
//       console.log('all worked well');
//       return res.redirect('/googlelogin');
//     });
//     return null;
//   })(req, res, next);
// });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/twitterlogin');
    });
    return null;
  })(req, res, next);
});

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/linkedinlogin');
    });
    return null;
  })(req, res, next);
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    if (!user) {
      console.log('user did not permit');
      return res.redirect('/');
    }
    req.login(user, (error) => {
      if (err) {
        console.log(err);
        return next(error);
      }
      console.log('all worked well');
      return res.redirect('/githublogin');
    });
    return null;
  })(req, res, next);
});

module.exports = router;
