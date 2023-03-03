import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CustomPaginations from '../paginations/CustomPaginate'
import axios from 'axios'
import { useSelector } from 'react-redux'
import DOMAIN from 'src/domain'

const Tables = () => {

  const [historyBet, setHistoryBet] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const dataBet = await axios.get(`${DOMAIN}api/admin/history-bet?page=${currentPage}`, config)
      if (dataBet.status == 200) {
        setHistoryBet(dataBet.data.data.results)
        setCurrentPage(dataBet.data.data.page)
        setTotalPage(dataBet.data.data.totalPages)
        setTotalResult(dataBet.data.data.totalResult)
      }
    }
    fetchData()
  },)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>History Play Game ({totalResult} Lệnh)</strong>
          </CCardHeader>
          <CCardBody>
            <CTable color="dark" hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                  <CTableHeaderCell scope="col">UserId</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount Bet</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount Win</CTableHeaderCell>
                  <CTableHeaderCell scope="col">PayOut</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chọn payout</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Time Bet</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  historyBet.map((item, index) =>
                    <CTableRow>
                      <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
                      <CTableDataCell>{item.userId}</CTableDataCell>
                      <CTableDataCell>{item.status}</CTableDataCell>
                      <CTableDataCell>{Number(item.amountBet).toFixed(3)}</CTableDataCell>
                      <CTableDataCell>{Number(item.amountWin).toFixed(3)}</CTableDataCell>
                      <CTableDataCell>{Number(item.payout).toFixed(3)}</CTableDataCell>
                      <CTableDataCell>{item.isChoosePayout ? 'True' : 'False'}</CTableDataCell>
                      <CTableDataCell>{item.timeBet}</CTableDataCell>
                    </CTableRow>
                  )
                }

              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CustomPaginations totalPage currentPage ></CustomPaginations>
      </CCol>
    </CRow>
  )
}

export default Tables
