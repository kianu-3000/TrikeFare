import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Constants } from './constants/constants.js'

export default function App() {
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // adjust as needed
    >

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi! Welcome To Trikes Fare</Text>
        </View>

        <View style={styles.form}>

          <TextInput
            style={styles.textInput}
            placeholder='Email'>
          </TextInput>

          <TextInput
            style={styles.textInput}
            placeholder='Passwords'
            secureTextEntry={true}>
          </TextInput>

          <TouchableOpacity style={styles.button} onPress={() => alert('Pressed')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Constants.COLORS.RED,
    flexDirection: 'column'
  },

  header: {
    flexGrow: 0.6,
    alignItems: 'center',
    borderWidth: 3,
    // borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#050505',
    backgroundColor: '#E8E8E8',
    padding: 40
  },

  headerText: {
    marginTop: 50,
    color: '#000',
    fontSize: 45,
    fontWeight: 'bold'
  },

  // Login form
  form: {
    position: 'absolute',
    width: '80%',
    height: '40%',
    top: '50%',
    left: '10%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50
  },

  textInput: {
    padding: 20,
    backgroundColor: '#E6E1E1',
    borderRadius: 20,
    marginBottom: 20
  },

  // button stuff
  button: {
    backgroundColor: '#D33333',
    borderRadius: 20,
    padding: 20
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});
