class AuthController {
    githubCallback(req, res) {
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                req.user,
            )}', '*');window.close();</script>`,
        )
    }
}

export const AuthCtrl = new AuthController()
