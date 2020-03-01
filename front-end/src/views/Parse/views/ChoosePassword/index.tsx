import React, {ChangeEvent, useState} from "react"
import {createStyles, makeStyles} from '@material-ui/core/styles'
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"
import {getQueryParams} from "hookrouter"
import {Button, Grid, TextField, Typography} from "@material-ui/core"
import {parseServerUrl} from "../../lib/urlUtils";

const useStyles = makeStyles(() =>
    createStyles({
        formFields: {
            maxWidth: 250,
        }
    })
)

const ChoosePassword: React.FC = () => {
    const classes = useStyles()
    const {
        username,
        token,
        error,
        id,
    } = getQueryParams()
    const [newPassword, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordCharCount, setPasswordCharCount] = useState(0)
    const [confirmPasswordCharCount, setConfirmPasswordCharCount] = useState(0)

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setPassword(value)
        setPasswordCharCount(value.length)
    }

    const validPassword = (newPassword === confirmPassword) || newPassword.length === 0
    const submitUrl = `${parseServerUrl()}/apps/${id}/request_password_reset`

    function handlePasswordConfirmChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setConfirmPassword(value)
        setConfirmPasswordCharCount(value.length)
    }

    return (
        <ParseStatusMessagePage
            title={"Trocar Senha"}
            message={`Olá ${username}, redefina sua senha aqui.`}>
            {error &&
            <Grid item xs={12}>
                <Typography variant={"body1"} color={"error"}>
                    {error}
                </Typography>
            </Grid>
            }
            <form method={"POST"} action={submitUrl}>
                <Grid item xs={12} container spacing={2} className={classes.formFields}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handlePasswordChange}
                            autoFocus={true}
                            fullWidth={true}
                            label={"Nova Senha"}
                            name={'new_password'}
                            autoComplete={'new-password'}
                            type={'password'}
                            inputProps={{
                                maxLength: 16
                            }}
                            helperText={`${passwordCharCount}/16   Mínimo de 6 e máximo de 16 caracteres`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={handlePasswordConfirmChange}
                            fullWidth={true}
                            label={"Confirmar Nova Senha"}
                            error={!validPassword}
                            name={'confirm_new_password'}
                            autoComplete={"new-password"}
                            type={'password'}
                            inputProps={{
                                maxLength: 16
                            }}
                            helperText={`${confirmPasswordCharCount}/16`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input type={'hidden'} name={'username'} value={username}/>
                        <input type={'hidden'} name={'utf-8'} value='✓'/>
                        <input type={'hidden'} name={'token'} value={token}/>
                        <Button
                            variant={"contained"}
                            type={'submit'}
                            color={'secondary'}
                            disabled={!validPassword}
                        >
                            Alterar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ParseStatusMessagePage>
    )
}

export default ChoosePassword
