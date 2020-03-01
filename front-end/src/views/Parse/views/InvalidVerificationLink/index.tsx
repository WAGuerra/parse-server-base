import React from "react"
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"
import {Button, Grid} from "@material-ui/core"
import {getQueryParams} from "hookrouter"
import {parseServerUrl} from "../../lib/urlUtils";

const InvalidVerificationLink: React.FC = () => {
    const {username, appId} = getQueryParams()

    return (
        <div>
            <ParseStatusMessagePage title={"Link de validação inválido"}
                                    message={"Ou seu e-mail já foi validado ou este link já não está mais disponível."}>
                <Grid item xs={12}>
                    <form method={"POST"} action={`${parseServerUrl()}/apps/${appId}/resend_verification_email`}>
                        <input type={"hidden"} name={"username"} value={username}/>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            type={"submit"}
                        >
                            Reenviar link
                        </Button>
                    </form>
                </Grid>
            </ParseStatusMessagePage>
        </div>
    )
}

export default InvalidVerificationLink
