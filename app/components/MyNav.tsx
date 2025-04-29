"use client";


import { Container, Nav, Navbar } from "react-bootstrap";

interface NavProp {
  id: number
  link: string;
  text: string;
}
const links: NavProp[] = [
  { id: 1, link: '/', text: 'home' },
  { id: 2, link: 'verify', text: 'Verify' },
  { id: 3, link: 'quotes', text: 'Quotes' },
  { id: 4, link: 'clients', text: 'Clients' },
  { id: 5, link: 'test', text: 'Test' },
  { id: 6, link: 'TaskTable', text: 'task table' },
  // {id:100, link: '', text: '' },
]
function MyNav() {
  //const pathname = usePathname();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MY NEXT PROJ</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {links.map(lk => <Nav.Link key={lk.id} href={lk.link} >{lk.text} </Nav.Link>)}
          </Nav>
        </Container>
      </Navbar>

      {/* <nav className={styles.nav}>
        {links.map(lin => <Link key={lin.id}
          //  className={`${styles.link} ${pathname === "/" + lin.link ? styles.active : ""}`}
          className={`${styles.link}`}
          href={"/" + lin.link}
        >
          {lin.text}
        </Link>
        )}
      </nav> */}
    </>
  );
};
export default MyNav;