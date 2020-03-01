import React from "react"
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"

const PasswordResetSuccess: React.FC = () => {
    return (
        <ParseStatusMessagePage title={"Senha Atualizada!"} message={"Sua senha foi alterada com sucesso."}/>
    )
}

export default PasswordResetSuccess
