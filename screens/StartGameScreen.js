import React ,{ useState} from 'react'
import {View,StyleSheet,Text, Alert ,TextInput, Button,TouchableWithoutFeedback,Keyboard} from 'react-native'
import Card from'../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

export default function StartGameScreen(props) {
    
    const [enteredValue,setEnteredValue] = useState('')
    const [confirmed, setConfirmed]=useState(false)
    const [selectedNumber, setselectedNumber] = useState()

    const numberInputHandler=inputText=>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }
    const resetInputHandler=()=>{
        setEnteredValue("")
        setConfirmed(false)
    } 
    const confirmInputHandler=()=>{
       const chosenNumber=parseInt(enteredValue)
       if(isNaN(chosenNumber) ||chosenNumber<=0||chosenNumber>99){
        Alert.alert('Invalid Number','Number has to be a number between 1 and 99.',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])  
       
        }
        setConfirmed(true)
        setselectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }
    let confirmedOutput;
    if(confirmed){
    confirmedOutput=(
       <Card style={styles.summaryContainer}>
       <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
       </Card>    
    )}
    


    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.screen}>
         <Text style={styles.title}>Start A New Game</Text>
         <Card style={styles.inputContainer}>
             <Text>Select A Number</Text>
             <Input style={styles.input}  
             blurOnSubmit autoCapitalize='none'  
             autoCorrect={false} 
             keyboardType='number-pad'
             maxLength={2} 
             onChangeText={numberInputHandler}
             value={enteredValue}/>
             <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Reset" onPress={()=>{}} color={Colors.accent} onPress={resetInputHandler} />
                </View>
                <View style={styles.button}> 
                    <Button title="Confirm" onPress={()=>{}} color={Colors.primary} onPress={confirmInputHandler}/> 
                </View>
             </View>
         </Card>
         {confirmedOutput}
      </View>
      </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    title:{
        fontSize:20,
        marginVertical:10,
    
    },
    buttonContainer:{
        flexDirection:'row',
        width:"100%",
        justifyContent:'space-between',
        padding:15,
    },
    inputContainer:{
       width:300,
       maxWidth:"80%",
       alignItems:"center",
      
    },
    button:{
        width:100,
    },
    input:{
        width:50,
        textAlign:"center"
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center',
    }

})