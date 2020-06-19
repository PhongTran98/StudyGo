import React, {useState, useEffect, useContext} from 'react'
import { 
  View, Modal, StyleSheet, TouchableOpacity, 
  Text, TextInput, Alert, TouchableWithoutFeedback, Keyboard 
} from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { RadioButtons, UserIdContext } from '../../../components/index'
import { addEvent } from './DataFetcher'

export default function AddEventModal({onFinishAdding, refetchData, dateString}) {
  const userId = useContext(UserIdContext)

  const [headerColor, setHeaderColor] = useState('#c0c0c0')
  const [type, setType] = useState('')
  const [detail, setDetail] = useState('')
  const [title, setTitle] = useState('')
  
  const map = { deadline: 0, assessment: 1, special: 2}
  const [choice, setChoice] = useState(0)

  // decide the color of the modal, depending on the type of task
  // ---------------------------------------------
  useEffect(() => {
    switch (type) {
      case 'deadline':
        setHeaderColor('#1e90ff') // blue
        setTitle('Deadline:')
        break
      case 'assessment':
        setHeaderColor('rgb(245,199,26)') // yellow
        setTitle('Assessment: ')
        break
      case 'special':
        setHeaderColor('#dc143c') // red
        setTitle('Special: ')
        break
      default:
        setHeaderColor('#c0c0c0')
        break
    }
  }, [type])
  //////////////////////////////////////////////////////

  // change the name in the header
  // -----------------------------------------------------
  const handleChangeDetail = (value) => {
    if (value.length <= 30) setDetail(value)
    else Alert.alert('Input', 'Maximum name length is 30 characters', [{text: 'OK'}])
  }
  //////////////////////////////////////////////////////// 

  // handle the choice selection in the radio buttons
  // ------------------------------------------------
  const handleChoice = (index) => {
    setChoice(index)
    Object.keys(map).forEach(key => {
      if (map[key] === index) setType(key)
    })
  }
  /////////////////////////////////////////////////////

  // update changes in the api
  // --------------------------------------------------
  const handleSubmit = () => {
    if (type !== '' && detail !== '') {
      const event = {
        type: type,
        detail: detail
      }
      addEvent(userId, dateString, event)
        .then(() => onFinishAdding())
        .then(() => refetchData(dateString))
    }
  }
  ////////////////////////////////////////////////////

  return (
    <Modal visible={true} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.whiteBox}>
            <View style={[styles.header, {backgroundColor: headerColor}]}>
              <Text style={styles.title}>{title !== '' ? title : 'Type of event'}</Text>
              <TextInput 
                value={detail}
                placeholder='Event name'
                placeholderTextColor='#ffffff'
                onChangeText={handleChangeDetail}
                style={styles.input}
              />
              <TouchableOpacity style={styles.closeButton} onPress={onFinishAdding}>
                <AntDesign name='close' size={30} color='#ffffff'/>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <RadioButtons onPressIndex={handleChoice} initialChoice={choice}>
                  {/*Choice 1*/}
                  <Text>Deadline</Text>
                  {/*Choice 2*/}
                  <Text>Assessment</Text>
                  {/*Choice 3*/}
                  <Text>Special Event</Text>
              </RadioButtons>
              <TouchableOpacity 
                style={[styles.doneButton, {backgroundColor: headerColor}]}
                onPress={handleSubmit}
              >
                <MaterialIcons name='done' size={30} color='#ffffff'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteBox: {
    backgroundColor: 'white',
    height: '70%',
    width: '70%',
    minHeight: 350
  },
  header: {
    height: '30%',
    minHeight: 150,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  title: {
    fontSize: 25,
    color: '#ffffff'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    color: '#ffffff',
    fontSize: 15
  },
  doneButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25
  },
  content: {
    flex: 1
  }
})