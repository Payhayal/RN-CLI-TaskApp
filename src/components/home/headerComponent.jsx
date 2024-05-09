import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {AppColors} from '../../theme/colors';
import {
  ArrowCircleRight2,
  ChartCircle,
  Clock,
  CloseCircle,
  TickCircle,
} from 'iconsax-react-native';

const HeaderComponent = ({ongoing, pending, completed, cancel}) => {
  const tasks = [
    {
      id: 1,
      title: 'Ongoing',
      color: AppColors.ONGOING,
      icon: <ChartCircle size="32" color={AppColors.WHITE} />,
      count: ongoing,
    },
    {
      id: 2,
      title: 'Pending',
      color: AppColors.PENDING,
      icon: <Clock size="32" color={AppColors.WHITE} />,
      count: pending,
    },
    {
      id: 3,
      title: 'Completed',
      color: AppColors.COMPLETED,
      icon: <TickCircle size="32" color={AppColors.WHITE} />,
      count: completed,
    },
    {
      id: 4,
      title: 'Cancel',
      color: AppColors.CANCEL,
      icon: <CloseCircle size="32" color={AppColors.WHITE} />,
      count: cancel,
    },
  ];

  const Task = ({item}) => {
    return (
      <Pressable style={[styles.TaskView, {backgroundColor: item.color}]}>
        {item.icon}
        <View style={styles.TaskIcon}>
          <View>
            <Text>{item.title}</Text>
            <Text style={styles.TaskColor}>{item.count} Task</Text>
          </View>
          <View>
            <ArrowCircleRight2 size="25" color={AppColors.WHITE} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.allTasks}>My Weekly Tasks</Text>
      </View>
      <FlatList
        numColumns={2}
        data={tasks}
        renderItem={({item}) => <Task item={item} />}
      />
      <View>
        <Text style={styles.allTasks}>All Meetings </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TaskView: {
    width: '45%',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  TaskIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  TaskColor: {
    color: AppColors.WHITE,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  allTasks: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
    marginHorizontal: 20,
  },
});

export default HeaderComponent;
