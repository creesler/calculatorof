import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FractionCalculator() {
  const [inputs, setInputs] = useState({
    num1: '0',
    den1: '1',
    num2: '0',
    den2: '1',
    operation: 'add'
  });
  const [result, setResult] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>
        {/* First Fraction */}
        <View style={styles.fractionInput}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputs.num1}
            onChangeText={(text) => setInputs({ ...inputs, num1: text })}
          />
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputs.den1}
            onChangeText={(text) => setInputs({ ...inputs, den1: text })}
          />
        </View>

        {/* Operations */}
        <View style={styles.operations}>
          {['add', 'subtract', 'multiply', 'divide'].map((op) => (
            <TouchableOpacity
              key={op}
              style={[
                styles.operationButton,
                inputs.operation === op && styles.selectedOperation
              ]}
              onPress={() => setInputs({ ...inputs, operation: op })}
            >
              <Text style={styles.operationText}>
                {op === 'add' ? '+' : 
                 op === 'subtract' ? '−' :
                 op === 'multiply' ? '×' : '÷'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Result Display */}
        {result && (
          <View style={styles.result}>
            <Text style={styles.resultText}>
              {result.numerator}/{result.denominator}
            </Text>
            <Text style={styles.decimalText}>
              = {(result.numerator / result.denominator).toFixed(6)}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  calculator: {
    padding: 20,
  },
  fractionInput: {
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: '#000',
    marginVertical: 5,
  },
  operations: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  operationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOperation: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  operationText: {
    fontSize: 24,
    color: '#333',
  },
  result: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  decimalText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
}); 