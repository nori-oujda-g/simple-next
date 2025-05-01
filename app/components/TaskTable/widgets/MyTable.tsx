import { ReactNode } from 'react'
import { Table } from 'react-bootstrap'
interface MyTableProps {
    children: ReactNode
    responsive?: string
    variant?: string
    className?: string
}
const MyTable = ({ children, variant = "dark", className }: MyTableProps) => {
    return (
        <Table responsive="lg" striped bordered hover variant={variant} className={className} >
            {children}
        </Table>
    )
}

export default MyTable