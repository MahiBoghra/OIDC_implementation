// Path: OIDC_route.js
import { Router } from 'express';



const router = Router();

router.get('/well-known/openid-configuration', (req, res) => {
    return res.json({
        issuer : 'http://localhost:3000',
        authorization_endpoint: 'http://localhost:3000/signup',
        userinfo_endpoint : 'http://localhost:3000/getme',
        
    })
})



export default router;
