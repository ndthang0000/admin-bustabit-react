import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Statictis = () => {
  const socket = useSelector((state) => state.socket)
  const token = useSelector((state) => state.token)

  const [totalBet, setTotalBet] = useState(0)
  const [totalQuantityBet, setTotalQuantityBet] = useState(0)
  const [stopPoint, setStopPoint] = useState(0)
  const [totalQuantityWinBet, setTotalQuantityWinBet] = useState(0)

  const [time, setTime] = useState(0)
  const [status, setStatus] = useState('PENDING')
  const [counter, setCounter] = useState(0)

  const handleStopForce = async () => {
    socket.emit('FORCE_STOP_GAME')
    toast.success('Force stop game successfully')
  }

  useEffect(() => {
    if (socket) {
      socket.on('CURRENT_BET', (data) => {
        console.log("CURRENT_BET", data)
        setTotalBet(data.totalBet)
        setTotalQuantityBet(data.totalQuantityBet)
        setTotalQuantityWinBet(data.totalQuantityWinBet)
      })

      socket.on('GET_STOP_POINT', (data) => {
        setStopPoint(data);
      });

      socket.on('COUNT_DOWN', (data) => {
        setTime(data);
      });

      socket.on('CHANGE_STATUS', (data) => {
        setStatus(data);
      });

      socket.on('COUNTER', (data) => {
        setCounter(data);
      });

    }
  }, [token])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4 mt-4">
          <CCardHeader>
            Lệnh Hiện tại:
            <span style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
              {counter}
            </span>
            {status == 'PENDING' && <p>Count Down To Start: <span style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
              {time}s
            </span></p>}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12} md={6} xl={6}>
                <CRow>
                  <CCol sm={4}>
                    <div>
                      <div className="text-medium-emphasis small">Điểm dừng</div>
                      <div className="fs-5 fw-semibold">{stopPoint.toFixed(3)}</div>
                    </div>
                  </CCol>
                  <CCol sm={3}>
                    <div className="">
                      <div className="text-medium-emphasis small">Tổng Volume Bet</div>
                      <div className="fs-5 fw-semibold">{totalBet}$</div>
                    </div>
                  </CCol>
                  <CCol sm={2}>
                    <div className="">
                      <div className="text-medium-emphasis small">Số lệnh bet</div>
                      <div className="fs-5 fw-semibold">{totalQuantityBet} lệnh</div>
                    </div>
                  </CCol>
                  <CCol sm={3}>
                    <div className="">
                      <div className="text-medium-emphasis small">Số lệnh chốt</div>
                      <div className="fs-5 fw-semibold">{totalQuantityWinBet} lệnh</div>
                    </div>
                  </CCol>
                </CRow>
              </CCol>

              <CCol xs={12} md={6} xl={6}>
                <CRow>
                  <CCol sm={4}>
                    <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                      <div className="text-medium-emphasis small">Trạng Thái</div>
                      <div className="fs-5 fw-semibold">{status}</div>
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="py-1 px-3 mb-3">
                      <div className="fs-5 fw-semibold">
                        <CButton
                          color='danger'
                          onClick={handleStopForce}
                          disabled={status == 'START' ? false : true}
                        >
                          Force Stop Game
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                </CRow>

                <hr className="mt-0" />

                {/*  */}
              </CCol>
            </CRow>

            <br />


          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Statictis
