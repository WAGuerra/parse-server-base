import React from "react"
import {useTitle} from "hookrouter"
import ParseStatusMessagePage from "../../components/ParseStatusMessagePage"

const InvalidLink: React.FC = () => {
    useTitle("Link Inválido")

    return (
        <ParseStatusMessagePage title={"Link Inválido!"} message={"Este link já foi usado e não está mais disponível."}/>
    )
}

export default InvalidLink
