import React, { useState } from 'react';
import "./UserActiveLogs.css";
import Table, { TableBody, TableCell, TableHead, TableRow } from "@kiwicom/orbit-components/lib/Table";
import Pagination from "@kiwicom/orbit-components/lib/Pagination";

export const UserActivityLogs = () => {
  const [currentPage, setCurrentPage] = useState(2);
  return (
    <>
    <div className='UserDetailslog-Block'>
    <div className='UserDetailslog-sections'> 
    <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th">Sl no</TableCell>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Activity</TableCell>
              <TableCell as="th">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    </div>
    <div className='Pagination'>
    <Pagination
      id="Pagination-sec"
      pageCount={7}
      onPageChange={(selectedPage) => setCurrentPage(selectedPage)}
      selectedPage={currentPage}
    />
    </div>
    </div>
    </>
  )
}

