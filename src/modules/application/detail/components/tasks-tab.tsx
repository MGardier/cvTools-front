import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { todoService } from "@/lib/api/todo/todo.service";
import { useMe } from "@/shared/hooks/useMe";
import { EStatusTodo } from "@/shared/types/entity";
import type { ITodo, TStatusTodo } from "@/shared/types/entity";
import type { TTaskFilter } from "../types";

const FILTER_TO_STATUS: Record<TTaskFilter, TStatusTodo | undefined> = {
  all: undefined,
  todo: EStatusTodo.TO_MAKE,
  done: EStatusTodo.DONE,
};

import { TasksTabUi } from "./tasks-tab.ui";

interface ITasksTabProps {
  applicationId: number;
}

export const TasksTab = ({ applicationId }: ITasksTabProps) => {
  const { t } = useTranslation("application");
  const queryClient = useQueryClient();
  const { user } = useMe();

  const [filter, setFilter] = useState<TTaskFilter>("all");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [newTaskValue, setNewTaskValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const statusFilter = FILTER_TO_STATUS[filter];

  const { data: todosData } = useQuery({
    queryKey: ["todos", applicationId, sortOrder, statusFilter],
    queryFn: () => todoService.findAll(applicationId, sortOrder, statusFilter),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  const { data: allTodosData } = useQuery({
    queryKey: ["todos", applicationId, "counts"],
    queryFn: () => todoService.findAll(applicationId),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  const createTodoMutation = useMutation({
    mutationFn: (description: string) =>
      todoService.create(applicationId, { description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", applicationId] });
    },
    onError: () => toast.error(t("detail.tasks.error")),
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number; description?: string; status?: string }) =>
      todoService.update(applicationId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", applicationId] });
    },
    onError: () => toast.error(t("detail.tasks.error")),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: number) => todoService.delete(applicationId, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", applicationId] });
    },
    onError: () => toast.error(t("detail.tasks.error")),
  });

  const filteredTodos = todosData?.data ?? [];
  const allTodos = allTodosData?.data ?? [];

  const doneCount = allTodos.filter((todo) => todo.status === EStatusTodo.DONE).length;
  const totalCount = allTodos.length;
  const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const toggleTask = (todo: ITodo) => {
    const newStatus = todo.status === EStatusTodo.DONE
      ? EStatusTodo.TO_MAKE
      : EStatusTodo.DONE;
    updateTodoMutation.mutate({ id: todo.id, status: newStatus });
  };

  const handleCreate = () => {
    if (!newTaskValue.trim()) return;
    createTodoMutation.mutate(newTaskValue.trim());
    setNewTaskValue("");
  };

  const handleCreateKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleStartEdit = (todo: ITodo) => {
    setEditingId(todo.id);
    setEditValue(todo.description);
  };

  const handleSaveEdit = (id: number) => {
    if (!editValue.trim()) return;
    updateTodoMutation.mutate({ id, description: editValue.trim() });
    setEditingId(null);
    setEditValue("");
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit(id);
    }
    if (e.key === "Escape") {
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <TasksTabUi
      t={t}
      filter={filter}
      sortOrder={sortOrder}
      newTaskValue={newTaskValue}
      editingId={editingId}
      editValue={editValue}
      doneCount={doneCount}
      totalCount={totalCount}
      progress={progress}
      filteredTodos={filteredTodos}
      onFilterChange={setFilter}
      onToggleSort={handleToggleSort}
      onNewTaskValueChange={setNewTaskValue}
      onEditValueChange={setEditValue}
      onCreateTodo={handleCreate}
      onCreateKeyDown={handleCreateKeyDown}
      onToggleTask={toggleTask}
      onStartEdit={handleStartEdit}
      onSaveEdit={handleSaveEdit}
      onEditKeyDown={handleEditKeyDown}
      onDeleteTodo={(id) => deleteTodoMutation.mutate(id)}
    />
  );
};
