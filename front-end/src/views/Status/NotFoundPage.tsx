import React from "react"
import HtmlStatusPage from "./HtmlStatusPage"

const NotFoundPage: React.FC = () => {
    return (
        <HtmlStatusPage
            title={"Opa!"}
            message={"Página não encontrada."}
            htmlStatusCode={404}
        />
    )
}

export default NotFoundPage
