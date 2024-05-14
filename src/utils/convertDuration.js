// Fungsi untuk mengonversi durasi dari detik menjadi format hh:mm
export const convertDurationToHHMM = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const hoursString = String(hours).padStart(2, "0");
  const minutesString = String(minutes).padStart(2, "0");
  return `${hoursString}:${minutesString}`;
};

// Fungsi untuk mengonversi durasi dari format hh:mm menjadi detik
export const convertHHMMToDuration = (durationHHMM) => {
  // Memisahkan jam dan menit dari format hh:mm
  const [hours, minutes] = durationHHMM.split(":").map(Number);
  // Mengonversi jam dan menit menjadi detik
  const totalSeconds = hours * 3600 + minutes * 60;
  return totalSeconds;
};

// Fungsi untuk mengonversi Date dari format misalnya 2024-02-03T10:05 menjadi 3 Februari 2024
export const convertDateToDDMMYYYYInIndonesian = (dateToConvert) => {
  // Create a new Date object from the input string
  const date = new Date(dateToConvert);

  // Define arrays for month names in Indonesian
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Extract day, month, and year from the date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date string with the Indonesian month name
  const formattedDate = day + " " + monthNames[monthIndex] + " " + year;

  return formattedDate;
};
