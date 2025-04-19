import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const mode = ref<"add" | "edit">("add");
  const editId = ref<number | null>(null);

  const openAdd = () => {
    mode.value = "add";
    editId.value = null;
    isOpen.value = true;
  };

  const openEdit = (id: number) => {
    mode.value = "edit";
    editId.value = id;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
    editId.value = null;
  };

  return { isOpen, mode, editId, openAdd, openEdit, close };
});
