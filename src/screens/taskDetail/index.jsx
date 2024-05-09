import React, {useEffect} from 'react';
import {Button, Divider} from '@ui-kitten/components';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {AppColors} from '../../theme/colors';
import {setCategory} from '../../utils/functions';
import moment from 'moment';
import {status, taskValues} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TASKS} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';

const TaskDetail = ({route}) => {
  const {item} = route?.params;
  const navigation = useNavigation();
  const deleteTask = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return;
      }
      const tasks = JSON.parse(savedTasks);
      const filtredTasks = tasks.filter(task => task.id !== item.id);
      await AsyncStorage.setItem('tasks', JSON.stringify(filtredTasks));
      //   console.log('Task is deleted');
    } catch (error) {
      console.log('An error has occurred', error);
    }
  };
  const updateTask = async newStatus => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks === null) {
        return;
      }
      const tasks = JSON.parse(savedTasks);

      const updatedTasks = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      // console.log('Task is updated:', updatedTasks);
    } catch (error) {
      console.error('An error has occurred', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {});

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.viewItem}>
          <Text style={styles.text}>Title :</Text>
          <Text>{item.title}</Text>
        </View>
        <Divider />
        <View style={styles.viewItem}>
          <Text style={styles.text}>Description :</Text>
          <Text>{item.description}</Text>
        </View>
        <Divider />
        <View style={styles.viewItem}>
          <Text style={styles.text}>Start Date :</Text>
          <Text>{moment(item.startDate).format('MM/DD/YYYY')}</Text>
        </View>
        <Divider />
        <View style={styles.viewItem}>
          <Text style={styles.text}>End Date :</Text>
          <Text>{moment(item.endDate).format('MM/DD/YYYY')}</Text>
        </View>
        <Divider />
        <View style={styles.viewItem}>
          <Text style={styles.text}>Category :</Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
        <Divider />
        <View style={styles.viewItem}>
          <Text style={styles.text}>Status :</Text>
          <Text>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <Divider />
      </ScrollView>
      <View style={styles.viewBtn}>
        <Button
          onPress={async () => {
            await updateTask(status.PENDING);
            navigation.navigate(TASKS);
            Alert.alert('The task was marked as pending!');
          }}
          style={styles.buttons}
          status="primary">
          START
        </Button>
        <Button
          onPress={async () => {
            await updateTask(status.COMPLETED);
            navigation.navigate(TASKS);
            Alert.alert('The task was marked as completed!');
          }}
          style={styles.buttons}
          status="success">
          COMPLETED
        </Button>
        <Button
          onPress={async () => {
            await updateTask(status.CANCEL);
            navigation.navigate(TASKS);
            Alert.alert('The task was successfully cancelled!');
          }}
          style={styles.buttons}
          status="warning">
          CANCEL
        </Button>
        <Button
          onPress={async () => {
            await deleteTask();
            navigation.navigate(TASKS);
            Alert.alert('The task was successfully deleted!');
          }}
          style={styles.buttons}
          status="danger">
          DELETE
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: AppColors.WHITE,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  viewBtn: {
    bottom: 20,
  },
  buttons: {
    marginVertical: 5,
  },
});

export default TaskDetail;
