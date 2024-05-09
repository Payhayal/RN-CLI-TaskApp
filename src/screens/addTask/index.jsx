import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import {Formik} from 'formik';
import {Input, Button, RadioGroup, Radio} from '@ui-kitten/components';
import DatePicker from '../../components/ui/customDatePicker';
import taskSchema from '../../utils/validations';
import {TASKS} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {status} from '../../utils/constants';

const AddTask = ({navigation}) => {
  const saveTask = async values => {
    // await AsyncStorage.removeItem('tasks');
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      let myTask = savedTasks ? JSON.parse(savedTasks) : [];
      myTask.push(values);
      await AsyncStorage.setItem('tasks', JSON.stringify(myTask));
    } catch (error) {
      Alert.alert('An error has occurred!Please try again..');
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          id: uuid.v4(),
          title: '',
          description: '',
          startDate: null,
          endDate: null,
          category: null,
          status: status.ONGOING,
        }}
        validationSchema={taskSchema}
        onSubmit={values => {
          saveTask(values);
          navigation.navigate(TASKS);
          Alert.alert('You have successfully created an account!');
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          setTouched,
          touched,
        }) => (
          <View>
            <View>
              <Input
                caption={errors.title && touched.title ? errors.title : null}
                status={errors.title && touched.title ? 'danger' : 'success'}
                size="large"
                onBlur={handleBlur('title')}
                value={values.title}
                placeholder="Title"
                style={styles.margin}
                label={'Title :'}
                onChangeText={handleChange('title')}
                onFocus={() => setTouched({...touched, title: true})}
              />
            </View>
            <View>
              <Input
                multiline
                caption={
                  errors.description && touched.description
                    ? errors.description
                    : null
                }
                status={
                  errors.description && touched.description
                    ? 'danger'
                    : 'success'
                }
                size="large"
                style={styles.margin}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder="Description"
                label={'Description :'}
                onChangeText={handleChange('description')}
                onFocus={() => setTouched({...touched, description: true})}
              />
            </View>
            <DatePicker
              size="large"
              style={styles.margin}
              date={values.startDate}
              label={'Start Date :'}
              onSelectDate={date => setFieldValue('startDate', date)}
              caption={
                errors.startDate && touched.startDate ? errors.startDate : null
              }
              status={
                errors.startDate && touched.startDate ? 'danger' : 'success'
              }
            />
            <DatePicker
              size="large"
              style={styles.margin}
              date={values.endDate}
              label={'End Date :'}
              onSelectDate={date => setFieldValue('endDate', date)}
              caption={
                errors.endDate && touched.endDate ? errors.endDate : null
              }
              status={errors.endDate && touched.endDate ? 'danger' : 'success'}
            />
            <RadioGroup
              style={styles.margin}
              selectedIndex={values.category}
              onChange={index => setFieldValue('category', index)}>
              <Radio
                status={
                  errors.category && touched.category ? 'danger' : 'success'
                }>
                Software
              </Radio>
              <Radio
                status={
                  errors.category && touched.category ? 'danger' : 'success'
                }>
                Design
              </Radio>
              <Radio
                status={
                  errors.category && touched.category ? 'danger' : 'success'
                }>
                Operation
              </Radio>
            </RadioGroup>

            <Button
              status="success"
              style={styles.Btn}
              onPress={handleSubmit}
              title="Submit">
              Create
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  margin: {
    marginVertical: 10,
  },
});

export default AddTask;
