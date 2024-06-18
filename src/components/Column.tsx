import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { TaskType } from "@/types/types";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
  droppableId: string;
  createTask: (
    columnId: string,
    data: { name: string; description: string }
  ) => void;
  editTask: (
    columnId: string,
    taskId: string,
    data: { name: string; description: string }
  ) => void;
  deleteTask: (boardId: string, taskId: string) => void;
};

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  droppableId,
  createTask,
  editTask,
  deleteTask,
}) => {
  const [hoverIndex, setHoverIndex] = useState<Number | null>(null);
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const toggleCreatingModal = (status: boolean) => {
    setIsCreating(status);
  };

  const toggleEditingModal = (status: boolean, task: TaskType | null) => {
    setIsEditing(status);
    setCurrentTask(task);
  };

  const toggleDeletingModal = (status: boolean, task: TaskType | null) => {
    setIsRemoving(status);
    setCurrentTask(task);
  };

  return (
    <div className="flex-1">
      <div className="flex gap-1 flex justify-center">
        <div className="text-white text-sm font-semibold mb-4 uppercase">
          {title}
        </div>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-800 bg-gray-200 rounded-lg p-4 "
          >
            {tasks?.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between "
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <div className="flex justify-between break-all w-[85%]">
                      <div>
                        <h3 className="font-semibold">{task.name}</h3>
                        <p className="text-xs">{task.description}</p>
                      </div>
                    </div>
                    <div>
                      {hoverIndex === index && (
                        <div className="flex gap-3">
                          <span
                            className="text-xs text-gray-400 mt-1 cursor-pointer"
                            onClick={() => toggleEditingModal(true, task)}
                          >
                            <AiOutlineEdit size={16} />
                          </span>
                          <span
                            className="text-xs text-gray-400 mt-1 cursor-pointer"
                            onClick={() => toggleDeletingModal(true, task)}
                          >
                            <AiOutlineDelete size={16} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <div>
              <button
                className="hover:bg-gray-700 rounded-lg text-white font-bold p-3"
                onClick={() => toggleCreatingModal(true)}
              >
                + Add task
              </button>
            </div>
          </div>
        )}
      </Droppable>
      {isCreating && (
        <CreateTaskModal
          onClose={toggleCreatingModal}
          title="Create a task"
          action={createTask}
          columnId={id}
        />
      )}
      {isEditing && (
        <EditTaskModal
          onClose={toggleEditingModal}
          title={`Edit the ${currentTask!.name} task`}
          action={editTask}
          task={currentTask!}
          columnId={id}
        />
      )}

      {isRemoving && (
        <DeleteTaskModal
          onClose={toggleDeletingModal}
          title={`Are you sure you want to delete the ${currentTask?.name} task?`}
          action={deleteTask}
          task={currentTask!}
          columnId={id}
        />
      )}
    </div>
  );
};

export default Column;
