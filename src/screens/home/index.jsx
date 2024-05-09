import {View, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatActionBtn from '../../components/ui/floatActionBtn';
import {ADDTASKS} from '../../utils/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskCard from '../../components/home/taskCard';
import HeaderComponent from '../../components/home/headerComponent';

const Home = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [ongoing, setOngoing] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const getTask = async () => {
    console.log(tasks);
    try {
      const savedTask = await AsyncStorage.getItem('tasks');
      setTasks(JSON.parse(savedTask));

      let CompletedCount = 0;
      let PendingCount = 0;
      let OnGoingCount = 0;
      let CancelCount = 0;
      for (const task of JSON.parse(savedTask)) {
        if (task.status === 1) {
          OnGoingCount++;
        }
        if (task.status === 2) {
          PendingCount++;
        }
        if (task.status === 3) {
          CompletedCount++;
        }
        if (task.status === 4) {
          CancelCount++;
        }
        setCompleted(CompletedCount);
        setOngoing(OnGoingCount);
        setPending(PendingCount);
        setCancel(CancelCount);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    getTask();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTask();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        ListHeaderComponent={
          <HeaderComponent
            ongoing={ongoing}
            pending={pending}
            completed={completed}
            cancel={cancel}
          />
        }
        renderItem={({item}) => <TaskCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FloatActionBtn onPress={() => navigation.navigate(ADDTASKS)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
