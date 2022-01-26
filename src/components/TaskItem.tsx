import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { EditTaskArgs } from '../pages/Home';

interface TaskItemProps {
    task: Task
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ id, taskNewTitle }: EditTaskArgs) => void
}

export function TaskItem({ task, toggleTaskDone, editTask, removeTask }: TaskItemProps) {
    const textInputRef = useRef<TextInput>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [taskValue, setTaskValue] = useState(task.title)

    function handleStartEditing() {
        setIsEditing(true)
    }

    function handleCancelEditing() {
        setTaskValue(task.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask({ id: task.id, taskNewTitle: taskValue })
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>

                <TouchableOpacity
                    testID={`button-${task.id}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${task.id}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    {/* <Text
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    >
                    {task.title}
                </Text> */}
                    <TextInput
                        value={taskValue}
                        onChangeText={setTaskValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    >

                    </TextInput>
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >

                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >

                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    style={{ paddingHorizontal: 24 }}
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >

                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginLeft: 24,

    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})