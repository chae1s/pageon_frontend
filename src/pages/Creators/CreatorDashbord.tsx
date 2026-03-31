
import CreatorSidebar from "../../components/Sidebars/CreatorSidebar";
import "./Creators.css"
import { MainContainer, SidebarMain } from "../../styles/Layout.styles";
function CreatorDashbord() {

    return (
        <MainContainer>
            <SidebarMain>
                <CreatorSidebar />
                <div className="creator-right-wrap">
                    
                </div>
            </SidebarMain>
        </MainContainer>
    )
}


export default CreatorDashbord;