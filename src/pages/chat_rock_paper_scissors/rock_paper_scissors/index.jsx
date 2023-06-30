import { useEffect, useContext, useState } from 'react'
import {doc, onSnapshot} from 'firebase/firestore'
import { ChatContext } from '../../../contexts/ChatContext'
import { auth, db } from '../../../contexts/FirebaseContext'
import { Row, Col } from 'antd'

import GameHeader from './GameHeader'
import "../../../styles/RockPaperScissors.css"

export default function RockPaperScissors() {
  const { currentRoomId, dispatch } = useContext(ChatContext)
  const [betting, setBetting] = useState(null)

  useEffect(() => {
    const docRef = doc(db, 'rooms', currentRoomId)
  
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data()
      setBetting(data.betting)
    })
  
    return () => {
      unsubscribe()
    }
  }, [currentRoomId])
  return (
    <div className="rock-paper-scissors-game-container">
      <GameHeader />
      <Row>
        <Col span={8}>Rock</Col>
        <Col span={8}>Paper</Col>
        <Col span={8}>Scissors</Col>
      </Row>
    </div>
  )
}
