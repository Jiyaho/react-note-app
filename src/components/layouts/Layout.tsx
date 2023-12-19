import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="ml-52 mt-[40px]">{children}</main>
    </>
  );
}
export default Layout;
