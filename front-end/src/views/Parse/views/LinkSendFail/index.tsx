import React from "react"
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"

const LinkSendFail: React.FC = () => {
    return (
        <ParseStatusMessagePage title={"Falha no envio do link!"}
                                message={"Link não foi enviado. Usuário não encontrado ou e-mail já foi verificado."}/>
    )
}

export default LinkSendFail
