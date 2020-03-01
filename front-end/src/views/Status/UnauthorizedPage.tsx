import React from "react"
import HtmlStatusPage from "./HtmlStatusPage"

const UnauthorizedPage: React.FC = () => {
    return (
        <HtmlStatusPage
            htmlStatusCode={403}
            title={"Acesso restrito!"}
            message={"Lamento mas este conteúdo não está disponível."}
        />
    )
}

export default UnauthorizedPage
