import { Outlet } from "react-router-dom";
import HeaderWrapper from "../../components/header-wrapper";

function Layout() {
  return (
    <>
      <HeaderWrapper>
        <Outlet />
      </HeaderWrapper>
    </>
  );
}

export default Layout;
