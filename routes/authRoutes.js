//Requiring in the npm passport module
const passport = require('passport');

//Route handler, attempt to authenticate user, using the strategy Google, (obtains the code generated when the user clicks on the account to sign in)
module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        //asking google to give us access to user profile and email. There are different scopes (permissions) that you can ask for
        scope: ['profile', 'email']
    })
    );

    //Handles the case when the user goes to /auth/google/callback, which sends the request to passport to authenticate the user(exchanges the generated code for their profile info (handshake id))
    //
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            //response has a redirect function tied to it, that redirects browser to the /surveys route, which takes user to the Dashboard component after user finishes oauthflow
            res.redirect('/surveys');
        }
        );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
