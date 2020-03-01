import React from "react"
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"

const VerifyEmailSuccess: React.FC = () => {
    return (
        <ParseStatusMessagePage title={"Sucesso!"} message={"Seu email foi validado."}/>
    )
}

export default VerifyEmailSuccess
