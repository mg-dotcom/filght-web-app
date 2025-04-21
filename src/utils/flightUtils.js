import { useAircraftStore } from "@/stores/aircraftStore";

export const formatAircraftModel = (aircraftID) => {
  const aircraftStore = useAircraftStore(); // เรียกใช้ store หลังจากติดตั้ง Pinia
  const model = aircraftStore.getAircraftByID(aircraftID)?.model || "";
  const parts = model.split(" ");
  return `${parts[0] ?? ""}<br/>${parts[1] ?? ""}`;
};

export const formatDate = (date) => {
  const year = date.getFullYear(); // ดึงปี
  const month = String(date.getMonth() + 1).padStart(2, "0"); // ดึงเดือน
  const day = String(date.getDate()).padStart(2, "0"); // ดึงวันที่

  return `${year}-${month}-${day}`;
};
